<template>
  <div id="login">
    <el-row :gutter="20">
      <el-col :span="16" :offset="4"><div class="grid-content f-13">账号登录</div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16" :offset="4">
        <div class="grid-content">
          <el-input
            placeholder="请输入账号"
            prefix-icon="el-icon-vue-zhanghao"
            v-model.number="username">
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16" :offset="4">
        <div class="grid-content">
          <el-input
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-vue-mima"
            v-model="password">
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" >
      <el-col :span="16" :offset="4">
        <div class="grid-content">
          <el-button type="primary" :loading="isloading" @click="submit">登录</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" >
      <el-col :span="20" :offset="7">
        <div class="nav-login-main f-7">
            <span>没有账号?</span>
            <span class="btn-login" @click="$router.push({name: 'register'})">注册</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import API from '@/http'
import UTILS from '@/utils/utils'
import FORM from '@/utils/form'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      isloading: false
    }
  },
  created () {
    API.getTradings().then(res => {
      console.log(res, 'res')
    })
  },
  methods: {
    submit () {
      if (FORM.checkmobile(this.username)!=true)return;
      if (this.password=='') return this.$message.error('请输入密码');
      this.login()
    },
    login () {
      this.isloading = true;
      setTimeout(()=>{
        this.isloading = false;
        UTILS.storage.set('username',this.username);
        this.$router.push({name: 'main.container'})
      }, 1000);
      // API.login().then(res => {
      //
      // })
    }
  }
}
</script>
<style lang="scss">
  #login{
    width: 500px;
    height: 300px;
    margin:15% auto;
    .nav-login-main{
      right: 20px;
      top:20px;
      .btn-login{
        color: #409EFF;
        padding-left: 10px;
        cursor: pointer;
      }
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
        .el-col {
          .el-input{
            border-radius: 0;
          }
          .el-button{
            width: 100%;
          }
        }
     }
  }
</style>
