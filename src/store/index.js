import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state:{
    islogin: false,               // 当前登录状态
    user:{
      id: '',
      name: '尚未登录',
      picurl: '../assets/logo.png',
    },
    isPlaying: false,             // 当前播放状态 默认是false
    order: 0,                     // 播放顺序 0为按顺序播放 1为随机播放
    index: 10000,                 // 当前歌曲索引
    music:{                       // 当前歌曲内容
      id: '',                     // 歌曲的id
      pic: '../../static/images/f-i-music.jpg',       // 封面图片
      title: '未知歌名',           // 歌名
      author: '未知歌手',          // 歌手
      src: '',                    // 歌曲路径
      EndTime: 0,                 // 音乐时长
      NowTime: 0,                 // 当前播放的时长
    },
    musiclist:[
      
    ]
  },
  getters: {
  },
  mutations: {    
    getLogin(state,data){                      // 登录状态
      state.islogin = data;
    },
    getUserMsg(state,data){
      state.user = data;
    },
    getIsPlaying(state,data,ndata){       // 暂停或者播放
      state.isPlaying = data;
    },
    getTjMusicList(state,data){           // 获取当前播放列表
      state.musiclist = data;
    },
    getTjIndex(state,data){               // 获取当前歌单音乐索引值
      state.index = data;
      state.music.id = state.musiclist[data].id;
      state.music.pic = state.musiclist[data].al.picUrl;
      state.music.title = state.musiclist[data].name;
      state.music.author = state.musiclist[data].ar[0].name;
      state.music.NowTime = 0;
    },
    getMusicUrl(state,data){              // 获取当前音乐路径
      state.music.src = data;
    },
    getOrder(state,data){                 // 获取当前播放顺序
      state.order = data;
    },
    getETime(state,data){
      state.music.EndTime = data;
    },
    AddTime(state){                 // 计算当前播放时长
      if(state.music.NowTime !=0 && Math.floor(state.music.NowTime) == Math.ceil(state.music.EndTime)){
        state.music.NowTime = 0;
        state.isPlaying = false;
        if(state.order == 0){           // 按顺序播放 
          let initindex = state.index;
          if(initindex + 1 == state.musiclist.length){
            state.index = 0;
          }else{
            state.index = initindex + 1;
          }
          setTimeout(()=>{
            // 点的是推荐歌曲
            if(state.musiclist[state.index].al != undefined){
              state.index = state.index;
              state.music.id = state.musiclist[state.index].id;
              state.music.pic = state.musiclist[state.index].al.picUrl;
              state.music.title = state.musiclist[state.index].name;
              state.music.author = state.musiclist[state.index].ar[0].name;
              state.isPlaying = true;
            }else{
              state.index = state.index;
              state.music.id = state.musiclist[state.index].id;
              state.music.pic = state.musiclist[state.index].artists[0].img1v1Url;
              state.music.title = state.musiclist[state.index].name;
              state.music.author = state.musiclist[state.index].artists[0].name;
              state.music.NowTime = 0;
              state.isPlaying = true;
            }
          },100)
        }else{                          // 随机播放
          let length = state.musiclist.length;
          let num = Math.floor(Math.random() * length);
          state.index = num;
          setTimeout(()=>{
            // 点的是推荐歌曲
            if(state.music.pic = state.musiclist[state.index].al){
              state.index = state.index;
              state.music.id = state.musiclist[state.index].id;
              state.music.pic = state.musiclist[state.index].al.picUrl;
              state.music.title = state.musiclist[state.index].name;
              state.music.author = state.musiclist[state.index].ar[0].name;
              state.isPlaying = true;
            }else{
              state.index = state.index;
              state.music.id = state.musiclist[state.index].id;
              state.music.pic = state.musiclist[state.index].artists[0].img1v1Url;
              state.music.title = state.musiclist[state.index].name;
              state.music.author = state.musiclist[state.index].artists[0].name;
              state.music.NowTime = 0;
              state.isPlaying = true;
            }
          },100)
        }
        return;
      }
      state.music.NowTime = state.music.NowTime + 0.1;
    },
    getSeachIndex(state,data){            // 获取当前查找的歌曲索引值
      state.index = data;
      state.music.id = state.musiclist[data].id;
      state.music.pic = state.musiclist[data].artists[0].img1v1Url;
      state.music.title = state.musiclist[data].name;
      state.music.author = state.musiclist[data].artists[0].name;
      state.music.NowTime = 0;
    },
  }
})

export default store;