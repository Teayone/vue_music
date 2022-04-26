<template>
  <div class="cover-box" @click="bofang(item.id)">
    <span><i class="iconfont icon-bofangqi-bofang"></i></span>
    <img v-lazy="item.album.picUrl" :key="item.album.picUrl" />
  </div>
</template>

<script>
export default {
  name: "Cover",
  props: ["item"],
  methods: {
    bofang(id) {
      this.$emit("coverClick", id);
    },
  },
};
</script>

<style lang="less">
.cover-box {
  position: relative;
  width: 100px;
  height: 100px;
  cursor: pointer;
  span {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    line-height: 42px;
    border-radius: 50%;
    background: #fff;
    z-index: 2;
    i {
      margin-left: 2px;
      font-size: 25px;
      color: #ff7a9e;
    }
  }
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }
}
</style>
