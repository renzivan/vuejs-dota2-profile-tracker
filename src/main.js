import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { store } from './store/store'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import scss from './assets/scss/main.scss'

import routes from './routes.js'

Vue.config.productionTip = false

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.use(BootstrapVue)

new Vue({
  store,
  BootstrapVue,
  scss,
  router,
  render: h => h(App)
}).$mount('#app')
