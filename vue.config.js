const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 80,
    proxy: {
      "rest/": {
        "target": 'https://a.mst.tools/rest/',
        "pathRewrite": { '^/rest': '' },
        "changeOrigin": true,
        "secure": true
      }
    }
  }
})
