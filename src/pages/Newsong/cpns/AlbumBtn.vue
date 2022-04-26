<template>
  <div class="album-btn">
    <Tags :list="list" @itemClick="itemClick" />
  </div>
</template>

<script>
import Tags from "@/components/common/Tags";
export default {
  name: "AlbumBtn",
  components: { Tags },
  data() {
    return {
      list: ["推荐", "全部"],
    };
  },
  methods: {
    itemClick(item) {
      this.$emit("itemClick", item);
    },
  },
};
</script>

<style></style>
