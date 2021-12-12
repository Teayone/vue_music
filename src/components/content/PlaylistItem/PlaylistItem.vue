<template>
  <div id="playlist-item" :style="{ width: itemWidth + 'px' }">
    <!-- item歌单 -->
    <div class="img-box" @click.stop="toPlaylistDetail">
      <div class="playcount-icon">
        <span class="icon-bg">
          <span>
            <i class="iconfont icon-bofangqi-bofang"></i
            >{{ playCount | formatPlayCount }}
          </span>
        </span>
      </div>
      <slot></slot>
      <p @click.stop="playSong">
        <i class="iconfont icon-bofangqi-bofang"></i>
      </p>
    </div>
    <div class="info-box" @click.stop="toPlaylistDetail">
      <p>{{ describe }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlaylistItem",
  props: {
    playCount: {
      type: Number,
      default: 0,
    },
    describe: {
      type: String,
      default: "",
    },
    itemWidth: {
      type: Number,
      default: 250,
    },
  },
  methods: {
    // 歌单封面的播放按钮
    playSong() {
      this.$emit("playSong");
    },
    // 跳转到歌单详情页
    toPlaylistDetail() {
      this.$emit("jumpRouter");
    },
  },
};
</script>

<style lang="less" scoped>
#playlist-item {
  margin-top: 20px;
  margin-bottom: 10px;
  .img-box {
    position: relative;
    width: 100%;
    height: 250px;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    &:hover {
      p {
        opacity: 1;
      }
    }
    .playcount-icon {
      position: absolute;
      width: 100%;
      color: #e8f8f7;
      z-index: 2;
      font-size: 12px;
      .icon-bg {
        position: absolute;
        width: 100%;
        height: 30px;
        z-index: 2;
        background-image: linear-gradient(
          rgba(0, 0, 0, 0.2),
          rgba(0, 0, 0, 0.1),
          rgba(0, 0, 0, 0)
        );

        span {
          float: right;
          margin-top: 5px;
          margin-right: 5px;
          i {
            vertical-align: middle;
            position: relative;
            top: -1px;
            left: 5px;
            font-size: 12px;
            margin-right: 5px;
          }
        }
      }
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -2;
    }
    p {
      position: absolute;
      bottom: 8px;
      right: 8px;
      width: 30px;
      height: 30px;
      background: #fff;
      border-radius: 50%;
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