<template>
  <div id="title">
    <h2>
      <span @click="RouterLink"
        >{{ describe }}<i class="iconfont icon-qianjin"></i
      ></span>
    </h2>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: ["describe", "link"],
  methods: {
    RouterLink() {
      this.$router.push({
        path: this.link,
      });
    },
  },
};
</script>

<style lang="less" scoped>
#title {
  h2 {
    margin-top: 40px;
    span {
      font-size: 24px;
      font-weight: 900;
      cursor: pointer;
      i {
        font-size: 22px;
      }
    }
  }
}
</style>