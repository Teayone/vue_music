<template>
  <!-- 按钮 -->
  <ul class="mv-btn">
    <li>
      <i class="iconfont icon-dianzan"></i>
      赞<span v-if="praisedCount !== 0">({{ praisedCount }})</span>
    </li>
    <li>
      <i class="iconfont icon-shoucang1"></i>
      收藏<span v-if="subCount !== 0">({{ subCount }})</span>
    </li>
    <li>
      <i class="iconfont icon-fenxiang"></i>
      分享<span v-if="shareCount !== 0">({{ shareCount }})</span>
    </li>
    <li>
      <i class="iconfont icon-xiazai"></i>
      下载
    </li>
  </ul>
</template>

<script>
export default {
  name: "Btns",
  props: {
    praisedCount: {
      type: Number,
      default: 0,
    },
    subCount: {
      type: Number,
      default: 0,
    },
    shareCount: {
      type: Number,
      default: 0,
    },
  },
};
</script>
<style lang="less" scoped>
.mv-btn {
  padding: 0px 40px;
  display: flex;
  margin-top: 20px;
  li {
    padding: 10px 30px;
    border: 1px solid #ccc;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    margin-right: 10px;

    &:hover {
      background: #f2f2f2;
    }
  }
}
</style>