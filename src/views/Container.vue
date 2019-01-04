<template>
    <div id="container">
      <el-container style="height: 100vh; border: 1px solid #eee">
        <el-aside width="180px" style="background-color: rgb(255, 255, 255);border-right:1px solid #e6e6e6">
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
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-goods"></i>商品管理</template>
              <el-menu-item-group>
                <el-menu-item index="/goodsList">商品列表</el-menu-item>
                <el-menu-item index="/goodsCats">商品分类</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-goods"></i>订单管理</template>
              <el-menu-item-group>
                <el-menu-item index="/orderList">我的订单</el-menu-item>
                <el-menu-item index="/orderoverview">订单概览</el-menu-item>
                <el-menu-item index="/orderevaluate">评价管理</el-menu-item>
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
                <el-dropdown-item command="sigin">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>
<script>
import API from '@/http'
import UTILS from '@/utils/utils'
console.log(API)
export default {
  name: 'container',
  data () {
    return {
      isCollapse: true,
      pagedefault: true,
      openrouter: true
    }
  },
  computed: {
    userinfo () {
      return UTILS.storage.get('userinfo')
    }
  },
  created () {
    this.initPage();
  },
  methods:{
    initPage () {

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
          UTILS.storage.remove('username')
          this.$router.push({name: 'login'})
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
  .el-aside {
    background-color: red;
  }
  .el-main {
    padding:10px;
    box-sizing: border-box;
  }

  .el-aside {
    color: #333;
  }
</style>
