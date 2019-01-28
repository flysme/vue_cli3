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
            v-model="products_name">
          </el-input>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <div class="sys-flex form-item">
        <el-col :span="3">
          <div class="demo-input-suffix">
            商品描述:
          </div>
        </el-col>
        <el-col :span="6">
          <el-input
            size="mini"
            placeholder="请输入商品描述"
            v-model="products_desc">
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
          <el-select v-model="cats_name" placeholder="商品分类" size="mini" @change="selectcates">
              <el-option :label="cateitem.category_name" :value="cateitem.category_id" :key="index"  v-for="(cateitem,index) in categorysList" ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <div class="demo-input-suffix cates-tps" @click="$router.push({name:'main.container.goods.goodsCats'})">
           去添加分类
          </div>
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
          <el-select v-model="products_unit" placeholder="库存单位" size="mini">
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
                     v-model="attr.value[idx]">
                   </el-input>
                 </div>
                  <div class="append-attr f-6" @click="setAttrValue(index)">
                      +添加
                  </div>
              </div>
            </div>
            <div @click="setSku">
              <el-input
                :disabled="isDisabled"
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
    <!-- 规格信息 start -->
    <el-row v-if="isShowSkuList">
      <div class="sys-flex form-item">
        <el-col :span="3">
          <div class="demo-input-suffix">
            规格信息:
          </div>
        </el-col>
        <el-col :span="4">
          <div class="sku-table-main" v-if="newtableList.length || headData.length">
            <div class="sku-table-header sys-flex">
                <div class="sku-t-th" :style="compuWidth(headData)" v-for="(head,idx) in headData" :key="idx">
                    {{head.n}}
                </div>
            </div>
            <div class="sku-table-body  sys-flex" v-for="(item,index) in newtableList" :key="index">
                <div class="sku-t-td" :style="compuWidth(item)" v-for="(current,indx) in item" :key="indx" >
                    <el-input type="number" min="1" v-if="current.k=='num' || current.k=='price'" v-model="current.v"></el-input>
                    <span v-else>{{current.v}}</span>
                </div>
            </div>
          </div>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="btn-save">
           <el-button type="primary"  size="mini" @click="saveGoodInfo">保存</el-button>
        </div>
      </el-col>
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
      products_name:'',
      products_desc:'',
      products_image:[],
      products_unit:'',
      category_id:'',
      cats_name:'',
      sales_price:'',
      costing_price:'',
      num:'',
      skuSttrList:[],
      sku_unit:['只','瓶','袋','包','箱','盒','条','听','杯','本','把','对','台','克','两','斤','公斤'],
      exthead:[{k:'num',n:'库存'},{k:'price',n:'零售价'}],
      newtableList:[],
      headData:[], //sku头部名称
      details:{}, //详情数据
    }
  },
  props:{
    product_id:{
      type: String,
      default:''
    }
  },
  computed: {
    ...mapState('product_category',{
        categorysList: state => state.categorysList
    }),
    /*最大sku规格设置为三层*/
    isDisabled () {
      return this.skuSttrList && this.skuSttrList.length >= 3
    },
    /*sku规格信息*/
    isShowSkuList () {
      return this.skuSttrList && this.skuSttrList.length >= 1
    },
  },
  watch: {
  'skuSttrList':{
      handler (newSkuList,oldSkuList) {
        let table = [];
        this.headData = [];
        if (newSkuList && !newSkuList.length) {
          this.newtableList = [];
        }
        if (!oldSkuList || (oldSkuList && !oldSkuList.length))return;
        oldSkuList.forEach((item,index)=>{
          table.push(item.value);
          item.key && this.headData.push({k:`define-${index}`,n:item.key});
        })
        this.headData.push(...this.exthead)
        let newtable = ( table.length && UTILS.createTable(table) ) || [];
        if (newtable.length) {
          let ev = ['',''];
           let new_t = newtable.map(i =>(i = [...(i.reverse()),...ev]))
           new_t.forEach((current,index)=>{
             let value = [];
             this.headData.forEach((item,idx)=>{
               value.push({
                 n:item.n, //名称
                 k:item.k, //属性名
                 v:current[idx] //属性值
               })
             })
             // 属性值存在时进行更新
             this.newtableList[index] = value;
           })
        }
        if (this.product_id) {
          this.updateSkuList();
          console.log('update-----',this.newtableList)
        }
      },
      deep: true    //深度监听
    }
  },
  created () {
    this.init();
  },
  methods: {
    /*初始化页面*/
    init () {
      this.getCategorys();
      let promiseque = [this.getCategorys()];
      if (this.product_id) {
        promiseque.push(this.getProductDetails())
      }
      let loading = this.$loading();
      Promise.all(promiseque).then(res=>{
        loading.close();
        if (res.length >=2) {
          this.resetDetailData(res);
        }
      });
    },
    /*更新sku规格列表*/
    updateSkuList (newtableList) {
      let skus = this.details.skus;
      if (!this.newtableList.length)return;
      this.newtableList.forEach(item=>{
        let key = '';
        for (let i=0;i<item.length;i++) {
          if ((item.length-1) -i>1) {
            key += item[i].v;
            continue;
          }
          if (key=='') return;
          let currentSkuItem  = skus[key];
          if (item[i].k=="num" && currentSkuItem && currentSkuItem.num){
            item[i].v = currentSkuItem.num;
          }
          if (item[i].k=="price" && currentSkuItem && currentSkuItem.price){
            item[i].v = currentSkuItem.price;
          }
        }
      })
    },
    /*处理详情数据*/
    resetDetailData ([categorys,details]) {
      console.log(details,'details',categorys,'categorys');
      this.details = details;
      this.products_name = details.title;
      this.products_desc = details.desc;
      this.category_id = details.category_id;
      this.products_unit = details.product_unit;
      this.cats_name = categorys.filter(item=>(item.category_id == details.category_id))[0].category_name;
      Object.values(details.skusMap).length && Object.values(details.skusMap).forEach(item=>{
          this.skuSttrList.push({
            key:item.name,
            value:item.skuSpecValueList.map(item=>(item.value))
          })
      })
    },
    /*获取分类*/
    getCategorys () {
      return new Promise((resolve,reject)=>{
        let data = {
          store_id:this.userinfo.store_info[0]['_id']
        }
        this.$store.dispatch('product_category/GET_CATEGORYS',data)
        .then(res=>{
          resolve(res);
        })
        .catch(()=>{
          reject();
        })
      })
    },
    /*获取商品详情*/
    getProductDetails () {
      return new Promise((resolve,reject)=>{
        let data = {
          product_id:this.product_id
        }
        this.$store.dispatch('product/GET_PRODUCT_DETAILS',data)
        .then(res=>{
          resolve(res);
        })
        .catch(()=>{
          reject();
        })
      });
    },
    /*设置sku*/
    setSku () {
      if (this.skuSttrList.length >= 3)return
      this.skuSttrList.push({key:'',  value:['']})
    },
    /*设置sku 属性值*/
    setAttrValue (idx) {
      if (this.skuSttrList[idx]['key']==''){
        return this.$message.error('请填写属性名')
      }
      this.$set(this.skuSttrList[idx]['value'],this.skuSttrList[idx]['value'].length,'');
    },
    /*删除sku 规格行*/
    delSkuRow (idx) {
      this.skuSttrList.splice(idx,1);
    },
    // 计算sku item宽度
    compuWidth(item) {
      return `width:calc( 100%  / ${ item.length } )`
    },
    selectcates (e) {
      this.category_id = e;
    },
    // 保存商品信息
    saveGoodInfo () {
      if (this.products_name == '') {
        return this.$message.error('请填写商品名称');
      }
      if (this.products_desc == '') {
        return this.$message.error('请填写商品描述');
      }
      if (this.products_unit == '') {
        return this.$message.error('请填写库存单位');
      }
      if (this.category_id == '') {
        return this.$message.error('请填写商品分类');
      }
      let params = {
        products_name: this.products_name,
        products_desc: this.products_desc,
        products_image: this.products_image,
        store_id: this.userinfo.store_info[0]['_id'],
        attributes: this.skuSttrList,
        products_unit: this.products_unit,
        category_id: this.category_id,
        skus: this.newtableList,
      };
      let moduleAction = 'product/CREATE_GOODS';
      if (this.product_id) {
        params.product_id = this.product_id;
        moduleAction = 'product/EDIT_GOODS';
      }
       this.$store.dispatch(moduleAction,params).then(res=>{
         this.$message.success('商品发布成功');
         this.$router.push({name:'main.container.goods.goodsList'});
      }).catch((res)=>{
        console.log(res,'res')
        this.$message.error('商品发布失败');
      })
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
      .cates-tps{
        color: #38f;
        font-size: 10px;
        padding-left: 5px;
        cursor: pointer;
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
        .sku-table-header{
          height: 30px;
          align-items: center;
          justify-content: space-around;
          background-color: #efefef;
          font-size: 14px;
          padding:0 5px;
          line-height: 40px;
          .sku-t-th{
            line-height: 1;
          }
        }
        .sku-table-body{
          padding:0 5px;
          height: 40px;
          align-items: center;
          justify-content: space-around;
          border:1px solid #efefef;
          .sku-t-td{
            flex:1;
            text-align: center;
            height: 25px;
            font-size: 13px;
            border-right: 1px solid #efefef;
            &:last-child{
                border-right:none;
            }
            .el-input{
              height: 25px;
              input{
                border-radius: 0;
                height: 25px;
                text-align: center;
                width: 100px!important;
              }
            }
          }
        }
      }
    }
    .btn-save{
      margin:10px auto;

    }
  }
</style>
