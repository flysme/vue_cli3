<template>
  <div id="app">
    <!-- 我是Home
    <div class="" @click="$router.push({name: 'main.container'})">
      跳转main.aside
    </div> -->
  </div>
</template>

<script>
import API from '@/http'
console.log(API)
export default {
  name: 'home',
  created () {
    this.$router.push({name: 'main.container'})
  }
}
</script>
