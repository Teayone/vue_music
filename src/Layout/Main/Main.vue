<template>
  <div id="main">
    <Aside />
    <!-- 路由 -->
    <router-view :key="key" v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import Aside from "../Aside/Aside.vue";
export default {
  name: "Main",
  components: { Aside },
  mounted() {
    this.$bus.$on("reload", () => {
      this.reload();
    });
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
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