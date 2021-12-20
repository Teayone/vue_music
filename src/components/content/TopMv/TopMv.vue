<template>
  <div class="top-mv">
    <!-- 左边排行榜数值 -->
    <div class="top-mv-num">{{ rankNum | formatRankNum }}</div>
    <div class="mv-cover-box" @click="mvClick">
      <p>
        <i class="iconfont icon-huore"></i><span>{{ playCount }}</span>
      </p>
      <img v-lazy="imageSrc" :key="imageSrc" alt="" />
    </div>
    <div class="mv-info">
      <h5 @click="mvClick">{{ mvName }}</h5>
      <p>
        <span v-for="(item, index) in artists" :key="item.id"
          >{{ item.name }}
          <i>{{ index === artists.length - 1 ? "" : "/" }}</i>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopMv",
  props: {
    imageSrc: {
      type: String,
      default: "",
    },
    playCount: {
      type: Number,
      default: 0,
    },
    mvName: {
      type: String,
      default: "",
    },
    artists: {
      type: Array,
      default() {
        return [];
      },
    },
    rankNum: {
      type: Number,
      default: 0,
    },
  },
  filters: {
    formatRankNum(value) {
      return value.toString().length === 1 ? "0" + value : value;
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
.top-mv {
  display: flex;
  width: 50%;
  height: 260px;
  border-bottom: 1px solid #f2f2f2;
  box-sizing: border-box;
  &:nth-child(odd) {
    border-right: 1px solid #f2f2f2;
  }
  .top-mv-num {
    font-size: 40px;
    line-height: 260px;
    margin-right: 15px;
    margin-left: 15px;
    font-family: 宋体;
    color: #9f9fcf;
  }
  .mv-cover-box {
    position: relative;
    top: 30px;
    width: 50%;
    height: 200px;
    flex-grow: 0;
    flex-shrink: 0;
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
    p {
      position: absolute;
      top: 0;
      width: 100%;
      height: 40px;
      background-image: linear-gradient(
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.1),
        rgba(0, 0, 0, 0)
      );
      z-index: 1;
      text-align: right;
      line-height: 30px;
      color: #fff;
      span {
        margin-right: 15px;
      }
    }
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
  .mv-info {
    width: 30%;

    padding-top: 60px;
    padding-left: 10px;
    h5 {
      width: 100%;
      font-size: 18px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    p {
      padding-top: 95px;
      font-size: 14px;
      color: #999;
      span {
        cursor: pointer;
      }
    }
  }
}
</style>