<template>
  <div class="alert" v-if="title !== ''">
    <div class="container">
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="less" scoped>
.alert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  .container {
    color: #fff;
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    animation: ani 0.4s;
    font-size: 14px;
  }
}
@keyframes ani {
  10% {
    transform: translateX(-10px);
  }
  30% {
    transform: translateX(10px);
  }
  60% {
    transform: translateX(-10px);
  }
  90% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
