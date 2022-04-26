<template>
  <div id="playlist-detail" v-if="playlist !== null">
    <!-- top -->
    <div class="top">
      <div class="cover-box">
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="song-info">
        <h2>{{ playlist.name }}</h2>
        <p class="author">
          <img :src="playlist.creator.avatarUrl" alt="" />
          <span class="author-name">{{ playlist.creator.nickname }}</span>
          <span class="create-time"
            >{{ playlist.createTime | forMatDate }}创建</span
          >
        </p>
        <div class="song-btn">
          <button class="play-btn" @click="playSong($route.query.id)">
            播放全部
          </button>
          <button class="shoucang-btn">收藏</button>
          <button class="fenxiang-btn">分享</button>
        </div>
        <ul class="info-list">
          <li class="biaoqian">
            标签：<span v-for="(item, index) in playlist.tags" :key="index">{{
              item
            }}</span>
          </li>
          <li class="gequ">
            歌曲：<span>{{ playlist.trackIds.length }}</span
            ><em
              >播放：<span>{{ playlist.playCount | formatPlayCount }}</span></em
            >
          </li>
          <li
            class="jianjie"
            :class="{ unfold: !flag }"
            v-if="playlist.description"
          >
            简介：<span style="white-space: pre-wrap">{{
              playlist.description
            }}</span>
            <i class="fold" :class="flodBtn" @click.stop="flodBrief"></i>
          </li>
        </ul>
      </div>
    </div>
    <!-- 歌曲+评分+收藏者 -->
    <div class="bottom">
      <ul class="b-list">
        <li
          :class="{ active: index === curIndex }"
          v-for="(item, index) in tabs"
          :key="index"
          @click="toggleTabs(index)"
        >
          {{ item === "评论" ? item + `(${playlist.commentCount})` : item }}
        </li>
      </ul>
      <!-- tabs内容区显示区域 -->
      <Songlist :songs="listAllSongs" v-if="curIndex === 0" />
      <Comment
        :hotComment="hotComment"
        :newComment="newComment"
        :total="total"
        :showLoading="showLoading"
        :showComment="showComment"
        v-else-if="curIndex === 1"
        @currentChange="currentChange"
      />
      <Collection v-else />
    </div>
  </div>
</template>

<script>
import Songlist from "@/components/common/Songlist/Songlist.vue";
import Comment from "@/components/common/Comment/Comment.vue";
import Collection from "./children/Collection.vue";
import {
  getWholeSongs,
  getSongDetail,
  getPlayListComment,
} from "@/network/api";
import { playlistPlay } from "@/mixin/mixin";
export default {
  name: "PlaylistDetail",
  components: { Songlist, Comment, Collection },
  data() {
    return {
      tabs: ["歌曲列表", "评论", "收藏者"],
      curIndex: 0,
      playlist: null,
      listAllSongs: null,
      flodBtn: "iconfont icon-xiasanjiaoxing ", // 展开按钮
      flag: true, // 简介正在折叠
      hotComment: [], // 热评
      newComment: [], // 新评
      total: 0, // 评论条数
      showLoading: false, // 加载动画
      showComment: false, // 有评论就显示评论，没有就显示暂无评论
      isShow: true,
    };
  },
  mounted() {
    let id = this.$route.query.id;
    this.getData(id);
  },

  mixins: [playlistPlay],
  methods: {
    toggleTabs(i) {
      this.curIndex = i;
      if (i === 1) {
        this.getCommentData(this.$route.query.id);
      }
    },
    async getData(id) {
      let { data: res } = await getWholeSongs(id);

      this.playlist = res.playlist;
      let s = [];
      res.playlist.trackIds.forEach((item) => {
        s.push(item.id);
      });
      s = s.join(",");
      let { data: songs } = await getSongDetail(s);
      this.listAllSongs = songs.songs;
    },
    // 折叠或打开简介
    flodBrief() {
      if (this.flag) {
        this.flag = false;
        this.flodBtn = "iconfont icon-shangsanjiaoxing";
      } else {
        this.flag = true;
        this.flodBtn = "iconfont icon-xiasanjiaoxing ";
      }
    },
    // 获取评论数据
    async getCommentData(id, offset, before) {
      this.showLoading = true;
      let { data: res } = await getPlayListComment(id, offset, before);
      this.showLoading = false;
      if (res.comments.length === 0) {
        this.showComment = true;
        return;
      }
      this.hotComment = res.hotComments || [];
      this.newComment = res.comments || [];
      this.total = res.total;
    },
    // 翻页
    currentChange(newPage) {
      let id = this.$route.query.id;
      if (this.total >= 5000) {
        let l = this.newComment[this.newComment.length - 1].time;
        this.getCommentData(id, newPage, l);
      } else {
        this.getCommentData(id, newPage);
      }
    },
  },
  watch: {
    $route: {
      handler(newVal) {
        let id = newVal.query.id;
        this.getData(id);
      },
    },
  },
};
</script>

<style lang="less" scoped>
#playlist-detail {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .top {
    width: 100%;
    display: flex;
    padding: 40px 40px 0px;

    .cover-box {
      width: 200px;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .song-info {
      flex: 1;
      margin-left: 25px;
      margin-top: 5px;
      font-size: 14px;
      h2 {
        font-size: 24px;
        font-weight: 900;
      }
      .author {
        margin-top: 10px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          vertical-align: middle;
          cursor: pointer;
        }
        .author-name {
          margin-left: 10px;
          color: #507daf;
          cursor: pointer;
        }
        .create-time {
          margin-left: 10px;
          color: #676767;
        }
      }
      .song-btn {
        margin-top: 10px;
        button {
          width: 100px;
          height: 35px;
          border-radius: 40px;
          border: none;
          margin: 0 10px;
          cursor: pointer;
          border: 1px solid #ccc;
          transition: all 0.3s;
          background: #fff;
          &:hover {
            background: #f2f2f2;
          }
          &:first-child {
            margin-left: 0;
          }
        }
        .play-btn {
          background: #ff7a9e;
          color: #fff;
          border: 1px solid #ff7a9e;
          &:hover {
            background: #de688a;
          }
        }
      }
      .info-list {
        margin-top: 10px;
        li {
          line-height: 22px;
          &.biaoqian {
            span {
              color: #507daf;
            }
          }
          &.gequ {
            span {
              color: #676767;
            }
            em {
              margin-left: 10px;
            }
          }
          &.jianjie {
            position: relative;
            height: 22px;
            overflow: hidden;
            padding-right: 15px;
            &.unfold {
              height: auto;
              overflow: hidden;
            }
            .fold {
              position: absolute;
              right: 0px;
              top: 0;
              height: 100%;
              color: #999999;
              cursor: pointer;
            }
            span {
              color: #676767;
            }
          }
        }
      }
    }
  }
  .bottom {
    margin-top: 50px;
    width: 100%;
    .b-list {
      display: flex;
      font-size: 20px;
      padding: 0 40px;
      li {
        margin: 0 15px;
        cursor: pointer;
        &:first-child {
          margin-left: 0;
        }
        &.active {
          margin-top: -5px;
          font-size: 24px;
          font-weight: 900;
          &::after {
            display: block;
            margin: 5px 6px 0;
            height: 3px;
            background: #ff7a9e;
            content: "";
          }
        }
      }
    }
  }
}
</style>
