import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import scss from './assets/scss/main.scss'

import router from './router.js'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  store,
  BootstrapVue,
  scss,
  router,
  render: h => h(App)
}).$mount('#app')
