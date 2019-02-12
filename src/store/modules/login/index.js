import { LOADLOGIN,GET_STORE_INFO } from '@/store/mutations-type'
import API from '@/http';
import UTILS from '@/utils/utils';

const goodsList = {
  state: {
    currentStore:UTILS.storage.get('storeinfo') || {},
    storeStatus:'',
  },
  actions: {
    LOAD_LOGIN ({ commit }, data) {
      return new Promise((resolve,reject)=>{
        API.login(data).then(res=>{
           commit(LOADLOGIN,res.data);
           resolve(res.data);
        }).catch(err=>{
          reject(err);
        })
      })
    },
    GET_STORE_INFO ({commit}) {
      return new Promise((resolve,reject)=>{
        API.getuserStore().then(res=>{
           commit(GET_STORE_INFO,res.data);
           resolve(res.data);
        }).catch(err=>{
          reject(err);
        })
      })
    }
  },
  mutations: {
    [LOADLOGIN] (state, data) {
      state.userInfo = data;
      UTILS.storage.set('userinfo',state.userInfo);
    },
    [GET_STORE_INFO] (state, data) {
      UTILS.storage.set('storeinfo',data.store);
      state.currentStore = data.store;
      let statusmapping = new Map([
        ['-1',{title:'店铺等待审核中，请等待',canhandle:false}],
        ['0',{title:'店铺正在审核中，请等待',canhandle:false}],
        ['1',{title:'店铺开通成功',canhandle:true}],
        ['2',{title:'店铺已被注销',canhandle:false}],
      ]);
      state.storeStatus = statusmapping.get(state.currentStore.status);
    }
  },
  namespaced: true
}

export default goodsList
