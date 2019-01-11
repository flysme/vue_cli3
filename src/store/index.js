import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import goodsList from '@/store/modules/goodsList'
import product_category from '@/store/modules/goods_category'
import apply from '@/store/modules/apply'

console.log(goodsList,'goodsList')
export default new Vuex.Store({
  modules: {
    goodsList,
    apply,
    product_category
  }
})
