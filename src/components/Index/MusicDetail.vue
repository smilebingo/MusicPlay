<template>
  <div class="musicdetail">
    <header class="header">
      <i class="goback el-icon-back" @click="back"></i>
      <div class="musicbox">
        <p class="title">{{$store.state.music.title == undefined ?
        '' : $store.state.music.title}}</p>
        <p class="author">{{$store.state.music.author == undefined ?
        '' : $store.state.music.author}}</p>
      </div>
    </header>
    <img class="pic" v-lazy="$store.state.music.pic">
    <div class="takebox">
      <div class="timebox">
        <span class="ctime">{{ sTime }}</span>  
        <span class="bar">
          <span class="barbtn"></span>
        </span>
        <span class="etime">{{ eTime }}</span>
      </div>
      <div class="buttonbox">
        <section class="leftbox">
          <i class="iconfont" @click="doOrder" :class="$store.state.order == 0 ? 'icon-zhengxu':'icon-suiji'"></i>
        </section>
        <section class="midbox">
          <i class="iconfont icon-48shangyishou" @click="before"></i>
          <i class="iconfont doplay" @click="doisPlaying" :class="$store.state.isPlaying ? 'icon-bofang':'icon-ziyuan'"></i>
          <i class="iconfont icon-xiayigexiayishou" @click="next"></i>
        </section>
        <section class="rightbox">
          <i class="iconfont icon-xihuan1"></i>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import headerNav from '@/components/Header'
import {getTjSong} from '@/api/index/indexApi.js';


export default {
  name: 'MusicDetail',
  data () {
    return {
      sTime: "0:00",
      eTime: "0:00",
    }
  },  
  mounted:function(){
    let stime = Math.ceil(this.$store.state.music.NowTime);           // 获取当前歌曲的总播放时长
    let etime = this.$store.state.music.EndTime;           // 获取当前歌曲的总播放时长
    this.stime = this.getTime(stime);
    this.eTime = this.getTime(etime);
  },
  computed: {
    listenSTime(){
      return this.$store.state.music.NowTime;
    },
    listenETime(){
      return this.$store.state.music.EndTime;
    },
  },
  watch:{
    listenSTime:function(stime){                // 监听当前播放进度
      this.sTime = this.getTime(stime);
    },
    listenETime:function(etime){
      this.eTime = this.getTime(etime);
    },
  },
  methods:{
    back(){
      this.$router.go(-1);
    },
    doOrder(){                    // 设置播放顺序
      let order = this.$store.state.order;
      if(order == 0){   // 正序变随机
        this.$message({
          message: '随机播放',
          center: true,
          customClass:"typebox"
        });
        this.$store.commit('getOrder',1);
      }else{            // 随机变正序
        this.$message({
          message: '正序播放',
          center: true,
          customClass:"typebox"
        });
        this.$store.commit('getOrder',0);
      }
    },
    doisPlaying(){                // 播放或暂停
      let isPlaying = this.$store.state.isPlaying;
      this.$store.commit('getIsPlaying',!isPlaying);
    },
    before(){                     // 上一首
      let order = this.$store.state.order;              // 当前的播放模式
      let index = this.$store.state.index;              // 当前播放的索引 
      let length = this.$store.state.musiclist.length;  // 当前本地曲库的长度
      if(order == 0){           // 正序播放
        if(index == 0){
          // this.$store.commit('getTjIndex',length - 1);
          if(this.$store.state.musiclist[length - 1].al != undefined){
            this.$store.commit('getTjIndex',length - 1);
          }else{
            this.$store.commit('getSeachIndex',length - 1);
          }
        }else{
          if(this.$store.state.musiclist[index].al != undefined){
            this.$store.commit('getTjIndex',--index);
          }else{
            this.$store.commit('getSeachIndex',--index);
          }
          // this.$store.commit('getTjIndex',--index);
        }
      }else if(order == 1){     // 随机播放
        let num = Math.floor(Math.random() * length);
        if(num == index){                               // 重复时 重新选取
          let num = Math.floor(Math.random() * length);
        }
        if(this.$store.state.musiclist[num].al != undefined){
          this.$store.commit('getTjIndex',num);
        }else{
          this.$store.commit('getSeachIndex',num);
        }
      }
      this.$store.commit('getIsPlaying',true);
    },
    next(){                       // 下一首
      let order = this.$store.state.order;              // 当前的播放模式
      let index = this.$store.state.index;              // 当前播放的索引 
      let length = this.$store.state.musiclist.length;  // 当前本地曲库的长度
      if(order == 0){                                   // 正序播放
        if(index == length - 1){                        // 当前是最后一首
          if(this.$store.state.musiclist[0].al != undefined){
            this.$store.commit('getTjIndex',0);
          }else{
            this.$store.commit('getSeachIndex',0);
          }
        }else{
          if(this.$store.state.musiclist[index].al != undefined){
            this.$store.commit('getTjIndex',++index);
          }else{
            this.$store.commit('getSeachIndex',++index);
          }
        }
      }else if(order == 1){                             // 随机播放
        let num = Math.floor(Math.random() * length);
        if(num == index){                               // 重复时 重新选取
          let num = Math.floor(Math.random() * length);
        }
        if(this.$store.state.musiclist[num].al != undefined){
          this.$store.commit('getTjIndex',num);
        }else{
          this.$store.commit('getSeachIndex',num);
        }
      }
      this.$store.commit('getIsPlaying',true);
    },
    getTime(time){
      let min = this.timeFormat(parseInt(time / 60));
      let sec = this.timeFormat(parseInt(time % 60));
      return min + ':' + sec;
    },
    //小于10的格式化函数
    timeFormat(param){
      return param < 10 ? '0' + param : param; 
    },
  },
  components:{
    headerNav
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/sass/base.scss';

.header{
  position: fixed;
  top: 0;
  z-index: 999;
  display: flex;
  border-bottom: 0;
  .goback{
    padding: rem(20px) 3%;
  }
  .musicbox{
    // display: inline-block;
    flex: 1;
    box-sizing: border-box;
    padding-right: 3%;
    .title{
      font-size: rem(34px);
      margin: rem(10px) 0 0 !important;
    }
    .author{
      font-size: rem(24px);
      color: #fff;
    }
  }
}
.musicdetail{
  background: rgba(0,0,0,.4);
  width: 100%;
  height: 100%;
  text-align: center;
  color:#FFF;
  margin: 0 auto;
  position: absolute;
  .pic{
    width: rem(420px);
    height: rem(420px);
    border-radius: 50%;
    border: rem(50px) solid rgba(214, 208, 208, 0.9);
    position: relative;
    top: 50%;
    margin-top: rem(-270px);
  }
  .takebox{
    width: 100%;
    position: absolute; 
    bottom: 2%;
  }
  .timebox{
    height: rem(50px);
    line-height: rem(50px);
    margin-bottom: rem(6px);
    .bar{
      width: 70%;
      margin: 0 2% ;
      display: inline-block;
      background: rgba(0,0,0,.1);
      height: rem(10px);
      line-height: rem(10px);
      position: relative;
      top: rem(-15px);
      border-radius: rem(10px);
      .barbtn{
        width: rem(20px);
        height: rem(20px);
        display: block;
        position: absolute;
        background: #fff;
        top: rem(-5px);
        border-radius: 50%;
      }
    }
    .ctime,.etime{
      position: relative;
      top:rem(-12px);
    }
  }
  .buttonbox{
    overflow: hidden;
    display: flex;
    flex-direction: row;
    .leftbox,.rightbox{
      width: 20%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      i{
        font-size: rem(50px);
        color: #fff;
      }
    }
    .midbox{
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      i{
        font-size: rem(60px);
        border-radius: 50%;
        position: relative;
        top: rem(2px);
        margin: 0 rem(20px)
      }
      .doplay{
        font-size: rem(90px);
        top: 0;
      }
    }
    .rightbox{
      justify-content: flex-start;
    }
  }
}
</style>