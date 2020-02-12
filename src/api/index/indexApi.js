import {$https} from '@/api/Api.js'

function getTjSong(){           // 获取推荐菜单
  return $https({
    method: 'get',
    url: '/personalized'
  })
}

function getTjSongList(options){           // 获取推荐菜单的歌曲
  return $https({
    method: 'get',
    url: '/playlist/detail',
    params: options
  })
}

function getMusic(options){
  return $https({
    method: 'get',
    url: '/song/url',
    params: options
  })
  
}

export {getTjSong,getTjSongList,getMusic}