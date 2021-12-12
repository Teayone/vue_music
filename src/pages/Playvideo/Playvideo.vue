<template>
  <!-- 视频播放页 -->
  <div id="play-video" v-if="videoData">
    <div class="video-left">
      <Back info="视频" />
      <div style="padding: 0 40px">
        <Xvideo
          v-if="videoData && videoUrl"
          :videoSrc="videoUrl.url"
          :definition="videoUrl.r"
          :definitionList="resolutions"
          :cover="videoData.coverUrl"
        />
      </div>
      <Author
        :imageSrc="videoData.avatarUrl"
        :authorName="videoData.creator.nickname"
        :videoName="videoData.title"
        :info="videoData.description"
        :playCount="videoData.playTime"
        :publishTime="videoData.publishTime"
        :lableList="videoData.videoGroup"
      />
      <Btns
        :subCount="videoData.subscribeCount"
        :shareCount="videoData.shareCount"
        :praisedCount="videoData.praisedCount"
      />
      <!-- <Comment/> -->
      <div class="cm">
        <h2>评论({{ videoData.commentCount }})</h2>
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
    <div class="video-right">
      <h2>相关推荐</h2>
      <div class="tuijian">
        <RecommendList
          v-for="item in videos"
          :key="item.vid"
          :vTitle="item.title"
          :author="item.creator[0].userName"
          :coverSrc="item.coverUrl"
          :playCount="item.playTime"
          @recommendClick="recommendClick(item.vid)"
          @authorClick="authorClick(item.creator[0].userId)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Back from "../Playmv/childern/Back.vue";
import Xvideo from "@/components/common/Xvideo/Xvideo.vue";
import Author from "./children/Author.vue";
import Btns from "../Playmv/childern/Btns.vue";
import Comment from "@/components/common/Comment/Comment.vue";
import RecommendList from "../Playmv/childern/RecommendList.vue";
import {
  getVideoDetail,
  getVideoUrl,
  getCommentVideo,
  getRelatedAllvideo,
} from "@/network/api";
export default {
  name: "Playvideo",
  components: { Back, Xvideo, Author, Btns, Comment, RecommendList },
  data() {
    return {
      videoData: null,
      videoUrl: null,
      resolutions: [], // 清晰度列表
      videos: [], // 相关推荐
      hotComment: [], // 热评
      newComment: [], // 新评
      total: 0, // 评论条数
      showLoading: false, // 加载动画
      showComment: false, // 有评论就显示评论，没有就显示暂无评论
    };
  },
  created() {
    let id = this.$route.query.id;
    this.getVideoData(id);
    this.getVideoComment(id);
  },
  methods: {
    async getVideoData(id) {
      // 视频详情
      let { data: vdetail } = await getVideoDetail(id);
      this.videoData = vdetail.data;
      // 修改下清晰度数组
      this.resolutions = vdetail.data.resolutions
        .sort((a, b) => {
          return b.resolution - a.resolution;
        })
        .map((item) => {
          return item.resolution;
        });
      // 视频路径
      let { data: vurl } = await getVideoUrl(id);
      this.videoUrl = vurl.urls[0];
      // 相关视频
      let { data: simiVideo } = await getRelatedAllvideo(id);
      this.videos = simiVideo.data;
      console.log(simiVideo);
    },
    // 获取视频评论
    async getVideoComment(id, offset, before) {
      this.showLoading = true;
      let { data: vcom } = await getCommentVideo(id, offset, before);
      this.showLoading = false;
      if (vcom.comments.length === 0) {
        this.showComment = true;
        return;
      }
      this.hotComment = vcom.hotComments || [];
      this.newComment = vcom.comments || [];
      this.total = vcom.total;
    },
    // 翻页
    currentChange(newPage) {
      let id = this.$route.query.id;
      if (this.total >= 5000) {
        let l = this.newComment[this.newComment.length - 1].time;
        this.getVideoComment(id, newPage, l);
      } else {
        this.getVideoComment(id, newPage);
      }
    },
    // 相关推荐跳转到详情
    recommendClick(id) {
      this.$router.push({
        path: "/play-video",
        query: {
          id,
        },
      });
    },
    // 跳转至作者详情
    authorClick(id) {
      console.log(id);
      return;
    },
  },
};
</script>

<style lang="less" scoped>
#play-video {
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .video-left {
    width: 780px;
    flex-grow: 0;
    flex-shrink: 0;
    .cm {
      margin-top: 80px;
      h2 {
        padding: 0px 40px;
        font-size: 24px;
        font-weight: 700;
      }
    }
  }
  .video-right {
    flex: 1;
    margin-left: 60px;
    h2 {
      margin: 20px 40px 0 40px;
      font-size: 20px;
      font-weight: 700;
    }
    .tuijian {
      width: 100%;
      padding: 20px 40px;
    }
  }
}
</style>