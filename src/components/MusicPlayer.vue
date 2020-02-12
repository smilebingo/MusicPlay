<template>
  <div id="musicPlayer">
    <div class="nothing" :class="resPath == 'musicdetail' ? 'hidden':''"></div>
    <footer class="footer" :class="resPath == 'musicdetail' ? 'hidden':''">
      <div class="musicbox">
        <router-link to="./musicdetail" tag="div" class="leftbox">
          <img v-lazy="getPic" alt="" class="pic">
          <p class="title" v-text="getTitle"></p>
          <p class="author" v-text="getAuthor"></p>
        </router-link>
        <div class="rightbox" @click="doPlaying">
          <span>
            <i class="iconfont" :class="isPlaying ? 'icon-bofang':'icon-ziyuan'"></i>
          </span>
        </div>
        <audio id="audio" @canplay="getDuration" autoplay :src="getSrc"></audio>
      </div>
    </footer>
  </div>
</template>

<script>
import {getMusic} from '@/api/index/indexApi.js'

var timer;            // 定时器 用于计算当前音乐时间

export default {
  name: 'App',
  data () {
    return {

    }
  },
  // 计算属性
  computed: {
    resPath: function() {         // 获取当前路由
      let arr = this.$route.path.split("/")[1];
      return arr;
    },
    getPic: function(){           // 获取图片路径
      return this.$store.state.music.pic
    },
    getTitle: function(){         // 获取标题
      return this.$store.state.music.title
    },
    getAuthor: function(){        // 获取歌手
      return this.$store.state.music.author
    },
    getSrc: function(){           // 获取歌曲路径
      return this.$store.state.music.src
    },
    isPlaying: function(){        // 当前是否正在播放
      return this.$store.state.isPlaying
    },
    getMusic: function(){
      return this.$store.state.music.id
    },
    listenPlay(){
      return this.$store.state.isPlaying
    },
  },
  mounted(){
  },
  watch: {
    getMusic: function(id){             // 监听当前歌曲的id
      getMusic({id:id}).then((res)=>{
        if (res.data.code == 200) {
          this.$store.commit("getMusicUrl",res.data.data[0].url);
        }else{
          this.$message({
            message: '对不起，找不到歌曲！',
            center: true,
            customClass:"typebox"
          });
        }
      })
    },
    listenPlay: function(isPlaying){    // 监听当前播放状态
      let audio = document.getElementById("audio");
      if (isPlaying) {
        audio.play();
        timer = setInterval(() => {
          this.$store.commit('AddTime');
        }, 100);
      } else {
        audio.pause();
        clearInterval(timer);
        timer = null;
      }
    }
  },
  methods:{
    doPlaying(){
      let isPlaying = this.$store.state.isPlaying;
      this.$store.commit("getIsPlaying",!isPlaying);
    },
    getDuration(e) {              // 获取总时长
      let audio = document.getElementById("audio");
      this.$store.commit("getETime", audio.duration);
    },
  }
}
</script>
<style scoped lang="scss">
  @import '../assets/sass/base.scss';
  .nothing {
    width: 100%;
    height: rem(120px);
  }
  // 底部音乐器
  .footer {
    width: 100%;
    height: rem(120px);
    background: #fff;
    border-top: rem(4px) solid #f3f3f3;
    position: fixed;
    bottom: -1px;
    .musicbox {
      width: 100%;
      display: flex;
      .leftbox {
        flex: 1;
        overflow: hidden;
        .pic {
          width: rem(90px);
          height: rem(90px);
          float: left;
          border-radius: 50%;
          margin: rem(15px) rem(20px);
        }
        .title {
          font-size: rem(32px);
          margin: rem(20px) 0 rem(5px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .author {
          color: #888;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      // 右边图标盒子
      .rightbox {
        width: rem(120px);
        line-height: rem(120px);
        text-align: center;
        .iconfont {
          font-size: rem(60px);
        }
      }
      #audio {
        position: absolute;
        z-index: -1;
      }
    }
  }
  .hidden {
    display: none
  }
</style>