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
              <el-button size="small" type="info" plain @click="searchFilter">筛选</el-button>
            </div>
          </div>
          <div class="grid-content search-cats-main sys-flex">
            <el-dropdown trigger="click" @command="setcatsSearch">
              <el-button size="small" plain>
                分类搜索<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">黄金糕</el-dropdown-item>
                <el-dropdown-item command="b">狮子头</el-dropdown-item>
                <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
                <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
         <div class="btn-add sys-flex">
           <el-button size="small" type="primary"  @click="add">新增商品</el-button>
         </div>
      </el-col>
    </el-row>
    <el-table
      :data="resetResponData"
      ref="multipleTable"
      tooltip-effect="dark"
      @selection-change="selectAllItem"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="33">
      </el-table-column>
      <el-table-column
        prop="image"
        label="商品图"
        width="100">
        <template slot-scope="scope">
          <img :src="scope.row.image" width="50" height="50"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="cats_name"
        label="商品分类">
      </el-table-column>
      <el-table-column
        prop="price"
        label="原价"
        width="100">
      </el-table-column>
      <el-table-column
        prop="price"
        label="折扣价"
        width="80">
      </el-table-column>
      <el-table-column
        prop="num"
        label="库存"
        width="100">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="上架时间">
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
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="headblock">上架</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="6">
            <el-button size="mini" :disabled="disabled">上架</el-button>
            <el-button size="mini" :disabled="disabled">下架</el-button>
            <el-button size="mini" :disabled="disabled">删除</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import API from '@/http'
import { mapActions } from 'vuex'
console.log(API)
export default {
  name: 'goodList',
  data () {
    return {
      multipleSelection: [],
      disabled: true,
      searchcatsvalue:'',
      searchvalue: '', //搜索关键字
    }
  },
  computed: {
    resetResponData () {
      let goodList = this.$store.state.goodsList.goodList;
      let resetData = goodList.map(item => {
         item.ident_name = item.status ? '已上架' : '已下架'
         item.cats_name = item.cats.name
         return item;
      })
      return resetData
    }
  },
  created () {
    API.getTradings().then(res => {
      console.log(res, 'res')
    })
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
      this.multipleSelection = val;
      this.disabled = this.multipleSelection.length ? false : true
    },
    editGoods (current) {
      console.log(current, 'current')
    },
    /*点击更多*/
    setItemhandle(command) {
      this.$message('click on item ' + command);
    },
    /*商品名称搜索*/
    searchFilter () {
      console.log(this.searchvalue, 'searchvalue')
    },
    /*商品分类搜索*/
    setcatsSearch (command) {
      this.$message('click on item ' + command);
    },
    ...mapActions({
      add: 'goodsList/LOAD_GOODSLIST'  /*新增商品*/
    })
  }
}
</script>
<style lang="scss">
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
