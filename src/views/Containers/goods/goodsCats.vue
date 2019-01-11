<template>
  <div id="goodscats">
    <el-row>
      <el-col :span="24">
         <div class="btn-add sys-flex">
           <el-button size="small" type="primary" @click="addcats">新增分类</el-button>
         </div>
      </el-col>
    </el-row>
    <el-table
      :data="categorysList"
      ref="multipleTable"
      tooltip-effect="dark"
      @selection-change="selectAllItem"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="33">
      </el-table-column>
      <el-table-column
        prop="category_name"
        fixed="left"
        label="分类名称"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="create_time"
        fixed="left"
        label="创建时间"
        width="200px">
      </el-table-column>
      <el-table-column
        fixed="left"
        label="操作"
        width="500">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="2">
            <el-button size="mini" :disabled="disabled">删除</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UTILS from '@/utils/utils'
import { mapState } from 'vuex'
export default {
  name: 'goodscats',
  data () {
    return {
      userinfo:UTILS.storage.get('userinfo'),
      multipleSelection:[],
      disabled: true,
    }
  },
  computed: {
    ...mapState('product_category',{
        // 箭头函数可使代码更简练
        categorysList: state => state.categorysList
    })
  },
  created () {
    this.getCategorys();
  },
  methods: {
    /*列表全选*/
    selectAllItem(val) {
      this.multipleSelection = val;
      this.disabled = this.multipleSelection.length ? false : true
    },
    getCategorys () {
      let data = {
        store_id:this.userinfo.store_id
      }
      this.$store.dispatch('product_category/GET_CATEGORYS',data)
    },
    addcats () {
      this.$prompt('请输入分类名称', '新增分类', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        let data = {
          cats_name: value,
          store_id:this.userinfo.store_id
        }
        this.$store.dispatch('product_category/SET_CATEGORYS',data)
      }).catch(() => {

      });
    }
  }
}
</script>
<style lang="scss">
  #goodscats{
    background-color: #FFF;
    padding:10px;
    .btn-add{
      margin:10px 0 0 0;
      padding-bottom: 20px;
      border-bottom: 1px solid #efefef;
    }
    .el-col{
      margin:10px;
    }
  }
</style>
