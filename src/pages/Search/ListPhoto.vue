<template>
  <div
    class="list-photo"
    :style="{
      width: imgWidth + 'px',
      height: imgHeight + 'px',
      borderRadius: radius ? '50%' : borderRadius + 'px',
    }"
  >
    <img :src="imgSrc" alt="" />
  </div>
</template>

<script>
export default {
  name: "list-photo",
  props: {
    imgSrc: {
      type: String,
    },
    imgWidth: {
      type: Number,
      default: 70,
    },
    imgHeight: {
      type: Number,
      default: 70,
    },
    // 图片是否设置成圆形
    radius: {
      type: Boolean,
      default: false,
    },
    borderRadius: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="less" scoped>
.list-photo {
  margin-right: 20px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>