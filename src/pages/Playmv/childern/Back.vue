<template>
  <h2 class="back" @click="back">
    <i class="iconfont icon-fanhui"></i>{{ info }}详情
  </h2>
</template>

<script>
export default {
  name: "Back",
  props: ["info"],
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>
<style lang="less" scoped>
.back {
  display: inline-block;
  margin: 20px 0;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  padding: 0px 40px;
  i {
    font-size: 22px;
    font-weight: 700;
  }
}
</style>