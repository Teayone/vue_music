import {request} from './request'
// 手机号登陆
export function phoneLogin(phone,password){
  return request({
    method:"POST",
    url:'/login/cellphone',
    params:{
      phone:phone,
      password:password,
    }
  })
} 
// 退出登录
export function outLogin(){
  let cookies = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):''
  let encode = encodeURIComponent(cookies)
  return request({
    url:'/logout',
    params:{
      cookie:encode
    }

  })
}