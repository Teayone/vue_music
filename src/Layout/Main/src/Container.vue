<template>
  <div class="route-layout" v-if="isRouterAlive">
    <keep-alive :include="['Home', 'Playlist', 'Mv', 'Toplist']"
      ><router-view></router-view
    ></keep-alive>
  </div>
</template>

<script>
export default {
  name: "Container",
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    // 刷新视图
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    },
  },
  computed: {
    key() {
      return this.$route.name
        ? this.$route.name + +newDate()
        : this.$route + +new Date();
    },
  },
  watch: {
    "$store.state.login.loginState"(newVal) {
      this.reload();
    },
  },
};
</script>

<style lang="less">
.route-layout {
  flex: 1;
}
</style>
