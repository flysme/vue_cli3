<template>
  <div id="navfirst">
    我是首页概览
  </div>
</template>

<script>
import API from '@/http'
console.log(API)
export default {
  name: 'navfirst',
  created () {
    API.getTradings().then(res => {
      console.log(res, 'res')
    })
  }
}
</script>
