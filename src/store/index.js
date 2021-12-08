import Vue from 'vue'
import Vuex from 'vuex'
import {getSongsUrl} from '../network/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flag:false, // 歌曲是否正在播放
    CurTime:0,
    activeSongDetail :false, // 是否进入了歌曲详情页
    loginState:false // 登陆状态
  },
  mutations: {
    SETFLAG(state,bol){
      state.flag = bol
    },
    SETCURTIME(state,time){
      state.CurTime = time
    },
    SETSONGDETAIL(state,bol){
      state.activeSongDetail = bol
    },
   SETLOGINSTATE(state,bol){
    state.loginState = bol
   }
  },
  actions: {
    SongUrl(){
      let song = JSON.parse(localStorage.getItem('song'))
      let index = JSON.parse(localStorage.getItem('index'))
      getSongsUrl(song[index].id).then(v=>{
        this._vm.$bus.$emit('url',v.data.data[0].url)
        
      })
      
    }
  },
  modules: {
  }
})
