<template>
  <div class="recommend-list">
    <div class="re-cover" @click="coverClick">
      <p>
        <i class="iconfont icon-bofangqi-bofang"></i>
        <span>{{ playCount | formatPlayCount }}</span>
      </p>
      <img :src="coverSrc" alt="" />
    </div>
    <div class="re-info">
      <h5 @click="titleClick">{{ vTitle }}</h5>
      <p>
        <i>by</i><span @click="authorClick">{{ author }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendList",
  props: {
    vTitle: {
      type: String,
      default: "",
    },
    author: {
      type: String,
    },
    coverSrc: {
      type: String,
      default: "",
    },
    playCount: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    titleClick() {
      this.$emit("recommendClick");
    },
    coverClick() {
      this.$emit("recommendClick");
    },
    authorClick() {
      this.$emit("authorClick");
    },
  },
};
</script>

<style lang="less" scoped>
.recommend-list {
  display: flex;
  margin: 20px 0;
  .re-cover {
    position: relative;
    width: 200px;
    height: 100px;
    cursor: pointer;
    p {
      position: absolute;
      width: 100%;
      height: 30px;
      text-align: right;
      line-height: 30px;
      // margin-right: 10px;
      padding-right: 10px;
      color: #fff;
      font-size: 14px;
      background-image: linear-gradient(
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.1),
        rgba(0, 0, 0, 0)
      );
      top: 0;
      right: 0;
      z-index: 1;
    }
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
  .re-info {
    position: relative;
    margin-left: 20px;
    margin-top: 10px;
    flex: 1;
    h5 {
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    p {
      position: absolute;
      width: 100%;
      bottom: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      i {
        font-size: 12px;
        color: #ccc;
        margin-right: 10px;
      }
      span {
        font-size: 14px;
        cursor: pointer;
        color: #999;
      }
    }
  }
}
</style>