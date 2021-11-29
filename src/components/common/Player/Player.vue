<template>
  <div id="player">
    <!-- 按钮 -->
    <div class="music-btn">
      <div class="prev" @click="prevSong">
        <i class="iconfont icon-icon-1"></i>
      </div>
      <div class="play" @click="playBtnClick"><i :class="btnIcon"></i></div>
      <div class="next" @click="nextSong">
        <i class="iconfont icon-icon-"></i>
      </div>
    </div>
    <!-- 歌曲封面 -->
    <div class="cover">
      <img
        :src="
          songDetail === null
            ? 'https://s4.music.126.net/style/web2/img/default/default_album.jpg'
            : songDetail.al.picUrl
        "
        alt=""
      />
    </div>
    <!-- 歌名+歌手+进度条 -->
    <div class="song-and-progress">
      <div class="song-artist" v-if="songDetail !== null">
        <span class="song-name">{{ songDetail.name }}</span>
        <span class="ar-name" v-for="item in songDetail.ar" :key="item.id">{{
          item.name
        }}</span>
      </div>
      <div class="progress-box">
        <!-- 总进度条 -->
        <div class="progress" @click="setAuidoCurTime">
          <!-- 缓存进度条 -->
          <div class="hc-progress"></div>
          <!-- 播放进度条 -->
          <div class="cur-progress">
            <!-- 拖拽点 -->
            <span id="yuan" class="circular" @mousedown.stop="mousD"></span>
          </div>
        </div>
      </div>
    </div>
    <!-- 歌曲时长 -->
    <div class="song-time">
      <span>{{ curTime | formatTimer }}</span>
      <i>/</i>
      <span>{{ duration | formatTimer }}</span>
    </div>
    <audio
      :src="url"
      style="display: none"
      ref="audio"
      @play="curPlay"
      @pause="curPause"
      @timeupdate="isUpdate && updateSongTime()"
      @canplay="getDuration"
      @ended="nextSong"
      @progress="setProgress"
    ></audio>
  </div>
</template>

<script>
export default {
  name: "Player",
  data() {
    return {
      audio: null, // Audio标签
      progress: null, // 总进度条DOM元素
      CurProgress: null, // 歌曲进度DOM元素
      span: null, // 小圆点DOM元素
      url: "", // 歌曲url
      btnIcon: "iconfont icon-bofang1", // 播放按钮
      flag: false, // 歌曲是否正在播放，默认没有播放
      duration: 0, // 歌曲总时长
      curTime: 0, // 当前播放进度的歌曲时长
      songDetail: null, // 歌曲的详细信息
      isUpdate: true, // 是否绑定事件，true为绑定
    };
  },
  created() {
    this.updateSongDetail();
  },
  mounted() {
    this.$bus.$on("url", (url) => {
      localStorage.setItem("url", url);
      this.updateSongDetail();
      // 保存歌曲总时长
      setTimeout(() => {
        this.audio.play(); // 播放歌曲
      });
    });
    setTimeout(() => {
      this.progress = document.querySelector(".progress");
      this.CurProgress = document.querySelector(".progress>.cur-progress");
      this.audio = document.querySelector("audio");
      this.span = document.querySelector("#yuan");
    }, 200);
  },
  methods: {
    // 拖拽进度条
    mousD(event) {
      let _this = this;
      // 获取当前小圆点的offsetLeft
      let Oleft = event.target.offsetLeft;
      let Cx = event.clientX;
      let SpanLeft = Oleft - Cx; // 得到减去小圆点移动距离后鼠标的位置
      let lt;
      document.onmousemove = function (event) {
        _this.isUpdate = false; // 鼠标移动时 timeupdate事件失效
        lt = event.clientX - -SpanLeft; // 鼠标移动后的位置 - 得到减去小圆点移动距离后鼠标的位置 得到元素应该移动的距离
        if (lt <= 0) {
          lt = 0;
        } else if (lt >= _this.progress.offsetWidth) {
          lt = _this.progress.offsetWidth;
        }
        // 6是小圆点宽度的一半
        _this.span.style.left = lt - 6 + "px";
        _this.CurProgress.style.width = lt + "px";
      };
      document.onmouseup = function () {
        document.onmousemove = null;
        _this.isUpdate = true; // timeupdate事件生效
        _this.audio.currentTime =
          (lt / _this.progress.offsetWidth) * _this.duration;
        document.onmouseup = null;
      };
    },
    // 跳转进度条
    setAuidoCurTime(e) {
      if (e.target.className !== "circular") {
        this.CurProgress.style.width = e.offsetX + "px";
        this.span.style.left = e.offsetX - 6 + "px";
        this.audio.currentTime =
          (e.offsetX / this.progress.offsetWidth) * this.duration;
      }
    },
    // 歌曲能够播放时触发
    getDuration() {
      this.duration = this.$refs.audio.duration;
      localStorage.setItem("duration", this.$refs.audio.duration);
    },
    // 更新歌曲具体数据
    updateSongDetail() {
      let song = JSON.parse(localStorage.getItem("song"));
      let index = JSON.parse(localStorage.getItem("index"));
      let url = localStorage.getItem("url");
      let duration = localStorage.getItem("duration");
      if (song) {
        this.songDetail = song[index];
        this.url = url;
        this.duration = duration;
      } else {
        this.songDetail = null;
        this.url = "";
      }
    },
    // 歌曲开始播放
    curPlay() {
      this.flag = true;
      this.btnIcon = "iconfont icon-zanting";
    },
    // 歌曲暂停
    curPause() {
      this.flag = false;
      this.btnIcon = "iconfont icon-bofang1";
    },
    // 控制播放暂停
    playBtnClick() {
      if (this.url) {
        if (this.flag) {
          this.audio.pause();
        } else {
          this.audio.play();
        }
      }
    },
    // 当前歌曲播放进度的时间
    updateSongTime() {
      this.curTime = this.audio.currentTime;
      // 更新进度条
      this.CurProgress.style.width = (this.curTime / this.duration) * 100 + "%";

      this.span.style.left =
        (this.curTime / this.duration) * this.progress.offsetWidth - 6 + "px";
    },
    // 上一首
    prevSong() {
      let index = JSON.parse(localStorage.getItem("index"));
      let song = JSON.parse(localStorage.getItem("song"));
      --index;
      if (index < 0) {
        index = song.length - 1;
      }
      localStorage.setItem("index", JSON.stringify(index));
      this.$store.dispatch("SongUrl");
    },
    // 下一首
    nextSong() {
      let index = JSON.parse(localStorage.getItem("index"));
      let song = JSON.parse(localStorage.getItem("song"));
      ++index;
      if (index >= song.length) {
        index = 0;
      }
      localStorage.setItem("index", JSON.stringify(index));
      this.$store.dispatch("SongUrl");
    },
    // 设置缓存进度条
    setProgress() {
      let HcProgress = document.querySelector(".progress>.hc-progress");
      let b = this.$refs.audio.buffered;
      if (b.length >= 1) {
        let time = b.end(b.length - 1);
        HcProgress.style.width = (time / this.duration) * 100 + "%";
        console.log((time / this.duration) * 100 + "%");
      }
    },
  },
};
</script>

<style lang="less" scoped>
#player {
  display: flex;
  width: 1240px;
  margin: 0 auto;
  .music-btn {
    display: flex;
    height: 40px;
    margin-top: 20px;
    div {
      cursor: pointer;
    }
    // line-height: 30px;
    .prev {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      text-align: center;
      line-height: 30px;
      margin-right: 15px;
      i {
        font-size: 30px;
        color: #8cd926;
        // font-weight: 700;
      }
    }
    .play {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      text-align: center;
      line-height: 28px;
      // background: pink;
      i {
        font-size: 35px;
        color: #8cd926;
      }
    }
    .next {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      text-align: center;
      line-height: 30px;
      margin-left: 15px;
      i {
        font-size: 30px;
        color: #8cd926;
        // font-weight: 700;
      }
    }
  }
  .cover {
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    margin-top: 10px;
    margin-left: 160px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .song-and-progress {
    position: relative;
    margin-left: 20px;
    margin-top: 10px;
    font-size: 12px;
    .song-artist {
      position: absolute;
      display: flex;
      span {
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
        margin-right: 10px;
        cursor: pointer;
        &.song-name {
          font-size: 12px;
          font-weight: 600;
          color: #938cff;
        }
        &.ar-name {
          color: #507daf;
        }
      }
      i {
        margin: 0 2px;
      }
    }
    .progress-box {
      position: relative;
      width: 500px;
      height: 10px;
      top: 25px;
      .progress {
        position: absolute;
        width: 100%;
        height: 5px;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background: #25b3c9;
        border-radius: 10px;
        transition: all 0.3s;
        cursor: pointer;
        .hc-progress {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          border-radius: 10px;
          background: rgba(140, 90, 150, 0.3);
        }
        .cur-progress {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background: #938cff;

          border-radius: 10px;
          span {
            position: absolute;
            left: -6px;
            top: -2px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #938cff;
            opacity: 0;
            transition: opacity 0.3s;
          }
        }
        &:hover {
          height: 8px;
          .cur-progress {
            span {
              opacity: 1;
            }
          }
        }
      }
    }
  }
  .song-time {
    height: 40px;
    margin-top: 29px;
    line-height: 22px;
    margin-left: 15px;
    font-size: 12px;
    color: #507daf;
    i {
      margin: 0 3px;
    }
  }
}
</style>