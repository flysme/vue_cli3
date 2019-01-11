import axios from 'axios';
import qs from 'qs';
// https://api.freshxiaomei.com/v1/trading/community/groupbuy/5c20d59c94303925bc0eedab/tradings
// const Baseurl = 'https://www.easy-mock.com/mock/5c22db120639a3144b2f0dba/api'
// const Baseurl = 'http://www.vuetext.com:8084'

const http = axios.create({
  // baseURL: Baseurl,
  timeout: 1000,
  headers: {
       'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
   }
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
      return Promise.reject(res.data)
    } else {
      return Promise.resolve(res.data);
    }
 }, err => {
     console.log(err, 'err--------')
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
* 请求url
*/
const URL = {
  login: 'api/login.php', //登录
  register: 'api/register.php', //注册
  applystore: 'api/apply_store.php', //开通店铺
  create_category: 'api/create_category.php', //新建商品分类
  get_category: 'api/getProductcategory.php', //获取商品分类
}

/*
* 请求API
*/
const API = {
  login: (params)=>{
    return fetchPost(URL.login, params)
  },
  register:(params)=>{
    return fetchPost(URL.register, params)
  },
  applyStore: (params)=> {
    return fetchPost(URL.applystore, params)
  },
  create_category: (params)=> {
    return fetchPost(URL.create_category, params)
  },
  get_category: (params)=> {
    return fetchGet(URL.get_category, params)
  }
}

export default API
