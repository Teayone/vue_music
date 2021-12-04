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
// 获取登陆后的推荐歌单
export function getLoginPlayList(){
   let cookies = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):''
   let encode = encodeURIComponent(cookies)
   return request({
      url:'/recommend/resource',
      params:{
         cookie:encode
      }
   })
}
// 获取歌曲详情(可获取歌单所有歌曲)
export function getSongDetail(ids){
   return request({
      url:'/song/detail',
      params:{
         ids
      }
   })
}
// 歌单评论数据
export function getPlayListComment(id,offset,before){
   if(offset){
      return request({
         url:'/comment/playlist',
         params:{
            id,
            offset:(offset-1)*20,
         }
      })
   }else if(before){
      return request({
         url:'/comment/playlist',
         params:{
            id,
            offset:(offset-1)*20,
            before,
       
         }
      })
   }else{
      return request({
         url:'/comment/playlist',
         params:{
            id,
         }
      })
   }

}

// 歌单收藏者
export function getPlaylistSubscribers(id,offset){
   let cookies = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):''
   let encode = encodeURIComponent(cookies)
   if(cookies){
      if(offset){
         return request({
            url:'/playlist/subscribers',
            params:{
               id,
               limit:32,
               offset:(offset-1)*32,
               cookie:encode
            }
         })
      }else{
         return request({
            url:'/playlist/subscribers',
            params:{
               id,
               limit:32,
               cookie:encode
            }
         })
      }
   } else{
      if(offset){
         return request({
            url:'/playlist/subscribers',
            params:{
               id,
               offset:(offset-1)*32,
            }
         })
      }else{
         return request({
            url:'/playlist/subscribers',
            params:{
               id,
               limit:32
            }
         })
      }
   }

}

// 发送评论
export function sendComment({t,type,id,content}){
   let cookies = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):''
   let encode = encodeURIComponent(cookies)
   return request({
      url:'/comment',
      params:{
         t,
         type,
         id,
         content,
         cookie:encode
      }
   })
}  
// 获取单独的歌曲详情
export function getSongInfo(ids){
   return request({
      url:'/song/detail',
      params:{
         ids
      }
   })
}
// 获取歌词
export function getLyric(id){
   return request({
      url:'/lyric',
      params:{
         id
      }
   })
}