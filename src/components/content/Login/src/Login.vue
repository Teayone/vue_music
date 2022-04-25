<template>
  <!-- 登录&登陆成功后的头像 -->
  <div class="login" @click="ShowloginBox">
    <div class="avatar">
      <img v-if="profile" :src="profile.avatarUrl" alt="" />
      <img v-else src="~@/assets/img/login.jpg" alt="" />
    </div>
    <span class="nic-name">{{ profile ? profile.nickname : "未登录" }}</span>
    <!-- 登陆成功后的窗体 -->
    <UserContainer v-if="showBox" @loginOut="loginOut" />
  </div>
</template>

<script>
import { getUserAdminDetail } from "@/network/user";
import UserContainer from "./UserContainer.vue";
export default {
  name: "Login",
  components: { UserContainer },
  data() {
    return {
      profile: null,
      showBox: false,
    };
  },
  created() {
    this.getLocalCookie();
  },
  methods: {
    // 浏览器刷新获取本地的登录状态，如果为已登录，则修改 vuex 里的状态
    async getLocalCookie() {
      const loginState = JSON.parse(localStorage.getItem("loginState"));
      if (loginState) {
        this.$store.commit("login/SET_LOGINSTATE", true);
      }
    },
    // 刷新 or 登录请求用户数据
    async getProfile() {
      const res = await getUserAdminDetail();
      this.profile = res.data.profile;
    },
    // 打开登录窗口
    ShowloginBox() {
      if (!this.$store.state.login.loginState) {
        this.$login.show();
      } else {
        this.showBox = !this.showBox;
      }
    },
    // 退出登录
    loginOut() {
      this.$store.dispatch("login/handleToOutLogin");
      if (this.$route.path !== "/home") {
        this.$router.replace({
          path: "/home",
        });
      }
    },
  },
  watch: {
    "$store.state.login.loginState"(newVal) {
      if (newVal) {
        this.getProfile();
      } else {
        this.profile = null;
      }
    },
  },
};
</script>

<style lang="less" scoped>
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
    overflow: hidden;
    vertical-align: middle;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .nic-name {
    font-size: 12px;
    color: #fbd9d9;
    margin-left: 5px;
    &:hover {
      color: #fff;
    }
  }
}
</style>
