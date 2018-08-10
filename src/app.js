import Vue from 'vue'
import App from './app.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './utils/title'

import 'assets/style/style.styl'

Vue.mixin(titleMixin)

export function createApp () {
  // 同步路由状态(route state)到 store
  sync(store, router)
  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  // 暴露 app, router 和 store。
  return {app, router, store}
}
