<template>
  <div class="login-box">
    <!-- 遮罩层 -->
    <div class="mask"></div>
    <!-- 登陆窗体 -->
    <div class="content">
      <div class="content-header">
        <span @click="close">×</span>
      </div>
      <div class="content-body">
        <div class="login-input">
          <x-input
            placeholder="请输入手机号"
            type="tel"
            icon="icon-phone"
            v-model="phone"
            :rules="rules"
            ref="xInput"
          ></x-input>
        </div>
        <div
          class="login-input input-box"
          :class="{ 'code-err': codeErr }"
          style="margin-top: -1px"
        >
          <i class="iconfont icon-password icon-pos"></i>
          <input
            type="text"
            placeholder="请输入验证码"
            v-model.trim="captcha"
          />
          <button @click="handleCodeBtnClick" :disabled="disabled">
            {{ codeMessage }}
          </button>
          <span class="code-err" v-if="codeErr">验证码输入错误</span>
        </div>
      </div>
      <div class="content-bottom">
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import XInput from "@/components/common/Input";
import { getCode, validateCode } from "@/network/login";
export default {
  name: "LoginBox",
  components: { XInput },
  data() {
    return {
      phone: "",
      codeMessage: "发送验证码",
      rules: [
        {
          required: true,
          message: "手机号不能为空",
        },
        {
          pattern:
            /^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/,
          message: "请输入合法的手机号",
        },
      ],
      timer: null,
      disabled: false,
      codeErr: false,
      captcha: "",
    };
  },
  methods: {
    close() {
      this.$login.hide();
    },
    async login() {
      this.codeErr = false;
      const res = this.$refs.xInput.validate();
      if (!res) return;
      // 校验验证码

      const phone = this.phone.trim();
      const validateCaptcha = await validateCode({
        phone,
        captcha: this.captcha,
      });
      if (!validateCaptcha.data.data) {
        return (this.codeErr = true);
      }
      if (phone && this.captcha) {
        this.$store.dispatch("login/handleToPhoneLogin", {
          phone,
          captcha: this.captcha,
        });
      }
    },
    async handleCodeBtnClick() {
      const res = this.$refs.xInput.validate();
      if (!res) return;
      const phone = this.phone.trim();
      let sec = 60;
      this.disabled = true;
      this.codeMessage = sec + "s";
      this.timer = setInterval(() => {
        this.codeMessage = --sec + "s";
        if (sec < 10) this.codeMessage = "0" + sec + "s";
        if (sec <= 0) {
          clearInterval(this.timer);
          this.codeMessage = "发送验证码";
          this.disabled = false;
        }
      }, 1000);
      await getCode(phone);
    },
  },
};
</script>

<style lang="less">
.login-box {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 899999;
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.6);
  }
  .content {
    position: fixed;
    left: 50%;
    top: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 400px;
    height: 300px;
    transform: translate(-50%, -50%);
    background: #fff;
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    .content-header {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      height: 30px;
      border-bottom: 1px solid #eee;
      text-align: right;
      line-height: 30px;
      span {
        display: flex;
        width: 30px;
        height: 100%;
        align-items: center;
        justify-content: center;
        font-size: 26px;
        cursor: pointer;
        color: #333;
      }
    }
    .content-body {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      padding: 20px 30px;
      flex: 1;
      justify-content: space-around;
      .login-input {
        width: 250px;
        height: 40px;
        text-align: center;
      }
    }
    .content-bottom {
      width: 100%;
      height: 80px;
      display: flex;

      justify-content: center;
      button {
        background: #ea4848;
        color: #fff;
        border: none;
        width: 200px;
        height: 35px;
        border-radius: 15px;
        font-size: 16px;
        cursor: pointer;
      }
    }
  }
}

.input-box {
  position: relative;
  display: flex;
  border: 1px solid #333;
  border-radius: 5px;
  // overflow: hidden;
  &:focus-within {
    border-color: skyblue;
  }
  &.code-err {
    border-color: red;
  }
  .icon-pos {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
  }
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    border-radius: 5px;
    padding-left: 30px;
    padding-right: 125px;
  }
  button {
    position: absolute;
    z-index: 1;
    right: 0;
    height: 100%;
    border: none;
    outline: none;
    width: 100px;
    background-color: antiquewhite;
    border-radius: 5px;
  }
  .code-err {
    position: absolute;
    bottom: -15px;
    display: block;
    font-size: 12px;
    color: red;
  }
}
</style>
