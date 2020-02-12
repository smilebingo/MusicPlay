<template>
  <div class="header">
    <!-- 这里是recom页面 -->
    <header class="nav">
      <i class="goback el-icon-back" @click="back"></i>
    </header>
    <div class="box"></div>
  </div>
</template>

<script>

export default {
  name: 'Header',
  methods:{
    back(){
      this.$router.go(-1);
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/sass/base.scss';
.nav{
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
  background: #fff;
  box-sizing: border-box;
  padding-left: 3%;
  .goback{
    padding: rem(20px) 0;
  }
}
.box{
  width: 100%;
  height: rem(90px);
}
</style>