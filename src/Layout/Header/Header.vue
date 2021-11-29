<template>
  <div id="header">
    <div class="wrap">
      <div class="location-btn">
        <i
          class="iconfont icon-fanhui"
          :class="{ active: historyLength > 1 }"
        ></i>
        <i class="iconfont icon-qianjin"></i>
      </div>
      <!-- 搜索框 -->
      <div class="search">
        <i class="iconfont icon-sousuo search-icon"></i>
        <input type="text" placeholder="搜索" />
      </div>
      <!-- 登录&登陆成功后的头像 -->
      <div class="login" @click="login">
        <i class="avatar"></i>
        <span class="nic-name">未登录</span>
      </div>
    </div>
    <!-- 登录框 -->
    <div class="login-box" v-show="showLoginBox">
      <!-- 遮罩层 -->
      <div class="bg"></div>
      <!-- 登录框 -->
      <div class="box">
        <span title="关闭窗体" class="close" @click="showLoginBox = false"
          >x</span
        >
        <div class="input">
          <label for="username">
            账号：<input type="tel" id="username" />
          </label>
          <br />
          <label for="password">
            密码：<input type="password" id="password" />
          </label>
        </div>
        <button>登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      showLoginBox: false,
    };
  },

  methods: {
    // 登录
    login() {
      this.showLoginBox = true;
    },
  },
  computed: {
    // 记录栈里的历史记录多少个
    historyLength() {
      return window.history.length;
    },
  },
};
</script>

<style lang="less" scoped>
#header {
  position: relative;
  width: 100%;
  height: 80px;
  background: #ff7a9e;
  .wrap {
    position: absolute;
    display: flex;
    width: 1240px;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    .location-btn {
      display: flex;
      height: 40px;
      margin-top: 20px;
      i {
        display: block;
        width: 20px;
        height: 20px;
        background: #eb7091;
        font-size: 14px;
        text-align: center;
        line-height: 20px;
        margin: 0 10px;
        color: #ccc;
        margin-top: 10px;
        border-radius: 50%;
        cursor: pointer;
        &.active {
          color: #fff;
        }
      }
    }
    .search {
      position: relative;
      width: 180px;
      height: 30px;
      margin-top: 25px;
      margin-left: 40px;

      .search-icon {
        width: 15px;
        height: 15px;
        position: absolute;
        left: 10px;
        top: 7px;
        color: #fabacb;
      }
      input {
        height: 100%;
        width: 100%;
        border-radius: 20px;
        border: none;
        outline: none;
        padding-left: 27px;
        box-sizing: border-box;
        color: #fff9fb;
        background-color: #f47497;
        &::placeholder {
          color: #f3acbf;
        }
      }
    }
    .login {
      position: absolute;
      right: 0px;
      top: 65%;
      transform: translateY(-50%);
      cursor: pointer;
      .avatar {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        // background: pink;
        vertical-align: middle;
        background: url("../../assets/img/login.jpg") no-repeat;
        background-size: 100%;
      }
      .nic-name {
        font-size: 12px;
        color: #fff9fb;
        margin-left: 5px;
      }
    }
  }
  // 登录框
  .login-box {
    .bg {
      position: fixed;
      width: 100%;
      height: 100vh;
      z-index: 9998;
      background: transparent;
    }
    .box {
      position: fixed;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
      width: 300px;
      height: 350px;
      z-index: 9999;
      background-color: #f5f5f5;
      .close {
        position: absolute;
        right: -13px;
        top: -15px;
        width: 30px;
        height: 30px;
        background-color: #f2e2f6;
        text-align: center;
        line-height: 30px;
        border-radius: 50%;
        cursor: pointer;
      }
      .input {
        width: 250px;
        height: 100px;
        margin: 125px auto;
        line-height: 25px;
        z-index: 3;
        font-size: 12px;
        label {
          margin-left: 10px;
          input {
            border-radius: 5px;
            border: 1px solid #ccc;
            outline: none;
            height: 30px;
            margin-bottom: 15px;
          }
        }
      }
      button {
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 40px;
        border-radius: 20px;
        border: 1px solid rgb(80, 132, 228);
        background-color: rgb(80, 132, 228);
        color: #fff;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          background-color: rgb(34, 80, 167);
        }
      }
    }
  }
}
</style>