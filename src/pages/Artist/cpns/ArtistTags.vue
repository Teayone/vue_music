<template>
  <div class="artist-tags" :style="{ width }">
    <p>{{ label }}：</p>
    <Tags :list="list" @itemClick="itemClick" />
  </div>
</template>

<script>
import Tags from "@/components/common/Tags";
export default {
  name: "ArtistTags",
  components: { Tags },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: "语法",
    },
    width: {
      type: String,
      default: "500px",
    },
  },
  methods: {
    itemClick(item) {
      this.$emit("itemClick", item);
    },
  },
};
</script>

<style lang="less">
.artist-tags {
  position: relative;
  white-space: nowrap;
  padding: 10px 30px;
  display: flex;
}
</style>
