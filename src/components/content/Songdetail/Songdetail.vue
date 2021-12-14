<template>
  <div id="song-detail" v-if="songData">
    <LoadingMove v-if="songData === null" />
    <div v-else>
      <div class="song-top">
        <p class="close-song-detail" title="收起音乐详情页">
          <i class="iconfont icon-quanping" @click="closeSongDetail"></i>
        </p>
        <!-- 左侧跟随音乐播放而进行的动画 -->
        <div class="song-desc-move">
          <div class="desc-move">
            <div class="p-bar" :class="{ 'p-bar-start': $store.state.flag }">
              <img
                src="@/assets/img/play-bar-support.png"
                alt=""
                class="support"
              />
              <img src="@/assets/img/play-bar.png" alt="" class="play-bar" />
            </div>
            <!-- 类名：running 开启动画 pause 暂停动画 play 继续动画 -->
            <div
              class="song-desc-cover running"
              :class="{ pause: !$store.state.flag }"
            >
              <img src="@/assets/img/disc.png" alt="" class="desc" />
              <img class="s-cover" :src="songData.al.picUrl" alt="" />
            </div>
          </div>
        </div>
        <!-- 中间歌词 -->
        <div class="lyric">
          <h2>{{ songData.name }}</h2>
          <div class="h5">
            <span v-for="(singer, index) in songData.ar" :key="index"
              >{{ singer.name }}
              <i>{{ index === songData.ar.length - 1 ? "" : "/" }}</i>
            </span>
          </div>
          <div class="move-lyric" @mousewheel="stopMoveLyric">
            <ul>
              <li
                v-for="(lyric, idx) in lyricData"
                :key="idx + Date.now()"
                :class="{ active: idx === lyricIndex }"
              >
                {{ lyric.lyric }}
              </li>
            </ul>
          </div>
        </div>
        <!-- 右侧推荐 -->
        <div class="song-recommend">
          <div class="recommend-wrap">
            <div class="re-list" v-if="recommenPlaylist.length !== 0">
              <h2>相似歌单</h2>
              <ul>
                <li
                  v-for="item in recommenPlaylist"
                  :key="item.id"
                  @click="toPlaylist(item.id)"
                >
                  <img :src="item.coverImgUrl" alt="" />
                  <p>{{ item.name }}</p>
                </li>
              </ul>
            </div>
            <div class="like-song" v-if="simiSong.length !== 0">
              <h2>喜欢这首歌的人也听</h2>
              <ul>
                <li
                  v-for="(songsitem, index) in simiSong"
                  :key="index"
                  @click="bofang(songsitem.id)"
                >
                  <img :src="songsitem.album.picUrl" alt="" />
                  <p>{{ songsitem.name }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="song-bootom">
        <!-- 评论区 -->
        <Comment
          :hotComment="hotComment"
          :newComment="newComment"
          :total="total"
          :showLoading="showLoading"
          :showComment="showComment"
          @currentChange="currentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getSongInfo,
  getLyric,
  getMusicComment,
  getSimiPlayList,
  getSimiSong,
} from "@/network/api";
import Comment from "@/components/common/Comment/Comment.vue";
import LoadingMove from "@/components/common/LoadingMove/LoadingMove.vue";
import { scrollMove } from "@/utils/move";
import { songPlay } from "@/mixin/mixin";
export default {
  name: "Songdetail",
  components: { Comment, LoadingMove },
  data() {
    return {
      songData: null, // 歌曲信息
      lyricData: [], // 歌词数组
      timer: null, // 计时器开关
      time: null, // 计时器开关
      lyricIndex: 0, // 正在激活的歌词索引
      oMoveLyric: null, // DOM元素
      hotComment: [], // 热评
      newComment: [], // 新评
      total: 0, // 评论条数
      showLoading: false, // 加载动画
      showComment: false, // 有评论就显示评论，没有就显示暂无评论
      recommenPlaylist: [], //相似歌单
      simiSong: [], // 相似音乐
    };
  },

  created() {
    this.getSongData();
    this.getMusicCom();
    this.getSimiList();
    this.$store.commit("SETSONGDETAIL", true);
    // 根据播放状态而决定是否开启滚动歌词
    if (this.$store.state.flag) {
      setTimeout(() => {
        this.scrollLyric();
      }, 500);
    }
  },
  mounted() {
    // 切换歌曲时重新刷新数据
    this.$bus.$on("up-song-datail", () => {
      this.updataSong();
      let songDetail = document.querySelector("#song-detail");
      scrollMove(songDetail, 0, 500);
    });
    // 获取DOM元素
    setTimeout(() => {
      this.oMoveLyric = document.querySelector(".lyric >.move-lyric");
    }, 300);
  },
  mixins: [songPlay],
  methods: {
    // 获取数据
    async getSongData() {
      let re = /\[([^\]]+)\]([^\[]+)/g;
      let index = JSON.parse(localStorage.getItem("index"));
      let song = JSON.parse(localStorage.getItem("song"));
      let s = song[index];
      let { data: res } = await getSongInfo(s.id);
      this.songData = res.songs[0];
      let { data: lrc } = await getLyric(s.id);
      let lyric = lrc.lrc.lyric;
      let tlyric = lrc.tlyric ? lrc.tlyric.lyric : null;
      //保存正则匹配结果的数组
      var result = []; // 歌词
      let tresult = []; // 中文翻译
      let mergeLyric = []; // 合并
      lyric.replace(re, ($0, $1, $2) => {
        //将匹配后的结果添加到数组中
        result.push({ time: this.formatTimeTosec($1), lyric: $2 });
      });
      if (tlyric) {
        tlyric.replace(re, ($0, $1, $2) => {
          //将匹配后的结果添加到数组中
          tresult.push({ time: this.formatTimeTosec($1), lyric: $2 });
        });
        result.forEach((item) => {
          let i = tresult.find((items) => {
            return item.time === items.time;
          });

          if (!i) {
            mergeLyric.push({
              time: item.time,
              lyric: item.lyric,
            });
          } else {
            mergeLyric.push({
              time: item.time,
              lyric: item.lyric + i.lyric,
            });
          }
        });

        this.lyricData = mergeLyric;
      } else {
        this.lyricData = result;
      }
    },
    // 获取评论
    async getMusicCom(offset, before) {
      this.showLoading = true;
      let index = JSON.parse(localStorage.getItem("index"));
      let song = JSON.parse(localStorage.getItem("song"));
      let s = song[index];
      let { data: res } = await getMusicComment(s.id, offset, before);
      this.showLoading = false;
      if (res.comments.length === 0) {
        this.showComment = true;
        return;
      }
      this.hotComment = res.hotComments || [];
      this.newComment = res.comments || [];
      this.total = res.total;
    },
    // 评论翻页
    currentChange(newPage) {
      if (this.total >= 5000) {
        let l = this.newComment[this.newComment.length - 1].time;
        this.getMusicCom(newPage, l);
      } else {
        this.getMusicCom(newPage);
      }
    },
    // 推荐相似数据
    async getSimiList() {
      this.showLoading = true;
      let index = JSON.parse(localStorage.getItem("index"));
      let song = JSON.parse(localStorage.getItem("song"));
      let s = song[index];
      let { data: res } = await getSimiPlayList(s.id);
      this.recommenPlaylist = res.playlists;
      let { data: simiSong } = await getSimiSong(s.id);
      this.simiSong = simiSong.songs;
    },
    //将时间转换成秒数
    formatTimeTosec(value) {
      //把时间分割出来 从冒号开始
      let arr = value.split(":");
      //分割出来分钟和秒数都转换成数字
      //将分钟*60得到秒数         将秒数只包含一位小数
      return (Number(arr[0] * 60) + Number(arr[1])).toFixed(1);
    },
    // 滚动歌词
    scrollLyric() {
      if (this.lyricData.length <= 3) {
        return;
      }
      let _this = this;
      clearInterval(_this.timer);
      let len = _this.lyricData.length;
      try {
        _this.timer = setInterval(() => {
          for (let i = 0; i < len; i++) {
            if (
              _this.$store.state.CurTime >= _this.lyricData[i].time &&
              (!_this.lyricData[i + 1] ||
                _this.$store.state.CurTime < _this.lyricData[i + 1].time)
            ) {
              _this.lyricIndex = i;
            }
          }
        }, 300);
      } catch (error) {}
    },
    // 在元素内滚动关闭歌词滚动
    stopMoveLyric() {
      if (this.timer !== null) {
        clearInterval(this.timer);
        this.timer = null;
      }
      if (this.time !== null) {
        clearTimeout(this.time);
        this.time = null;
      }
      this.time = setTimeout(() => {
        this.scrollLyric();
        this.time = null;
      }, 2000);
    },
    // 收起音乐详情页
    closeSongDetail() {
      clearInterval(this.timer);
      this.$bus.$off("up-song-datail");
      // 这个发布事件是 player组件订阅的
      this.$bus.$emit("closeSongDetail");
      this.$bus.$off("closeSongDetail");
    },
    // 切换歌曲刷新数据
    updataSong() {
      clearInterval(this.timer);
      this.lyricData = [];
      this.getSongData();
      this.getMusicCom();
      this.getSimiList();
      this.lyricIndex = 0;
      setTimeout(() => {
        this.scrollLyric();
        this.oMoveLyric.scrollTop = 0;
      }, 500);
    },
    // 点击相似歌单跳转至歌单页
    toPlaylist(id) {
      this.closeSongDetail();
      this.$router.push({
        path: "/playlist-detail",
        query: {
          id,
        },
      });
    },
  },
  // 组件销毁前关闭歌词滚动
  beforeDestroy() {
    clearInterval(this.timer);
    this.$store.commit("SETSONGDETAIL", false);
    this.$bus.$off("up-song-datail");
    this.$bus.$off("closeSongDetail");
  },
  // 监听是否正在播放
  watch: {
    "$store.state.flag"(nv) {
      if (nv) {
        this.scrollLyric();
      } else {
        clearInterval(this.timer);
      }
    },
    // 始终让高亮歌词显示在区域正中央
    lyricIndex() {
      if (this.lyricIndex >= 3) {
        let activeLi = document.querySelector(".lyric ul>li.active");
        this.oMoveLyric.scrollTop =
          activeLi.offsetTop - this.oMoveLyric.offsetHeight / 2;
      }
    },
  },
};
</script>

<style lang="less" scoped>
#song-detail {
  position: absolute;
  padding: 0 80px;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 99;
  overflow: auto;
  .song-top {
    display: flex;
    height: 500px;
    background: radial-gradient(closest-side, rgba(85, 190, 211, 0.5), #fff);
    .close-song-detail {
      position: absolute;
      top: 30px;
      left: 50px;
      i {
        font-size: 30px;
        cursor: pointer;
      }
    }

    .song-desc-move,
    .song-recommend {
      flex: 1;
    }
    .lyric {
      flex: 1.5;
    }
    .song-desc-move {
      flex: 1;
      height: 100%;
      margin-top: 20px;
      .desc-move {
        position: relative;
        height: 100%;

        .p-bar {
          position: absolute;
          // left: 40%;
          right: 123px;
          top: 20px;
          width: 80px;
          transform: rotate(-35deg);
          z-index: 3;
          transition: all 0.5s;
          &.p-bar-start {
            transform: rotate(-6deg);
          }
          .support {
            position: absolute;
            width: 30px;
            height: 30px;
            z-index: 2;
          }
          .play-bar {
            position: absolute;
            top: 16px;
            left: 8px;
            width: 80px;
          }
        }
        .song-desc-cover {
          position: absolute;
          width: 300px;
          height: 300px;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 50%;
          &.running {
            .desc,
            .s-cover {
              animation: song-move 10s linear infinite forwards;
            }
            &.pause {
              .desc,
              .s-cover {
                animation-play-state: paused;
              }
            }
          }

          .desc {
            position: absolute;
            width: 100%;
            transform-origin: center center;
          }
          .s-cover {
            position: absolute;
            left: 56px;
            top: 56px;
            border-radius: 50%;
            width: 186px;
            transform-origin: center center;
          }
        }
      }
    }
    .lyric {
      text-align: center;
      h2 {
        margin-top: 10px;
        font-size: 30px;
        font-weight: 600;
      }
      .h5 {
        margin-top: 10px;
        font-size: 14px;
        color: #9b9c9d;
      }
      .move-lyric {
        margin-top: 10px;
        height: 426px;
        overflow-y: scroll;
        scroll-behavior: smooth;
        &::-webkit-scrollbar {
          width: 0 !important;
        }
      }
      ul {
        margin-top: 10px;
        height: 100%;
        li {
          height: 80px;
          line-height: 24px;
          white-space: pre-wrap;
          &.active {
            animation: move-lyric 0.6s ease-in-out forwards;
          }
        }
      }
    }
    .song-recommend {
      margin-top: 80px;
      position: relative;
      .recommend-wrap {
        position: absolute;
        height: 260px;
        width: 260px;
        overflow-y: hidden;
        left: 200px;
        top: 42%;
        transform: translateY(-50%);
        &:hover {
          overflow-y: auto;
        }
        h2 {
          font-size: 18px;
          font-weight: 700;
          font-family: 宋体;
          margin: 15px 0;
          // margin-top: 15px;
          padding-left: 10px;
        }
        ul > li {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 10px 10px;
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer;
          &:hover {
            background: rgba(0, 0, 0, 0.2);
          }
          img {
            width: 30px;
            height: 30px;
            border-radius: 5px;
          }
          p {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-left: 5px;
          }
        }
      }
    }
  }
  .song-bootom {
    width: 1240px;
    margin: 100px auto 0;
  }
}
@keyframes song-move {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes move-lyric {
  0% {
    color: #333;
    font-size: 16px;
  }
  25% {
    color: #db98aa;
  }
  50% {
    color: #ca607c;
  }
  75% {
    color: #c94a6c;
  }
  100% {
    color: #bd2950;
    font-size: 18px;
  }
}
</style>