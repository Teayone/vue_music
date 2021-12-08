<template>
  <ul id="personalized-mb" v-if="mvData">
    <li v-for="item in mvData" :key="item.id">
      <div class="mv-cover-img">
        <!-- 鼠标悬浮显示的动画弹出层 -->
        <div class="move-title">
          <span>{{ item.copywriter }}</span>
        </div>
        <!-- 播放次数 -->
        <div class="play-count">
          <i class="iconfont icon-bofangqi-bofang"></i>
          <span>{{ item.playCount }}</span>
        </div>
        <!-- mv封面 -->
        <img :src="item.picUrl" alt="" />
      </div>
      <div class="mv-info">
        <h5>{{ item.name }}</h5>
        <p>
          <span v-for="(artists, index) in item.artists" :key="index"
            >{{ artists.name }}

            <i>{{ index === item.artists.length - 1 ? "" : "/" }}</i>
          </span>
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
import { getPersonalizedMv } from "@/network/api";
export default {
  name: "PersonalizedMv",
  data() {
    return {
      isShow: false, // 是否显示动画title
      stime: null, // 定时器
      dtime: null,
      mvData: null,
    };
  },
  created() {
    this.getMvData();
  },
  methods: {
    async getMvData() {
      let { data: res } = await getPersonalizedMv();
      this.mvData = res.result;
    },
  },
};
</script>

<style lang="less" scoped>
#personalized-mb {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  li {
    margin: 15px 0;
    width: 23%;
    .mv-cover-img {
      position: relative;
      width: 100%;
      height: 200px;
      cursor: pointer;
      overflow: hidden;
      &:hover {
        .move-title {
          top: 0;
        }
        .play-count {
          display: none;
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
}
</style>