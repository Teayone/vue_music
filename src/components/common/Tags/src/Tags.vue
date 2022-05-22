<template>
  <ul>
    <li v-for="(item, index) in list" :key="index" :class="{ center: center }">
      <span
        :class="{
          active:
            route && label
              ? label === '语种'
                ? item.type == area
                : label === '分类'
                ? item.type == type
                : label === '筛选'
                ? item.type == initial
                : false
              : index === curIndex,
        }"
        @click="itemClick(item, index)"
        >{{ exp ? item[exp] : item }}</span
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
    label: {
      type: String,
      default: "",
    },
    route: {
      type: Boolean,
      default: false,
    },
    queryValue: {
      type: Number,
      default: -1,
    },
    exp: {
      type: String,
      default: "",
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
    center: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      curIndex: 0,
    };
  },
  methods: {
    itemClick(item, index) {
      if (this.route) {
        switch (this.label) {
          case "语种":
            if (this.area == item.type) return;
            break;
          case "分类":
            if (this.type == item.type) return;
            break;
          case "筛选":
            if (this.initial == item.type) return;
            break;
          default:
            break;
        }
      } else {
        if (this.curIndex === index) {
          return;
        } else {
          this.curIndex = index;
        }
      }
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
  align-items: center;
  li {
    display: flex;
    align-items: center;
    height: 30px;
    // padding: 0 0 8px 0;
    &.center {
      display: flex;
      align-items: center;
    }
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
