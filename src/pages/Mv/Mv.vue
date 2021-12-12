<template>
  <div id="mv" ref="pageMV">
    <div class="mv-tab">
      <span
        @click="tabsClick(index)"
        v-for="(item, index) in tabs"
        :key="index"
        :class="{ active: index == curIndex }"
        >{{ item }}</span
      >
    </div>
    <!-- mv页面组件 -->
    <Cmv v-if="curIndex === 0" />
    <!-- 视频页面组件 -->
    <Cvideo v-else />
  </div>
</template>

<script>
import Cmv from "./pages/Cmv.vue";
import Cvideo from "./pages/Cvideo.vue";
export default {
  name: "Mv",
  components: { Cmv, Cvideo },
  data() {
    return {
      tabs: ["MV", "视频"],
      curIndex: 0,
    };
  },
  methods: {
    tabsClick(i) {
      this.curIndex = i;
    },
  },
};
</script>

<style lang="less" scoped>
#mv {
  padding: 40px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .mv-tab {
    span {
      display: inline-block;
      padding-bottom: 5px;
      margin: 0 15px;
      font-size: 22px;
      cursor: pointer;
      &:first-child {
        margin-left: 0;
      }
      &.active {
        font-size: 24px;
        font-weight: 700;
      }
      &.active::after {
        display: block;
        content: "";
        height: 3px;
        width: auto;
        margin-top: 3px;
        background: #ff7a9e;
      }
    }
  }
}
</style>