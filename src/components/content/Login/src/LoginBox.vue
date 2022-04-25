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
          <x-input type="tel" icon="icon-phone" v-model="phone"></x-input>
        </div>
        <div class="login-input" style="margin-top: -1px">
          <x-input type="password" v-model="password"></x-input>
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
export default {
  name: "LoginBox",
  components: { XInput },
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    close() {
      this.$login.hide();
    },
    login() {
      const phone = this.phone.trim();
      const password = this.password.trim();
      if (phone && password) {
        this.$store.dispatch("login/handleToPhoneLogin", {
          phone,
          password,
        });
      }
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
</style>
