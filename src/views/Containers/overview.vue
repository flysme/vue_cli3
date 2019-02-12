<template>
  <div class="overview">
    <el-row>
      <el-col :span="24">
        <div class="header-main sys-flex">
            <div class="header-left">
              <div class="header-store-name">
                {{storeinfo.name || '--'}}
              </div>
            </div>
        </div>
        <div class="main-container">
          <div class="today-store-data">
              <div class="today-header f-8">今日概况</div>
              <div :class="['today-data','sys-flex',index==1?'border-none':'']" v-for="(item,index) in overviewList" :key="index">
                  <div class="t-item" v-for="(currentitem,idx) in item" :key="idx">
                      <div :class="['t-item-num','f-12',index==1 ? 't-item-second':'']">
                          {{currentitem.num}}
                      </div>
                      <div class="t-item-title f-6">
                         {{currentitem.name}}
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'Vuex';
export default {
  name: 'overview',
  data (){
    return {
      overviewList:[
        [
          {
            name:'支付金额',
            num:Math.floor(Math.random()*120+2),
          },
          {
            name:'支付订单数',
            num:Math.floor(Math.random()*100+2),
          },
          {
            name:'新增用户数',
            num:Math.floor(Math.random()*130+2),
          },
          {
            name:'访客数',
            num:Math.floor(Math.random()*100+2),
          }
        ],
        [
          {
            name:'待发货订单',
            num:Math.floor(Math.random()*140+2),
          },
          {
            name:'新增评论',
            num:Math.floor(Math.random()*200+2),
          }
        ]
      ]
    }
  },
  computed: {
    ...mapState('login', {
      storeinfo: state =>state.currentStore
    })
  },
  created () {
    this.$store.dispatch('login/GET_STORE_INFO');
  }
}
</script>
<style lang="scss" scoped>
    .overview{
      .header-main{
        background-color: #FFF;
        padding:10px;
        .header-store-name{
          font-size: 19px;
          color: #000;
          font-weight: 450;
        }
      }
      .main-container{
        margin-top: 10px;
        background-color: #FFF;
        padding:10px;
        .today-store-data{
          .today-header{
            color: #000;
            text-align: left;
            margin-bottom: 20px;
          }
          .today-data{
            padding: 15px 0;
            border-bottom: 1px solid #efefef;
            .t-item{
              min-width: 70px;
              padding:5px 20px 5px 0px;
              border-radius: 10px;
              text-align: center;
              color: #333;
              margin-right: 20px;
              .t-item-num{
                cursor: pointer;
                padding-bottom: 10px;
                color: #38f;
                font-weight: 500;
              }
              .t-item-num,.t-item-title{
                line-height: 1;
              }
            }
            .t-item-second{
              color: #f44!important;
            }
          }
          .border-none{
            border: none!important;
          }
        }
      }
    }
</style>
