<template>
  <div class="mv-icon" @click.stop="toPlayMv">
    <span>MV<i class="sanjiao"></i></span>
  </div>
</template>

<script>
export default {
  name: "MvIcon",
  methods: {
    toPlayMv() {
      this.$emit("toPlayMv");
    },
  },
};
</script>

<style lang="less" scoped>
.mv-icon {
  display: flex;

  // padding: 0 2px;
  border: 1px solid #ff7a9e;
  font-size: 12px;
  color: #ff7a9e;
  margin-left: 5px;

  &:hover {
    opacity: 0.7;
  }
  span {
    display: inline-block;
    margin: 0 2px;
  }
  .sanjiao {
    display: inline-block;
    border-width: 4px;
    border-color: transparent transparent transparent #ff7a9e;
    border-style: solid;
    border-right: none;
    margin-left: 3px;
    vertical-align: 1.5px;
  }
}
</style>