const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port: 8080,
    proxy: {
      '/auth': {
          target: 'http://localhost:8089',
          changeOrigin: true,
      },
      '/factures': {
        target: 'http://localhost:8081', 
        changeOrigin: true,
      },
      '/reglements': {
        target: 'http://localhost:8083', 
        changeOrigin: true,
    },
    '/login': {
      target: 'http://localhost:9001', 
      changeOrigin: true,
    },
    '/currencies':{
      target: 'http://localhost:8084', 
      changeOrigin: true,
    }
  }
  }
})
