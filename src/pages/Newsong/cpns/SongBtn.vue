<template>
  <div class="song-btn">
    <MyButton
      :pink="title === '播放全部' ? true : false"
      :radius="20"
      :btnWidth="150"
      :btnHeight="34"
      v-for="(title, index) in titles"
      :key="index"
      @btnClick="btnClick(title)"
      >{{ title }}</MyButton
    >
  </div>
</template>

<script>
import MyButton from "@/components/common/MyButton";
export default {
  components: { MyButton },
  data() {
    return {
      titles: ["播放全部", "收藏全部"],
    };
  },
  methods: {
    btnClick(title) {
      switch (title) {
        case "播放全部":
          this.$emit("playClick");
          break;
        case "收藏全部":
          this.$emit("collClick");
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="less">
.song-btn {
  display: flex;
  justify-content: space-between;
  width: 320px;
}
</style>
