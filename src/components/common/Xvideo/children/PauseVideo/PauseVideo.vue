<template>
  <!-- 暂停时，视频框中间的暂停按钮 -->
  <div class="pause-bg" @click="playVideo">
    <span><i class="iconfont icon-bofangqi-bofang"></i></span>
  </div>
</template>

<script>
export default {
  name: "PauseVideo",
  methods: {
    playVideo() {
      this.$emit("playVideo");
    },
  },
};
</script>
<style lang="less" scoped>
.pause-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
  span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    text-align: center;
    line-height: 48px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    cursor: pointer;
    &:hover {
      border: 2px solid rgba(255, 255, 255, 0.6);
      i {
        color: rgba(255, 255, 255, 0.6);
      }
    }
    i {
      font-size: 40px;
      margin-left: 5px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>