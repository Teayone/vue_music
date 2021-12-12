<template>
  <!-- 全屏按钮 -->
  <div class="full-screen" @click="quanping">
    <i class="iconfont icon-quanping"></i>
  </div>
</template>

<script>
export default {
  name: "VideoFullScreen",
  methods: {
    quanping() {
      this.$emit("fullScreen");
    },
  },
};
</script>

<style lang="less" scoped>
// 全屏按钮
.full-screen {
  cursor: pointer;
  position: absolute;
  right: 8px;
  // background-color: pink;
  width: 40px;
  height: 30px;
  text-align: center;
  line-height: 30px;

  i {
    font-size: 14px;
  }
}
</style>