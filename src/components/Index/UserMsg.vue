<template>
  <div id="usermsg">
    <img v-lazy="$store.state.user.picurl" class="userpic" alt />
    <p class="username">{{$store.state.user.name}}</p>
    <button class="loginbtn" @click="gologin()">{{islogin ? '退出登录':'点击登录'}}</button>
  </div>
</template>

<script>
import axios from 'axios';
import {loginout} from '@/api/UserApi.js'

export default {
  name: 'UserMsg',
  data () {
    return {
      islogin: false,
    }
  },
  mounted: function(){
    this.islogin = this.$store.state.islogin;
  },
  computed: {

  },
  methods:{
    gologin() {
      if (!this.islogin) {
        this.$router.push("/login");
      }else{
        loginout().then((res)=>{
          // console.log(res);
          if(res.data.code == 200){
            this.$store.commit("getLogin",false);
            let obj = {};
            obj.id = '';
            obj.name = '尚未登录';
            obj.picurl = '../assets/logo.png';
            this.$store.commit('getUserMsg',obj);
          }
        })
      } 
    },
  }
}
</script>
<style scoped lang="scss">
</style>