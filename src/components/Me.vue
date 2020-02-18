<template>
  <div class="me">
    这里是我的页面
    <router-link :to="{ path: '/Mv/mvdetail'}">跳转</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>