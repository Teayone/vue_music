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