import Vue from 'vue'
import Router from 'vue-router'

import Profile from '@/components/Profile'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      component: app
    },
    { // sample route
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
