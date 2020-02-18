<template>
  <div id="mv">
    <!-- 121 -->
    <ul class="listitem" v-if="resPath">
      <!-- <li @click="doplay(item.id)" v-for="(item,index) in MvList" :key="index"> -->
      <router-link tag="li" :to="{ path: '/Mv/mvdetail', query: { id: (item.id)}}"
      v-for="(item,index) in MvList" :key="index">
        <section class="tbox">
          <img class="bg" v-lazy="item.cover" alt="" v-if="index != Currindex">
          <section class="doplay" v-if="index != Currindex">
            <i class="iconfont icon-ziyuan"></i>
          </section>
        </section>
        <section class="mbox">
          <p class="title">{{item.name}}</p>
        </section>
        <section class="bbox">
          <span class="artists">发布人：{{item.artistName}}</span>
          <span class="play">播放量：{{item.playCount}}</span>
        </section>
      </router-link>
    </ul>
    <router-view v-if="!resPath"></router-view>
    <infinite-loading v-if="isShow" @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import {getMvList,getMvUrl} from '@/api/Mv/Mv.js'
import InfiniteLoading from 'vue-infinite-loading';

export default {
  name: 'Mv',
  data () {
    return {
      // hidden: false,
      MvList: '',
      isShow: true,
      limit: 5,
      page: 10,
      Currindex: 10000,
      video: {
        url:''
      },
    }
  },
  computed: {
    // 获取当前路由
    resPath: function() {
      let arr = this.$route.path.split("/")[1];
      // console.log(arr)
      if(arr == "mv"){
        this.isShow = true;
        return true;
      }else{
        this.isShow = false;
        return false;
      }
    },
  },
  mounted(){
    getMvList({limit: this.limit}).then((res)=>{
      console.log(res.data.data)
      if(res.status == 200){
        this.MvList = res.data.data;
      }
    })
  },
  methods:{
    infiniteHandler($state){
      setTimeout(()=>{
        getMvList({limit:10,offset:this.page+10}).then((res)=>{
          if(res.status == 200){
            this.page = this.page +10;
            this.MvList = this.MvList.concat(res.data.data);
            if(res.data.data.length == 0){
              this.isShow = false;
              return;
            }
            $state.loaded();
          }
        })
      },200);
    }
  },
  components:{
    InfiniteLoading
  }
}
</script>
<style lang="scss">
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
      height: rem(380px);
      margin: 0 auto;
      overflow: hidden;
      position: relative;
      .bg{
        width: 100%;
        height: rem(380px);
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
    .bbox{
      width: 90%;
      margin: rem(20px) auto 0;
      .play{
        float: right;
      }
    }
  }
}
</style>