<template>
  <div id="header">
    <div class="wrap">
      <div class="location-btn">
        <i class="iconfont icon-fanhui" @click="go(-1)"></i>
        <i class="iconfont icon-qianjin" @click="go(1)"></i>
      </div>
      <!-- 搜索框 -->
      <div class="search">
        <i class="iconfont icon-sousuo search-icon"></i>
        <input
          type="text"
          ref="input"
          placeholder="搜索"
          v-model.trim="searchMsg"
          @focus="showSearchTips"
          @blur="closeSearchTips"
          @keyup.enter="search"
          @input="getSearchProposal"
        />
        <!-- 只有当输入框还没输入内容时显示热搜列表 -->
        <SearchTips
          v-if="!searchMsg && isShow"
          @search="search"
          @allHistory="allHistory"
        />
        <!--搜索建议 -->
        <SearchProposal
          :searchMsg="searchMsg"
          :searchData="ProposalData"
          v-if="showProposal"
        />
      </div>
      <!-- 登录&登陆成功后的头像 -->
      <div class="login" @click="ShowloginBox">
        <div class="avatar">
          <img v-if="profile !== null" :src="profile.avatarUrl" alt="" />
          <img v-else src="../../assets/img/login.jpg" alt="" />
        </div>
        <span class="nic-name">{{
          profile ? profile.nickname : "未登录"
        }}</span>

        <button @click.stop="louginOut" v-if="profile">退出</button>
      </div>
    </div>
    <!-- 登录框 -->
    <div class="login-box" v-if="showLoginBox">
      <!-- 遮罩层 -->
      <div class="bg"></div>
      <!-- 登录框 -->
      <div class="box">
        <span title="关闭窗体" class="close" @click="showLoginBox = false"
          >x</span
        >
        <div class="input">
          <label for="username">
            账号：<input type="tel" id="username" v-model="phone" />
          </label>
          <br />
          <label for="password">
            密码：<input type="password" id="password" v-model="password" />
          </label>
        </div>
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { phoneLogin, outLogin } from "@/network/login";
import { getUserAdminDetail } from "@/network/user";
import { getSearchSuggest } from "@/network/api";
import SearchTips from "./Childern/SearchTips.vue";
import SearchProposal from "./Childern/SearchProposal";
export default {
  name: "Header",
  components: { SearchTips, SearchProposal },
  data() {
    return {
      showLoginBox: false,
      phone: "",
      password: "",
      // 账号数据
      profile: null,
      isShow: false, // 是否显示热搜列表
      searchMsg: "",
      timer: null, // 搜索建议防抖
      ProposalData: null, // 搜索建议数据
      showProposal: false, // 是否显示搜索建议
      time: null, // 聚焦关闭提示框的防抖
    };
  },
  created() {
    let cookie = localStorage.getItem("userInfo");
    if (cookie) {
      this.getUserData();
    } else {
      this.profile = null;
    }
  },
  methods: {
    // 登录框
    ShowloginBox() {
      if (this.profile) {
        return;
      } else {
        this.showLoginBox = true;
      }
    },
    login() {
      phoneLogin(this.phone, this.password).then((v) => {
        if (v.data.code === 200) {
          this.profile = v.data.profile;
          this.$store.commit("SETLOGINSTATE", true);
          localStorage.setItem("userInfo", v.data.cookie);
          this.showLoginBox = false;
          this.$bus.$emit("reload");
        } else {
          alert("登陆失败，请重试");
        }
      });
    },
    // 退出登录
    louginOut() {
      outLogin().then((v) => {
        if (this.$store.state.activeSongDetail) {
          this.$bus.$emit("closeSongDetail");
        }
        if (this.$route.path !== "/home") {
          this.$router.replace({
            path: "/home",
          });
        }

        localStorage.removeItem("userInfo");
        localStorage.removeItem("user-detail");
        this.$store.commit("SETLOGINSTATE", false);
        this.profile = null;
        this.$bus.$emit("reload");
      });
    },
    // 如果已经登陆则刷新页面获取的用户数据
    async getUserData() {
      let { data: res } = await getUserAdminDetail();
      this.profile = res.profile;
      this.$store.commit("SETLOGINSTATE", true);
    },
    // 聚焦事件
    showSearchTips() {
      this.isShow = true;
      if (this.searchMsg) {
        this.getSearchProposal();
      }
    },
    // 失去焦点事件
    closeSearchTips() {
      this.time = setTimeout(() => {
        this.isShow = false;
        this.showProposal = false;
        this.time = null;
      }, 200);
    },
    // 跳转到搜索页
    search(searchWord) {
      this.closeSearchTips();
      this.$refs.input.blur();
      // 如果当前输入框有值，则采用 enter 跳转到搜索页
      if (this.searchMsg) {
        this.$router.push({
          path: "/search",
          query: {
            keyword: this.searchMsg,
          },
        });
      } else {
        if (searchWord) {
          this.searchMsg = searchWord;
          // 跳转到搜索页
          this.$router.push({
            path: "search",
            query: {
              keyword: searchWord,
            },
          });
        }
      }
      // 查看本地是否有记录
      let h = JSON.parse(localStorage.getItem("search-history")) || [];
      if (h.length !== 0) {
        let i = h.find((item) => {
          return item.name === this.searchMsg;
        });
        if (i) {
          return;
        } else {
          h.unshift({ name: this.searchMsg, id: Date.now() });
          // 将其存到本地
          localStorage.setItem("search-history", JSON.stringify(h));
        }
      } else {
        h.push({ name: this.searchMsg, id: Date.now() });
        localStorage.setItem("search-history", JSON.stringify(h));
      }
    },
    // 获取搜索建议数据
    getSearchProposal() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (!this.searchMsg) return;
      this.timer = setTimeout(() => {
        getSearchSuggest(this.searchMsg).then((v) => {
          this.ProposalData = v.data.result;
          this.showProposal = true;
        });
        this.timer = null;
      }, 500);
    },
    // 前进后退
    go(i) {
      this.$router.go(i);
    },
    // 子组件的搜索历史的一些逻辑
    allHistory(name) {
      clearTimeout(this.time); // 关闭定时器，不销毁提示框
      let i = this.$refs.input;
      i.focus(); // 重新获取焦点
      if (name) {
        // 如果子组件传来值了，则搜索
        this.search(name);
        i.blur();
      }
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
  z-index: 19;
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
        padding-left: 30px;
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
        overflow: hidden;
        vertical-align: middle;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .nic-name {
        font-size: 12px;
        color: #fff9fb;
        margin-left: 5px;
      }

      button {
        position: absolute;
        width: 50px;
        height: 30px;
        font-size: 12px;
        right: -70px;
        top: 4px;
        border-radius: 10px;
        border: 1px solid rgba(255, 0, 0, 0.3);
        background-color: rgba(0, 0, 0, 0.3);
        color: rgba(255, 255, 0, 0.5);
        cursor: pointer;
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