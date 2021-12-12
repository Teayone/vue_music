<template>
  <div>
    <!-- 头像 -->
    <div class="author">
      <p>
        <span v-for="(item, index) in artists" :key="item.id"
          >{{ item.name }}
          <i>{{ index === artists.length - 1 ? "" : "/" }}</i>
        </span>
      </p>
    </div>
    <!-- 标题和简介 -->
    <div class="mv-tile">
      <h2 class="t-l">
        {{ vTitle }}
        <i
          :class="
            isShow === false
              ? 'iconfont icon-xiasanjiaoxing'
              : 'iconfont icon-shangsanjiaoxing'
          "
          @click="isShow = !isShow"
          v-if="desc !== null"
        ></i>
      </h2>
      <h5 class="t-i">
        <span class="p-time">发布：{{ publishTime }}</span>
        <span class="p-count">播放：{{ playCount | formatPlayCount }}次</span>
      </h5>
      <p class="t-j" v-show="isShow">
        {{ desc }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Author",
  props: {
    // 歌手列表
    artists: {
      type: Array,
      default() {
        return [];
      },
    },
    // 视频标题
    vTitle: {
      type: String,
      default: "",
    },
    // 视频发布时间
    publishTime: {
      type: String,
      default: "",
    },
    // 视频播放数量
    playCount: {
      type: Number,
      default: 0,
    },
    // 视频描述
    desc: {
      type: String,
      default: "",
    },
  },
  data() {
    return { isShow: false };
  },
};
</script>
<style lang="less" scoped>
.author {
  padding: 0px 40px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  p {
    display: inline-block;

    margin-left: 10px;

    span {
      color: #373737;
      cursor: pointer;
      &:hover {
        color: #000;
      }
      i {
        margin: 0 5px;
        vertical-align: middle;
      }
    }
  }
}
.mv-tile {
  padding: 0px 40px;
  margin-top: 40px;
  .t-l {
    display: flex;
    align-items: center;
    font-size: 26px;
    font-weight: 700;

    i {
      font-size: 20px;
      margin-left: 10px;
    }
  }
  .t-i {
    margin-top: 15px;
    font-size: 14px;
    color: #999;
    .p-count {
      margin-left: 20px;
    }
  }
  .t-j {
    margin-top: 15px;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>