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
          <el-button type="primary" :disabled="isDisabled" :loading="isloading" @click="submit">{{btntext}}</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" >
      <el-col :span="20" :offset="7">
        <div class="nav-login-main f-7">
            <span>没有账号?</span>
            <span class="btn-login"  @click="$router.push({name: 'register'})">注册</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FORM from '@/utils/form'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      btntext:'登录',
      password: '',
      loginCount:0,
      isloading: false
    }
  },
  created () {
  },
  computed:{
    isDisabled () {
      let checkmobile = FORM.checkmobile(this.username)==true,
          checkpwd = FORM.checkpwd(this.password)==true;
      return !(checkmobile && checkpwd);
    }
  },
  methods: {
    submit () {
      if (FORM.checkmobile(this.username)!=true)return;
      if (this.password=='') return this.$message.error('请输入密码');
      this.login();
    },
    login () {
      if (this.loginCount>3)return;
      this.isloading = true;
      let loading = this.$loading();
      this.$store.dispatch('login/LOAD_LOGIN',{user_name:this.username,password:this.password}).then(res=>{
        if (res.store_info && res.store_info.length) {
          this.$router.push({name: 'main.container'})
        } else {
          this.$router.push({name: 'apply'})
        }
      }).catch(err=>{
        this.checkLoginBtn();
      }).finally(()=>{
        loading.close();
        this.isloading = false;
      })
    },
    checkLoginBtn () {
      if (this.loginCount>=3) {
        this.$message.error('请10秒后再试~');
        let time = 10;
        let timer = setInterval(()=>{
          if (time <=0){
            console.log(timer,'timer')
            clearInterval(timer)
            this.loginCount = 0;
            this.btntext = '登录';
            return;
          };
          this.btntext = '等待'+time+'秒后再试';
          time--;
        },1000)
      }
      this.loginCount++;
    }
  }
}
</script>
<style lang="scss" scoped>
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
