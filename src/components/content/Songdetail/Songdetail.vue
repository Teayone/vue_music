<template>
  <div id="song-detail" v-if="songData">
    <div class="song-top">
      <!-- 左侧跟随音乐播放而进行的动画 -->
      <div class="song-desc-move">
        <div class="desc-move">
          <div class="p-bar" :class="{ 'p-bar-start': $store.state.flag }">
            <img
              src="@/assets/img/play-bar-support.png"
              alt=""
              class="support"
            />
            <img src="@/assets/img/play-bar.png" alt="" class="play-bar" />
          </div>
          <!-- 类名：running 开启动画 pause 暂停动画 play 继续动画 -->
          <div
            class="song-desc-cover running"
            :class="{ pause: !$store.state.flag }"
          >
            <img src="@/assets/img/disc.png" alt="" class="desc" />
            <img class="s-cover" :src="songData.al.picUrl" alt="" />
          </div>
        </div>
      </div>
      <!-- 中间歌词 -->
      <div class="lyric">
        <h2>{{ songData.name }}</h2>
        <div class="h5">
          <span v-for="(singer, index) in songData.ar" :key="index"
            >{{ singer.name }}
            <i>{{ index === songData.ar.length - 1 ? "" : "/" }}</i>
          </span>
        </div>
        <div class="move-lyric">
          <ul>
            <li
              v-for="(lyric, idx) in lyricData"
              :key="idx + Date.now()"
              :class="{ active: idx === lyricIndex }"
            >
              {{ lyric.lyric }}
            </li>
          </ul>
        </div>
      </div>
      <!-- 右侧推荐 -->
      <div class="song-recommend">
        <div class="re-list">
          <h2>推荐歌单</h2>
          <ul class="re-list">
            <li>132</li>
          </ul>
        </div>
        <div class="like-song">
          <h2>喜欢这首歌的人</h2>
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="song-bootom"></div>
  </div>
</template>

<script>
import { getSongInfo, getLyric } from "../../../network/api";
export default {
  name: "Songdetail",
  data() {
    return {
      songData: null, // 歌曲信息
      lyricData: [], // 歌词数组
      timer: null, // 计时器开关
      lyricIndex: 0, // 正在激活的歌词索引
      oMoveLyric: null, // DOM元素
    };
  },
  created() {
    this.getSongData();
    // 根据播放状态而决定是否开启滚动歌词
    if (this.$store.state.flag) {
      setTimeout(() => {
        this.scrollLyric();
      }, 500);
    }
  },
  mounted() {
    // 切换歌曲时重新刷新数据
    this.$bus.$on("up-song-datail", () => {
      clearInterval(this.timer);
      this.lyricData = [];
      this.getSongData();
      this.lyricIndex = 0;
      setTimeout(() => {
        this.scrollLyric();
        this.oMoveLyric.scrollTop = 0;
      }, 500);
    });
    // 获取DOM元素
    setTimeout(() => {
      this.oMoveLyric = document.querySelector(".lyric >.move-lyric");
    }, 300);
  },
  methods: {
    // 获取数据
    async getSongData() {
      let re = /\[([^\]]+)\]([^\[]+)/g;
      let index = JSON.parse(localStorage.getItem("index"));
      let song = JSON.parse(localStorage.getItem("song"));
      let s = song[index];
      let { data: res } = await getSongInfo(s.id);
      this.songData = res.songs[0];
      let { data: lrc } = await getLyric(s.id);
      let lyric = lrc.lrc.lyric;
      //保存正则匹配结果的数组
      var result = [];
      lyric.replace(re, ($0, $1, $2) => {
        //将匹配后的结果添加到数组中
        result.push({ time: this.formatTimeTosec($1), lyric: $2 });
      });
      this.lyricData = result;
    },
    //将时间转换成秒数
    formatTimeTosec(value) {
      //把时间分割出来 从冒号开始
      let arr = value.split(":");
      //分割出来分钟和秒数都转换成数字
      //将分钟*60得到秒数         将秒数只包含一位小数
      return (Number(arr[0] * 60) + Number(arr[1])).toFixed(1);
    },
    // 滚动歌词
    scrollLyric() {
      if (this.lyricData.length <= 2) {
        return;
      }
      let _this = this;
      clearInterval(_this.timer);
      let len = _this.lyricData.length;
      try {
        _this.timer = setInterval(() => {
          for (let i = 0; i < len; i++) {
            if (
              _this.$store.state.CurTime >= _this.lyricData[i].time &&
              (!_this.lyricData[i + 1] ||
                _this.$store.state.CurTime < _this.lyricData[i + 1].time)
            ) {
              _this.lyricIndex = i;
            }
          }
          // 始终让歌词显示在区域正中央
          let activeLi = document.querySelector(".lyric ul>li.active");
          if (activeLi.offsetTop >= _this.oMoveLyric.offsetHeight / 2 + 160) {
            _this.oMoveLyric.scrollTop =
              activeLi.offsetTop - _this.oMoveLyric.offsetHeight / 2 - 80;
          }
        }, 500);
      } catch (error) {}
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  // 监听是否正在播放
  watch: {
    "$store.state.flag"(nv) {
      if (nv) {
        this.scrollLyric();
      } else {
        clearInterval(this.timer);
      }
    },
  },
};
</script>

<style lang="less" scoped>
#song-detail {
  position: absolute;
  padding: 0 80px;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 2;
  overflow: auto;
  .song-top {
    display: flex;
    height: 500px;

    div {
      flex: 1;
    }
    .song-desc-move {
      height: 100%;
      margin-top: 20px;
      .desc-move {
        position: relative;
        height: 100%;

        .p-bar {
          position: absolute;
          // left: 40%;
          right: 123px;
          top: 20px;
          width: 80px;
          transform: rotate(-35deg);
          z-index: 3;
          transition: all 0.5s;
          &.p-bar-start {
            transform: rotate(-6deg);
          }
          .support {
            position: absolute;
            width: 30px;
            height: 30px;
            z-index: 2;
          }
          .play-bar {
            position: absolute;
            top: 16px;
            left: 8px;
            width: 80px;
          }
        }
        .song-desc-cover {
          position: absolute;
          width: 300px;
          height: 300px;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 50%;
          &.running {
            .desc,
            .s-cover {
              animation: song-move 10s linear infinite forwards;
            }
            &.pause {
              .desc,
              .s-cover {
                animation-play-state: paused;
              }
            }
          }

          .desc {
            position: absolute;
            width: 100%;
            transform-origin: center center;
          }
          .s-cover {
            position: absolute;
            left: 56px;
            top: 56px;
            border-radius: 50%;
            width: 186px;
            transform-origin: center center;
          }
        }
      }
    }
    .lyric {
      flex: 1.5;
      text-align: center;
      // margin-left: -200px;
      // background: hotpink;
      h2 {
        margin-top: 10px;
        font-size: 30px;
        font-weight: 600;
      }
      .h5 {
        margin-top: 10px;
        font-size: 14px;
        color: #9b9c9d;
      }
      .move-lyric {
        margin-top: 10px;
        height: 426px;
        overflow-y: scroll;
        scroll-behavior: smooth;
        &::-webkit-scrollbar {
          width: 0 !important;
        }
      }
      ul {
        margin-top: 10px;
        height: 100%;

        li {
          height: 80px;
          line-height: 24px;
          transition: all 0.3s ease-in-out;

          &.active {
            color: #ff7a9e;
          }
        }
      }
    }
    .song-recommend {
      flex: 1;
      text-align: center;
      margin-top: 80px;
      overflow-y: hidden;
      &:hover {
        overflow-y: auto;
      }
    }
  }
}
@keyframes song-move {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>