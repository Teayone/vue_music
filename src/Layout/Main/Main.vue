<template>
  <div id="main">
    <Aside />
    <!-- 路由 -->
    <router-view></router-view>
  </div>
</template>

<script>
import Aside from "../Aside/Aside.vue";
export default {
  name: "Main",
  components: { Aside },
};
</script>

<style scoped>
#main {
  display: flex;
  width: 100%;
  height: calc(100vh - 160px);
  /* background: skyblue; */
}
</style>