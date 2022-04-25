<template>
  <div class="artist-content">
    <div class="artist-singer">
      <div class="artist-avatar">
        <img src="../../../assets/img/bz7.jpg" alt="" />
      </div>
      <div class="artist-name">
        <span>周杰伦</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.artist-content {
  display: flex;
  flex-wrap: wrap;
  .artist-singer {
    width: 20%;
    padding: 15px;
    .artist-avatar {
      width: 100%;
      height: 160px;
      border-radius: 10px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .artist-name {
      margin-top: 10px;
    }
  }
}
</style>
