import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementUi from 'element-ui'
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'
import '@/scss/global/var.scss'
import '@/assets/iconfont/iconfont.scss'
import store from './store';

Vue.use(ElementUi)
Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
