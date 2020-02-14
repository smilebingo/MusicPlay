<template>
  <div class="recom">
    <header-nav></header-nav>
    <div class="content">
      <div class="listmsg">
        <section class="l-box">
          <img v-lazy="playlist.coverImgUrl" alt="">
        </section>
        <section class="r-box">
          <p class="slname">{{playlist.name}}</p>
          <span class="tag" v-for="(tag,index) in playlist.tags" :key="index">
            {{tag}}
          </span>
          <p class="description">{{playlist.description}}</p>
        </section>
      </div>
      <ul class="list">
         <li class="item" :class="index == currentIndex?'isplay':''" v-for="(song,index) in playlist.tracks" :key="index"
         @click="play(song,index)">
          <span class="index">{{index+1}}</span>
          <section class="box">
            <p class="nam">{{song.name}}</p>
            <p class="al">{{song.ar[0].name}} - {{song.al.name}}</p>
          </section>
        </li> 
      </ul>
    </div>
  </div>
</template>

<script>
import headerNav from '@/components/Header'
import {getTjSongList} from '@/api/index/indexApi.js';

export default {
  name: 'Recom',
  data () {
    return {
      playlist: '',             // 歌单音乐列表
      isplaying: false,         // 默认该列表下没有音乐播放
      currentIndex: 10000,      // 当前播放音乐的索引
    }
  },
  mounted:function(){
    let songid = this.$route.query.id;
    // 请求获取列表数据
    getTjSongList({id:songid}).then((res)=>{
      let data = res.data;
      if(data.code == 200){
        this.playlist = data.playlist;
      }else{
        this.$message({
          message: '歌曲无法播放！',
          center: true,
          customClass:"typebox"
        });
      }
    })
  },
  methods:{
    // 播放音乐
    play(data,index){
      if(this.playlist.tracks != this.$store.state.musiclist){
        this.$store.commit("getTjMusicList",this.playlist.tracks); // 将数据传递到全局里面
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
      this.$store.commit("getIsPlaying",this.isplaying);  // 将状态传递给全局
      this.$store.commit("getTjIndex",this.currentIndex);   // 将索引传递给全局
    }
  },
  components:{
    headerNav
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/base.scss';

.content{
  width: 100%;
  .listmsg{
    width: 92%;
    margin: rem(40px) auto;
    display: flex;
    .l-box{
      margin-right: rem(30px);
      img{
        width: rem(210px);
        height: rem(210px);
      }
    }
    .r-box{
      .slname{
        font-size: rem(33px);
        font-weight: 600;
      }
      .tag{
        margin: rem(10px) rem(20px) rem(10px) 0;
        display: inline-block;
      }
      .description{
        color: #888;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }
  .list{
    width: 96%;
    padding: rem(20px) 0;
    display: block;
    .item{
      display: flex;
      width: 96%;
      overflow: hidden;
      font-size: rem(32px);
      padding-left: 4%;
      .index{
        float: left;
        display: block;
        width: rem(40px);
        height: rem(120px);
        text-align: center;
        line-height: rem(120px);
        margin-right: 4%;
      }
      // 歌曲信息
      .box{
        float: left;
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        .al{
          font-size: rem(20px);
          color: #888;
        }
      }
      
    }
    .isplay{
      border-left: rem(16px) solid #FE1E12;
    }
  }
}
</style>
