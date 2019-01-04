<template>
  <div class="upLoad">
    <div class="sys-flex upload-main">
      <el-upload
        class="avatar-uploader sys-flex"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        action="http://www.vuetext.com:8083/api/upLoad.php"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div class="image-main sys-flex" v-if="imageUrl.length">
          <div class="picture rel"  v-for="(item,index) in imageUrl"   :key="index">
              <div class="mask abs sys-flex" @click="deleteImg(index)">
                  <i class="el-icon-plus el-icon-delete"></i>
              </div>
              <img :src="item">
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'upLoad',
  data() {
      return {
        imageUrl: []
      };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(URL.createObjectURL(file.raw),'URL.createObjectURL(file.raw)');
      this.imageUrl.push(URL.createObjectURL(file.raw));
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    handleExceed (files, fileList) {
      this.$message.warning(`最多选择1张`);
    },
    deleteImg (idx) {
      this.imageUrl.splice(idx,1);
    }
  }
}
</script>
<style lang="scss">
  .avatar-uploader{
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409EFF;
      }
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 58px;
    height: 58px;
    line-height: 58px;
    text-align: center;
  }
  .avatar {
    width: 58px;
    height: 58px;
    display: block;
  }
  .upload-main{
    align-items: center;
    .image-main{
      flex-wrap: wrap;
      align-items: center;
      .picture{
        width: 58px;
        height: 58px;
        margin:0 0 0 10px;
        border:1px solid #efefef;
        &>img{
          width: 58px;
          height: 58px;
        }
        .mask{
          width: 58px;
          height: 58px;
          justify-content: center;
          align-items: center;
          opacity: 0;
          left: 0;
          top:0;
          cursor: pointer;
          transition: 0.5;
          background-color: rgba(0,0,0,0);
          color: #FFF;
          &:hover {
              opacity: 1;
              background-color: rgba(0,0,0,0.6);
          }
        }
      }
    }
  }
</style>
