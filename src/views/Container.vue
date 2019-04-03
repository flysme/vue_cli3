<template>
    <div id="container">
      <el-container style="height: 100vh; border: 1px solid #eee">
        <el-aside width="140px" style="border-right:1px solid #e6e6e6;overflow-x:hidden;">
          <el-menu
            :default-openeds="['1', '2','3']"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router
            >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>
                <span>首页</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/overview">概况</el-menu-item>
                <el-menu-item index="/store_setting">设置</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-goods"></i>商品</template>
              <el-menu-item-group>
                <el-menu-item index="/goods/goodsList">商品列表</el-menu-item>
                <el-menu-item index="/goods/goodsCats">商品分类</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-tickets"></i>订单</template>
              <el-menu-item-group>
                <el-menu-item index="/order/orderList">我的订单</el-menu-item>
                <el-menu-item index="/order/orderoverview">订单概览</el-menu-item>
                <el-menu-item index="/order/orderevaluate">评价管理</el-menu-item>
                <el-menu-item index="/order/orderevaluate">售后管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header style="text-align: right; font-size: 12px">
            <i class="el-icon-vue-touxiang icon" style="margin-right: 15px"></i>
            <span>{{userinfo.user_name}}</span>
            <el-dropdown trigger="click" @command="siginLogin" size="medium">
              <i class="icon el-icon-setting" style="margin:0 15px"></i>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="backhome">首页</el-dropdown-item>
                <el-dropdown-item command="switch" v-if="currentStore.status==1">切换店铺</el-dropdown-item>
                <el-dropdown-item command="sigin">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-header>
          <el-main>
            <div class="danger-banner f-7" v-if="storeStatus && !storeStatus.canhandle">{{storeStatus.title}}</div>
            <div >
              <router-view></router-view>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>
<script>
import API from '@/http'
import { mapState } from 'vuex'
import UTILS from '@/utils/utils'
export default {
  name: 'container',
  data () {
    return {
      isCollapse: true,
      pagedefault: true,
      openrouter: true,
    }
  },
  computed: {
    userinfo () {
      return UTILS.storage.get('userinfo')
    },
    ...mapState('login',{
        currentStore: state => state.currentStore,
        storeStatus:state => state.storeStatus,
    })
  },
  created () {
    this.initPage();
  },
  methods:{
    initPage () {
      this.$store.dispatch('login/GET_STORE_INFO')
    },
    handleOpen (key, keyPath) {
      console.log('key',key, 'keyPath', keyPath);
    },
    handleClose(key, keyPath) {
      console.log('key',key, 'keyPath', keyPath);
    },
    /* 退出登录 */
    siginLogin (command) {
      let events = {
        backhome: ()=>{
          this.$router.push({name: 'main.container.overview'})
        },
        sigin: ()=>{
          API.loginout().then(res=>{
            if (res.status==0) {
              UTILS.storage.remove('userinfo')
              UTILS.storage.remove('storeinfo')
              this.$router.push({name: 'login'})
            }
          })
        },
        switch:()=>{
          this.$router.push({name: 'switch.store'})
        }
      }
      typeof events[command] =='function' && events[command]()
    }
  }
}
</script>
<style lang="scss">
  #container{
    background-color: #f5f5f5!important;
  }
  .icon{
    font-size: 15px;
  }

  .el-header {
    background-color: #FFF;
    color: #333;
    line-height: 60px;
    span{
      font-size: 12px;

    }
  }
  .danger-banner{
    height: 40px;
    background-color: #ff4343;
    margin-bottom: 10px;
    text-align: left;
    line-height: 40px;
    padding-left: 20px;
    color: #fff;
  }
  .el-aside {
    background-color: red;
  }
  .el-main {
    padding:10px;
    box-sizing: border-box;
  }

  .el-aside {
    color: #333;
    background-color: #333;
    ul{
      background-color: #333;
      &>li{
        background-color: #333;
        color: #caccd0;
        .el-submenu__title{
          color: #caccd0;
        }
        .el-menu-item{
          padding:0 15px;
          min-width: 60px;
        }
      }
    }
  }
</style>
