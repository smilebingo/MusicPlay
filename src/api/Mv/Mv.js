import {$https} from '@/api/Api.js'

function getMvList(options){
  return $https({
    method: 'get',
    url: '/mv/all',
    params: options
  })
}

function getMvUrl(options){
  return $https({
    method: 'get',
    url: '/mv/url',
    params: options
  })
}

function getMvDetail(options){
  return $https({
    method: 'get',
    url: '/mv/detail',
    params: options
  })
}

function getMvCom(options){
  return $https({
    method: 'get',
    url: '/comment/mv',
    params: options
  })
}

export{getMvList,getMvUrl,getMvDetail,getMvCom}