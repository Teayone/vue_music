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
    <div style="overflow: hidden; height: 100%">
      <div class="c-b-box" :style="{ transform: `translateY(${ty}px)` }">
        <div class="btns" @click="toSong" key="2">
          <p><i class="iconfont icon-aixin"></i></p>
          <p><i class="iconfont icon-shoucang1"></i></p>
          <p><i class="iconfont icon-fenxiang"></i></p>
          <div><i class="iconfont icon-xiajiantou"></i></div>
        </div>
        <!-- 歌曲封面 -->
        <div class="cover" @click="toSong" key="1">
          <!-- 遮罩 -->
          <span class="cover-bg" v-if="songDetail !== null"
            ><i class="iconfont icon-xiangshangjiantou"></i
          ></span>
          <img
            :src="
              songDetail === null
                ? 'https://s4.music.126.net/style/web2/img/default/default_album.jpg'
                : songDetail.al.picUrl
            "
            alt=""
          />
        </div>
      </div>
    </div>
    <!-- 歌名+歌手+进度条 -->
    <div class="song-and-progress">
      <div class="song-artist" v-if="songDetail !== null">
        <span class="song-name">{{ songDetail.name }}</span>
        <span
          class="ar-name"
          v-for="(item, index) in songDetail.ar"
          :key="index"
          >{{ item.name }}</span
        >
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
        <transition
          name="animate__animated animate__bounce"
          enter-active-class="animate__backInRight"
          leave-active-class="animate__backOutRight"
        >
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
import "animate.css";
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
      ty: -59, // 弹出歌曲详情页后显示其他内容的 位移距离
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
        this.$bus.$emit("up"); // 更新播放列表中正在演唱的歌曲
        this.Songlist.setSongListSroll(); // 更新播放列表的滚动条
        this.$bus.$emit("up-song-datail"); // 更新歌曲详情页
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
        // 设置拖拽时音频的时长
        let ct = (lt / _this.progress.offsetWidth) * _this.duration;
        _this.curTime = ct;
        //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
        window.getSelection
          ? window.getSelection().removeAllRanges()
          : document.selection.empty();
      };
      document.onmouseup = function () {
        document.onmousemove = null;
        _this.isUpdate = true; // timeupdate事件生效
        _this.audio.currentTime = _this.curTime;

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
      this.$store.commit("SETFLAG", true);
      this.btnIcon = "iconfont icon-zanting";
    },
    // 歌曲暂停
    curPause() {
      this.flag = false;
      this.$store.commit("SETFLAG", false);
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
      this.$store.commit("SETCURTIME", this.audio.currentTime);
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
        //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
        window.getSelection
          ? window.getSelection().removeAllRanges()
          : document.selection.empty();
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
    // 跳转至歌曲详情
    toSong() {
      let song = JSON.parse(localStorage.getItem("song"));
      if (song) {
        if (this.ty === -59) {
          this.ty = 16;
          this.$bus.$emit("showSongDetail");
          this.$bus.$on("closeSongDetail", () => {
            this.toSong();
          });
        } else {
          this.ty = -59;
          this.$bus.$emit("showSongDetail");
        }
      } else {
        return;
      }
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
  z-index: 3;
  // height: 80px;

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
  .c-b-box {
    width: 230px;
    height: 100%;
    margin: 0 10px 0 15px;
    transition: all 0.5s;
    transform: translateY(-59px);
    overflow: hidden;
    .cover {
      position: relative;
      width: 40px;
      height: 40px;
      border: 1px solid #ccc;
      margin-top: 10px;
      float: right;
      cursor: pointer;

      &:hover {
        .cover-bg {
          display: block;
        }
      }
      .cover-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        display: none;
        background: rgba(0, 0, 0, 0.36);
        z-index: 3;
        i {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: #f6f6f6;
        }
      }
      img {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
    .btns {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      p {
        border: 1px solid #ccc;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        text-align: center;
        line-height: 38px;
        margin: 0 10px;
        cursor: pointer;
        i {
          color: #527daf;
          font-weight: 900;
        }
        &:hover {
          background: #f1f1f1;
        }
      }
      div {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
      }
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
        background: #e5e5e5;
        border-radius: 10px;

        transition: all 0.3s;
        cursor: pointer;
        .hc-progress {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          border-radius: 10px;
          background: #cdcdcd;
        }
        .cur-progress {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background: #ff4e4e;

          border-radius: 10px;
          span {
            position: absolute;
            left: -6px;
            top: -2px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #ec4141;
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
    right: -80px;
    top: 50%;
    transform: translateY(-150%);
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
        z-index: 9;
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
  }
}
</style>
