<template>
  <div id="editgoodList">
    <el-row>
      <div class="sys-flex form-nav">
        基本信息
      </div>
    </el-row>
    <el-row>
      <div class="sys-flex form-item">
        <el-col :span="3">
          <div class="demo-input-suffix">
            商品名称:
          </div>
        </el-col>
        <el-col :span="6">
          <el-input
            size="mini"
            placeholder="请输入商品名称"
            v-model="shopname">
          </el-input>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <div class="sys-flex form-item">
        <el-col :span="3">
          <div class="demo-input-suffix">
            商品主图:
          </div>
        </el-col>
        <el-col :span="20">
          <upLoad></upLoad>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <div class="sys-flex form-item">
        <el-col :span="3">
          <div class="demo-input-suffix">
            分类:
          </div>
        </el-col>
        <el-col :span="4">
          <el-select v-model="shopcats" placeholder="商品分类" size="mini">
              <el-option :label="cateitem.category_name" :value="cateitem.category_id" :key="index"  v-for="(cateitem,index) in categorysList" ></el-option>
          </el-select>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <div class="sys-flex form-item">
        <el-col :span="3">
          <div class="demo-input-suffix">
            库存单位:
          </div>
        </el-col>
        <el-col :span="4">
          <el-select v-model="shopnumunit" placeholder="库存单位" size="mini">
            <el-option :label="item" :value="item" :key="index"  v-for="(item,index) in sku_unit" ></el-option>
          </el-select>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <div class="sys-flex form-nav">
        规格信息(sku)
      </div>
    </el-row>
    <el-row>
      <div class="sys-flex form-item">
        <el-col :span="3">
          <div class="demo-input-suffix">
            设置规格:
          </div>
        </el-col>
        <el-col :span="4">
          <div class="sku-set-main">
            <div class="set-row sys-flex rel" v-for="(attr,index) in skuSttrList" :key="index">
              <div class="icon abs" @click="delSkuRow(index)">
                <i class="el-icon-vue-xianshi_quxiaotianchong"></i>
              </div>
              <el-input
                width="10px"
                size="mini"
                placeholder="属性名"
                v-model="attr.key"
                >
              </el-input>
              <div class="attr-n-line"></div>
              <div class="attr-value-main sys-flex">
                 <div v-if="attr.value.length" v-for="(items,idx) in attr.value" :key="idx">
                   <el-input
                     width="10px"
                     size="mini"
                     placeholder="属性值"
                     autofocus="true"
                     v-model="attr.value[idx]['name']">
                   </el-input>
                 </div>
                  <div class="append-attr f-6" @click="setAttrValue(index)">
                      +添加
                  </div>
              </div>
            </div>
            <div @click="setSku">
              <el-input
                width="20px"
                size="mini"
                readonly
                placeholder="添加规格"
                >
              </el-input>
            </div>
          </div>
        </el-col>
      </div>
    </el-row>

    <el-row>
      <div class="sys-flex form-item">
        <el-col :span="3">
          <div class="demo-input-suffix">
            规格信息:
          </div>
        </el-col>
        <el-col :span="4">
          <div class="sku-table-main">

          </div>
        </el-col>
      </div>
    </el-row>



    <el-row>
      <div class="sys-flex form-item">
        <el-col :span="3">
          <div class="demo-input-suffix">
            零售价:
          </div>
        </el-col>
        <el-col :span="4">
          <el-input
            size="mini"
            type="number"
            placeholder="建议零售价"
            v-model="sales_price">
          </el-input>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <div class="sys-flex form-item">
        <el-col :span="3">
          <div class="demo-input-suffix">
            成本价:
          </div>
        </el-col>
        <el-col :span="4">
          <el-input
            size="mini"
            type="number"
            placeholder="成本价"
            v-model="costing_price">
          </el-input>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <div class="sys-flex form-item">
        <el-col :span="3">
          <div class="demo-input-suffix">
            商品库存:
          </div>
        </el-col>
        <el-col :span="4">
          <el-input
            size="mini"
            type="number"
            placeholder="库存"
            v-model="num">
          </el-input>
        </el-col>
      </div>
    </el-row>
  </div>
</template>
<script>
import upLoad from '@/components/upLoad'
import UTILS from '@/utils/utils'
import { mapState } from 'vuex'
export default {
  name: 'editgoodList',
  data () {
    return {
      userinfo:UTILS.storage.get('userinfo'),
      shopname:'',
      sales_price:'',
      costing_price:'',
      shopcats:'',
      shopnumunit:'',
      num:'',
      skuSttrList:[],
      sku_unit:['只','瓶','袋','包','箱','盒','条','听','杯','本','把','对','台','克','两','斤','公斤']
    }
  },
  computed: {
    ...mapState('product_category',{
        categorysList: state => state.categorysList
    })
  },
  created () {
    this.init();
  },
  methods: {
    init () {
      this.getCategorys();
    },
    /*获取分类*/
    getCategorys () {
      let data = {
        store_id:this.userinfo.store_id
      }
      this.$store.dispatch('product_category/GET_CATEGORYS',data)
    },
    /*设置sku*/
    setSku () {
      console.log('xxx')
      this.skuSttrList.push({
        key:'',
        value:[]
      })
    },
    /*设置sku 属性值*/
    setAttrValue (idx) {
      console.log(this.skuSttrList,'this.skuSttrList')
      this.skuSttrList[idx]['value'].push({focus:true,name:''});
    },
    /*删除sku 规格行*/
    delSkuRow (idx) {
      this.skuSttrList.splice(idx,1);
    },
    handleCommand(command) {
      this.$message('click on item ' + command);
    }
  },
  components: {
    upLoad
  }
}
</script>
<style lang="scss">
  #editgoodList{
    width: 100%;
    height: 100%;
    background-color: #FFF;
    .form-nav{
      border-bottom: 1px solid #efefef;
      font-weight: 500;
      margin:10px;
      padding:10px;
      box-sizing: border-box;
    }
    .form-item{
      padding:15px 15px 15px 25px;
      align-items: center;
      .demo-input-suffix{
        font-size: 13px;
      }
      .el-input{
        input{
          border-radius: 0;
        }
      }
      .sku-set-main{
        width: 400px;
        min-height: 50px;
        padding:0 0 0 20px;
        line-height: 50px;
        box-sizing: border-box;
        border:1px solid #efefef;
        .el-input{
          input{
            width: 100px;
            cursor: pointer;
            text-align: center;
          }
        }
        .set-row{
          width: 80%;
          flex-direction: column;
          align-items: flex-start;
          border:1px solid  #efefef;
          margin:10px;
          padding:10px;
          .icon{
            right: -7px;
            line-height: 1;
            top:-7px;
            cursor: pointer;
          }
          .el-input{
            width: 70px;
            input{
              width: 70px;
            }
          }
          .attr-n-line{
            width: 100%;
            border-bottom: 1px solid #efefef;
            margin:10px 0;
          }
           .attr-value-main{
             line-height: 1;
             align-items: center;
             flex-wrap: wrap;
             div{
               margin:3px 3px 3px 0;
             }
             .el-input{
               input{
                 width: 70px;
               }
             }
           }
        }
      }
      .sku-table-main{
        width: 600px;
        border:1px solid #efefef;
      }
    }
  }
</style>
