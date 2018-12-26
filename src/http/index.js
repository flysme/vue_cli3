import axios from 'axios'
// https://api.freshxiaomei.com/v1/trading/community/groupbuy/5c20d59c94303925bc0eedab/tradings
// const Baseurl = 'https://www.easy-mock.com/mock/5c22db120639a3144b2f0dba/api'
const Baseurl = 'https://api.freshxiaomei.com/v1/'

const URL = {
  getTradings: 'https://www.easy-mock.com/mock/5c22db120639a3144b2f0dba/api/getTradings'
  // getTradings: '/getTradings'
  // getTradings: 'trading/community/groupbuy/5c20d59c94303925bc0eedab/tradings'
}

const http = axios.create({
  // baseURL: Baseurl,
  timeout: 1000
})

console.log(http, 'instance')

const API = {
  getTradings:(params)=>{
    return http.get(URL.getTradings, params)
  }
}

export default API
