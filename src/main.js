import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false
Vue.filter('formatPlayCount',function(value){
  if(value>=10000&&value<=10000000000000){
    value=value/10000
    return value.toFixed(1)+'万'
  }else{
    return value
  }
})
// 音乐总时长和当前播放时长
Vue.filter('formatTimer',function(value){
  if(value===0){
    return "00:00"
  }else{
    if(value>-1){
      let mm = Math.floor((value/60)%60)
      let ss = Math.floor(value %60)
      if(mm<10){
        mm = '0' + mm
      }else{
        mm = mm
      }
      if(ss<10){
        ss = '0' + ss
      }else{
        ss = ss
      }
      return mm+':'+ss
    }
   

  }
})
Vue.filter('forMatDate',function(value){
  let date = new Date(value)
  let year = date.getFullYear()
  let m = date.getMonth()+1
  let d =  date.getDate()
  return year + '-' + m + '-' + d

})
new Vue({
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')
