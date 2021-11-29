<template>
  <div id="playlist-item">
    <!-- item歌单 -->
    <div class="img-box">
      <div>
        <i class="iconfont icon-bofangqi-bofang"></i>
        {{ playCount | formatPlayCount }}
      </div>
      <slot></slot>
      <p @click="playSong"><i class="iconfont icon-bofangqi-bofang"></i></p>
    </div>
    <div class="info-box">
      <p>{{ describe }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlaylistItem",
  props: ["playCount", "describe"],
  methods: {
    // 歌单封面的播放按钮
    playSong() {
      this.$emit("playSong");
    },
  },
};
</script>

<style lang="less" scoped>
#playlist-item {
  width: 120px;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-right: 15px;
  .img-box {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    &:hover {
      p {
        opacity: 1;
      }
    }
    div {
      position: absolute;
      top: 5px;
      right: 5px;
      color: #e8f8f7;
      z-index: 2;
      font-size: 12px;
      i {
        vertical-align: middle;
        position: relative;
        top: -1px;
        left: 5px;
        font-size: 12px;
      }
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    p {
      position: absolute;
      bottom: 8px;
      right: 8px;
      width: 30px;
      height: 30px;
      background: #fff;
      border-radius: 50%;
      z-index: 2;
      text-align: center;
      line-height: 30px;
      transition: all 0.5s;
      opacity: 0;
      i {
        margin-left: 2px;
        font-size: 18px;
        color: #ff7a9e;
      }
    }
  }
  .info-box {
    margin-top: 5px;
    font-size: 14px;
    line-height: 18px;
    cursor: pointer;
    p {
      color: #373737;
      &:hover {
        color: #000000;
      }
    }
  }
}
</style>