<template>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      <span
        :class="{ active: index == curIndex }"
        @click="itemClick(item, index)"
        >{{ item }}</span
      >
      <i>|</i>
    </li>
  </ul>
</template>

<script>
export default {
  name: "XTags",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      curIndex: 0,
    };
  },
  methods: {
    itemClick(item, index) {
      this.curIndex = index;
      this.$emit("itemClick", item);
    },
  },
};
</script>

<style lang="less" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  white-space: nowrap;
  li {
    margin-bottom: 15px;
    span {
      font-size: 14px;
      padding: 4px 12px;
      border-radius: 30px;
      color: #9f9f9f;
      cursor: pointer;
      &:hover {
        color: #373737;
      }
      &.active {
        background: #fcebeb;
        color: #ec4141;
      }
    }
    i {
      margin: 0 10px;
      font-size: 14px;
      vertical-align: 1px;
      color: #ccc;
      cursor: default;
    }
    &:last-child {
      i {
        display: none;
      }
    }
  }
}
</style>
