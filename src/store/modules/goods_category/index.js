import { GETCATEGORYS } from '@/store/mutations-type';
import API from '@/http';

const product_category = {
  state: {
    categorysList:[]
  },
  actions: {
    SET_CATEGORYS ({ commit },data) {
      API.create_category(data).then(res=>{
        // if (res.status == 0) {
        //
        // }
        console.log(res,'res',commit)
      })
    },
    GET_CATEGORYS ({ commit },data) {
      API.get_category(data).then(res=>{
        if (res.status == 0) {
          commit(GETCATEGORYS,res.data.categorys)
        }
      })
    }
  },
  mutations: {
    [GETCATEGORYS] (state, data) {
      console.log(data,'data')
      state.categorysList = data;
    }
  },
  namespaced: true
}

export default product_category
