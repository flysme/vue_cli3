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
      @selection-change="selectAllcatesGorys"
      v-loading="loading"
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
        prop="upts_time"
        fixed="left"
        label="更新时间"
        width="200px">
      </el-table-column>
      <el-table-column
        fixed="left"
        label="操作"
        width="500">
        <template slot-scope="scope">
          <el-button @click="editCatesgorys(scope.row.category_id)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteCatesgorys(scope.row.category_id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="2">
            <el-button size="mini" :disabled="disabled">删除</el-button>
      </el-col>
    </el-row>
    <el-dialog title="新增分类" width="40%" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input placeholder="请输入分类名称" v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
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
      loading:true,
      dialogVisible:false,
      form: {
        name: ''
      },
      formLabelWidth: '100px'
    }
  },
  computed: {
    ...mapState('product_category',{
        categorysList: state => state.categorysList
    })
  },
  created () {
    this.getCategorys();
  },
  methods: {
    /*列表全选分类*/
    selectAllcatesGorys(val) {
      this.multipleSelection = val;
      this.disabled = this.multipleSelection.length ? false : true
    },
    /*获取分类列表*/
    getCategorys () {
      let data = {
        store_id:this.userinfo.store_info[0]['_id']
      }
      this.loading = true;
      this.$store.dispatch('product_category/GET_CATEGORYS',data).then(res=>{
        this.loading = false;
      }).catch(e=>{
        this.loading = false;
        console.error(e);
      })
    },
    /*分类名称更改*/
    editCatesgorys (catesgory_id) {
      this.$prompt('请输入新的分类名称', '修改分类', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        let data = {
          cats_name: value,
          catesgory_id
        }
        this.$store.dispatch('product_category/UPDATE_CATEGORYS',data).then(res=>{
          this.getCategorys();
        })
      }).catch((e) => {
        console.error(e);
      });
    },
    /*打开分类modal*/
    addcats () {
      this.dialogVisible = true;
    },
    submit () {
      if (this.form.name==''){
        return this.$message.error('请输入分类名称');
      }
      console.log(this.form.name,'this.form.name')
      let data = {
        cats_name: this.form.name,
        store_id:this.userinfo.store_info[0]['_id']
      }
      this.dialogVisible = false;
      this.$store.dispatch('product_category/SET_CATEGORYS',data).then(res=>{
        this.getCategorys();
      })
    },
    /*删除分类*/
    deleteCatesgorys (catesgory_id) {
      this.$confirm('确认删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('product_category/DELETE_CATEGORYS',catesgory_id).then(res=>{
          this.getCategorys();
        })
      }).catch(() => {
        console.log('取消')
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
    .dialog-footer{
      width: 100%;
      // text-align: center;
      .el-button{
        width: 80%;
      }
    }
  }
</style>
