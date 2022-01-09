<template>
  <div class="search-song">
    <div class="search-song-result">
      <MyButton
        :btnWidth="120"
        :btnHeight="35"
        :radius="30"
        pink
        @btnClick="allPlay"
      >
        <i class="iconfont icon-bofangqi-bofang"></i>
        播放全部
      </MyButton>
      <Songlist :songs="songs" />
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/common/MyButton";
import Songlist from "@/components/common/Songlist/Songlist.vue";
import { allPlay } from "@/mixin/mixin";
export default {
  name: "SearchSong",
  components: { MyButton, Songlist },
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mixins: [allPlay],
};
</script>

<style lang="less" scoped>
</style>