import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index'
import Mv from '@/components/Mv'
import Me from '@/components/Me'
import Search from '@/components/Search'

import SearchPage from '@/components/Search/SearchPage'

import Recom from '@/components/Index/Recom'
import MusicDetail from '@/components/Index/MusicDetail'
import Login from '@/components/Index/Login'

import MvDetail from '@/components/Mv/MvDetail'

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
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/searchpage',
      name: 'SearchPage',
      component: SearchPage
    },
    {
      path: '/mv',
      name: 'Mv',
      component: Mv,
      children:[
        {
          path: 'mvdetail',
          component: MvDetail
        }
      ]
    },
    {
      path: '/me',
      name: 'Me',
      component: Me
    },
    {
      path: '/*',
      redirect:'/index'
    },
  ]
})
