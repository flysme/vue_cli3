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
              <el-cascader
                change-on-select
                :options="addressList"
                v-model="address"
                @change="selectAddress"
                placeholder="省/市/区"
              ></el-cascader>
            </el-col>
          </div>
          <div class="sys-flex form-item">
            <el-col :span="5">
              <div class="demo-input-suffix">
              </div>
            </el-col>
            <el-col :span="16">
              <el-input
                size="small"
                placeholder="具体地址"
                v-model="street"
                @focus="showMap=true">
              </el-input>
            </el-col>
          </div>
          <search-map v-if="showMap" @closeDialog="closeDialog" :city="address[1]"></search-map>
        <el-button size="medium" type="primary" @click="bindapply">立即开通</el-button>
      </div>
  </div>
</template>
<script>
import addressList from '@/config/address';
import searchMap from '@/components/map';
export default {
  name: 'apply',
  data () {
    return {
      address: ['安徽','铜陵市','铜官区'], //省市区
      street: '', //具体街道
      addressList: addressList,
      storename:'',
      location:'',
      showMap:false
    }
  },
  methods: {
    closeDialog (location) {
      this.showMap = false;
      if (location) {
        this.location = location;
        this.street = location.name;
      }
    },
    selectAddress (address) {
      this.address = address;
    },
    bindapply () {
      if (this.storename =='') {
        return this.$message.error('请输入店铺名称');
      }
      if (this.address =='') {
        return this.$message.error('请输入店铺地址');
      }
      if (this.street =='') {
        return this.$message.error('请输入具体地址');
      }
      let data = {
        store_name:this.storename,
        address:this.address.join('/'),
        street:this.street,
        geo:[this.location.lng,this.location.lat],
        privileges: 3, /*店长注册*/
      }
      this.$store.dispatch('apply/SETSTOREINFO',data).then(()=>{
        this.$store.dispatch('login/GET_STORE_INFO');
        this.$router.push({name: 'main.container.overview'})
      });
    }
  },
  components: {
    searchMap
  }
}
</script>
<style lang="scss" scoped>
  #apply{
    width: 100%;
    height: 100vh;
    background-image: url('https://img.aimoge.com/FhRDlT9Kk5Wu1mbzcn_NSnDa0Ls8/style1080.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    overflow: hidden;
  }
  .apply-title{
    padding: 10px;
    text-align: center;
    font-size: 18px;
  }
  .apply-main{
    width: 400px;
    height: 270px;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
    margin:0 auto;
    margin-top: 160px;
    border:1px solid #efefef;
    border-radius: 5px;
    background-color: #fff;
    .el-button{
      margin-top:5px;
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
      .el-cascader{
        width: 100%;
        .el-input{
          input{
            height: 32px;
            border-radius: 0;
          }
        }
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
    #container{
      width: 200px;
      height: 100px;
    }
  }
</style>
