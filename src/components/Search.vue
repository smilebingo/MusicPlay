<template>
  <div id="search">
    <nav class="searchbox">
      <i class="goback el-icon-back" @click="back"></i>
      <input type="text" class="text" v-model="searchtxt">
      <i class="searchbtn el-icon-search" @click="dosearch"></i>
    </nav>
    <div class="box"></div>

  </div>
</template>

<script>

export default {
  name:'Search',
  data(){
    return {
      searchtxt: '',
    }
  },
  computed: {

  },
  mounted(){

  },
  methods:{
    back(){
      this.$router.go(-1);
    },
    dosearch(){
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
</style>