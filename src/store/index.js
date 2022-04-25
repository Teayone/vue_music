import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import { getSongsUrl } from "../network/api";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    flag: false, // 歌曲是否正在播放
    CurTime: 0,
    activeSongDetail: false, // 是否进入了歌曲详情页
  },
  mutations: {
    SETFLAG(state, bol) {
      state.flag = bol;
    },
    SETCURTIME(state, time) {
      state.CurTime = time;
    },
    SETSONGDETAIL(state, bol) {
      state.activeSongDetail = bol;
    },
  },
  actions: {
    SongUrl() {
      let song = JSON.parse(localStorage.getItem("song"));
      let index = JSON.parse(localStorage.getItem("index"));
      getSongsUrl(song[index].id).then((v) => {
        this._vm.$bus.$emit("url", v.data.data[0].url);
      });
    },
  },
  modules: {
    login,
  },
});
