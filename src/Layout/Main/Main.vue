<template>
  <div id="main">
    <Aside />

    <div class="route-layout" v-if="isRouterAlive">
      <keep-alive><router-view :key="key"></router-view></keep-alive>
    </div>

    <!-- 歌曲详情页 -->
    <transition
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__fadeInUpBig"
      leave-active-class="animate__fadeOutDownBig"
      v-if="showSongdetail"
    >
      <Songdetail />
    </transition>
  </div>
</template>

<script>
import "animate.css";
import Aside from "../Aside/Aside.vue";
import Songdetail from "@/components/content/Songdetail/Songdetail.vue";
export default {
  name: "Main",
  components: { Aside, Songdetail },
  data() {
    return {
      isRouterAlive: true,
      showSongdetail: false, // 是否显示路由
    };
  },
  mounted() {
    this.$bus.$on("reload", () => {
      this.reload();
    });
    this.$bus.$on("showSongDetail", () => {
      this.showSongdetail = !this.showSongdetail;
    });
  },
  methods: {
    // 刷新视图
    reload() {
      console.log("我执行了");
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

<style scoped lang="less">
#main {
  position: relative;
  display: flex;
  width: 100%;
  height: calc(100vh - 160px);
  .route-layout {
    flex: 1;
  }
}
</style>