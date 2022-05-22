<template>
  <div id="cvideo-tags">
    <div class="tips-title">
      <span class="all-video" @click="isShow = !isShow"
        >{{ lable }} <i class="iconfont icon-qianjin"></i>
      </span>
      <!-- 弹框 -->
      <div class="tips" v-show="isShow">
        <h2>
          <span @click="allClick" :class="{ active: lable === '全部视频' }"
            >全部视频</span
          >
        </h2>
        <div class="all-tags">
          <span
            :class="{ active: item.name === lable }"
            v-for="item in videoGroupList"
            :key="item.id"
            @click="lableClick(item.id, item.name)"
            >{{ item.name }}</span
          >
        </div>
      </div>
    </div>
    <div class="tags-right">
      <span
        v-for="item in VideoCategoryList"
        :key="item.id"
        :class="{ active: item.name === lable }"
        @click="categoryClick(item.id, item.name)"
        >{{ item.name }}</span
      >
    </div>
  </div>
</template>

<script>
import { getVideoGroupList, getVideoCategoryList } from "@/network/api";
export default {
  name: "CvideoTags",
  data() {
    return {
      // 视频标签
      videoGroupList: [],
      // 视频分类
      VideoCategoryList: [],
      isShow: false, // 是否显示标签框
      lable: "全部视频",
    };
  },
  created() {
    this.getVideoData();
  },
  methods: {
    async getVideoData() {
      try {
        let { data: vgList } = await getVideoGroupList();
        this.videoGroupList = vgList.data;
        let { data: vcList } = await getVideoCategoryList();
        this.VideoCategoryList = vcList.data;
      } catch (error) {}
    },
    allClick() {
      this.isShow = false;
      this.lable = "全部视频";
      this.$emit("allClick", "全部视频"); // 需请求全部视频
    },
    lableClick(id, name) {
      this.isShow = false;
      this.lable = name;
      this.$emit("groupClick", id, name);
    },
    categoryClick(id, name) {
      this.lable = name;
      this.$emit("groupClick", id, name);
    },
  },
};
</script>

<style lang="less" scoped>
#cvideo-tags {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0;
  width: 100%;
  z-index: 3;
  .tips-title {
    position: relative;
    .all-video {
      padding: 7px 6px 7px 10px;
      border: 1px solid #ccc;
      border-radius: 30px;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        background: #f4f4f4;
      }
      i {
        vertical-align: -1px;
      }
    }
    .tips {
      position: absolute;
      width: 600px;
      height: 400px;
      overflow-y: auto;
      background: #fff;
      top: 30px;
      border-radius: 10px;
      box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);
      padding: 20px;
      &::-webkit-scrollbar {
        width: 0 !important;
      }
      h2 {
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
        span {
          display: inline-block;
          font-size: 12px;
          padding: 7px 8px;
          border-radius: 30px;
          cursor: pointer;
          &:hover {
            color: #ff7a9e;
          }
          &.active {
            background: #fcebeb;
            color: #ec4141;
          }
        }
      }
      .all-tags {
        width: 100%;
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        span {
          display: inline-block;
          width: 20%;
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-size: 12px;
          border-radius: 30px;
          margin-bottom: 30px;
          cursor: pointer;
          color: #373737;
          &:hover {
            color: #ff7a9e;
          }
          &.active {
            background: #fcebeb;
            color: #ec4141;
          }
        }
      }
    }
  }
  .tags-right {
    font-size: 12px;
    span {
      padding: 5px 10px;
      border-radius: 30px;
      margin: 0 5px;
      cursor: default;
      color: #373737;

      &:hover {
        color: #000;
      }
      &.active {
        background: #fcebeb;
        color: #ec4141;
      }
    }
  }
}
</style>
