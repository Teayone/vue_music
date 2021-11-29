import Vue from 'vue'
import Vuex from 'vuex'
import {getSongsUrl} from '../network/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
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
