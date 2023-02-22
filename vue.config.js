const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/rest": {
        "target": 'https://a.mst.tools/rest/',
        "pathRewrite": { '^/rest': '' },
        "changeOrigin": true,
        "secure": false
      }
    }
  }
})
