import { LOADSTORESETTING } from '@/store/mutations-type'
import API from '@/http';

const store_setting = {
  state: {
    settingInfo:{}
  },
  actions: {
    /*获取店铺设置信息*/
    LOAD_STORESETTING ({ commit }, data) {
      return new Promise((resolve,reject)=>{
        API.getStoreSetting(data).then(res=>{
          if (res.status == 0) {
            commit(LOADSTORESETTING,res.data);
            resolve(res.data);
          } else {
            reject(res);
          }
        }).catch(err=>{
            reject(err);
        })
      })
    },
    /*生成店铺设置信息*/
    SET_SETOREBUSINESS ({ commit }, data) {
      return new Promise((resolve,reject)=>{
        API.setStoreSetting(data).then(res=>{
          if (res.status == 0) {
            resolve();
          } else {
            reject(res);
          }
        })
      })
    },
    /*更新店铺设置信息*/
    UPDATE_SETOREBUSINESS ({ commit }, data) {
      return new Promise((resolve,reject)=>{
        API.updateStoreSetting(data).then(res=>{
          if (res.status == 0) {
            resolve();
          } else {
            reject(res);
          }
        })
      })
    }
  },
  mutations: {
    [LOADSTORESETTING] (state, data) {
      state.settingInfo = data;
    }
  },
  namespaced: true
}

export default store_setting
