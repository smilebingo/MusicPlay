<template>
  <div id="search">
    <nav class="searchbox">
      <i class="goback el-icon-back" @click="back"></i>
      <input type="text" class="text" value="" v-model="searchtxt">
      <i class="searchbtn el-icon-search" @click="dosearch"></i>
    </nav>
    <div class="box"></div>
    <section class="hotsearch">
      <ul class="hotlist">
        <li class="title">热搜榜</li>
        <li class="item" v-for="(item,index) in hotlist" 
        :key="index" @click="hotsearch(item.searchWord)">
          <span class="score">{{item.score}}</span>
          <span class="index" :class="index==0||index==1||index==2?'ishot':''">{{index + 1}}</span>
          <p class="searchWord">{{item.searchWord}}</p>
          <p class="content">{{item.content}}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import {getHotSearch} from '@/api/Search.js'

export default {
  name:'Search',
  data(){
    return {
      searchtxt: '',
      hotlist: '',
    }
  },
  computed: {

  },
  mounted(){
    this.searchtxt = this.$store.state.searchtxt;
    getHotSearch().then((res)=>{
      if(res.status == 200){
        this.hotlist = res.data.data;
      }
    }).catch(()=>{

    })
  },
  methods:{
    hotsearch(searchWord){
      this.$router.push({ path: '/searchpage', query: {keywords: searchWord} })
    },
    back(){
      this.$router.go(-1);
    },
    dosearch(){
      this.$store.commit("getSearchTxt",this.searchtxt);
      this.$router.push({ path: '/searchpage', query: {keywords: this.searchtxt} })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/sass/base.scss";

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
.hotlist{
  overflow: hidden;
  width: 92%;
  margin: 0 auto;
  .title{
    font-size: rem(30px);
    font-weight: 600;
    margin: rem(20px) 0;
  }
  .item{
    margin-bottom: rem(20px);
    height: rem(100px);
    display: block;
    .index{
      font-size: rem(34px);
      float: left;
      display: flex;
      align-items: center;
      height: rem(100px);
      width: rem(60px);
      color: #9D9D9D;
      font-weight: 600;
    }
    .searchWord{
      font-size: rem(32px);
      font-weight: 600;
      padding: rem(16px) 0 rem(10px);
    }
    .content{
      color:#9D9D9D;
    }
    .score{
      position: absolute;
      right: 4%;
      color:#9D9D9D;
      margin-top: rem(10px);
    }
  }
  .ishot{
    color: #E04B48 !important;
  }
}
</style>