<template>
  <div class="recom-mv">
    <span class="new-mv fs"
      >{{ TagsTitle }}<i class="iconfont icon-qianjin"></i
    ></span>
    <div class="right">
      <XTags :list="area" @itemClick="areaClick" v-if="showTags" />
    </div>
  </div>
</template>

<script>
import XTags from "@/components/common/Tags";
export default {
  name: "Tags",
  components: { XTags },
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
    };
  },
  methods: {
    areaClick(item) {
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
  .right {
    position: absolute;
    bottom: 15px;
    right: 0;
    white-space: nowrap;
  }
}
</style>
