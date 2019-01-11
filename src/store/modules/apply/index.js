import { SETSTORE_INFO } from '@/store/mutations-type'
import API from '@/http';
import UTILS from '@/utils/utils';
const apply = {
  state: {
    store_info:UTILS.storage.get('storeinfo') || {},
  },
  actions: {
    SETSTOREINFO ({ commit }, data) {
      return new Promise((resolve,reject)=>{
        API.applyStore(data).then(res=>{
            commit(SETSTORE_INFO,res.data)
            resolve(res.data)
        }).catch(err=>{
          reject(err)
        })
      })
    }
  },
  mutations: {
    [SETSTORE_INFO] (state, data) {
      state.store_info = data;
      UTILS.storage.set('storeinfo',data);
    }
  },
  namespaced: true
}

export default apply
