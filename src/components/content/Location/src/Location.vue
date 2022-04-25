<template>
  <div class="location-btn">
    <i class="iconfont icon-fanhui" @click="go(-1)"></i>
    <i class="iconfont icon-qianjin" @click="go(1)"></i>
  </div>
</template>

<script>
export default {
  name: "Location",
  methods: {
    go(l) {
      this.$router.go(l);
    },
  },
};
</script>

<style lang="less">
.location-btn {
  display: flex;
  height: 40px;
  margin-top: 20px;
  i {
    display: block;
    width: 20px;
    height: 20px;
    background: #eb7091;
    font-size: 14px;
    text-align: center;
    line-height: 20px;
    margin: 0 10px;
    color: #ccc;
    margin-top: 10px;
    border-radius: 50%;
    cursor: pointer;
    &.active {
      color: #fff;
    }
  }
}
</style>
