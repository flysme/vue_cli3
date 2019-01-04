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
      :data="tableData"
      ref="multipleTable"
      tooltip-effect="dark"
      @selection-change="selectAllItem"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="33">
      </el-table-column>
      <el-table-column
        prop="name"
        fixed="left"
        label="分类名称"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="date"
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
import API from '@/http'
export default {
  name: 'goodscats',
  data () {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      multipleSelection:[],
      disabled: true,
    }
  },
  created () {

  },
  methods: {
    /*列表全选*/
    selectAllItem(val) {
      this.multipleSelection = val;
      this.disabled = this.multipleSelection.length ? false : true
    },
    addcats () {
      this.$prompt('请输入分类名称', '新增分类', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
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
