import {$https} from '@/api/Api.js'

function getHotSearch(options){
  return $https({
    method: 'get',
    url: '/search/hot/detail',
  })
}

function getSearch(options){
  return $https({
    method: 'get',
    url: '/search',
    params: options
  })
}

export {getHotSearch,getSearch}