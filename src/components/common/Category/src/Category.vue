<template>
  <ul class="category">
    <li
      :class="{ active: curIndex === index }"
      v-for="(item, index) in catList"
      :key="index"
      @click="itemClick(item, index)"
    >
      {{ exp ? item[exp] : item }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "Category",
  props: {
    catList: {
      type: Array,
      default: () => [],
    },
    exp: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      curIndex: 0,
    };
  },
  methods: {
    itemClick(item, index) {
      if (this.curIndex === index) return;
      this.curIndex = index;
      this.$emit("itemClick", item, index);
    },
  },
};
</script>

<style lang="less">
.category {
  display: flex;
  li {
    padding: 5px 10px;
    margin: 0 5px;
    cursor: pointer;
    white-space: nowrap;
    &.active {
      font-weight: 700;
    }
  }
}
</style>
