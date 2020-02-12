import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state:{
    isPlaying: false,             // 当前播放状态 默认是false
    order: 0,                     // 播放顺序 0为按顺序播放 1为随机播放
    index: 10000,                 // 当前歌曲索引
    music:{                       // 当前歌曲内容
      id: '',                     // 歌曲的id
      pic: '../../static/images/f-i-music.jpg',       // 封面图片
      title: '未知歌名',           // 歌名
      author: '未知歌手',          // 歌手
      src: '',                    // 歌曲路径
      EndTime: 0,                // 音乐时长
      NowTime: 0,                // 当前播放的时长
    },
    musiclist:[
      {

      },
    ]
  },
  getters: {
  },
  mutations: {     
    getIsPlaying(state,data,ndata){       // 暂停或者播放
      state.isPlaying = data;
      console.log(data)
      // if(data == false){
      //   clearInterval(timer);
      //   return;
      // }
      // if(state.isPlaying){
      //   var timer = setInterval(()=>{
      //     state.music.NowTime = ++state.music.NowTime;
      //   },1000)
      // }else{
      //   clearInterval(timer);
      //   timer == null;
      //   return;
      // }
      let timer = setInterval(()=>{
        state.music.NowTime = ++state.music.NowTime;
      },1000)
    },
    getTjMusicList(state,data){     // 获取当前播放列表
      state.musiclist = data;
    },
    getTjIndex(state,data){         // 获取当前音乐索引值
      state.index = data;
      state.music.id = state.musiclist[data].id;
      state.music.pic = state.musiclist[data].al.picUrl;
      state.music.title = state.musiclist[data].name;
      state.music.author = state.musiclist[data].ar[0].name;
      state.music.NowTime = 0;
    },
    getMusicUrl(state,data){        // 获取当前音乐路径
      state.music.src = data;
    },
    getOrder(state,data){           // 获取当前播放顺序
      state.order = data;
    },
    getETime(state,data){
      state.music.EndTime = data;
    },
  }
})

export default store;