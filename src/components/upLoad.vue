<template>
  <div class="upLoad">
    <div class="sys-flex upload-main">
      <div class="image-main sys-flex" v-if="showImg && !imageUrl.length">
          <div class="picture rel">
              <img :src="showImg">
          </div>
      </div>
      <div class="image-main sys-flex" v-if="imageUrl.length">
          <div class="picture rel"  v-for="(item,index) in imageUrl"   :key="index">
              <div class="mask abs sys-flex" @click="deleteImg(index)">
                  <i class="el-icon-plus el-icon-delete"></i>
              </div>
              <img :src="item">
          </div>
      </div>
      <el-upload
        ref="upload"
        class="avatar-uploader sys-flex"
        :on-exceed="handleExceed"
        :limit="1"
         action="https://20130510.cn/api/upLoad.php"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>
<script>
import config from '@/config/config'
export default {
  name: 'upLoad',
  data() {
      return {
        imageUrl: [],
        imgQuality: 0.5 //压缩图片的质量
      };
  },
  props:{
    img:{
      type:String,
      default:''
    }
  },
  computed:{
    showImg () {
      return this.img ? config.Imghost + this.img : ''
    }
  },
  methods: {
    dataURItoBlob(dataURI, type) {
     let binary = atob(dataURI.split(',')[1]);
     let array = [];
     for(var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
     }
     return new Blob([new Uint8Array(array)], {type: type});
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl.push(URL.createObjectURL(file.raw));
      this.$emit('success',res);
    },
    beforeAvatarUpload(param) {
      const imgSize = param.size / 1024 / 1024;
      //对图片进行压缩
       if(imgSize > 0.2) {
        const _this = this;
        return new Promise(resolve => {
          const reader = new FileReader();
          const image = new Image();
          image.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const width = image.width * _this.imgQuality
            const height = image.height * _this.imgQuality
            canvas.width = width;
            canvas.height = height;
            context.clearRect(0, 0, width, height);
            context.drawImage(image, 0, 0, width, height);
            const dataUrl = canvas.toDataURL(param.type);
            const blobData = _this.dataURItoBlob(dataUrl, param.type);
            resolve(blobData)
          }
         reader.onload = (e => { image.src = e.target.result; });
         reader.readAsDataURL(param);
        })
      }
    },
    handleExceed (files, fileList) {
      console.log(fileList,'fileList')
      this.$message.warning(`最多选择1张`);
    },
    deleteImg (idx) {
      this.$refs.upload.clearFiles();
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
        margin:0 10px 0 0;
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
