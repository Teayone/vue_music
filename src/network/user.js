import {request} from './request'
// 用户详情
export function getUserDetail(uid){
  return request({
    url:'/user/detail',
    params:{
      uid
    }
  })
}
// 获取账号信息
export function getUserAdminDetail(){
  let cookies = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):''
  let encode = encodeURIComponent(cookies)
  return request({
    url:'/user/account',
    params:{
      cookie:encode
    }
  })
}
// 用户歌单
export function getUserPlayList(uid,offset){
  let cookies = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):''
  let encode = encodeURIComponent(cookies)
  if(offset){
    return request({
      url:'/user/playlist',
      params:{
        uid,
        cookie:encode,
        offset
      }
    })
  }else{
    return request({
      url:'/user/playlist',
      params:{
        uid,
        cookie:encode,
      }
    })
  }
}