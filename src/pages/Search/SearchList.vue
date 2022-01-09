<template>
  <div
    class="search-list"
    :style="{ height: listHeight + 'px' }"
    @click.stop="listClick"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SearchList",
  props: {
    listHeight: {
      type: Number,
      default: 90,
    },
  },
  methods: {
    listClick() {
      this.$emit("listClick");
    },
  },
};
</script>

<style lang="less" scoped>
.search-list {
  display: flex;
  align-items: center;

  cursor: pointer;
  padding: 0 10px;
  border-radius: 5px;
  &:nth-child(even) {
    background: #f9f9f9;
  }
  &:hover {
    background: #f0f1f2;
  }
}
</style>