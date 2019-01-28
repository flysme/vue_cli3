import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import product from '@/store/modules/products'
import product_category from '@/store/modules/goods_category'
import apply from '@/store/modules/apply'
import login from '@/store/modules/login'

export default new Vuex.Store({
  modules: {
    product,
    apply,
    product_category,
    login
  }
})
