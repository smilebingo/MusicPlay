<template>
  <div id="app">
    <!-- 头部菜单 -->
    <header class="top" v-if="tabType">
      <el-button class="lbtn" @click="drawer = true">
        <i class="el-icon-s-fold"></i>
      </el-button>
      <ul class="menulist">
        <router-link
          to="/index"
          tag="li"
          :class="resPath == 'index' || resPath == ''?'changemenu':''"
          class="menu"
        >首页</router-link>
        <router-link to="/mv" tag="li" :class="resPath == 'mv'?'changemenu':''" class="menu">MV</router-link>
        <router-link to="/me" tag="li" :class="resPath == 'me'?'changemenu':''" class="menu">我的</router-link>
      </ul>
      <el-button class="rbtn">
        <router-link tag="i" class="el-icon-search" to="/search"></router-link>
      </el-button>
    </header>
    <div class="tnothing" v-if="tabType"></div>
    <!-- 左边弹窗 -->
    <div class="userbox" v-if="tabType">
      <el-drawer :visible.sync="drawer" :direction="direction" style="width:250%">
        <div class="userbox">
          <user-box></user-box>
        </div>
      </el-drawer>
    </div>
    <router-view/>
    <!-- 底部音乐盒子 -->
    <music-box></music-box>
  </div>
</template>

<script>
import {getUser,getStatus} from '@/api/UserApi.js';
import userBox from '@/components/Index/UserMsg';
import musicBox from '@/components/MusicPlayer';

export default {
  name: 'App',
  data () {
    return {
      drawer: false,
      direction: "ltr",
      // islogin: false,
      tabType: true, // 菜单显示状态

    }
  },
  // 计算属性
  computed: {
    // 获取当前路由
    resPath: function() {
      let arr = this.$route.path.split("/")[1];
      return arr;
    },
  },
  watch: {
    // 监听当前路由
    $route(e) {
      // console.log("路由");
      // console.log(e)
      if (e.name == "Index" || e.name == "Mv" || e.name == "Me") {
        this.tabType = true;
      } else {
        this.tabType = false;
      }
    },
  },
  methods:{

  },
  mounted: function(){
    // getUser({phone:13421133486,password:123}).then((res)=>{
    //   console.log(res)
    // })
    // console.log(getUser(123))
    // getStatus().then((res)=>{
    //   console.log(res)
    // }).catch((err)=>{
    //   console.log(err)
    // })
    // getUser(13421133486,123).then((res)=>{
    //   console.log(res)
    // })
    // console.log(getUser())
    // axios.post("http://localhost:3000/login/cellphone?phone=13421133486&password=123").then((res)=>{
    //   console.log(res)
    // })
  },
  components:{
    userBox,musicBox
  }
}
</script>

<style lang="scss">
@import './assets/sass/base.scss';
@import "./assets/sass/header.scss";

// 侧边个人信息盒子
.userbox {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .userpic {
    width: rem(150px);
    height: rem(150px);
    border-radius: 50%;
    border: rem(3px) solid #b4b4b4;
    position: relative;
    top: rem(-30px);
    display: block;
  }
  .username {
    display: block;
    font-size: rem(30px);
    // margin-bottom: rem(80px);
  }
  .loginbtn {
    width: 50%;
    height: rem(60px);
    line-height: rem(60px);
    background: #ff1f15;
    color: #fff;
    border: 0;
    border-radius: rem(5px);
    margin-top: rem(30px);
  }
}
// 头部菜单
.top {
  width: 100%;
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 0;
  height: rem(100px);
  z-index: 999;
  background: #fff;
  // 左边
  .el-button {
    border: 0;
    font-size: rem(40px);
    padding: 0;
    height: rem(100px);
    width: 14%;
    line-height: rem(100px);
  }
  // 中间
  .menulist {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    .menu {
      font-size: rem(32px);
      width: 24%;
      display: block;
      color: #888;
      text-align: center;
    }
    .changemenu {
      font-weight: 600;
      color: #000;
    }
  }
}
.tnothing {
  width: 100%;
  height: rem(100px);
}
</style>
