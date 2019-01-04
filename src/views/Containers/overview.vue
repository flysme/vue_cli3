<template>
  <div class="overview">
    <el-row>
      <el-col :span="24">
        <div class="header-main sys-flex">
            <div class="header-left">
              <div class="header-store-name">
                {{storeinfo.storename || '--'}}
              </div>
            </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'Vuex';
export default {
  name: 'overview',
  computed: {
    ...mapState('apply', {
      storeinfo: state => state.store_info,
    })
  },
  created () {

  }
}
</script>
<style lang="scss">
    .overview{
      .header-main{
        background-color: #FFF;
        padding:10px;
        .header-store-name{
          font-size: 19px;
          color: #000;
          font-weight: 450;
        }
      }
    }
</style>
