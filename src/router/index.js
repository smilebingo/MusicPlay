import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index'
import Recom from '@/components/Index/Recom'
import MusicDetail from '@/components/Index/MusicDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/recom',
      name: 'Recom',
      component: Recom
    },
    {
      path: '/musicdetail',
      name: 'MusicDetail',
      component: MusicDetail
    },
    // {
    //   path: '/recom',
    //   name: 'Recom',
    //   component: Recom
    // },
    {
      path: '/*',
      redirect:'/index'
    },
  ]
})
