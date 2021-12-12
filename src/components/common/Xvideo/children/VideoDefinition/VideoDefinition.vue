<template>
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
</template>

<script>
export default {
  name: "VideoDefinitinon",
  props: {
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
  },
  methods: {
    // 切换清晰度
    switchDefinition(definition) {
      this.$emit("switchDefinition", definition);
    },
  },
};
</script>

<style lang="less" scoped>
// 清晰度
.definition {
  position: absolute;
  right: 110px;
  font-size: 14px;

  &:hover {
    .definition-list {
      display: block;
    }
  }

  // 清晰度列表
  .definition-list {
    position: absolute;
    height: 200px;
    top: -200px;
    width: 90px;
    left: -90%;
    display: none;

    ul {
      position: absolute;
      bottom: 10px;
      left: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.7);

      li {
        width: 100%;
        height: 40px;
        line-height: 40px;
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

  // 在外面显示的清晰度
  p {
    cursor: pointer;
  }
}
</style>