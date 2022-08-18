import { request } from "./request";
// 手机号登陆
export function phoneLogin(params) {
  return request({
    method: "POST",
    url: "/login/cellphone",
    params,
  });
}
// 退出登录
export function outLogin() {
  let cookies = localStorage.getItem("userInfo")
    ? localStorage.getItem("userInfo")
    : "";
  let encode = encodeURIComponent(cookies);
  return request({
    url: "/logout",
    params: {
      cookie: encode,
    },
  });
}
// 获取手机验证码

export const getCode = (phone) => {
  return request({
    method: "GET",
    url: "/captcha/sent",
    params: {
      phone,
    },
  });
};
// 验证验证码
export const validateCode = (params) => {
  return request({
    method: "GET",
    url: "/captcha/verify",
    params,
  });
};
