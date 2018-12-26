import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


const router = [
  {
    path:'/',
    name:'home',
    component: ()=>(import('@/views/Home'))
  }
]




export default new Router({
  mode: 'history',
  routes:[
  ...router
]})
