import { LOADLOGIN } from '@/store/mutations-type'
import API from '@/http';
import UTILS from '@/utils/utils';

const goodsList = {
  state: {
    userInfo:{}
  },
  actions: {
    LOAD_LOGIN ({ commit }, data) {
      return new Promise((resolve,reject)=>{
        API.login(data).then(res=>{
           UTILS.storage.set('userinfo',res.data);
           commit(LOADLOGIN,res.data);
           resolve(res.data);
        }).catch(err=>{
          reject(err);
        })
      })
    }
  },
  mutations: {
    [LOADLOGIN] (state, data) {
      state.userInfo = data
    }
  },
  namespaced: true
}

export default goodsList
