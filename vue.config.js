const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port: 8080,
    proxy: {
      '/users': {
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
    }
  }
  }
})
