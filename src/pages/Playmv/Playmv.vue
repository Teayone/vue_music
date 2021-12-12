<template>
  <!-- mv播放页 -->
  <div id="play-mv" v-if="mvData">
    <div class="mv-left">
      <Back info="MV" />
      <div style="padding: 0 40px">
        <Xvideo
          :videoSrc="mvUrl"
          :definition="mvR"
          :definitionList="mvRlist"
          :cover="mvData && mvData.cover"
        />
      </div>
      <Author
        v-if="mvData"
        :artists="mvData.artists"
        :vTitle="mvData.name"
        :publishTime="mvData.publishTime"
        :playCount="mvData.playCount"
        :desc="mvData.desc"
      />
      <Btns :shareCount="mvData.shareCount" :subCount="mvData.subCount" />
      <div class="cm">
        <h2>评论({{ mvData.commentCount }})</h2>
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
    <div class="mv-right">
      <!-- 相关推荐 -->
      <h2>相关推荐</h2>
      <Recommend :mvs="mvs" />
    </div>
  </div>
</template>

<script>
import Xvideo from "@/components/common/Xvideo/Xvideo.vue";
import Comment from "@/components/common/Comment/Comment.vue";
import Author from "./childern/Author.vue";
import Back from "./childern/Back.vue";
import Btns from "./childern/Btns.vue";
import Recommend from "./childern/Recommend.vue";
import { getMvUrl, getMvDetail, getMvComMent, getSimiMV } from "@/network/api";
export default {
  name: "Playmv",
  components: { Xvideo, Comment, Back, Author, Btns, Recommend },
  data() {
    return {
      mvData: null,
      mvUrl: "",
      // mv 默认清晰度
      mvR: 0,
      mvRlist: [], // mv清晰度列表
      isShow: false,
      hotComment: [], // 热评
      newComment: [], // 新评
      total: 0, // 评论条数
      showLoading: false, // 加载动画
      showComment: false, // 有评论就显示评论，没有就显示暂无评论
      mvs: [], // 相似mv
    };
  },
  created() {
    let id = this.$route.query.mvid;
    this.getMvData(id);
    this.getMvCom(id);
  },
  methods: {
    async getMvData(id) {
      // 获取清晰度列表和mv详情
      let { data: rlist } = await getMvDetail(id);
      this.mvData = rlist.data;
      // 将清晰度列表排序
      this.mvRlist = rlist.data.brs
        .sort((a, b) => {
          return b.br - a.br;
        })
        .map((item) => {
          return item.br;
        });
      // 获取mv路径和当前mv清晰度
      let { data: res } = await getMvUrl(id);
      this.mvUrl = res.data.url;
      this.mvR = res.data.r;
      // 获取相似MV
      let { data: simiRes } = await getSimiMV(id);
      this.mvs = simiRes.mvs;
    },
    // 获取mv评论
    async getMvCom(id, offset, before) {
      this.showLoading = true;
      let { data: res } = await getMvComMent(id, offset, before);
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
      let id = this.$route.query.mvid;
      if (this.total >= 5000) {
        let l = this.newComment[this.newComment.length - 1].time;
        this.getMvCom(id, newPage, l);
      } else {
        this.getMvCom(id, newPage);
      }
    },
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
#play-mv {
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .mv-left {
    width: 780px;
    flex-grow: 0;
    flex-shrink: 0;

    .mv-btn {
      padding: 0px 40px;
      display: flex;
      margin-top: 30px;
      li {
        width: 120px;
        height: 35px;
        text-align: center;
        line-height: 32px;
        border: 1px solid #ccc;
        border-radius: 20px;
        font-size: 14px;
        cursor: pointer;
        margin-right: 10px;

        &:hover {
          background: #f2f2f2;
        }
      }
    }
    .cm {
      margin-top: 80px;
      h2 {
        padding: 0px 40px;
        font-size: 24px;
        font-weight: 700;
      }
    }
  }
  .mv-right {
    flex: 1;
    margin-left: 60px;
    h2 {
      margin: 20px 40px 0 40px;
      font-size: 20px;
      font-weight: 700;
    }
  }
}
</style>