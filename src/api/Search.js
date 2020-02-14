import {$https} from '@/api/Api.js'

function getSearch(options){
  return $https({
    method: 'get',
    url: '/search',
    params: options
  })
}

export {getSearch}