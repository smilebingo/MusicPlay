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

export{getMvList,getMvUrl}