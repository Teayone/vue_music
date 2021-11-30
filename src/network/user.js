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