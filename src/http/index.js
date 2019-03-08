import axios from 'axios';
import qs from 'qs';
import router from '@/router';
import { Message } from 'element-ui';
// https://api.freshxiaomei.com/v1/trading/community/groupbuy/5c20d59c94303925bc0eedab/tradings
// const Baseurl = 'https://www.easy-mock.com/mock/5c22db120639a3144b2f0dba/api'
// const Baseurl = 'http://www.vuetext.com:8084'

const http = axios.create({
  // baseURL: Baseurl,
  timeout: 600,
  headers: {
       'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
   }
   // headers: {'X-Custom-Header': 'foobar'
})


//http request 拦截器
http.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
//http request 响应拦截器即异常处理
http.interceptors.response.use(res => {
    if (res.data.status > 0) {
      console.log(res.data);

      switch (res.data.status) {
        case 401:
          res.data.msg = '未授权，请重新登录';
          router.push({name:'login'})
          break;
        case 403:
          res.data.msg = '拒绝访问'
          break;
        case 404:
          res.data.msg = '请求错误,未找到该资源'
          break;
        case 405:
          res.data.msg = '请求方法未允许'
          break;
        case 408:
          res.data.msg = '请求超时'
          break;
        case 500:
          res.data.msg = '服务器端出错'
          break;
        case 501:
          res.data.msg = '网络未实现'
          break;
        case 502:
          res.data.msg = '网络错误'
          break;
        case 503:
          res.data.msg = '服务不可用'
          break;
        case 504:
          res.data.msg = '网络超时'
          break;
        case 505:
          res.data.msg = 'http版本不支持该请求'
          break;
      }
      Message.error(res.data.msg);
      return Promise.reject(res.data);
    } else {
      return Promise.resolve(res.data);
    }
 }, err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.msg = '错误请求'
          break;
        case 401:
          err.msg = '未授权，请重新登录'
          break;
        case 403:
          err.msg = '拒绝访问'
          break;
        case 404:
          err.msg = '请求错误,未找到该资源'
          break;
        case 405:
          err.msg = '请求方法未允许'
          break;
        case 408:
          err.msg = '请求超时'
          break;
        case 500:
          err.msg = '服务器端出错'
          break;
        case 501:
          err.msg = '网络未实现'
          break;
        case 502:
          err.msg = '网络错误'
          break;
        case 503:
          err.msg = '服务不可用'
          break;
        case 504:
          err.msg = '网络超时'
          break;
        case 505:
          err.msg = 'http版本不支持该请求'
          break;
        default:
          err.msg = `连接错误${err.response.status}`
      }
    } else {
      err.msg = "连接到服务器失败"
    }
    return Promise.reject(err);
})


const stringify = (data)=>{
  return qs.stringify(data)
}

/*
* get请求
* @methods axios get
* @params url
* @params params
*/
const fetchGet = (url, params={})=> {
  return http.get(url, {params})
}

/*
* post请求
* @methods axios post
* @params url
* @params data
*/
const fetchPost = (url, data={})=> {
  return http.post(url, stringify(data))
}

/*
* put请求
* @methods axios put
* @params url
* @params data
*/
const fetchPut = (url, data={})=> {
  return http.put(url, stringify(data))
}

/*
* delete请求
* @methods axios delete
* @params url
* @params data
*/
const fetchDelete = (url, data={})=> {
  return http.delete(url, {data:stringify(data)})
}

/*
* 请求url
*/
const URL = {
  login: 'api/login.php', //登录
  loginout: 'api/loginout.php', //退出登录
  register: 'api/register.php', //注册
  applystore: 'api/apply_store.php', //开通店铺
  switchUserStore: 'api/switchUserStore.php', //切换店铺
  getuserStore: 'api/getuserStore.php', //获取店铺状态
  create_category: 'api/edit_category.php', //新建商品分类
  delete_catesgory: 'api/deleteCatesgorys.php', //删除商品分类
  get_category: 'api/getProductcategory.php', //获取商品分类
  create_products: 'api/create_product.php', //创建商品
  get_products: 'api/getproductList.php', //获取商品
  get_products_details: 'api/getProductDetail.php', //获取商品详情
  updateProductStatus: 'api/updateProduct.php', //更新商品状态
  editProducts: 'api/editProductDetail.php', //编辑商品信息
  storeSetting: 'api/store_setting.php', //店铺设置
}

/*
* 请求API
*/
const API = {
  login: (params)=>{
    return fetchPost(URL.login, params)
  },
  loginout: ()=>{
    return fetchGet(URL.loginout)
  },
  register:(params)=>{
    return fetchPost(URL.register, params)
  },
  applyStore: (params)=> {
    return fetchPost(URL.applystore, params)
  },
  switchUserStore: (params)=> {
    return fetchPost(URL.switchUserStore, params)
  },
  getuserStore :()=> {
    return fetchGet(URL.getuserStore)
  },
  create_category: (params)=> {
    return fetchPost(URL.create_category, params)
  },
  update_category: (params)=> {
    return fetchPut(URL.create_category, params)
  },
  delete_category: (params)=> {
    return fetchPut(URL.delete_catesgory, params)
  },
  get_category: (params)=> {
    return fetchGet(URL.get_category, params)
  },
  create_products: (params)=> {
    return fetchPost(URL.create_products, params)
  },
  editProducts: (params)=> {
    return fetchPost(URL.editProducts, params)
  },
  get_products: (params)=> {
    return fetchGet(URL.get_products, params)
  },
  get_products_details: (params)=> {
    return fetchGet(URL.get_products_details, params)
  },
  updateProductStatus: (params)=> {
    return fetchPut(URL.updateProductStatus, params)
  },
  deleteProductStatus: (params)=> {
    return fetchDelete(URL.updateProductStatus, params)
  },
  getStoreSetting: (params)=> {
    return fetchGet(URL.storeSetting, params)
  },
  setStoreSetting: (params)=> {
    return fetchPost(URL.storeSetting, params)
  },
  updateStoreSetting: (params)=>{
    return fetchPut(URL.storeSetting, params)
  }
}

export default API
