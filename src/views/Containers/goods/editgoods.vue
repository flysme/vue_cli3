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
          <!-- <el-dropdown trigger="click" size="mini">
            <el-input
              size="mini"
              placeholder="商品分类"
              suffix-icon="el-icon-arrow-down"
              readonly
              v-model="shopcats">
            </el-input>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="a">黄金糕</el-dropdown-item>
            <el-dropdown-item command="b">狮子头</el-dropdown-item>
            <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
            <el-dropdown-item command="d">双皮奶</el-dropdown-item>
            <el-dropdown-item command="e">蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
        <el-select v-model="shopcats" placeholder="商品分类" size="mini">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <div class="sys-flex form-item">
        <el-col :span="3">
          <div class="demo-input-suffix">
            原价:
          </div>
        </el-col>
        <el-col :span="4">
          <el-input
            size="mini"
            placeholder="商品原价"
            v-model="origin_price">
          </el-input>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <div class="sys-flex form-item">
        <el-col :span="3">
          <div class="demo-input-suffix">
            折扣价:
          </div>
        </el-col>
        <el-col :span="4">
          <el-input
            size="mini"
            placeholder="折扣价"
            v-model="discount_price">
          </el-input>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <div class="sys-flex form-item">
        <el-col :span="3">
          <div class="demo-input-suffix">
            库存:
          </div>
        </el-col>
        <el-col :span="4">
          <el-input
            size="mini"
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
export default {
  name: 'editgoodList',
  data () {
    return {
      shopname:'',
      origin_price:'',
      discount_price:'',
      shopcats:'',
      num:'',
    }
  },
  created () {

  },
  methods: {
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
    }
  }
</style>
