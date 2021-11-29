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
  height: 80px;
  width: 100%;
  // background: #f5f5f5;
  background: url("../../assets/img/bg1.jpg");
  background-size: 100% 100%;
  border-top: 1px solid #f5f5f5;
}
</style>