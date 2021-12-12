<template>
  <div id="video-author">
    <div class="video-author-img">
      <img :src="imageSrc" alt="" />
      <span>{{ authorName }}</span>
    </div>
    <div class="video-info">
      <h5 class="v-name">
        {{ videoName }}
        <i
          v-if="info !== null"
          @click="isShow = !isShow"
          :class="
            isShow === false
              ? 'iconfont icon-xiasanjiaoxing'
              : 'iconfont icon-shangsanjiaoxing'
          "
        ></i>
      </h5>
      <p>
        <span class="v-publish">发布：{{ publishTime | formatDate }}</span
        ><span class="v-play">播放：{{ playCount }}次</span>
      </p>
      <ul class="v-lable-list">
        <li v-for="item in lableList" :key="item.id">{{ item.name }}</li>
      </ul>
      <span class="v-jianjie" v-show="isShow">{{ info }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Author",
  props: {
    imageSrc: {
      type: String,
      default: "",
    },
    authorName: {
      type: String,
      default: "",
    },
    videoName: {
      type: String,
      default: "",
    },
    publishTime: {
      type: Number,
      default: 0,
    },
    playCount: {
      type: Number,
      default: 0,
    },
    lableList: {
      type: Array,
      default() {
        return [];
      },
    },
    info: {
      type: String,
      default: "",
    },
  },
  filters: {
    formatDate(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      return y + "年" + m + "月" + d + "日";
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
};
</script>
<style lang="less" scoped>
#video-author {
  width: 100%;
  padding: 20px 40px;
  .video-author-img {
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      cursor: pointer;
    }
    span {
      max-width: 500px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-left: 10px;
      color: #373737;
      cursor: pointer;
      &:hover {
        color: #000;
      }
    }
  }
  .video-info {
    margin-top: 30px;

    .v-name {
      display: flex;
      align-items: center;
      width: 100%;
      font-size: 24px;
      font-weight: 700;
      line-height: 30px;
      i {
        font-size: 22px;
        margin-left: 10px;
      }
    }
    p {
      margin-top: 15px;
      font-size: 14px;
      font-size: 14px;
      color: #cfcfcf;
      .v-publish {
        margin-right: 15px;
      }
    }
    .v-lable-list {
      margin-top: 20px;
      display: flex;
      li {
        margin: 0 10px;
        padding: 4px 6px;
        background: #f7f7f7;
        border-radius: 5px;
        font-size: 12px;
        color: #363636;
        cursor: pointer;
        &:first-child {
          margin-left: 0;
        }
      }
    }
    .v-jianjie {
      display: block;
      font-size: 12px;
      margin-top: 20px;
    }
  }
}
</style>