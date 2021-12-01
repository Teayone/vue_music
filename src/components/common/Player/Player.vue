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
      <span class="ctime">{{ curTime | formatTimer }}</span>
      <i>/</i>
      <span>{{ duration | formatTimer }}</span>
    </div>

    <!-- 音量+播放模式+播放列表 -->
    <div class="tools">
      <!-- 音量 -->
      <div class="volume">
        <!-- 音量条盒子 -->
        <div class="volume-bar-box">
          <div class="box">
            <!-- 音量调节进度条 -->
            <div class="volume-bar" @click="jumpVolume">
              <!-- 当前音量进度条 -->
              <div class="bar">
                <!-- 拖拽点 -->
                <span @mousedown="volumeMouseD" id="volumeYuan"></span>
              </div>
            </div>
          </div>
        </div>
        <i :class="volumeIcon"></i>
      </div>
      <!-- 播放模式 -->
      <div class="mode">
        <i :class="mode" :title="modeName" @click="modeBtn"></i>
      </div>
      <!-- 播放列表 -->
      <div class="songlist">
        <transition name="slist">
          <Songlist
            v-show="showSongList"
            ref="Songlist"
            @clearSonglist="clearSonglist"
          />
        </transition>

        <i class="iconfont icon-24gf-playlistMusic5" @click="showList"></i>
      </div>
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
import Songlist from "./children/Songlist.vue";
export default {
  name: "Player",
  components: { Songlist },
  data() {
    return {
      audio: null, // Audio标签
      progress: null, // 总进度条DOM元素
      CurProgress: null, // 歌曲进度DOM元素
      span: null, // 小圆点DOM元素
      volumeBar: null, // 音量条DOM元素
      Bar: null, // 当前音量进度 DOM元素
      volumeYuan: null, //音量调拖拽点DOM元素
      url: "", // 歌曲url
      btnIcon: "iconfont icon-bofang1", // 播放按钮
      flag: false, // 歌曲是否正在播放，默认没有播放
      duration: 0, // 歌曲总时长
      curTime: 0, // 当前播放进度的歌曲时长
      songDetail: null, // 歌曲的详细信息
      isUpdate: true, // 是否绑定事件，true为绑定
      volumeIcon: "iconfont icon-yinliang", // 音量图标
      mode: "iconfont icon-liebiaoxunhuan", // 播放模式字体图标
      modeName: "循环",
      showSongList: false, // 是否显示播放列表
      Songlist: null, // 播放列表组件
    };
  },
  created() {
    this.updateSongDetail();
  },
  mounted() {
    this.$bus.$on("url", (url) => {
      this.url = url;
      this.updateSongDetail();
      setTimeout(() => {
        this.audio.play(); // 播放歌曲
        this.Songlist.getData(); // 更新播放列表
        this.Songlist.updateSongDetail(); // 更新播放列表中正在演唱的歌曲
        this.Songlist.setSongListSroll();
      });
    });
    setTimeout(() => {
      this.progress = document.querySelector(".progress");
      this.CurProgress = document.querySelector(".progress>.cur-progress");
      this.audio = document.querySelector("audio");
      this.span = document.querySelector("#yuan");
      this.volumeBar = document.querySelector(".volume-bar");
      this.Bar = document.querySelector(".volume-bar>.bar");
      this.volumeYuan = document.querySelector(".volume-bar>.bar>span");
      this.Songlist = this.$refs.Songlist;
      this.setVolume(this.volumeYuan, this.Bar, this.audio);
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
      let duration = localStorage.getItem("duration");

      if (song) {
        this.songDetail = song[index];
        this.duration = duration;
      } else {
        this.songDetail = null;
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
      let song = JSON.parse(localStorage.getItem("song"));
      if (song) {
        if (this.url) {
          if (this.flag) {
            this.audio.pause();
          } else {
            this.audio.play();
          }
        } else {
          this.$store.dispatch("SongUrl");
        }
      } else {
        return;
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
    // 上一首下一首公共部分函数
    toggleSong(type) {
      let index = JSON.parse(localStorage.getItem("index"));
      let song = JSON.parse(localStorage.getItem("song"));
      if (song) {
        if (type === "prev") {
          if (this.modeName === "循环") {
            --index;
            if (index < 0) {
              index = song.length - 1;
            }
          } else if (this.modeName === "随机") {
            let i = Math.floor(Math.random() * song.length);
            index = i;
          } else if (this.modeName === "单曲循环") {
            --index;
            if (index < 0) {
              index = song.length - 1;
            }
          }
        } else {
          if (this.modeName === "循环") {
            ++index;
            if (index >= song.length) {
              index = 0;
            }
          } else if (this.modeName === "随机") {
            let i = Math.floor(Math.random() * song.length);
            index = i;
          } else if (this.modeName === "单曲循环") {
            ++index;
            if (index >= song.length) {
              index = 0;
            }
          }
        }
        localStorage.setItem("index", JSON.stringify(index));

        this.$store.dispatch("SongUrl");
        this.Songlist.updateSongDetail();
        this.Songlist.setSongListSroll();
      } else {
        return;
      }
    },
    // 上一首
    prevSong() {
      this.toggleSong("prev");
    },
    // 下一首
    nextSong() {
      this.toggleSong("next");
    },
    // 设置缓存进度条
    setProgress() {
      let HcProgress = document.querySelector(".progress>.hc-progress");
      let b = this.$refs.audio.buffered;
      if (b.length >= 1) {
        let time = b.end(b.length - 1);
        HcProgress.style.width = (time / this.duration) * 100 + "%";
      }
    },
    // 拖拽音量进度条
    volumeMouseD(e) {
      let _this = this;
      let yuan = e.target;
      let ye = e.clientY - -yuan.offsetTop;
      let yuanTop;
      document.onmousemove = function (event) {
        yuanTop = -(event.clientY - ye);
        if (yuanTop <= -6) {
          yuanTop = -6;
        } else if (yuanTop >= _this.volumeBar.offsetHeight - 6) {
          yuanTop = _this.volumeBar.offsetHeight - 6;
        }
        _this.volumeIcon =
          yuanTop === -6
            ? "iconfont icon-24gl-volumeZero"
            : "iconfont icon-yinliang";
        yuan.style.top = yuanTop + "px";
        _this.Bar.style.height = yuanTop + 6 + "px";
        let v = ((yuanTop + 6) / _this.volumeBar.offsetHeight).toFixed(1);
        _this.audio.volume = v;
      };
      document.onmouseup = function () {
        localStorage.setItem("volume", yuanTop);
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    // 页面刷新重新设置音量从本地
    setVolume(yuan, bar, audio) {
      let v = localStorage.getItem("volume"); // 读取本地的音量
      if (v) {
        v = Number(v);
        bar.style.height = v + 6 + "px"; // 页面刷新重新赋值进度条高度
        yuan.style.top = v + "px"; // 页面刷新重新赋值小圆点的top
        // bug 可以获取到最外层进度条DOM元素但是高度为0
        audio.volume = ((v + 6) / 90).toFixed(1); // 页面刷新重新赋值音量大小
      } else {
        audio.volume = 1; // 如果本地没有保存，或清空了缓存则赋值为1
      }
    },
    // 点击跳转音量
    jumpVolume(e) {
      if (e.target.id !== "volumeYuan") {
        this.Bar.style.height = e.offsetY + "px";
        this.volumeYuan.style.top = e.offsetY - 6 + "px";
        this.audio.volume = (e.offsetY / 90).toFixed(1);
        localStorage.setItem("volume", e.offsetY);
      }
    },
    // 切换播放模式
    modeBtn() {
      if (this.mode === "iconfont icon-liebiaoxunhuan") {
        this.mode = "iconfont icon-xunhuan1";
        this.modeName = "随机";
        this.audio.loop = false;
      } else if (this.mode === "iconfont icon-xunhuan1") {
        this.mode = "iconfont icon-danquxunhuan";
        this.modeName = "单曲循环";
        this.audio.loop = true;
      } else {
        this.mode = "iconfont icon-liebiaoxunhuan";
        this.modeName = "循环";
        this.audio.loop = false;
      }
    },

    // 显示播放列表
    showList() {
      this.showSongList = !this.showSongList;
      // 调用子组件的方法
      this.Songlist.updateSongDetail();
      this.Songlist.activeSongScroll();
    },
    // 清空播放列表
    clearSonglist() {
      localStorage.removeItem("song");
      let HcProgress = document.querySelector(".progress>.hc-progress");
      this.updateSongDetail();
      this.Songlist.getData();
      this.url = null;
      if (this.flag) {
        this.audio.pause();
      }
      setTimeout(() => {
        this.CurProgress.style.width = 0 + "%";
        HcProgress.style.width = 0 + "%";
        this.duration = 0;
        this.curTime = 0;
      }, 100);
    },
  },
};
</script>

<style lang="less" scoped>
@color: #000000;
@fontWeight: 300;
#player {
  position: relative;
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
        color: @color;
        font-weight: @fontWeight;
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
        color: @color;
        font-weight: @fontWeight;
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
        color: @color;
        font-weight: @fontWeight;
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
  .tools {
    display: flex;
    position: absolute;
    right: 100px;
    top: 50%;
    transform: translateY(-50%);
    .volume,
    .mode,
    .songlist {
      position: relative;
      margin: 0 15px;
      i {
        font-size: 20px;
        font-weight: 600;
        color: #3f3f53;
        cursor: pointer;
      }
    }
    .volume {
      &:hover {
        .volume-bar-box {
          display: block;
        }
      }
      .volume-bar-box {
        position: absolute;
        height: 120px;
        width: 30px;
        top: -120px;
        left: 50%;
        transform: translateX(-50%);
        display: none;
        .box {
          position: absolute;
          background: rgba(0, 0, 0, 0.5);
          width: 100%;
          height: 110px;
          border-radius: 5px;
          .volume-bar {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) rotate(180deg);
            height: 90px;
            width: 8px;
            background: rgba(0, 0, 0, 0.6);
            border-radius: 10px;
            cursor: pointer;

            .bar {
              position: absolute;
              width: 100%;
              height: 100%;
              background: #55bed3;
              border-radius: 10px;
              span {
                position: absolute;
                top: 84px;
                left: 50%;
                width: 12px;
                height: 12px;
                background: #55bed3;
                border-radius: 50%;
                transform: translateX(-50%);
              }
            }
          }
        }
      }
    }
    .songlist {
      // 定义组件在被插入时的状态
      .slist-enter {
        left: 500px;
        opacity: 0;
      }
      // 定义组件正在插入的状态
      .slist-enter-active {
        transition: all 0.6s;
      }
      // 定义组件插入完成的状态
      .slist-enter-to {
        left: 0;
        opacity: 1;
      }
      // 离开组件的开始状态
      .slist-leave {
        left: 0;
        opacity: 1;
      }
      // 正在离开组件的状态
      .slist-leave-active {
        transition: all 0.6s;
      }
      // 组件离开结束的状态
      .slist-leave-to {
        left: 500px;
        opacity: 0;
      }
    }
  }
}
</style>