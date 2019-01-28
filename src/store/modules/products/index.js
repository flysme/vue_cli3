import { GETGOODSLIST, GETGOODSDETAILS} from '@/store/mutations-type'
import API from '@/http';

const goodsList = {
  state: {
    goodList:[],
    goodDetails:{}
  },
  actions: {
    /*获取商品*信息*/
    LOAD_GOODSLIST ({ commit }, data) {
      return new Promise((resolve,reject)=>{
        API.get_products(data).then(res=>{
          if (res.status == 0) {
            commit(GETGOODSLIST,res.data.products);
            resolve();
          } else {
            reject(res);
          }
        })
      })
    },
    /*生成新的商品*/
    CREATE_GOODS ({ commit }, data) {
      return new Promise((resolve,reject)=>{
        API.create_products(data).then(res=>{
          if (res.status == 0) {
            resolve();
          } else {
            reject(res);
          }
        })
      })
    },
    /*编辑商品*/
    EDIT_GOODS ({ commit }, data) {
      return new Promise((resolve,reject)=>{
        API.editProducts(data).then(res=>{
          if (res.status == 0) {
            resolve();
          } else {
            reject(res);
          }
        })
      })
    },
    /*更新商品信息*/
    UPDATE_GOODSITEM ({ commit }, data) {
      return new Promise((resolve,reject)=>{
        API.updateProductStatus(data).then(res=>{
          if (res.status == 0) {
            resolve();
          } else {
            reject(res);
          }
        })
      })
    },
    /*删除商品*/
    DELETE_GOODSITEM ({ commit }, catesgory_id) {
      return new Promise((resolve,reject)=>{
        API.deleteProductStatus(catesgory_id).then(res=>{
          if (res.status == 0) {
            resolve();
          } else {
            reject();
          }
        })
      })
    },
    /*获取商品详情*/
    GET_PRODUCT_DETAILS ({commit},data) {
      return new Promise((resolve,reject)=>{
        API.get_products_details(data).then(res=>{
          if (res.status == 0) {
            resolve(res.data);
            commit(GETGOODSDETAILS,res.data);
          }
        })
      })
    }
  },
  mutations: {
    [GETGOODSLIST] (state, data) {
      state.goodList = data;
    },
    [GETGOODSDETAILS] (state, data) {
      state.goodDetails = data;
    }
  },
  namespaced: true
}

export default goodsList
