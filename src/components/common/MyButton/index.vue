<template>
  <button
    :class="['my-button', { 'btn-pink': pink }]"
    :style="{
      width: btnWidth + 'px',
      height: btnHeight + 'px',
      borderRadius: radius + 'px',
    }"
    @click="btnClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "MyButton",
  props: {
    btnWidth: {
      type: Number,
    },
    btnHeight: {
      type: Number,
    },
    pink: {
      type: Boolean,
      default: false,
    },
    radius: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    btnClick() {
      this.$emit("btnClick");
    },
  },
};
</script>

<style lang="less" scoped>
.my-button {
  border: 1px solid #d8d8d8;
  color: #373737;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: #f2f2f2;
  }
  i {
    margin-right: 2px;
    font-size: 20px;
  }
  &.btn-pink {
    background: #ff7a9e;
    color: #fff;
    border-color: #ff7a9e;
    &:hover {
      background: #de688a;
    }
  }
}
</style>