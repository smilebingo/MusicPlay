import {$https} from '@/api/Api.js'

function getPlayList(options){           // 获取推荐菜单
  return $https({
    method: 'post',
    url: '/user/playlist',
    params: options
  })
}

function getResource(options){           // 获取每日推荐歌单
  return $https({
    method: 'post',
    url: '/recommend/resource',
  })
}

function getListDetail(options){           // 获取歌单详情
  return $https({
    method: 'get',
    url: '/playlist/detail',
    params: options
  })
}

export {getPlayList,getResource,getListDetail}