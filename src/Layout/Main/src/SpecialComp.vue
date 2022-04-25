<template>
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
</template>

<script>
import "animate.css";
import Songdetail from "@/components/content/Songdetail/Songdetail.vue";
export default {
  name: "SpecialComp",
  components: { Songdetail },
  data() {
    return {
      showSongdetail: false,
    };
  },
  mounted() {
    this.$bus.$on("showSongDetail", () => {
      this.showSongdetail = !this.showSongdetail;
    });
  },
};
</script>
