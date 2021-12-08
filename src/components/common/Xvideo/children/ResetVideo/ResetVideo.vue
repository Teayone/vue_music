<template>
  <!-- 视频结束时显示重播按钮 -->
  <div class="video-end-bg">
    <span><i class="iconfont icon-replay" @click.stop="playVideo"></i></span>
  </div>
</template>

<script>
export default {
  name: "ResetVideo",
  methods: {
    playVideo() {
      this.$emit("resetVideo");
    },
  },
};
</script>

<style lang="less" scoped>
.video-end-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
  span {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    transform: translate(-50%, -50%);
    i {
      font-size: 40px;
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      &:hover {
        color: rgba(0, 0, 0, 0.7);
      }
    }
  }
}
</style>