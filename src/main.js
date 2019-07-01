import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'

import 'iview/dist/styles/iview.css'

Vue.use(iView)

/* 全局前置守卫*/
router.beforeEach((to, from, next) => {
    /* 如果有token并且token不为空继续跳转 */
    if ( to.path == '/login' || localStorage.getItem("username") ) {
      next()
    } else {
      next({
        path: '/login',
        replace:true
      })
    }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
