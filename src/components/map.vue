<template>
  <div class="searchmap">
    <el-dialog
    title="请选择地点"
    :visible.sync="dialogVisible"
    @close="closeDialog"
    width="50%">
    <div class="demo-input-suffix sys-flex">
    </div>
    <div class="amap-wrapper">
      <el-amap-search-box class="search-box abs" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <el-amap vid="amapDemo" :center="mapCenter" :plugin="plugin" :zoom="12" class="amap-demo">
        <el-amap-marker v-if="markers.length"  v-for="marker in markers" :position="marker" ></el-amap-marker>
      </el-amap>
    </div>
    <span slot="footer" class="dialog-footer sys-flex">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="closeDialog">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'searchmap',
  data() {
      return {
        markers: [],
         mapCenter: [121.59996, 31.197646],
         plugin: [{
           pName: 'Geolocation',
           events: {
             init:(o)=> {
               // o 是高德地图定位插件实例
               o.getCurrentPosition((status, result) => {
                 if (result && result.position) {
                   console.log(result);
                   this.lng = result.position.lng;
                   this.lat = result.position.lat;
                   this.mapCenter = [result.position.lng, result.position.lat];
                   this.$nextTick();
                 }
               });
             }
           }
         }],
         searchOption: {
           city: '铜陵市',
           citylimit: true
         },
        dialogVisible: true,
        markerlocation:{},
      };
  },
  created () {
    this.dialogVisible = true;
    this.searchOption.city = this.city;
    console.log(this.searchOption.city,'this.searchOption.city')
  },
  props:{
    city:{
      type:String,
      default:'铜陵市'
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog',this.markerlocation);
    },
    onSearchResult(pois) {
        // let latSum = 0;
        // let lngSum = 0;
        if (pois.length > 0) {
          // pois.forEach(poi => {
          //   let {lng, lat} = poi;
          //   lngSum += lng;
          //   latSum += lat;
          // });
          this.markers.push([pois[0].lng, pois[0].lat]);
          // let center = {
          //   lng: lngSum / pois.length,
          //   lat: latSum / pois.length
          // };
          this.mapCenter = [pois[0].lng, pois[0].lat];
          this.markerlocation = pois[0];
          console.log(this.markerlocation,'this.markerlocation')
        }
    }
  }
}
</script>
<style lang="scss">
    .amap-wrapper {
      width: 100%;
      height: 250px;
      position: relative;
    }
    .search-box{
      width: 60%!important;
      margin: 10px;
      position: absolute!important;
    }
    .dialog-footer{
      margin:0 30%;
      .el-button{
        flex:1;
        border-radius: 0;
        margin-left: 10px;
      }
    }
</style>
