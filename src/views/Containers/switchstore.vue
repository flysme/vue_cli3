<template>
    <div class="main-box">
      <div class="btn-navback">
          <el-button @click="toNavback" type="primary" size="mini">返回首页</el-button>
      </div>
      <div class="switchStore rel">
          <div class="create-new-store sys-flex">
              <div class="header-title">选择店铺</div>
              <el-button @click="createStore" type="primary" size="mini">创建店铺</el-button>
          </div>
          <div class="sys-flex store-list">
              <div :class="['store-item','sys-flex','rel',item.active ?'active':'']" @click="changeStore(item._id)" v-for="(item,index) in storeInfo" :key="index">
                  <div class="store-icon">
                    <!-- <img :src="item.src" alt=""> -->
                    <i class="el-icon-vue-dian"></i>
                  </div>
                  <div class="store-name">{{item.name}}</div>
                  <i v-if="item.active" class="el-icon-vue-xuanzhongjiaobiao abs select-icon"></i>
              </div>
          </div>
          <div  class="dialog-footer sys-flex abs">
            <el-button size="medium" @click="colseDialog">取 消</el-button>
            <el-button size="medium" :disabled="isDisabled" type="primary" @click="saveStoreInfo">确 定</el-button>
          </div>
      </div>
    </div>
</template>
<script>
import UTILS from '@/utils/utils'
import config from '@/config/config'
export default {
  name: 'switchStore',
  data () {
    return {
      storeInfo:[],
      userInfo:UTILS.storage.get('userinfo'),
      switch_id:''
    }
  },
  props: {
    dialogVisible: {
      type:Boolean,
      default:false
    }
  },
  created () {
    this.getstoreInfo();
  },
  computed :{
    /*是否禁用提交*/
    isDisabled () {
      return (this.userInfo&& this.userInfo.store_id || this.$store.state.login.userInfo&&this.$store.state.login.userInfo.store_id) == this.switch_id
    }
  },
  methods:{
    /*关闭dialog*/
    colseDialog () {
      this.$emit("colseDialog");
    },
    /*新建店铺*/
    createStore () {
      this.$router.push({name:'apply'});
    },
    /*获取店铺信息*/
    getstoreInfo () {
      let userInfo = UTILS.storage.get('userinfo');
      this.storeInfo = userInfo.store_info;
      this.switch_id  = userInfo.store_id;
      this.storeInfo && this.storeInfo.length && this.storeInfo.forEach(item=>{
          item.active = false;
          if (item._id == this.switch_id) {
            item.active = true;
          }
      })
      this.$store.dispatch('login/GET_STORE_INFO');
    },
    /*切换店铺*/
    changeStore (store_id) {
      this.switch_id = store_id;
      let newstoreInfo = this.storeInfo.map(item=>{
          item.active = item._id == store_id ? true :false;
          return item;
      })
      this.storeInfo = newstoreInfo;
    },
    /*提交切换*/
    saveStoreInfo () {
      let data = {
        store_id:this.switch_id
      }
      this.$store.dispatch('apply/SWITCHSTORE',data)
      .then(()=>{
        this.$message.success('店铺切换成功');
        this.$router.push({name:'main.container.overview'});
        this.colseDialog();
      })
      .catch(()=>{
        this.$message.success('店铺切换失败');
      });
    },
    toNavback () {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-box{
    text-align: left;
    .btn-navback{
      margin:30px 0 0 130px;
    }
    .switchStore{
      width: 80%;
      border:1px solid #efefef;
      margin:100px auto;
      box-shadow: 0 0  1px #efefef;
      min-height: 400px;
      padding:0 20px 20px 20px;
      .store-list{
        width: 100%;
        flex-wrap: wrap;
        .store-item{
          width:25%;
          height: 80px;
          border:1px solid #efefef;
          padding:10px;
          align-items: center;
          cursor: pointer;
          margin:5px;
          .store-icon{
            width: 40px;
            height: 40px;
            line-height: 43px;
            border-radius: 40px;
            border:1px solid #efefef;
            text-align: center;
            margin-right: 10px;
          }
          .store-name{
            font-weight: 500;
            width: 65%;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            white-space: nowrap;
          }
          &:last-child{
            margin-right: 0;
          }
          .select-icon{
            bottom: 0;
            right: 0;
            bottom: -6px;
            right: -11px;
            color: #409EFF;
            font-size: 24px!important;
          }
        }
        .active{
          border-color: #409EFF;
        }
      }
      .create-new-store{
        height: 50px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #efefef;
        margin-bottom: 20px;
        .header-title{
          font-weight: 500;
        }
        .el-button{
          border-radius: 0;
        }
      }
      .dialog-footer{
        width: 100%;
        left: 0;
        bottom: 20px;
        margin:0;
        justify-content: center;
        .el-button{
          width: 20%!important;
          flex:0;
          border-radius: 0;
        }
      }
    }
  }

</style>
