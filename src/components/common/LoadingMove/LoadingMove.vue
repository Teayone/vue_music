<template>
  <!-- 加载动画 -->
  <div class="loading">
    <div class="loading-img">
      <img src="@/assets/img/loading.jpg" alt="" />
    </div>
    <!-- 加载文字 -->
    <p class="loading-text">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: "LoadingMove",
  props: {
    title: {
      type: String,
      default: "加载中",
    },
  },
};
</script>

<style scoped>
/* 加载动画 */
.loading {
  width: 100px;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading > .loading-img {
  width: 30px;
  height: 30px;
  animation: loading 2s linear forwards infinite;
}
.loading > .loading-img > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.loading > .loading-text {
  margin-left: 5px;
  font-size: 12px;
  color: #999;
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>