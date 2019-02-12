import { GETCATEGORYS } from '@/store/mutations-type';
import API from '@/http';

const product_category = {
  state: {
    categorysList:[]
  },
  actions: {
    /*新增分类*/
    SET_CATEGORYS ({ commit },data) {
      console.log(commit);
      return new Promise((resolve,reject)=>{
        API.create_category(data).then(res=>{
          if (res.status == 0) {
            resolve();
          } else {
            reject(res);
          }
        })
      })
    },
    /*获取分类*/
    GET_CATEGORYS ({ commit },data) {
      console.log(commit);
      return new Promise((resolve,reject)=>{
        API.get_category(data).then(res=>{
          if (res.status == 0) {
            commit(GETCATEGORYS,res.data.categorys);
            resolve(res.data.categorys);
          } else {
            reject(res);
          }
        })
      })
    },
    /*修改分类*/
    UPDATE_CATEGORYS ({commit},data) {
      console.log(commit);
      return new Promise((resolve,reject)=>{
        API.update_category(data).then(res=>{
          if (res.status == 0) {
            resolve();
          } else {
            reject();
          }
        })
      })
    },
    /*删除分类*/
    DELETE_CATEGORYS ({ commit }, catesgory_id) {
      console.log(commit);
      return new Promise((resolve,reject)=>{
        API.delete_category({catesgory_id}).then(res=>{
          if (res.status == 0) {
            resolve();
          } else {
            reject();
          }
        })
      })
    }
  },
  mutations: {
    [GETCATEGORYS] (state, data) {
      state.categorysList = data;
    }
  },
  namespaced: true
}

export default product_category
