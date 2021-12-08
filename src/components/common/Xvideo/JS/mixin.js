import { fullScreen, exitScreen, isFullScreen } from './fullScreen'
export const videoData = {
  props: {
    videoSrc: {
      type: String,
      default: "",
    },
    width: {
      type: Number,
      default: 700,
    },
    height: {
      type: Number,
      default: 400,
    },
    // 工具栏的高度
    toolHeight: {
      type: Number,
      default: 50,
    },
    // 工具栏的背景颜色
    toolBackGroundColor: {
      type: String,
      default: "rgba(0,0,0,.3)",
    },
    toolColor: {
      type: String,
      default: "#ff87ab",
    },
    // 默认视频清晰度
    definition: {
      type: String,
      default: "1080",
    },
    // 清晰度列表
    definitionList: {
      type: Array,
      default() {
        return ["1080", "720", "480", "360"];
      },
    },
    speedList: {
      type: Array,
      default() {
        return ["2.0", "1.5", "1.0", "0.75", "0.5"];
      },
    },
  },
  data() {
    return {
      isShow: false, // 默认在鼠标没有移入视频框时 显示的是底部的进度条
      videoBox: null, // DOM元素
      videoBar: null, // DOM元素
      videoCurBar: null, // DOM元素
      tipsTime: null, // DOM元素
      DragPoint: null, // DOM元素
      footerBar: null, // DOM元素
      flag: false, // 鼠标是否进入到了工具栏
      videoIcon: "iconfont icon-bofangqi-bofang",
      videoState: false, // 视频播放状态
      dt: 0, // 视频总时长
      curTime: 0, // 视频当前播放时长
      tipsCurTime: 0, // 时间提示框时长
      isUpdate: true, // 是否开启 timeupdate 事件
      isPause: true, // 是否开启监听视频暂停事件
      showPauseBg: true, // 是否显示暂停时显示在视频框中间的内容
      videoEnd: false, // 是否显示视频结束后的内容
      videoSpeed: "0", // 视频播放速度，默认1.0
      volumeBar:null, // 总进度条
      volumeSetBar:null,//当前音量时间进度条
      volumePoint:null // 拖拽点
    };
  },
  mounted() {
    setTimeout(() => {
      this.videoBox = document.querySelector("#video-box");
      this.videoBar = document.querySelector(".video-bar");
      this.tipsTime = document.querySelector(".video-bar>.tips-time");
      this.videoCurBar = document.querySelector(".video-bar>.video-cur-bar");
      this.DragPoint = document.querySelector(".video-bar>.video-cur-bar>span");
      this.footerBar = document.querySelector(".bar>.cur-bar");
      this.volumeBar = document.querySelector('.volume-bar')
      this.volumeSetBar = document.querySelector('.volume-bar>.volume-set-bar')
      this.volumePoint = document.querySelector('.volume-bar>.volume-set-bar>span')
    });
  },
  methods: {
    // 播放或暂停视频
    playVideo() {
      if (this.videoEnd) {
        this.videoEnd = false;
        this.isPause = true;
      }
      if (this.videoState) {
        this.$refs.video.pause();
      } else {
        this.$refs.video.play();
      }
    },
    play() {
      this.$emit("videoPlay");
      this.videoIcon = "iconfont icon-zanting1";
      this.videoState = true;
      this.showPauseBg = false;
    },
    pause() {
      this.$emit("videoPause");
      this.videoIcon = "iconfont icon-bofangqi-bofang";
      this.videoState = false;
      this.showPauseBg = true;
    },
    // 视频能够播放时触发
    canplay() {
      this.$emit("videoCanplay");
      this.dt = this.$refs.video.duration;
      this.videoSpeed =
        this.$refs.video.playbackRate.toString().length === 1
          ? this.$refs.video.playbackRate + ".0"
          : this.$refs.video.playbackRate.toString();
      console.log(this.videoSpeed);
    },
    // 当前播放时间
    timeupdate() {
      this.$emit("videoTimeUpadate");
      this.curTime = this.$refs.video.currentTime;
      //  更新进度条
      this.updateCurBar(this.$refs.video.currentTime);
    },
    // 更新进度条的函数
    updateCurBar(curTime) {
      let i = curTime / this.dt;
      this.videoCurBar.style.width = i * 100 + "%";
      this.footerBar.style.width = i * 100 + "%";
      let k = i * this.videoBar.offsetWidth;
      if (k <= this.DragPoint.offsetWidth) {
        k = 0;
      } else if (k >= this.videoBar.offsetWidth) {
        k = this.videoBar.offsetWidth - this.DragPoint.offsetWidth;
      } else {
        k = i * this.videoBar.offsetWidth - this.DragPoint.offsetWidth;
      }
      this.DragPoint.style.left = k + "px";
    },
    // 跳转进度
    jumpTime(e) {
      let l = e.clientX - this.videoBar.offsetLeft - this.videoBox.offsetLeft;
      if (l <= this.DragPoint.offsetWidth / 2) {
        this.DragPoint.style.left = 0 + "px";
      } else if (
        l >=
        this.videoBar.offsetWidth - this.DragPoint.offsetWidth / 2
      ) {
        this.DragPoint.style.left = l - this.DragPoint.offsetWidth / 2 + "px";
      } else {
        this.$refs.video.currentTime =
          (l / this.videoBar.offsetWidth) * this.dt;
      }

      this.videoCurBar.style.width =
        (l / this.videoBar.offsetWidth) * 100 + "%";
      this.DragPoint.style.left = l - this.DragPoint.offsetWidth / 2 + "px";
    },
    // 鼠标离开隐藏工具栏
    hideTool() {
      this.videoBox.style.cursor = 'none'
      this.isShow = false;
    },
    // 鼠标在视频框移动，持续显示工具栏
    continuedTool() {
      this.videoBox.style.cursor = 'default'
      this.isShow = true;
      clearTimeout(this.time);
      // 鼠标停止五秒隐藏工具条
      this.time = setTimeout(() => {
        if (this.flag) return;
        this.hideTool();
      }, 3000);
    },
    // 拖拽视频进度条
    videoMouseD(e) {
      let _this = this;
      let yuan = e.target;
      let barw;
      let yl;
      document.onmousemove = function (e) {
        _this.isUpdate = false; // 关闭 timeupdate 事件
        let i =
          e.clientX - _this.videoBox.offsetLeft - _this.videoBar.offsetLeft;

        if (i <= 0) {
          barw = 0; // 控制进度条 barw
        } else if (i <= yuan.offsetWidth) {
          yl = 0; // 控制拖拽点
        } else if (i >= _this.videoBar.offsetWidth) {
          yl = _this.videoBar.offsetWidth - yuan.offsetWidth;
          barw = i;
        } else {
          barw = i;
          yl = i - yuan.offsetWidth;
        }
        _this.videoCurBar.style.width =
          (barw / _this.videoBar.offsetWidth) * 100 + "%";
        yuan.style.left = yl + "px";

        //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
        window.getSelection
          ? window.getSelection().removeAllRanges()
          : document.selection.empty();
        _this.curTime = (barw / _this.videoBar.offsetWidth) * _this.dt;
      };
      document.onmouseup = function () {
        _this.$refs.video.currentTime = _this.curTime;
        _this.isUpdate = true;
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    // 显示进度条上方对应提示时间
    showTimeTips(e) {
      let i = e.clientX - this.videoBox.offsetLeft - this.videoBar.offsetLeft;
      // 显示对应的时间
      this.tipsCurTime = (i / this.videoBar.offsetWidth) * this.dt;
      // 设置时间框的移动距离
      if (i <= 0 + this.tipsTime.offsetWidth / 2) {
        i = 0;
        this.tipsTime.style.left = i + "px";
      } else if (
        i >=
        this.videoBar.offsetWidth - this.tipsTime.offsetWidth / 2
      ) {
        i = this.videoBar.offsetWidth - this.tipsTime.offsetWidth;
        this.tipsTime.style.left = i + "px";
      } else {
        this.tipsTime.style.left = i - this.tipsTime.offsetWidth / 2 + "px";
      }
    },
    // 视频结束时触发
    ended() {
      this.isPause = false;
      this.$emit("videoEnded");
      this.videoEnd = true;
    },
    // 切换清晰度
    switchDefinition(definition) {
      this.$emit("switchDefinition", definition);
    },
    // 切换倍速
    switchSpeed(speed) {
      this.videoSpeed = speed;
      this.$refs.video.playbackRate = parseFloat(speed);
    },
    // 拖拽音量
    volumeMouseD(e){
      let _this = this
      let yuan = e.target
      let i = e.clientY - -e.target.offsetTop
      document.onmousemove = function(event){
        let t = -(event.clientY - i)
        if(t<= -7){
          t = -7
        }else if(t>=_this.volumeBar.offsetHeight-7){
          t = _this.volumeBar.offsetHeight-7
        }
        yuan.style.top = t +'px'
        _this.volumeSetBar.style.height = t+7+'px'
        _this.$refs.video.volume = ((t+7)/_this.volumeBar.offsetHeight).toFixed(1)
        window.getSelection()?window.getSelection().removeAllRanges():document.body.empty()
      }
      document.onmouseup = function(){
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    // 点击音量
    jumpVolume(e){
      if(e.target.id!=='volumePoint'){
        console.log(e.offsetY);
        this.volumeSetBar.style.height = e.offsetY+'px'
        this.volumePoint.style.top = e.offsetY-7+'px'
        this.$refs.video.volume = (e.offsetY/this.volumeBar.offsetHeight).toFixed(1)
      }
 
     
    },
    // 全屏
    quanping(){
      if (!isFullScreen()) {
        fullScreen( this.videoBox);
      } else {
        exitScreen();
      }
    },
  
  },
}