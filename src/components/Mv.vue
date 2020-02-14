<template>
  <div id="mv">
    <!-- 121 -->
    <ul class="listitem">
      <li v-for="(item,index) in MvList" :key="index">
        <section class="tbox" @click="doplay(item.id,index)">
          <img class="bg" v-lazy="item.cover" alt="" v-if="index != Currindex">
          <section class="doplay" v-if="index != Currindex">
            <i class="iconfont icon-ziyuan"></i>
          </section>
          <video width="100%" :scr="video.url" :class="videoa(index)" v-if="index == Currindex">
            <source :src="video.url" type="video/mp4">
          </video>
          <!-- <span class="username">{{item.name}}</span> -->
        </section>
        <section class="mbox">
          <p class="title">{{item.name}}</p>
        </section>
        <section class="bbox">
          <!-- <img v-lazy="item." alt="" class="userpic"> -->
          <!-- <p class="username">{{item.}}</p> -->
          <span class="play">播放量：{{item.playCount}}</span>
          
        </section>
        <!-- <video width="320" height="240">
          <source src="http://vodkgeyttp8.vod.126.net/cloudmusic/NjEyMTk1NjU=/53e130b8d70baee0bd8b2e9e82af173f/41c464580326f3df59d4121c7f08746e.mp4?wsSecret=b5c30b673c4b1a0a72f4259ade3acc1f&wsTime=1581584643" type="video/mp4">
          您的浏览器不支持Video标签。
        </video> -->
      </li>
    </ul>
  </div>
</template>

<script>
import {getMvList,getMvUrl} from '@/api/Mv/Mv.js'

export default {
  name: 'Mv',
  data () {
    return {
      MvList:'',
      limit: 10,
      Currindex: 10000,
      video: {
        url:''
      },
    }
  },
  mounted(){
    getMvList({limit: this.limit}).then((res)=>{
      if(res.status == 200){
        this.MvList = res.data.data;
      }
    })
  },
  methods:{
    videoa(index){
      return "video"+index
    },
    doplay(id,index){
      this.Currindex = index;
      getMvUrl({id:id}).then((res)=>{
        // console.log(res)
        // this.video.url = res.data.data.url;
        
        // this.$refs.video.load()

        
        this.video.url = res.data.data.url;
        console.log(this.video.url);
        let video = document.getElementsByClassName("video"+index);
        console.log(video)
        // video.play();
        // }
      }).catch(()=>{
        // this.$message({
        //   message: '播放失败，请重新点击！',
        //   center: true,
        //   customClass:"typebox"
        // });
        // this.Currindex = 10000;
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/sass/base.scss';

.listitem{
  width: 100%;
  li{
    display: block;
    width: 100%;
    border-top: rem(20px) solid #f3f3f3;
    padding: rem(30px) 0;
    .tbox{
      width: 90%;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
      .bg{
        width: 100%;
        border-radius: rem(20px);
        // border: rem(1px) solid #f3f3f3;
      }
      .doplay{
        position: absolute;
        top:35%;
        left: 44%;
        i{
          font-size: rem(100px);
          color: #DBDBDB;
          // color: rgba(0,0,0,.2)
        }
        // margin: rem(-50px) 0 0 3%;
        // color: #fff;
        // border-radius: 0 0 rem(20px) rem(20px);
        // float: right;

      }
    }
    .mbox{
      width: 90%;
      margin: 0 auto;
      padding: rem(30px) 0;
      font-size: rem(32px);
      border-bottom: rem(4px) solid #f3f3f3;
    }
  }
}
</style>