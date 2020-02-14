<template>
  <div id="searchpage">
    <nav class="searchbox">
      <i class="goback el-icon-back" @click="back"></i>
      <input type="text" class="text" v-model="searchtxt">
      <i class="searchbtn el-icon-search" @click="dosearch"></i>
    </nav>
    <div class="box"></div>
    <ul class="menulist">
      <li class="item" :class="index == currentIndex?'isplay':''"
      @click="play(item,index)" v-for="(item,index) in items" :key="index">
        <p class="title">{{item.name}}</p>
        <p class="author">{{item.artists[0].name}} - {{item.album.name}}</p>
      </li>
    </ul>
    <!-- <infinite-loading v-if="isShow" @infinite="infiniteHandler"></infinite-loading> -->
  </div>
</template>

<script>
import {getSearch} from '@/api/Search.js';

export default {
  data(){
    return {
      searchtxt: '',
      items: [],
      isplaying: false,
      currentIndex: 10000,
    }

  },
  mounted(){
    this.searchtxt = this.$route.query.keywords;
    getSearch({keywords:this.searchtxt,limit:20}).then((res)=>{
      if(res.status == 200){
        this.items = res.data.result.songs;
        if(JSON.stringify(res.data.result.songs) == JSON.stringify(this.$store.state.musiclist)){
          let index = this.$store.state.index;
          this.currentIndex = index;
        }
      }
    })
  },
  methods:{
    back(){
      this.$router.go(-1);
    },
    dosearch(){
      getSearch({keywords:this.searchtxt}).then((res)=>{
        if(res.status == 200){
          this.items = res.data.result.songs;
          if(JSON.stringify(this.items) == JSON.stringify(this.$store.state.musiclist)){
            let index = this.$store.state.index;
            this.currentIndex = index;
          }
        }
      })
    },
    play(data,index){
      if(JSON.stringify(this.items) != JSON.stringify(this.$store.state.musiclist)){
        this.$store.commit("getTjMusicList",this.items); // 将数据传递到全局里面
      }
      this.isplaying = this.$store.state.isPlaying;
      // 当前有音乐在播放
      if(this.isplaying){                 
        // 判断当时点击的是否是同一首歌曲
        if(this.currentIndex == index){
          // 同一首 暂停
          this.currentIndex = index;
          this.isplaying = false;
        }else{
          // 不是同一首 切换播放
          this.currentIndex = index;
          this.isplaying = true;
        }
      }else{  // 当前没有音乐在播放时
        // 播放音乐
        this.currentIndex = index;
        this.isplaying = true;
      }
      this.$store.commit("getIsPlaying",this.isplaying);    // 将状态传递给全局
      this.$store.commit("getSeachIndex",this.currentIndex);   // 将索引传递给全局
    }
  },
}
</script>

<style scoped lang="scss">
@import "../../assets/sass/base.scss";

.searchbox{
  width: 100%;
  height: rem(90px);
  position: fixed;
  top: 0;
  z-index: 999;
  background: #fff;
  box-sizing: border-box;
  padding: 0 3%;
  border-bottom: rem(4px) solid #f3f3f3;
  display: flex;
  // justify-content: center;
  align-items: center;
  .goback{
    padding: rem(20px) 0;
    font-size: rem(46px);
  }
  .searchbtn{
    font-size: rem(40px);
  }
  .text{
    flex: 1;
    height: rem(50px);
    font-size: rem(32px);
    outline: none;
    border: 0;
    border-bottom: rem(1px) solid #4B4B4B;
    margin: 0 3%;
  }
}
.box{
  width: 100%;
  height: rem(92px);
}
.menulist{
  width: 92%;
  overflow: hidden;
  margin: 0 auto;
  .item{
    margin: rem(30px) 0;
    overflow: hidden;
    .title{
      font-size: rem(32px);
      margin-bottom: rem(10px);
    }
    .author{
      font-size: rem(24px);
      color: #888;
    }
  }
  .isplay{
    border-left: rem(16px) solid #FE1E12;
    box-sizing: border-box;
    padding-left: 3%;
  }
}
</style>