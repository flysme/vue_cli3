<template>
  <div id="goodList">
    <el-row type="flex" justify="space-between">
      <el-col :span="9">
        <div class="sys-flex">
          <div class="grid-content search-main sys-flex">
            <el-input
            size="small"
            v-model="searchvalue"
            placeholder="搜索"
            ></el-input>
            <div class="search-btn">
              <el-button size="small" type="primary" :disabled="cansearchFilter" plain @click="searchFilter">筛选</el-button>
            </div>
          </div>
          <div class="grid-content search-cats-main sys-flex">
            <el-select @change="selectCats" v-model="catesgory_id" placeholder="分类搜索" size="small">
              <el-option :label="cateitem.category_name" :value="cateitem.category_id" :key="index"  v-for="(cateitem,index) in categorysList" ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
         <div class="btn-add sys-flex">
           <el-button size="small" type="primary" :disabled="!storeStatus.canhandle"  @click="add">新增商品</el-button>
         </div>
      </el-col>
    </el-row>
    <el-table
      :data="resetResponData"
      ref="multipleTable"
      tooltip-effect="dark"
      @selection-change="selectAllItem"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="33">
      </el-table-column>
      <el-table-column
        prop="img"
        label="商品图"
        width="100">
        <template slot-scope="scope">
          <img :src="scope.row.img" width="50" height="50"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="ident_name"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="num"
        label="库存"
        width="100">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="editGoods(scope.row)" type="text" size="small">编辑</el-button>
          <span> - </span>
          <el-dropdown @command="setItemhandle" trigger="click" size="mini">
              <el-button  type="text" size="small">更多</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="scope.row">{{scope.row.status=='1' ? '下架':'上架'}}</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="8">
            <el-button size="mini" :disabled="disabled" @click="changeProducts(1)">上架</el-button>
            <el-button size="mini" :disabled="disabled" @click="changeProducts(0)">下架</el-button>
            <el-button size="mini" :disabled="disabled" @click="changeProducts(2)">删除</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UTILS from '@/utils/utils'
import config from '@/config/config'
import { mapState } from 'vuex'
export default {
  name: 'goodList',
  data () {
    return {
      loading:true,
      multiProductList: [],
      disabled: true,
      searchcatsvalue:'',
      catesgory_id:'',
      searchvalue: '', //搜索关键字
      userinfo:UTILS.storage.get('userinfo'),
    }
  },
  computed: {
    cansearchFilter () {
      return this.searchvalue=='';
    },
    resetResponData () {
      let goodList = this.$store.state.product.goodList;
      let resetData = goodList.map(item => {
         item.ident_name = item.status==1 ? '已上架' : '已下架'
         item.img = config.Imghost + item.img;
         return item;
      })
      console.log(resetData,'resetData',config.Imghost)
      return resetData
    },
    ...mapState('product_category',{
        // 箭头函数可使代码更简练
        categorysList: state => state.categorysList
    }),
    ...mapState('login',{
        storeStatus:state => state.storeStatus,
    })
  },
  created () {
    this.getCategorys();
    this.getProducts();
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    /*列表全选*/
    selectAllItem(val) {
      this.multiProductList = val;
      this.disabled = this.multiProductList.length ? false : true
    },
    /*获取商品分类*/
    getCategorys () {
      let data = {
        store_id:this.userinfo.store_id || this.userinfo.store_info[0]['_id']
      }
      this.$store.dispatch('product_category/GET_CATEGORYS',data)
    },
    /*分类搜索*/
    selectCats () {
      this.getProducts();
    },
    /*获取商品*/
    getProducts () {
      let data = {
        store_id:this.userinfo.store_id || this.userinfo.store_info[0]['_id'],
      }
      if (this.searchvalue!='') {
        data.product_name=this.searchvalue;
      }
      if (this.catesgory_id!='') {
        data.catesgory_id=this.catesgory_id;
      }
      this.loading = true;
      this.$store.dispatch('product/LOAD_GOODSLIST',data).then(()=>{
        this.loading = false;
      }).finally(()=>{
        this.isloading = false;
      })
    },
    editGoods (item) {
      this.$router.push({path: `/editgoods/${item.product_id}`});
    },
    /*点击更多*/
    setItemhandle(item) {
      let status = item.status==1 ? 0: 1;
      this.updateProductstatus([item.product_id],status);
    },
    /*商品全选操作*/
    changeProducts (status) {
      let product_ids = this.multiProductList.map(item=>(item.product_id));
      this.updateProductstatus(product_ids,status);
    },
    /*更新商品状态*/
    updateProductstatus (product_ids,status) {
      let data = {status,product_ids};
      this.$store.dispatch('product/UPDATE_GOODSITEM',data).then(()=>{
        this.getProducts();
      });
    },
    /*商品名称搜索*/
    searchFilter () {
      this.getProducts();
    },
    /*商品分类搜索*/
    setcatsSearch (command) {
      this.$message('click on item ' + command);
    },
    add () {
      this.$router.push({name: 'main.container.goods.addgoods'});
    }
    // ...mapActions({
    //   add: 'goodsList/LOAD_GOODSLIST'  /*新增商品*/
    // })
  }
}
</script>
<style lang="scss" scoped>
  #goodList{
    background-color: #FFF;
    .search-main{
      justify-content: space-between;
      .search-btn{
        margin-left: 20px;
      }
    }
    .search-cats-main{
      margin-left:40px;
    }
    .btn-add{
      justify-content: flex-end;
      margin-right: 10px;
    }
    .el-col{
      margin:10px;
    }
  }
</style>
