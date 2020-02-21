<template>
  <div class="login">
    <header-nav></header-nav>
    <div class="formbox">
      <h1>手机号登录</h1>
      <label class="box">
        <span class="title">手机号：</span>
        <input focus class="input" type="number" v-model="phone" >
      </label>
      <label class="box">
        <span class="title">密码：</span>
        <input class="input" type="password" v-model="pwd" >
      </label>
      <button class="loginbtn" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import headerNav from '@/components/Header'
import {getUser} from '@/api/UserApi.js'

export default {
  name: 'Login',
  data () {
    return {
      phone: '',
      pwd:'',
    }
  },
  methods:{
    login(){
      if(!(/^1[3456789]\d{9}$/.test(this.phone))){ 
        // console.log("手机号码有误，请重填");  
        this.$message({
          message: '手机号码有错误，请重新输入！',
          center: true,
          customClass:"typebox"
        });
        return; 
      } 
      getUser({phone: this.phone, password: this.pwd}).then((res)=>{
        // console.log(res)
        if(res.status == 200){
          if(res.data.code == 502){             // 登录失败
            this.$message({
              message: res.data.msg,
              center: true,
              customClass:"typebox"
            });
          }else if(res.data.code == 200){       // 登录成功
            if(res.data.loginType == 1){
              this.$store.commit('getLogin',true);
              let obj = {};
              obj.id = res.data.profile.userId;
              obj.name = res.data.profile.nickname;
              obj.picurl = res.data.profile.avatarUrl;
              this.$store.commit('getUserMsg',obj);
              setTimeout(()=>{
                this.$router.go(-1);
              },200)
            }
          }
        }else{
          this.$message({
            message: '请求失败，请检查或者重新点击！',
            center: true,
            customClass:"typebox"
          });
        }
      })
    },
  },
  components:{
    headerNav
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/sass/base.scss';

.formbox{
  width: 60%;
  // background: #ff6699;
  margin: rem(200px) auto 0;
  text-align: center;
  height: rem(400px);
  h1{
    margin-bottom: rem(40px);
  }
  .box{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: rem(20px) 0;
    .title{
      width: 30%;
      text-align: left;
    }
    .input{
      height: rem(60px);
      border: rem(1px) solid #B2B2B2;
      box-sizing: border-box;
      padding-left: 4%;
    }
  }
  .loginbtn{
    width: 100%;
    margin-top: rem(16px);
    height: rem(60px);
    background: #ff1f15;  
    border: 0;
    color: #fff;
    border-radius: rem(10px);
  }
}
</style>