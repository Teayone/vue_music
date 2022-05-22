<template>
  <ul class="user-container">
    <li class="container-item">我的主页</li>
    <li class="container-item" @click.stop="itemClick('out')">退出登录</li>
  </ul>
</template>

<script>
export default {
  name: "UserContainer",
  methods: {
    itemClick(type) {
      this.$emit("itemClick", type);
    },
  },
};
</script>

<style lang="less" scope>
.user-container {
  position: absolute;
  left: -50%;
  top: 60px;
  white-space: nowrap;
  font-size: 14px;
  background: #fff;
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.5);
  width: 200px;
  border-radius: 5px;
  overflow: hidden;
  .container-item {
    padding: 10px 5px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    &:last-child {
      border: none;
    }
    &:hover {
      background: #f1f2f3;
    }
  }
}
</style>
