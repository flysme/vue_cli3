import Vue from 'vue'
import VueRouter from 'vue-router'
import UTILS from '@/utils/utils'
Vue.use(VueRouter)


const route = [
  {
    path:'/',
    name:'home',
    component: ()=>(import('@/views/Home'))
  },
  {
    path:'/register',
    name:'register',
    component: ()=>(import('@/views/register'))
  },
  {
    path:'/login',
    name:'login',
    component: ()=>(import('@/views/Login'))
  },
  {
    path:'/apply',
    name:'apply',
    component: ()=>(import('@/views/apply'))
  },
  {
    path:'/switchstore',
    name:'switch.store',
    component: ()=>(import('@/views/Containers/switchstore'))
  },
  {
    path:'/storeList',
    name:'store.list',
    component: ()=>(import('@/views/storeList'))
  },
  {
    path:'/main/container/',
    name:'main.container',
    component: ()=>(import('@/views/Container')),
    redirect: '/overview',
    children: [
        {
           name:'main.container.overview',
           path: '/overview',
           component: ()=>(import('@/views/Containers/overview')),
           meta: { requiresAuth: true }
        },
        {
           name:'main.container.goods.goodsList',
           path: '/goods/goodsList',
           component: ()=>(import('@/views/Containers/goods/goodsList')),
           meta: { requiresAuth: true }
        },
        {
           name:'main.container.goods.editgoods',
           path: '/goods/editgoods/:product_id',
           props: (route) => ({ product_id: route.params.product_id }),
           component: ()=>(import('@/views/Containers/goods/editgoods')),
           meta: { requiresAuth: true }
        },
        {
           name:'main.container.goods.addgoods',
           path: '/goods/addgoods',
           component: ()=>(import('@/views/Containers/goods/editgoods')),
           meta: { requiresAuth: true }
        },
        {
           name:'main.container.goods.goodsCats',
           path: '/goods/goodsCats',
           component: ()=>(import('@/views/Containers/goods/goodsCats')),
           meta: { requiresAuth: true }
        },
        {
           name:'main.container.order.orderList',
           path: '/order/orderList',
           component: ()=>(import('@/views/Containers/order/orderList')),
           meta: { requiresAuth: true }
        },
        {
           name:'main.container.order.overview',
           path: '/order/orderoverview',
           component: ()=>(import('@/views/Containers/order/order_overview')),
           meta: { requiresAuth: true }
        },
        {
           name:'main.container.order.orderevaluate',
           path: '/order/orderevaluate',
           component: ()=>(import('@/views/Containers/order/order_evaluate')),
           meta: { requiresAuth: true }
        }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes:[
  ...route
]})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!UTILS.storage.get('userinfo')) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
