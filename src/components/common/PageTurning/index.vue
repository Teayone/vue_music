<template>
  <div class="fanye" v-if="total > pageSize">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "PageTurning",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    currentChange(newPage) {
      this.$emit("currentChange", newPage);
    },
  },
};
</script>
<style lang="less" scoped>
.fanye {
  text-align: center;
  margin-top: 30px;
  ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #ff7a9e;
  }
}
</style>