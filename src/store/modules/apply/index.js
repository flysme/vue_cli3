import { SETSTORE_INFO } from '@/store/mutations-type'
import API from '@/http';
import UTILS from '@/utils/utils';
const apply = {
  state: {
  },
  actions: {
    /*申请店铺*/
    SETSTOREINFO ({ commit }, data) {
      console.log(commit);
      return new Promise((resolve,reject)=>{
        API.applyStore(data).then(res=>{
            commit(SETSTORE_INFO,res.data);
            resolve(res.data)
        }).catch(err=>{
          reject(err)
        })
      })
    },
    /*切换店铺*/
    SWITCHSTORE ({commit}, data) {
      console.log(commit);
      return new Promise((resolve,reject)=>{
        API.switchUserStore(data).then(res=>{
            let userinfo = UTILS.storage.get('userinfo');
            userinfo.store_id = res.data.store_id;
            UTILS.storage.set('userinfo',userinfo);
            resolve(res.data)
        }).catch(err=>{
          reject(err)
        })
      })
    }
  },
  mutations: {
    [SETSTORE_INFO] (state, data) {
      let userinfo = UTILS.storage.get('userinfo');
      userinfo.store_id = data.store_id;
      userinfo.store_info = data.storeinfo;
      UTILS.storage.set('userinfo',userinfo);
    }
  },
  namespaced: true
}

export default apply
