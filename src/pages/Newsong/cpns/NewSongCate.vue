<template>
  <div class="new-song-cate" :style="{ height }">
    <Category :catList="list" @itemClick="itemClick" />
  </div>
</template>

<script>
import Category from "@/components/common/Category";
export default {
  name: "NewSongCate",
  components: { Category },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    height: {
      type: Number,
      default: 40,
    },
  },
  methods: {
    itemClick(item, index) {
      this.$emit("itemClick", item, index);
    },
  },
};
</script>

<style lang="less">
.new-song-cate {
  height: 40px;
  display: flex;
  align-items: center;
}
</style>
