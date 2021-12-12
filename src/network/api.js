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
// 获取歌单所有歌曲
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
// 歌曲评论
export function getMusicComment(id,offset,before){
   if(offset){
      return request({
         url:'/comment/music',
         params:{
            id,
            offset:(offset-1)*20
         }
      })
   }else if(before){
      return request({
         url:'/comment/music',
         params:{
            id,
            offset:(offset-1)*20,
            before,
       
         }
      })
   }else{
      return request({
         url:'/comment/music',
         params:{
            id
         }
      })
   }
}
// 相似歌单推荐(根据歌曲id推荐相似歌单)
export function getSimiPlayList(id){
   return request({
      url:'/simi/playlist',
      params:{
         id
      }
   })
}
// 获取相似音乐
export function getSimiSong(id){
   return request({
      url:'/simi/song',
      params:{
         id
      }
   })
}
// 获取独家放送
export function getPersonalizedPrivatecontent(){
   return request({
      url:'/personalized/privatecontent'
   })
}

// 新歌速递,默认获取全部类型
export function getNewSong(type=0){
   return request({
      url:'/top/song',
      params:{
         type
      }
   })
}
// 推荐 MV
export function getPersonalizedMv(){
   return request({
      url:'/personalized/mv'
   })
}
// 最新MV
export function getMvFirst(area){
   return request({
      url:'/mv/first',
      params:{
         area
      }
   })
}
// 全部MV
export function getMvAll(area,order,offset){
   if(offset){
      return request({
         url:'/mv/all',
         params:{
            area,
            order,
            offset:(offset-1)*30
         }
      })
   }else{
      return request({
         url:'/mv/all',
         params:{
            area,
            order,
         }
      })
   }

}
// 网易出品MV
export function getMvExclusiveRcmd(offset){
   if(offset){
      return request({
         url:'/mv/exclusive/rcmd',
         params:{
            offset:(offset-1)*30
         }
      })
   }else{
      return request({
         url:'/mv/exclusive/rcmd',
      })
   }

}
// MV排行
export function getTopMv(area,limit){
   return request({
      url:'/top/mv',
      params:{
         area,
         limit
      }
   })
}
// 获取全部视频
export function getVideoTimelineAll(offset){
   let cookies = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):''
   let encode = encodeURIComponent(cookies)
   return request({
      url:'/video/timeline/all',
      params:{
         offset,
         cookie:encode,
      }
   })
}
// 获取视频标签列表
export function getVideoGroupList(){
   return request({
      url:'/video/group/list'
   })
}
// 获取视频分类列表
export function getVideoCategoryList(){
   let cookies = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):''
   let encode = encodeURIComponent(cookies)
   return request({
      url:'/video/category/list',
      params:{
         cookie:encode
      }
   })
}
// 热搜列表
export function getSearchHotDetail(){
   return request({
      url:'/search/hot/detail'
   })
}
// 搜索建议
export function getSearchSuggest(keywords){
   return request({
      url:'/search/suggest',
      params:{
         keywords 
      }
   })
}

// 获取mv地址
export function getMvUrl(id,r=1080){
   return request({
      url:'/mv/url',
      params:{
         id,
         r
      }
   })
}
// 获取 mv分辨率列表(和mv信息详情)
export function getMvDetail(mvid){
   return request({
      url:'/mv/detail',
      params:{
         mvid
      }
   })
}
// 获取 mv评论
export function getMvComMent(id,offset,before){
   if(before){
      return request({
         url:'/comment/mv',
         params:{
            id,
            offset:(offset-1)*20,
            before
         }
      })
   }else if(offset){
      return request({
         url:'/comment/mv',
         params:{
            id,
            offset:(offset-1)*20,
     
         }
      })
   }else {
      return request({
         url:'/comment/mv',
         params:{
            id,
         }
      })
   }

}
// 获取相似 mv
export function getSimiMV(mvid){
   return request({
      url:'/simi/mv',
      params:{
         mvid
      }
   })
}
// 排行榜详情
export function getTopList(){
   return request({
      url:'/toplist/detail',
   })
}