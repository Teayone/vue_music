<template>
  <div id="c-video">
    <div class="need-login" v-if="needLogin">
      <h2>登陆查看全部视频</h2>
    </div>
    <div class="yi-loign" v-else>
      <CvideoTags />
      <List v-if="videoList.length !== 0">
        <VideoList
          v-for="(item, index) in videoList"
          :key="index"
          :PlayCount="item.data.praisedCount"
          :nicName="item.data.creator && item.data.creator.nickname"
          :videoName="item.data.title"
          :imageSrc="item.data.coverUrl"
          :dt="item.data.durationms / 1000"
        />
      </List>
    </div>
  </div>
</template>

<script>
import CvideoTags from "../com/CvideoTags.vue";
import { getVideoTimelineAll } from "@/network/api";
import VideoList from "@/components/content/VideoList/VideoList.vue";
import List from "@/components/common/List/List.vue";
export default {
  name: "Cvideo",
  components: { CvideoTags, VideoList, List },
  data() {
    return {
      needLogin: false, // 是否显示需要登陆
      videoList: [],
      index: -1,
    };
  },
  created() {
    this.getVideoData(); // 默认请求全部视频
  },
  mounted() {
    let i = this.$parent.$refs.pageMV;
    i.addEventListener("scroll", () => {
      console.log(123);
    });
  },
  methods: {
    getVideoData() {
      for (let i = 0; i <= 4; i++) {
        this.index += 1;
        getVideoTimelineAll(this.index).then(
          (v) => {
            this.videoList.push(...v.data.datas);
          },
          (e) => {
            this.needLogin = true;
          }
        );
      }
    },
  },
};
</script>
<style lang="less" scoped>
.need-login {
  text-align: center;
  h2 {
    font-size: 24px;
    font-weight: 700;
  }
}
.yi-login {
  width: 100%;
}
</style>