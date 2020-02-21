<template>
  <div class="me">
    <!-- 这里是我的页面 -->
    <!-- <router-link :to="{ path: '/Mv/mvdetail'}">跳转</router-link> -->
    <!-- <router-view></router-view> -->
    <div class="gologin" v-if="!islogin">

    </div>
    <div class="mybox" v-if="islogin">
      <div class="msgbox">
        <img class="pic" v-lazy="user.picurl" alt="">
        <p class="name">{{user.name}}</p>
      </div>
      <ul class="myList">
        <li class="title">我的歌单</li>
        <li class="item" @click="req(item.id)"
        v-for="(item,index) in playlist" :key="index">
          <img class="pic" v-lazy="item.coverImgUrl" alt="加载失败">
          <p class="name">{{item.name}}</p>
          <span class="songnum">{{item.trackCount}} 首</span>
        </li>
      </ul>
      <ul class="myList">
        <li class="title">推荐歌单</li>
        <li class="item" @click="req(item.id)"
        v-for="(item,index) in recommend" :key="index">
          <img class="pic" v-lazy="item.picUrl" alt="加载失败">
          <p class="name">{{item.name}}</p>
          <span class="songnum">{{item.trackCount}} 首</span>
        </li>
      </ul>
        
    </div>
    
  </div>
</template>

<script>
import {getPlayList,getResource} from '@/api/Me/Me.js'

export default {
  data(){
    return {
      islogin: false,
      user: '',
      playlist: '',                            // 我的歌单
      recommend: '',                           // 推荐歌单
    }
  },
  mounted(){
    console.log(this.$store.state)
    // console.log(this.$store.state.islogin)
    let data = this.$store.state;
    this.islogin = this.$store.state.islogin;
    if(data.islogin){
      this.user = data.user;
      // console.log(this.user.id)
      getPlayList({uid: this.user.id}).then((res)=>{
        console.log(res)
        if(res.status == 200){
          this.playlist = res.data.playlist;
        }
      }).catch(()=>{

      })
      getResource().then((res)=>{
        console.log(res)
        if(res.status == 200){
          this.recommend = res.data.recommend;
        }
      }).catch(()=>{

      })
    }
  },
  computed:{
    listenlogin(){
      return this.$store.state.islogin;
    }
  },
  watch:{
    listenlogin(isplay){
      console.log(isplay)
      this.islogin = isplay; 
    }
  },
  methods:{
    req(id){
      console.log(id)
      // this.$router.push({path: "/songlist",query: {id: id}});     
      
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/base.scss';

.msgbox{
  width: 90%;
  padding: rem(40px) 5%;
  .pic{
    width: rem(150px);
    height: rem(150px);
    border-radius: 50%;
    float: left;
    margin-right: 4%;
  }
  .name{
    font-size: rem(36px);
    font-weight: 600;
    margin-top: rem(20px);
  }
}
.myList{
  overflow: hidden;
  border-radius: rem(30px);  
  box-sizing: border-box;
  padding: rem(40px) 5%;
  width: 100%;
  .title{
    font-size: rem(32px);
    font-weight: 600;
    padding: rem(20px) 0;
    display: block;
    clear: both;
  }
  .item{
    width: 50%;
    float: left;
    display: block;
    overflow: hidden;
    box-sizing: border-box;
    padding-right: 4%;
    margin: rem(20px) 0;
    .pic{
      width: rem(120px);
      border-radius: rem(20px);
      float: left;
      margin-right: 4%;
    }
    .name{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      height: rem(66px);
      margin-top: rem(6px);
    }
    .songnum{
      color: #BFBFBF;
    }
  }
}

</style>