import Vue from 'vue'
import Router from 'vue-router'
import AppHome from '@/components/AppHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppHome',
      component: AppHome
    }
  ]
})
