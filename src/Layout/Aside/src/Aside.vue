<template>
  <div id="aside">
    <Menu />
    <!-- 登陆后我创建的歌单 -->
    <MyCreateList v-if="$store.state.login.loginState" />
  </div>
</template>

<script>
import Menu from "./Menu.vue";
import MyCreateList from "./MyCreateList.vue";
export default {
  name: "Aside",
  components: { MyCreateList, Menu },
};
</script>

<style lang="less" scoped>
#aside {
  width: 360px;
  height: 100%;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: #fff;
  border-right: 1px solid #ccc;
  overflow-y: auto;
}
</style>
