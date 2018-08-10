import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from './store'
import routes from './router/routes'
import './assets/style/style.styl'

import App from './app.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
})

sync(store, router)

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
})
