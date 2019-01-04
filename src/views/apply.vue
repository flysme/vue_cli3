<template>
  <div id="apply">
      <div class="apply-main sys-flex">
        <div class="apply-title">创建一个店铺</div>
          <div class="sys-flex form-item">
            <el-col :span="5">
              <div class="demo-input-suffix">
                店铺名称:
              </div>
            </el-col>
            <el-col :span="16">
              <el-input
                size="small"
                placeholder="请输入店铺名称"
                v-model="storename">
              </el-input>
            </el-col>
          </div>
          <div class="sys-flex form-item">
            <el-col :span="5">
              <div class="demo-input-suffix">
                店铺地址:
              </div>
            </el-col>
            <el-col :span="16">
              <el-input
                size="small"
                placeholder="省/市/区"
                v-model="address">
              </el-input>
            </el-col>
          </div>
        <el-button size="medium" type="primary" @click="bindapply">立即开通</el-button>
      </div>
  </div>
</template>

<script>
import UTILS from '@/utils/utils';
export default {
  name: 'apply',
  data () {
    return {
      storename:'',
      address: '',
      user_id: UTILS.storage.get('userinfo') && UTILS.storage.get('userinfo')['user_id']
    }
  },
  created () {
    console.log(UTILS.storage.get('userinfo'))
  },
  methods: {
    bindapply () {
      if (this.storename =='') {
        return this.$message.error('请输入店铺名称');
      }
      if (this.address =='') {
        return this.$message.error('请输入店铺地址');
      }
      let data = {
        store_name:this.storename,
        address:this.address,
        user_id:this.user_id,
      }
      this.$store.dispatch('apply/SETSTOREINFO',data).then(res=>{
        let userInfo = UTILS.storage.get('userinfo');
        userInfo.store_id = res.store_id;
        UTILS.storage.set('userinfo',userInfo);
        this.$router.push({name: 'main.container.overview'})
      });
    }
  }
}
</script>
<style lang="scss">
  #apply{
    width: 100%;
    height: 100vh;
    background-image: url('https://img.aimoge.com/FhRDlT9Kk5Wu1mbzcn_NSnDa0Ls8/style1080.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    overflow: hidden;
  }
  .apply-title{
    // margin-top: 110px;
    padding: 10px;
    text-align: center;
    font-size: 18px;
  }
  .apply-main{
    width: 400px;
    height: 240px;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
    margin:0 auto;
    margin-top: 160px;
    border:1px solid #efefef;
    border-radius: 5px;
    background-color: #fff;
    .el-button{
      margin-top: 25px;
      width: 60%;
      border-radius: 0;
    }
    .form-item{
      width: 100%;
      padding:10px 15px 10px 25px;
      align-items: center;
      .demo-input-suffix{
        font-size: 13px;
      }
      .el-input{
        input{
          border-radius: 0;
        }
      }
      &:last-child {
        margin-bottom:120px;
      }
    }
  }
</style>
