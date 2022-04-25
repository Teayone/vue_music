<template>
  <div
    class="x-input"
    :style="{ width, height, borderColor }"
    :class="iconPosition"
  >
    <div class="icon">
      <i class="iconfont" :class="icon"></i>
    </div>
    <input
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "XInput",
  props: {
    value: {
      type: String,
      default: "",
    },
    iconPosition: {
      type: String,
      default: "left",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    borderColor: {
      type: String,
      default: "#ccc",
    },
    type: {
      type: String,
      default: "text",
    },
    icon: {
      type: String,
      default: "icon-password",
    },
  },
};
</script>

<style scoped lang="less">
.x-input {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid;
  border-radius: 5px;
  .icon {
    position: absolute;
    height: 100%;
    width: 30px;
    text-align: center;
  }
  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    border-radius: 5px;
    overflow: hidden;
    color: #333;
    font-size: 18px;
  }
  &.left {
    .icon {
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    input {
      padding-left: 30px;
    }
  }
  &.right {
    .icon {
      right: 0;
    }
    input {
      padding-right: 30px;
    }
  }
}
</style>
