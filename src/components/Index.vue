<template>
  <div id="index">
    <div class="slider">
      <el-carousel :interval="4000" type="card" height="100px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <ul class="menulist">
      <router-link tag="li" class="menu" :to="'./'+item.type" v-for="(item,index) in menulist" 
      :key="index" @click="menured(item.type)">
        <i class="icon" :class="item.icon"></i>
        <p class="tagname">{{item.name}}</p>
      </router-link>
    </ul>
    <ul class="listbox">
      <li class="title">推荐歌单</li>
      <li class="box" v-for="(item,index) in tjsong" :key="index"
      @click="req(item.id)">
        <img v-lazy="item.picUrl" class="boxpic">
        <p class="boxname">{{item.name}}</p>
      </li>
      <!-- <router-link class="box" tag="li" :to="'/index/recom?id='+item.id"
      v-for="(item,index) in tjsong" :key="index">
        <img v-lazy="item.picUrl" class="boxpic">
        <p class="boxname">{{item.name}}</p>
      </router-link> -->
    </ul>
  </div>
</template>

<script>
import {getTjSong} from '@/api/index/indexApi.js';

export default {
  name: 'App',
  data () {
    return {
      menulist:[
        {
          name:'每日推荐',
          icon:'el-icon-date',
          type:'Dayrec'
        },
        {
          name:'歌单',
          icon:'el-icon-document-copy',
          type:'SongList'
        },
        {
          name:'排行榜',
          icon:'el-icon-s-data',
          type:'Top'
        },
        {
          name:'电台',
          icon:'el-icon-mic',
          type:'RadioSta'
        },
        {
          name:'私人FM',
          icon:'el-icon-service',
          type:'FM'
        },
      ],
      tjsong:[],

    }
  },
  mounted: function(){
    getTjSong().then((res)=>{
      let data = res.data;
      if(data.code == 200){
        this.tjsong = data.result.slice(0,6);
      }
    })
  },
  methods:{
    req(id){
      this.$router.push({ path: '/recom', query: {id: id} })
    },
  }
}
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
<style scoped lang="scss">
@import '../assets/sass/base.scss';

  .slider{
    width: 92%;
    margin: 0 auto;
  }
  .menulist{
    width: 92%;
    display: flex;
    flex-direction:row;
    border-bottom: rem(2px) solid #f3f3f3;
    padding: rem(20px) 4% rem(40px);
    .menu{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      flex: 1;
      font-size: rem(24px);
      .icon{   
        font-size: rem(40px);  
        display: block;
        color: #fff;
        background: #FE1E12;
        border-radius: 50%;
        padding: 10px;
        margin-bottom: 8px;
      }
    }
    
  }
  .listbox{
    width: 92%;
    margin: 0 auto;
    display: flex;
    overflow: hidden;
    flex-wrap: wrap;
    justify-content: space-between;
    .title{
      font-weight: 600;
      font-size: rem(38px);
      width: 100%;
      display: block;
      margin: rem(34px) 0;
    }
    .box{
      display: flex;
      width: 31%;
      float: left;
      flex-direction: column;
      margin-bottom: rem(20px);
      // margin: rem(20px) 0;
      .boxpic{
        width: 100%;
        border-radius: rem(16px);
      }
      .boxname{
        font-size: rem(22px);
        margin: rem(14px) 0 0;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
</style>