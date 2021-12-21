<template>
  <!-- 视频组件 -->
  <div
    ref="videoBox"
    id="video-box"
    :style="{ width: width + 'px', height: height + 'px' }"
    @mouseleave="hideTool"
    @mousemove="continuedTool"
  >
    <!-- 处理点击视频框播放暂停事件 -->
    <span @click="playVideo" class="video-bg"></span>
    <!-- 加载动画 -->
    <Loading v-show="showLoading" />
    <!-- 暂停时显示的内容 -->
    <PauseVideo
      v-show="pauseView && showPauseBg && videoEnd != true"
      @playVideo="playVideo"
    />
    <!-- 视频结束时显示重播按钮 -->
    <ResetVideo v-if="resetView && videoEnd" @resetVideo="playVideo" />

    <video
      :poster="cover"
      :src="videoSrc"
      @play="play"
      @pause="pause"
      @canplay="canplay"
      @timeupdate="isUpdate && timeupdate()"
      @ended="ended"
      @progress="loadingBar"
      @waiting="waiting"
      @playing="playing"
      ref="video"
    ></video>

    <div
      class="video-tool"
      :style="{
        height: toolHeight + 'px',
        backgroundColor: toolBackGroundColor,
      }"
      @mouseenter.stop="flag = true"
      @mouseleave.stop="flag = false"
      :class="{ show: isShow }"
    >
      <!-- 满宽进度条 TOP-->
      <div class="hover-heigt-bar">
        <!-- 鼠标悬浮后的进度条的高度 -->
        <div
          ref="videoBar"
          class="video-bar"
          @mousemove="showTimeTips"
          @click="jumpTime"
        >
          <!-- 鼠标悬浮进度条提示对应的时间 -->
          <span
            ref="tipsTime"
            class="tips-time"
            :style="{ left: tipsTimeLeft }"
          >
            {{ tipsCurTime | formatTimer }}
          </span>
          <!-- 缓存进度条 -->
          <div class="video-hc-bar" :style="{ width: loadingBarWidth }"></div>
          <!-- 播放进度进度条 -->
          <div
            class="video-cur-bar"
            :style="{ backgroundColor: toolColor, width: videoCurBarWidth }"
          >
            <!-- 拖拽按钮 -->
            <span
              class="video-yuan"
              @mousedown="videoMouseD"
              :style="{ left: DragPointleft }"
            ></span>
          </div>
        </div>
      </div>
      <div class="tool-bottom">
        <!--播放暂停按钮 -->
        <div class="video-btn" @click="playVideo">
          <i :class="videoIcon"></i>
        </div>
        <!-- 视频视长 -->
        <div class="video-time">
          <span class="video-cur-time">{{ curTime | formatTimer }}</span>
          <i>/</i>
          <span class="video-dt-time">{{ dt | formatTimer }}</span>
        </div>
        <!-- 音量按钮 -->
        <VideoVolume
          :toolColor="toolColor"
          @volumeClick="volumeClick"
          @volumeMouseMove="volumeMouseMove"
        />
        <!-- 清晰度选择 -->
        <VideoDefinition
          @switchDefinition="switchDefinition"
          :definition="definition"
          :definitionList="definitionList"
        />
        <!-- 倍速选择器 -->
        <VideoSpeed @switchSpeed="switchSpeed" :speedList="speedList" />
        <VideoFullScreen @fullScreen="quanping" />
      </div>
    </div>
    <!-- 工具栏消失以后底部小进度条 -->
    <div class="bar" :class="{ show: !isShow }">
      <div class="hc-bar" :style="{ width: loadingBarWidth }"></div>
      <div class="cur-bar" :style="{ width: videoCurBarWidth }"></div>
    </div>
  </div>
</template>

<script>
import PauseVideo from "./children/PauseVideo/PauseVideo.vue";
import ResetVideo from "./children/ResetVideo/ResetVideo.vue";
import VideoVolume from "./children/VideoVolume/VideoVolume.vue";
import VideoDefinition from "./children/VideoDefinition/VideoDefinition.vue";
import VideoSpeed from "./children/VideoSpeed/VideoSpeed.vue";
import VideoFullScreen from "./children/VideoFullScreen/VideoFullScreen.vue";
import Loading from "./children/Loading/Loading.vue";
import { videoData } from "./JS/mixin";

export default {
  name: "Xvideo",
  components: {
    PauseVideo,
    ResetVideo,
    VideoVolume,
    VideoDefinition,
    VideoSpeed,
    VideoFullScreen,
    Loading,
  },
  mixins: [videoData],
};
</script>
<style lang="less" scoped>
@import url("./css/video.less");
</style>