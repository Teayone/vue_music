<template>
  <div class="personalized-mb">
    <div class="mv-cover-img" :class="{ show: show }" @click="mvClick">
      <!-- 鼠标悬浮显示的动画弹出层 -->
      <div class="move-title" v-if="copywriter">
        <span>{{ copywriter }}</span>
      </div>
      <!-- 播放次数 -->
      <div class="play-count">
        <i class="iconfont icon-bofangqi-bofang"></i>
        <span>{{ playCount }}</span>
      </div>
      <!-- mv封面 -->
      <img v-lazy="imageSrc" :key="imageSrc" alt="" />
    </div>
    <div class="mv-info">
      <h5 @click="mvClick">{{ MvName }}</h5>
      <p>
        <span v-for="(item, index) in artists" :key="item.id"
          >{{ item.name }} <i>{{ index === artists.length - 1 ? "" : "/" }}</i>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalizedMv",
  props: {
    imageSrc: {
      type: String,
      default: "",
    },
    copywriter: {
      type: String,
      default: "",
    },
    playCount: {
      type: Number,
      default: 0,
    },
    MvName: {
      type: String,
      default: "",
    },
    artists: {
      type: Array,
      default() {
        return [];
      },
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    mvClick() {
      this.$emit("mvClick");
    },
  },
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 800px) and (max-width: 1499px) {
  .personalized-mb {
    margin: 15px 0px;
    width: 40%;
  }
}
@media screen and(min-width:1500px) and(max-width:1920px) {
  .personalized-mb {
    margin: 15px 0;
    width: 23%;
  }
}
@media screen and (min-width: 1920px) {
  .personalized-mb {
    margin: 15px 0;
    width: 23%;
  }
}
.personalized-mb {
  .mv-cover-img {
    position: relative;
    width: 100%;
    height: 200px;
    cursor: pointer;
    overflow: hidden;
    border-radius: 10px;
    &.show {
      &:hover {
        .move-title {
          top: 0;
        }
        .play-count {
          display: none;
        }
      }
    }

    .move-title {
      position: absolute;
      top: -40px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      background: rgba(0, 0, 0, 0.36);
      transition: all 0.5s;
      z-index: 2;
      span {
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
      }
    }
    .play-count {
      position: absolute;
      width: 100%;
      height: 40px;
      background-image: linear-gradient(
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.1),
        rgba(0, 0, 0, 0)
      );
      text-align: right;
      line-height: 28px;
      top: 0;
      z-index: 2;
      color: #f5f7f7;
      span {
        margin-right: 8px;
      }
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
  .mv-info {
    margin-top: 10px;
    line-height: 20px;
    h5 {
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #373737;
      &:hover {
        color: #000;
      }
    }
    p {
      font-size: 14px;

      span {
        color: #676767;
        cursor: pointer;
        &:hover {
          color: #373737;
        }
      }
    }
  }
}
</style>
