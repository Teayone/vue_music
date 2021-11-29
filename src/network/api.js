import {request} from './request'
// 获取轮播图
export function getBanner(){
  return request({
     url:'/banner'
  })
 }
 // 获取推荐歌单(未登录)
export function getPersonalized(){
   return request({
      url:'/personalized',
      limit:10
   })
}
// 通过榜单(歌单)id获取全部歌曲
export function getWholeSongs(id){
   // 登陆后可以获取全部歌单数据
   let cookie = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):''
   if(cookie){
      let encode = encodeURIComponent(cookie)
      return request({
         url:'/playlist/detail',
         params:{
            id,
            cookie:encode,
            
         }
      })
   }else{
      return request({
         url:'/playlist/detail',
         params:{
            id
         }
      })
   }
 

}
// 获取具体某首音乐的路径
export function getSongsUrl(id){
   let cookie = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):''
   // 注:ID可多个,用逗号隔开
   if(cookie){
      let encode = encodeURIComponent(cookie)
      return request({
         url:'/song/url',
         params:{
            cookie:encode,
            id
         }
      })
   }else{
      return request({
         url:'/song/url',
         params:{
            id
         }
      })
   }

}