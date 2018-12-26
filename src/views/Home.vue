<template>
  <div id="app">
    我是Home
  </div>
</template>

<script>
import API from '@/http'
console.log(API)
export default {
  name: 'home',
  created () {
    API.getTradings().then(res => {
      console.log(res, 'res')
    })
  }
}
</script>
