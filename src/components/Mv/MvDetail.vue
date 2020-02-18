<template>
  <div class="mvdetail">
    <header class="header"><i class="goback el-icon-back" @click="back"></i></header>
    <div class="nothing"></div>
    <section class="videobox">
      <section class="tbox">
        <i :class="isPlay?'icon-bofang':'icon-ziyuan'" 
        v-if="playShow" class="iconfont" @click="doplay"></i>
        <video width="100%" id="video" :poster="items.cover"
        controls>
          <source type="video/mp4">
          您的浏览器不支持Video标签。
          <!-- :style="'width:'+silderNone+'%'" -->
        </video>
      </section>
      <section class="mbox">
        <p class="name" v-html="items.name"></p>
        <!-- <div class="box" @click="changeSrc">
          换
        </div> -->
      </section>
      <section class="bbox">
        <section class="box">
          <span class="artistName">发布人：{{items.artistName}}</span>
          <select class="" v-model="value">
            <option v-for="(item,index) in items.brs" :key="index">{{index}}P</option>
          </select>
          <!-- <el-select v-model="value" placeholder="请选择" width="40px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> -->
          <span class="pattern">画质：</span>
        </section>
        <section class="box">
          <span class="time">发布时间：{{items.publishTime}}</span>
          <span class="play">播放量：{{items.playCount}}</span>
        </section>
      </section>
    </section>
    <section class="comment">
      <ul class="com">
        <li class="title" v-if="hotcomlist.length != 0">热评</li>
        <li class="item" v-for="(item,index) in hotcomlist"
        :key="index">
          <img class="UserPic" v-lazy="item.user.avatarUrl" alt="暂无图片">
          <span class="Username">{{item.user.nickname}}</span>
          <p class="like">赞: {{item.likedCount}}</p>
          <p class="time" v-text="getTime(item.time)"></p>
          <p class="content">{{item.content}}</p>
        </li>
        <li class="title" v-if="newcomlist.length != 0">最新评论</li>
        <li class="item" v-for="(item,num) in newcomlist" >
          <img class="UserPic" v-lazy="item.user.avatarUrl" alt="暂无图片">
          <span class="Username">{{item.user.nickname}}</span>
          <p class="like">赞: {{item.likedCount}}</p>
          <p class="time" v-text="getTime(item.time)"></p>
          <p class="content">{{item.content}}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import headerNav from '@/components/Header'
import {getMvDetail,getMvCom} from '@/api//Mv/Mv.js'

export default {
  name:'MvDetail',
  data(){
    return{
      value: "240P",
      items: '',
      audioList: [],
      audioSrc: '',
      isPlay: false,
      playShow: true,
      hotcomlist: '',
      newcomlist: '',
    }
  },
  watch:{
    listenValue(){
      this.audioSrc = this.items.brs[this.value];
      let video = document.getElementById("video");
      video.src = this.audioList[0];
      video.play();
    }
  },
  computed:{
    listenValue(){
      return this.value;
    },
    timeFormat(param){
      return param < 10 ? '0' + param : param; 
    },
    // getTime(time){
    //   console.log(time)
    //   return 1;
    // },

  },
  mounted(){
    this.$store.commit("getIsPlaying",false)
    let id = this.$route.query.id;
    getMvDetail({mvid: id}).then((res)=>{
      if(res.status == 200){
        this.items = res.data.data;
        for(let a in this.items.brs){
          this.audioList = this.audioList.concat(this.items.brs[a])
        }
        this.audioSrc = this.audioList[0];
        let video = document.getElementById("video");
        video.src = this.audioList[0];
        video.play();
        this.isPlay = true;
        setTimeout(()=>{
          this.playShow = false;
        },700)
        getMvCom({id: this.items.id}).then((res)=>{     // 请求评论
          console.log(res.data)
          if(res.status == 200){
            this.hotcomlist = res.data.hotComments;
            this.newcomlist = res.data.comments;
          }
        }).catch((res)=>{
          console.log(res)
          console.log("失败")
        })
      }
    }).catch((res)=>{
      console.log(res)
      console.log("失败")
    })
  },
  methods:{
    getTime(time){
      // console.log(1)
      return parseInt(time/60/60/12/24)
      // return 1;
    },
    back(){
      this.$router.go(-1);
    },
    doplay(){
      let video = document.getElementById("video");
      video.src = this.audioList[0];
      let play = this.isPlay;
      if(play){
        video.pause();
        // video.load();
      }else{
        video.play();
        setTimeout(()=>{
          this.playShow = false;
        },700)
      }
      this.isPlay = !this.isPlay;
      
    },
    onmou(){
      this.playShow = true;
      // setTimeout(()=>{
      //   this.playShow = false;
      // },2000)
      console.log("123")
    },
    lemou(){

    },
    changeSrc(){
      console.log(this.audioList)
      this.audioSrc = this.audioList[1];
      let video = document.getElementById("video");
      video.src = this.audioList[0];
      video.play();
      this.isPlay = true;
      setTimeout(()=>{
        this.playShow = false;
      },700)
    },
  },
  components:{
    headerNav
  }
}
</script>
<style lang="scss">
@import '../../assets/sass/base.scss';

.header{
  width: 100%;
  height: rem(100px);
  top: 0;
  position: fixed;
  background: #fff;
  z-index: 999;
}
.nothing{
  width: 100%;
  height: rem(120px);
  background: #f3f3f3;
}
.videobox{
  width: 100%;
  margin: 0 auto;
  .tbox{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    #video{
      width: 100%;
    }
    .iconfont{
      font-size: rem(140px);
      position: absolute;
      z-index: 998;
      color: #fff;
      // left: 45%;
    }
  }
  .mbox{
    width: 90%;
    margin: 0 auto;
    .name{
      width: 100%;
      white-space: pre-wrap;
      font-size: rem(32px);
      font-weight: 700;
      margin: rem(30px) 0;
    }
  }
  .bbox{
    width: 90%;
    margin: 0 auto;
    color: #9C9C9C;
    font-size: rem(28px);
    .el-select{
      width: rem(20px);
    }
    .box{
      margin-bottom: rem(10px);
      overflow: hidden;
      height: rem(60px);
      line-height: rem(60px);
    }
    select{
      width: rem(120px);
      height: rem(60px);
      float: right;
      outline: none;
      option{
        // width: rem(120px);
        // padding-left: rem(20px);
      }
    }
    .pattern{
      float: right;
    }
    .play{
      float: right;
      // color:
    }
  }
}
.comment{
  border-top: rem(20px) solid #f3f3f3;
  width: 90%;
  margin: 0 auto;
  padding: 0 5%;
  .title{
    font-weight: 600;
    font-size: rem(30px);
    padding: rem(20px) 0;
  }
  .item{
    border-top: rem(2px) solid #f3f3f3;
    padding: rem(20px) 0;
    overflow: hidden;
    font-size: rem(30px);
    .UserPic{
      width: rem(80px);
      height: rem(80px);
      border-radius: 50%;
      float: left;
      border: 1px solid #f3f3f3;
      margin-right: rem(20px);
    }
    .Username{
      // float: left;
    }
    .time{
      font-size: rem(28px);
      color: #9C9C9C;
      margin-top: rem(6px);
      // float: left;
    }
    .like{
      float: right;
      color: #9C9C9C;
      margin-top: rem(6px);
    }
    .content{
      clear: both;
      margin-left: rem(100px);
      margin-top: rem(10px);
    }
  }
}
</style>