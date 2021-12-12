import { fullScreen, exitScreen, isFullScreen } from './fullScreen'
export const videoData = {
  props: {
    // 视频封面
    cover:{
      type:String,
      default:''
    },
    // 视频路径
    videoSrc: {
      type: String,
      default: "",
    },
    // 宽度
    width: {
      type: Number,
      default: 700,
    },
    // 高度
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
      default: "rgba(0,0,0,0)",
    },
    // 工具栏元素进度条的颜色
    toolColor: {
      type: String,
      default: "#ff87ab",
    },
    // 默认视频清晰度
    definition: {
      type: Number,
      default: 1080,
    },
    // 清晰度列表
    definitionList: {
      type: Array,
      default() {
        return ["1080", "720", "480", "360"];
      },
    },
    // 倍速列表
    speedList: {
      type: Array,
      default() {
        return ["2.0", "1.5", "1.0", "0.75", "0.5"];
      },
    },
    // 是否显示暂停后的画面
    pauseView:{
      type:Boolean,
      default:true
    },
    // 视频结束是否显示重新播放
    resetView:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      isShow: false, // 默认在鼠标没有移入视频框时 显示的是底部的进度条
      videoBox: null, // DOM元素
      videoBar: null, // DOM元素
      tipsTime:null, // DOM元素
      videoCurBarWidth:0, // 进度条宽度
      DragPointleft:-7, // 小圆点的left
      tipsTimeLeft:0, // 时间提示框的left
      loadingBarWidth:0,// 缓存进度条宽度
      flag: false, // 鼠标是否进入到了工具栏
      videoIcon: "iconfont icon-bofangqi-bofang",
      videoState: false, // 视频播放状态
      dt: 0, // 视频总时长
      curTime: 0, // 视频当前播放时长
      tipsCurTime: 0, // 时间提示框时长
      isUpdate: true, // 是否开启 timeupdate 事件
      showPauseBg: true, // 是否显示暂停时显示在视频框中间的内容
      videoEnd: false, // 是否显示视频结束后的内容,
      showLoading:false // 加载动画
    };
  },
  mounted() {
      this.videoBox = this.$refs.videoBox
      this.videoBar = this.$refs.videoBar
      this.tipsTime = this.$refs.tipsTime
  },
  methods: {
    // 播放或暂停视频
    playVideo() {
      // 判断视频是否已经结束
      if (this.videoEnd) {
        this.videoEnd = false;
      }
      // 判断播放状态
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
      this.showLoading = false
    },
    // 视频能够播放时触发
    canplay() {
      this.$emit("videoCanplay");
      this.dt = this.$refs.video.duration;
      this.videoSpeed =
        this.$refs.video.playbackRate.toString().length === 1
          ? this.$refs.video.playbackRate + ".0"
          : this.$refs.video.playbackRate.toString();
    },
    // 当前播放时间
    timeupdate() {
      this.$emit("videoTimeUpadate");
      this.curTime = this.$refs.video.currentTime;
      //  更新进度条
      this.updateCurBar(this.$refs.video.currentTime);
    },
    // 视频结束时触发
    ended() {
      this.$emit("videoEnded");
      this.videoEnd = true;
    },
    // 更新进度条的函数
    updateCurBar(curTime) {
      let i = curTime / this.dt;
      this.videoCurBarWidth = i*100+'%'
      this.DragPointleft = i*this.videoBar.offsetWidth-7+'px'
    },
    // 需要加载而缓冲时触发
    waiting(){
      this.showLoading = true
    },
    // 缓冲或暂停 继续播放时触发
    playing(){
      this.showLoading = false
    },
    // 拖拽视频进度条
    videoMouseD(e) {
      let _this = this;
      // 获取当前小圆点的offsetLeft
      let Oleft = e.target.offsetLeft;
      let Cx = e.clientX;
      let SpanLeft = Oleft - Cx; // 得到减去小圆点移动距离后鼠标的位置
      let lt;
      
      document.onmousemove = function (event) {
        _this.isUpdate = false; // 鼠标移动时 timeupdate事件失效
        lt = event.clientX - -SpanLeft; // 鼠标移动后的位置 - 得到减去小圆点移动距离后鼠标的位置 得到元素应该移动的距离
        if (lt <= 0) {
          lt = 0;
        } else if (lt >= _this.videoBar.offsetWidth) {
          lt = _this.videoBar.offsetWidth;
        }
        _this.DragPointleft = lt - 7 + "px";
        _this.videoCurBarWidth = lt + "px";
        // 设置拖拽时音频的时长
        let ct = (lt / _this.videoBar.offsetWidth) * _this.dt;
        _this.curTime = ct;
        //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
        window.getSelection
          ? window.getSelection().removeAllRanges()
          : document.selection.empty();
      
      };
      document.onmouseup = function () {
            _this.isUpdate = true; // timeupdate事件生效
            _this.$refs.video.currentTime =_this.curTime
            document.onmousemove = null;
            document.onmouseup = null;
          
      };
    },
    // 显示进度条上方对应提示时间
    showTimeTips(e) {
      let n = e.clientX - this.videoBar.offsetLeft - this.videoBox.offsetLeft-7,
      k= e.clientX - this.videoBar.offsetLeft - this.videoBox.offsetLeft-7
      if(n<=0){
        n=0
      }
      // 设置时间提示框的时间
      this.tipsCurTime = n / this.videoBar.offsetWidth * this.dt

      if(k<=this.tipsTime.offsetWidth/2){
        k=this.tipsTime.offsetWidth/2
      }else if(k>=this.videoBar.offsetWidth-this.tipsTime.offsetWidth/2){
        k=this.videoBar.offsetWidth-this.tipsTime.offsetWidth/2
      }
      // 设置时间提示框的left
      this.tipsTimeLeft = k-this.tipsTime.offsetWidth/2+'px'
      
    },
    // 跳转进度
    jumpTime(e) {
      if(e.target.className==='video-yuan'){return}else{
        this.DragPointleft = e.offsetX - 7+'px'
        this.videoCurBarWidth = (e.offsetX / this.videoBar.offsetWidth )* 100 +'%'
        this.$refs.video.currentTime = (e.offsetX / this.videoBar.offsetWidth )* this.dt
      } 
    },
    // 缓存进度
    loadingBar(){
      let b =this.$refs.video.buffered
      if(b.length>=1){
       let n= b.end(b.length-1)
       this.loadingBarWidth = n / this.dt * 100 +'%'
      }
    
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
    // 清晰度子组件的点击事件切换清晰度
    switchDefinition(definition) {  
      this.$emit("switchDefinition", definition);
    },
    // 切换倍速
    switchSpeed(speed) {
      this.$refs.video.playbackRate = parseFloat(speed);
    },
    // 音量组件点击事件
    volumeClick(value){
      this.$refs.video.volume = value
    },
    // 音量组件拖拽进度事件
    volumeMouseMove(value){
      this.$refs.video.volume = value
    },
    // 全屏
    quanping(){
      let _this = this
      if (!isFullScreen()) {
        fullScreen( this.videoBox);
        document.onkeydown = function(e){
          if(e.code==='Space'){
            _this.playVideo()
          }
        }
      } else {
        document.onkeydown = null
        exitScreen();
      }
    },
  },
}