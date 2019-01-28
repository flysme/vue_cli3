<template>
  <div id="register">
    <div class="nav-login-main f-7 fixed">
        <span>已有账号?</span>
        <span class="btn-login" @click="$router.push({name: 'login'})">登录</span>
    </div>
    <el-row :gutter="20">
      <el-col :span="16" :offset="4"><div class="grid-content f-13">注册账号</div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16" :offset="4">
        <div class="grid-content">
          <el-input
            placeholder="手机号"
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
            placeholder="密码"
            prefix-icon="el-icon-vue-mima"
            v-model="password">
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16" :offset="4">
        <div class="grid-content">
          <el-input
            type="password"
            placeholder="请再次确认密码"
            prefix-icon="el-icon-vue-mima"
            v-model="repassword">
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" >
      <el-col :span="16" :offset="4">
        <div class="grid-content">
          <el-button type="primary" :loading="isloading" @click="submit">注册</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import API from '@/http'
import FORM from '@/utils/form'
export default {
  name: 'register',
  data () {
    return {
      username: '',
      password: '',
      repassword:'',
      isloading: false
    }
  },
  methods: {
    submit () {
      if (FORM.checkmobile(this.username)!=true)return;
      if (this.password=='') return this.$message.error('请输入密码');
      if (this.repassword=='') return this.$message.error('请输入密码');
      if (this.repassword!=this.repassword) return this.$message.error('两次密码不一致');
      this.register()
    },
    register () {
      this.isloading = true;
      let loading = this.$loading();
      API.register({user_name:this.username,password:this.password}).then(()=>{
         this.$message('注册成功');
         this.$router.push({name: 'login'})
      }).catch(err=>{
         this.$message.error(err.msg);
      }).finally(()=>{
        loading.close();
        this.isloading = false;
      })
    }
  }
}
</script>
<style lang="scss">
  #register{
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
