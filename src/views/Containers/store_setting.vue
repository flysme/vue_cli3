<template>
  <div class="store-setting">
    <el-row>
      <div class="sys-flex form-item">
        <el-col :span="3">
          <div class="demo-input-suffix">
            配送费设置(元):
          </div>
        </el-col>
        <el-col :span="4">
          <el-input
            type="number"
            size="mini"
            :disabled="!storeStatus.canhandle"
            placeholder="请输入配送金额"
            v-model="delivery_price">
          </el-input>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <div class="sys-flex form-item">
        <el-col :span="3">
          <div class="demo-input-suffix">
            起送金额设置(元):
          </div>
        </el-col>
        <el-col :span="4">
          <el-input
            type="number"
            size="mini"
            :disabled="!storeStatus.canhandle"
            placeholder="请输入起送金额"
            v-model="mini_delivery_price">
          </el-input>
        </el-col>
      </div>
    </el-row>
    <!-- <el-row>
      <div class="sys-flex form-item">
        <el-col :span="3">
          <div class="demo-input-suffix">
            满减设置:
          </div>
        </el-col>
        <el-col :span="4">
          <div class="discounts-box">
              <div class="create-t-discount sys-flex">
                <el-input
                  size="mini"
                  type="number"
                  placeholder="购买金额"
                  min="1"
                  :disabled="!storeStatus.canhandle"
                  v-model="buy_price">
                </el-input>
                <el-input
                  size="mini"
                  type="number"
                  min="1"
                  :disabled="!storeStatus.canhandle"
                  placeholder="优惠金额"
                  v-model="discount_price">
                </el-input>
                <el-button type="primary" :disabled="!storeStatus.canhandle"  size="mini" @click="saveDiscounts">保存</el-button>
              </div>
              <div class="discount-box-list flex-wrap sys-flex">
                  <div class="discount-item f-6 rel" v-for="(item,index) in discountList" :key="index">
                      满{{item.buy_price}}减{{item.discount_price}}
                      <div class="discount-shade abs" @click.stop="deleteCurrentDiscount(index)">删除</div>
                  </div>
              </div>
          </div>
        </el-col>

      </div>
    </el-row> -->
    <el-row>
      <div class="sys-flex form-item">
        <el-col :span="3">
          <div class="demo-input-suffix">
            营业时间:
          </div>
        </el-col>
        <el-col :span="10" class="sys-flex align-center">
          <el-time-select
           placeholder="起始时间"
           :disabled="!storeStatus.canhandle"
           v-model="business_start_times"
           :picker-options="{
             start: '05:30',
             step: '00:15',
             end: '23:30'
           }">
         </el-time-select>
         <span>&nbsp;-&nbsp;</span>
         <el-time-select
           placeholder="结束时间"
           :disabled="!storeStatus.canhandle"
           v-model="business_end_times"
           :picker-options="{
             start: '05:30',
             step: '00:15',
             end: '23:30',
             minTime: business_start_times
           }">
         </el-time-select>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <div class="sys-flex form-item">
        <el-col :span="3">
          <div class="demo-input-suffix">
            是否打烊:
          </div>
        </el-col>
        <el-col :span="10" class="sys-flex align-center">
          <el-switch
            style="display: block"
            v-model="isbusiness"
            active-color="#13ce66"
            >
          </el-switch>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <div class="submit-btn">
        <el-col>
          <el-button type="primary" v-if="!isEdit" :disabled="!cansaved || !storeStatus.canhandle" :loading="Loading"  size="mini" @click="save">保存</el-button>
          <el-button type="primary" v-else :disabled="!cansaved || !storeStatus.canhandle" :loading="Loading"  size="mini" @click="updateSetting">更新</el-button>
        </el-col>
      </div>
    </el-row>
  </div>
</template>
<script>
import UTILS from '@/utils/utils'
import { mapState } from 'vuex'
export default {
  name: 'store-setting',
  data (){
    return {
      userinfo:UTILS.storage.get('userinfo'),
      business_start_times:'',
      business_end_times:'',
      delivery_price:'',
      mini_delivery_price:'',
      discount_price:'',
      buy_price:'',
      discountList:[],
      isEdit:false,
      isbusiness:0,
      Loading:false
    }
  },
  computed:{
    cansaved () {
      return (
        (this.delivery_price!='' && this.delivery_price>0)
        && (this.mini_delivery_price!='' && this.mini_delivery_price>0)
        && (this.business_start_times!='' && this.business_start_times && this.business_end_times!='' && this.business_end_times)
      )
    },
    ...mapState('login',{
        storeStatus:state => state.storeStatus,
    })
  },
  created () {
    this.initLoadSettingInfo();
  },
  methods:{
    initLoadSettingInfo () {
      let loading = this.$loading();
      this.$store.dispatch('store_setting/LOAD_STORESETTING',{store_id:this.userinfo.store_id || this.userinfo.store_info[0]['_id']}).then(res=>{
          this.isEdit  = res.delivery_price && res.start_delivery_price;
          this.delivery_price = res.delivery_price;
          this.mini_delivery_price = res.start_delivery_price;
          this.business_start_times = res.business_start_times;
          this.business_end_times = res.business_end_times;
          this.isbusiness = !res.business_status;
          // this.discountList = res.discounts || [];
      }).finally(()=>{
        loading.close();
      })
    },
    saveDiscounts () {
      let buy_price = +this.buy_price;
      let discount_price = +this.discount_price;
      if (discount_price=='' || discount_price<0) {
        return this.$message.error('优惠金额待确认');
      }
      if (buy_price=='' | buy_price<0) {
        return this.$message.error('购买金额待确认');
      }
      if (Number(discount_price) > Number(buy_price)) {
        return  this.$message.error('优惠金额不能大于购买金额');
      }
      this.buy_price = '';
      this.discount_price = '';
      // this.discountList.push({buy_price,discount_price})
    },
    /*删除优惠项*/
    deleteCurrentDiscount (index) {
      this.discountList.splice(index,1);
    },
    save () {
      let data = {
        store_id:this.userinfo.store_id || this.userinfo.store_info[0]['_id'],
        delivery_price:this.delivery_price,
        start_delivery_price:this.mini_delivery_price,
        // discounts:this.discountList || '',
        business_start_times:this.business_start_times,
        business_end_times:this.business_end_times,
        business_status:Number(!this.isbusiness),
      }
      this.Loading = true;
      this.$store.dispatch('store_setting/SET_SETOREBUSINESS',data).then(res=>{
        this.$message({message: '保存成功',center: true});
      }).finally(()=>{
          this.initLoadSettingInfo();
          this.Loading = false;
      });
    },
    updateSetting () {
      if (this.timer)clearTimeout(this.timer)
      this.Loading = true;
      this.timer = setTimeout(()=>{
        let data = {
          setting_id:this.$store.state.store_setting.settingInfo.setting_id,
          store_id:this.userinfo.store_id || this.userinfo.store_info[0]['_id'],
          delivery_price:this.delivery_price,
          start_delivery_price:this.mini_delivery_price,
          // discounts:this.discountList || '',
          business_start_times:this.business_start_times,
          business_end_times:this.business_end_times,
          business_status:Number(!this.isbusiness),
        }
        this.$store.dispatch('store_setting/UPDATE_SETOREBUSINESS',data).then(res=>{
          this.$message({message: '更新成功',center: true});
        }).finally(()=>{
            this.initLoadSettingInfo();
            this.Loading = false;
        });
      },1000)
    }
  }
}
</script>
<style lang="scss" scoped>
  .store-setting{
    background-color: #fff;
    .form-item{
      padding:15px 15px 15px 25px;
      align-items: center;
      .demo-input-suffix{
        font-size: 13px;
      }
      .cates-tps{
        color: #38f;
        font-size: 10px;
        padding-left: 5px;
        cursor: pointer;
      }
      .el-input__inner{
        height: 18px!important;
        padding:0 10px;
        border-radius: 0;
      }
      .discounts-box{
        width: 270px;
        min-height: 50px;
        padding:20px;
        justify-content: space-between;
        border: 1px solid #efefef;
        .create-t-discount{
          border-bottom: 1px solid #efefef;
          padding-bottom:10px;
          .el-input{
            margin-right: 10px!important;
          }
        }
        .discount-item{
          width: fit-content;
          height: 25px;
          line-height: 25px;
          margin:5px;
          padding:2px 5px;
          border:1px solid #efefef;
          cursor: pointer;
          color: red;
          .discount-shade{
             opacity: 0;
             transition: 0.3s;
             width:100%;
             height: 29px;
             line-height: 29px;
             background-color: rgba(0,0,0,0.6);
             top: 0;
             left: 0;
             color:#fff;
          }
        }
        .discount-item:hover .discount-shade{
            opacity: 1;
        }
      }
    }
    .submit-btn{
      padding:40px;
    }
  }

</style>
