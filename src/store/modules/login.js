import { phoneLogin, outLogin } from "@/network/login";
import { show, hide } from "@/UI/alert";
export default {
  namespaced: true,
  state() {
    return {
      userinfo: null,
      loginState: false,
    };
  },
  mutations: {
    SET_LOGINSTATE(state, bol) {
      state.loginState = bol;
    },
    SET_USERINFO(state, data) {
      state.userinfo = data;
    },
  },
  actions: {
    async handleToPhoneLogin({ commit }, data) {
      const res = await phoneLogin(data);
      if (res.status === 200) {
        console.log(res);
        localStorage.setItem("userInfo", res.data.cookie);
        localStorage.setItem("loginState", JSON.stringify(true));
        commit("SET_LOGINSTATE", true);
        commit("SET_USERINFO", res.data);
        // 关闭登录窗口
        this._vm.$login.hide();
      } else {
        show("登陆失败，请重试");
        setTimeout(() => {
          hide();
        }, 1000);
      }
    },
    async handleToOutLogin({ commit }) {
      localStorage.removeItem("loginState");
      localStorage.removeItem("userInfo");
      commit("SET_LOGINSTATE", false);
      commit("SET_USERINFO", null);
      const res = await outLogin();
      // 关闭歌曲详情页
      if (this.state.activeSongDetail) {
        this._vm.$bus.$emit("closeSongDetail");
      }
    },
  },
};
