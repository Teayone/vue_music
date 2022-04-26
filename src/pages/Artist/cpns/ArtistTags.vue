<template>
  <div class="artist-tags" :style="{ width }">
    <p>{{ label }}：</p>
    <Tags
      :list="list"
      :exp="exp"
      @itemClick="itemClick"
      :route="true"
      :type="type"
      :area="area"
      :initial="initial"
      :label="label"
    />
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
    exp: {
      type: String,
      default: "name",
    },
    type: {
      type: [Number, String],
      default: -1,
    },
    area: {
      type: [Number, String],
      default: -1,
    },
    initial: {
      type: [Number, String],
      default: -1,
    },
  },
  methods: {
    itemClick(item) {
      this.$emit("itemClick", item, this.label);
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
