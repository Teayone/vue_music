import Vue from 'vue'
import Vuex from 'vuex'
import {getSongsUrl} from '../network/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flag:false, // 歌曲是否正在播放
    CurTime:0
  },
  mutations: {
    SETFLAG(state,bol){
      state.flag = bol
    },
    SETCURTIME(state,time){
      state.CurTime = time
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
