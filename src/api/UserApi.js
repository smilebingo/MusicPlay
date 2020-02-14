import {$https} from '@/api/Api.js'

//获取登录状态
function getStatus(){
  return $https({
    method: 'get',
    url: '/login/status'
  })
}

function loginout(){
  return $https({
    method: 'get',
    url: '/logout'
  })
}

// 手机登录
function getUser(options){
  return $https({
    method: 'post',
    url: '/login/cellphone',
    params: options
  })
}

export {getStatus,getUser,loginout}