<template>
  <div class="songlist">

  </div>
</template>

<script>
import {getListDetail} from '@/api/Me/Me.js'

export default {
  name: 'SongList',
  data(){
    return {
    }
  },
  mounted(){
    let id = this.$route.query.id;
    console.log(this.$route.query.id)
    getListDetail({id:id}).then((res)=>{
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/base.scss';

</style>