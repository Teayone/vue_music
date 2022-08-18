<template>
  <div
    class="x-input"
    :style="{ width, height }"
    :class="[iconPosition, { 'error-message': isErr }]"
  >
    <div class="icon">
      <i class="iconfont" :class="icon"></i>
    </div>
    <input
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @blur="handleBlur"
      v-bind="$attrs"
    />
    <span class="err-message" v-show="isErr">{{ message }}</span>
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
    type: {
      type: String,
      default: "text",
    },
    icon: {
      type: String,
      default: "icon-password",
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isErr: false,
      message: "",
    };
  },
  methods: {
    handleBlur() {
      return this.rules.every((rule) => {
        this.message = rule.message;
        if (rule.required && !this.value.trim()) {
          return !(this.isErr = true);
        }
        if (rule.pattern && !rule.pattern.test(this.value.trim())) {
          return !(this.isErr = true);
        }
        this.isErr = false;
        this.message = "";
        return true;
      });
    },
    validate() {
      return this.handleBlur();
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
    // font-size: 18px;
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
.x-input.error-message {
  border-color: red;
}
span.err-message {
  display: block;
  text-align: left;
  color: red;
  font-size: 12px;
  transform: translateY(6px);
}
</style>
