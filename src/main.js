import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementUi from 'element-ui'
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'
import '@/scss/global/var.scss'
import '@/assets/iconfont/iconfont.scss'
import store from './store';
import AMap from 'vue-amap';
Vue.use(ElementUi)
Vue.use(Vuex)
Vue.use(AMap)
Vue.config.productionTip = false
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 申请的高德key
  key: '5f3a065f385b0395d7a5df8af8c370b2',
  // 插件集合
  plugin: ['AMap.PlaceSearch', 'AMap.Geolocation','AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType']
});
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
