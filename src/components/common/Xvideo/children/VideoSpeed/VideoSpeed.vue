<template>
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
</template>

<script>
export default {
  name: "VideoSpeed",
  props: {
    speedList: {
      type: Array,
      default() {
        return ["2.0", "1.5", "1.0", "0.75", "0.5"];
      },
    },
  },
  data() {
    return {
      videoSpeed: "1.0", // 视频播放速度，默认1.0
    };
  },
  methods: {
    // 切换倍速
    switchSpeed(speed) {
      this.videoSpeed = speed;
      this.$emit("switchSpeed", parseFloat(speed));
    },
  },
};
</script>

<style lang="less" scoped>
// 倍速列表
.beisu {
  position: absolute;
  right: 60px;
  font-size: 14px;

  &:hover {
    .beisu-list {
      display: block;
    }
  }

  .beisu-list {
    position: absolute;
    width: 80px;
    height: 200px;
    left: -92%;
    top: -200px;
    display: none;

    ul {
      position: absolute;
      bottom: 10px;
      left: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.7);

      li {
        width: 100%px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        color: #fff;

        &:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        &.active {
          background: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }

  p {
    cursor: pointer;
  }
}
</style>