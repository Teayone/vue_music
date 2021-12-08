<template>
  <!-- mv播放页 -->
  <div id="play-mv">
    我是播放mv组件
    <Xvideo />
  </div>
</template>

<script>
import Xvideo from "../../components/common/Xvideo/Xvideo.vue";
export default {
  name: "Playmv",
  components: { Xvideo },
};
</script>

<style lang="less" scoped>
</style>