<template>
  <div class="btn-content">
    <div
      class="btn-base"
      v-for="(item, index) in labels"
      :key="index"
      :class="{ active: active == index }"
      @click="btnClick(item, index)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: "NewBtn",
  props: {
    active: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      labels: ["新歌速递", "新碟上架"],
    };
  },
  methods: {
    btnClick(item, index) {
      this.$emit("btnClick", item, index);
    },
  },
};
</script>

<style lang="less">
.btn-content {
  width: 300px;
  height: 40px;
  margin: 0 auto;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  border-radius: 20px;
  cursor: default;
  .btn-base {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    &.active {
      background: #bbbbbb;
      color: #fffff4;
    }
  }
}
</style>
