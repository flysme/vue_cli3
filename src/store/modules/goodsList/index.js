import { GETGOODSLIST } from '@/store/mutations-type'


const goodsList = {
  state: {
    goodList:[{
      id:'e36826ec819a11e7a2d302429fc2f60d',
      image:'https://img.aimoge.com/FugfIDEl1BBqdFeIHioItc_xYuif/style620.png',
      create_time: '2018-01-05',
      name: '奥利奥饼干',
      price: 51.90,
      discount_price: 45.90,
      cats:{id:'1002',name:'零食'},
      num: 200,
      status: 1
    }, {
      id:'e36826ec819a11e7a2d302429fc2f61d',
      image:'https://img.aimoge.com/FugfIDEl1BBqdFeIHioItc_xYuif/style620.png',
      create_time: '2018-02-12',
      name: '罗西巧克力',
      cats:{id:'1002',name:'零食'},
      price: 128.00,
      discount_price: 88.90,
      num: 300,
      status: 1
    }, {
      id:'e36826ec819a11e7a2d302429fc2f61g',
      image:'https://img.aimoge.com/FugfIDEl1BBqdFeIHioItc_xYuif/style620.png',
      create_time: '2018-04-02',
      name: '丽芝士休闲威化饼干',
      cats:{id:'1002',name:'零食'},
      price: 23.80,
      discount_price: 19.80,
      num: 100,
      status: 1
    }, {
      id:'e36826ec819a11e7a2d302429fc2f61c',
      image:'https://img.aimoge.com/FugfIDEl1BBqdFeIHioItc_xYuif/style620.png',
      create_time: '2018-07-10',
      name: '意大利进口葡萄酒',
      cats:{id:'1003',name:'饮料'},
      price: 113.90,
      discount_price: 99.80,
      num: 60,
      status: 0
    }]
  },
  actions: {
    LOAD_GOODSLIST ({ commit }) {
      setTimeout(()=>{
        let addData = {
          id:'e36826ec819a11e7a2d302429fc2f60d',
          image:'https://img.aimoge.com/FugfIDEl1BBqdFeIHioItc_xYuif/style620.png',
          create_time: '2018-01-05',
          name: '奥利奥饼干',
          price: 51.90,
          discount_price: 45.90,
          cats:{id:'1002',name:'零食'},
          num: 200,
          status: 1
        }
        commit(GETGOODSLIST,addData)
      }, 1000)
    }
  },
  mutations: {
    [GETGOODSLIST] (state, data) {
      state.goodList.push(data)
    }
  },
  namespaced: true
}

export default goodsList
