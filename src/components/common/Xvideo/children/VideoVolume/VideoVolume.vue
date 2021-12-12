<template>
  <!-- 音量按钮 -->
  <div class="video-volume">
    <!-- 音量进度条 -->
    <div class="hover-volume-bar">
      <div class="volume-bar-box">
        <div class="volume-bar" @click="jumpVolume">
          <div class="volume-set-bar" :style="{ backgroundColor: toolColor }">
            <span @mousedown="volumeMouseD" id="volumePoint"></span>
          </div>
        </div>
      </div>
    </div>
    <i class="iconfont icon-yinliang"></i>
  </div>
</template>

<script>
export default {
  name: "VideoVolume",
  props: {
    toolColor: {
      type: String,
      default: "#ff87ab",
    },
  },
  data() {
    return { volumeBar: null, volumeSetBar: null, volumePoint: null };
  },
  mounted() {
    this.volumeBar = document.querySelector(".volume-bar");
    this.volumeSetBar = document.querySelector(".volume-bar>.volume-set-bar");
    this.volumePoint = document.querySelector(
      ".volume-bar>.volume-set-bar>span"
    );
  },
  methods: {
    // 点击音量
    jumpVolume(e) {
      if (e.target.id !== "volumePoint") {
        this.volumeSetBar.style.height = e.offsetY + "px";
        this.volumePoint.style.top = e.offsetY - 7 + "px";
        // 将点击的音量数值传递
        this.$emit(
          "volumeClick",
          (e.offsetY / this.volumeBar.offsetHeight).toFixed(1)
        );
      }
    },
    // 拖拽音量
    volumeMouseD(e) {
      let _this = this;
      let yuan = e.target;
      let i = e.clientY - -e.target.offsetTop;
      document.onmousemove = function (event) {
        let t = -(event.clientY - i);
        if (t <= -7) {
          t = -7;
        } else if (t >= _this.volumeBar.offsetHeight - 7) {
          t = _this.volumeBar.offsetHeight - 7;
        }
        yuan.style.top = t + "px";
        _this.volumeSetBar.style.height = t + 7 + "px";
        _this.$emit(
          "volumeMouseMove",
          ((t + 7) / _this.volumeBar.offsetHeight).toFixed(1)
        );
        window.getSelection()
          ? window.getSelection().removeAllRanges()
          : document.body.empty();
      };
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
  },
};
</script>
<style lang="less" scoped>
// 音量按钮
.video-volume {
  position: absolute;
  right: 170px;

  &:hover {
    .hover-volume-bar {
      display: block;
    }
  }

  .hover-volume-bar {
    position: absolute;
    top: -120px;
    left: -50%;
    width: 40px;
    height: 120px;
    display: none;

    .volume-bar-box {
      position: absolute;
      top: 5px;
      left: 0;
      width: 100%;
      height: 110px;
      border-radius: 20px;
      background-color: rgba(0, 0, 0, 0.5);

      .volume-bar {
        position: absolute;
        left: 50%;
        transform: translateX(-50%) rotate(180deg);
        top: 15px;
        width: 8px;
        height: 80px;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 10px;
        cursor: pointer;

        .volume-set-bar {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 10px;

          span {
            position: absolute;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: #fff;
            top: 73px;
            left: -3px;
            cursor: pointer;
          }
        }
      }
    }
  }

  i {
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
  }
}
</style>