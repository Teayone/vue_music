<template>
  <div id="main">
    <Aside />
    <!-- 路由 -->
    <router-view :key="key" v-if="isRouterAlive"></router-view>

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
      song: null, // 正在播放放的歌曲数据
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
  position: relative;
  display: flex;
  width: 100%;
  height: calc(100vh - 160px);
}
</style>