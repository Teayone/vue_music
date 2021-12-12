<template>
  <div class="recom-mv">
    <span class="new-mv fs"
      >{{ TagsTitle }}<i class="iconfont icon-qianjin"></i
    ></span>
    <ul v-if="showTags">
      <li v-for="(item, index) in area" :key="index">
        <span :class="{ active: item == curItem }" @click="areaClick(item)">{{
          item
        }}</span>
        <i>|</i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Tags",
  props: {
    showTags: {
      type: Boolean,
      default: false,
    },
    TagsTitle: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      area: ["内地", "港台", "欧美", "日本", "韩国"],
      curItem: "内地", // 默认全部不显示任何样式
    };
  },
  methods: {
    areaClick(item) {
      this.curItem = item;
      this.$emit("areaClick", item);
    },
  },
};
</script>

<style lang="less" scoped>
.recom-mv {
  position: relative;
  display: flex;
  padding: 10px 0;
  // align-items: center;
  margin-top: 10px;
  .fs {
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    i {
      font-size: 22px;
      font-weight: 700;
      margin-left: 5px;
      vertical-align: -1px;
    }
  }
  ul {
    display: flex;
    position: absolute;
    bottom: 8px;
    right: 0;
    li {
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
}
</style>