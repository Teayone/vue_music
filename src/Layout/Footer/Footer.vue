<template>
  <div id="footer">
    <Player />
  </div>
</template>

<script>
import Player from "../../components/common/Player/Player.vue";
export default {
  name: "Footer",
  components: { Player },
};
</script>

<style lang="less" scoped>
#footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  height: 80px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.63);
}
</style>
