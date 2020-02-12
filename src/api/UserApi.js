import axios from 'axios';

let $https = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  withCredentials: true,
});

//获取登录状态
function getStatus(){
  return $https({
    method: 'get',
    url: '/login/status'
  })
}

// 手机登录
function getUser(UserPhone,UserPwd){
  return $https({
    method: 'post',
    url: '/login/cellphone',
    params: {
      phone: UserPhone,
      password: UserPwd
    }
  })
}

export {getStatus,getUser}