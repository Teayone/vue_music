<template>
  <div id="c-video">
    <div class="need-login" v-if="needLogin">
      <h2>登陆查看全部视频</h2>
    </div>
    <div class="yi-loign" v-if="showVideo">
      <CvideoTags @allClick="allClick" @groupClick="groupClick" />
      <List v-if="videoList.length !== 0">
        <VideoList
          v-for="(item, index) in videoList"
          :key="index"
          :PlayCount="item.data.praisedCount"
          :nicName="item.data.creator && item.data.creator.nickname"
          :videoName="item.data.title"
          :imageSrc="item.data.coverUrl"
          :dt="item.data.durationms / 1000"
          @playClick="playClick(item.data.vid)"
        />
      </List>
      <div
        style="
          text-align: center;
          font-size: 22px;
          font-weight: 700;
          margin-top: 50px;
        "
        v-if="kongVideo"
      >
        暂无推荐视频，请稍后再试
      </div>
      <LoadingMove v-show="isShow" />
    </div>
  </div>
</template>

<script>
import CvideoTags from "../com/CvideoTags.vue";
import { getVideoTimelineAll, getVideoGroup } from "@/network/api";
import VideoList from "@/components/content/VideoList/VideoList.vue";
import List from "@/components/common/List/List.vue";
import LoadingMove from "@/components/common/LoadingMove/LoadingMove.vue";
import Loading from "@/components/common/Xvideo/children/Loading/Loading.vue";
export default {
  name: "Cvideo",
  components: { CvideoTags, VideoList, List, LoadingMove, Loading },
  data() {
    return {
      needLogin: false, // 是否显示需要登陆
      videoList: [], // 视频数据
      index: -1, // 视频翻页
      isShow: false, // 是否显示加载动画
      group: "全部视频", // 默认显示的是全部视频
      groupId: 0, // 视频标签或分类 ID
      kongVideo: false, // 是否显示暂无视频
      showVideo: false,
      timeout: null, // 节流开关
    };
  },
  created() {
    this.getVideoData(); // 默认请求全部视频
  },
  mounted() {
    let i = this.$parent.$refs.pageMV;
    if (this.needLogin) return;
    setTimeout(() => {
      i.addEventListener("scroll", this.throttle(this.scrollData, 80, i));
    }, 200);
  },
  methods: {
    // 全部视频
    async getVideoData() {
      try {
        for (let i = 0; i <= 4; i++) {
          this.index += 1;
          this.isShow = true;
          let { data: res } = await getVideoTimelineAll(this.index);
          this.isShow = false;
          this.showVideo = true; // 请求成功显示视频列表
          this.videoList.push(...res.datas);
        }
      } catch (error) {
        console.log(error);
        // 请求失败显示登录
        this.needLogin = true;
      }
    },
    // 分类或标签对应的视频列表
    async getVideoGroupData(id) {
      try {
        for (let i = 0; i <= 4; i++) {
          this.index += 1;
          this.isShow = true; // 显示加载中
          let { data: res } = await getVideoGroup(id, this.index);
          this.isShow = false; // 关闭加载中
          if (res.datas.length == 0) {
            this.kongVideo = true;
            return;
          } else {
            this.videoList.push(...res.datas);
          }
        }
      } catch (error) {
        this.needLogin = true;
      }
    },
    // 请求全部视频
    allClick(value) {
      if (this.group === value) {
        return;
      } else {
        this.index = -1;
        this.videoList = [];
        this.group = value;
        this.getVideoData();
      }
    },
    // 请求分类或标签视频
    groupClick(id, value) {
      if (this.group === value) {
        return;
      } else {
        this.index = -1;
        this.videoList = [];
        this.groupId = id;
        this.group = value;
        this.getVideoGroupData(id);
      }
    },
    // 跳转至视频详情
    playClick(id) {
      this.$router.push({
        path: "/play-video",
        query: {
          id,
        },
      });
    },
    scrollData(i) {
      let sh = i.scrollHeight;
      // 滚动到底部时触发
      if (i.scrollTop + i.offsetHeight == sh) {
        this.index += 1; //翻页
        this.isShow = true; // 滚动到底部显示加载中
        if (this.group === "全部视频") {
          // 如果当前是全部视频
          getVideoTimelineAll(this.index).then((v) => {
            this.isShow = false; // 请求完毕关闭加载中
            this.videoList.push(...v.data.datas);
          });
        } else {
          getVideoGroup(this.groupId, this.index).then(
            //反之就是标签或分类对应的视频
            (v) => {
              this.isShow = false; // 请求完毕关闭加载中
              this.videoList.push(...v.data.datas);
            }
          );
        }
      }
    },
    throttle(func, delay, el) {
      let time = null;
      return function () {
        if (time !== null) return;
        time = setTimeout(() => {
          func.call(this, el);
          time = null;
        }, delay);
      };
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
