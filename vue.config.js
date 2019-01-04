
module.exports = {
  baseUrl:'./',
  devServer: {
    port: 8083,
    open: true,
    host: 'www.vuetext.com',
    proxy: { // 配置跨域
      '/api': {
　　　　　　　　　　//要访问的跨域的api的域名
          target: 'http://www.vuetext.com:8084',
          ws: true,
          changOrigin: true,
          pathRewrite: {
              '^/api': ''
          }
     }
    }
  }
}
