<template>
  <!-- 视频组件 -->
  <div
    id="video-box"
    :style="{ width: width + 'px', height: height + 'px' }"
    @mouseleave="hideTool"
    @mousemove="continuedTool"
  >
    <!-- 处理点击视频框播放暂停事件 -->
    <span @click="playVideo" class="video-bg"></span>
    <!-- 暂停时显示的内容 -->
    <PauseVideo
      v-show="showPauseBg && videoEnd != true"
      @playVideo="playVideo"
    />
    <!-- 视频结束时显示重播按钮 -->
    <ResetVideo v-if="videoEnd" @resetVideo="playVideo" />

    <video
      src="~@/assets/vd/ce.mp4"
      @play="play"
      @pause="isPause && pause()"
      @canplay="canplay"
      @timeupdate="isUpdate && timeupdate()"
      @ended="ended"
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
        <div class="video-bar" @mousemove="showTimeTips" @click="jumpTime">
          <!-- 鼠标悬浮进度条提示对应的时间 -->
          <div class="tips-time">
            <span>{{ tipsCurTime | formatTimer }}</span>
          </div>
          <!-- 缓存进度条 -->
          <div class="video-hc-bar"></div>
          <!-- 播放进度进度条 -->
          <div class="video-cur-bar" :style="{ backgroundColor: toolColor }">
            <!-- 拖拽按钮 -->
            <span @mousedown="videoMouseD"></span>
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
        <div class="video-volume">
          <!-- 音量进度条 -->
          <div class="hover-volume-bar">
            <div class="volume-bar-box">
              <div class="volume-bar" @click="jumpVolume">
                <div
                  class="volume-set-bar"
                  :style="{ backgroundColor: toolColor }"
                >
                  <span @mousedown="volumeMouseD" id="volumePoint"></span>
                </div>
              </div>
            </div>
          </div>
          <i class="iconfont icon-yinliang"></i>
        </div>

        <!-- 清晰度选择 -->
        <div class="definition">
          <div class="definition-list">
            <ul>
              <li
                v-for="(item, index) in definitionList"
                :key="index"
                @click="switchDefinition(item)"
                :class="{ active: item == definition }"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <p>{{ definition }}</p>
        </div>

        <!-- 倍速选择器 -->
        <div class="beisu">
          <div class="beisu-list">
            <ul>
              <li
                v-for="(item, index) in speedList"
                :key="index"
                @click="switchSpeed(item)"
                :class="{ active: item == videoSpeed }"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <p>倍速</p>
        </div>

        <!-- 全屏按钮 -->
        <div class="full-screen" @click="quanping">
          <i class="iconfont icon-quanping"></i>
        </div>
      </div>
    </div>
    <!-- 工具栏消失以后底部小进度条 -->
    <div class="bar" :class="{ show: !isShow }">
      <div class="hc-bar"></div>
      <div class="cur-bar"></div>
    </div>
  </div>
</template>

<script>
import PauseVideo from "./children/PauseVideo/PauseVideo.vue";
import ResetVideo from "./children/ResetVideo/ResetVideo.vue";
import { videoData } from "./JS/mixin";

export default {
  name: "Xvideo",
  components: { PauseVideo, ResetVideo },
  mixins: [videoData],
};
</script>
<style lang="less" scoped>
@import url("./css/video.less");
</style>