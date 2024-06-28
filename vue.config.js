const { defineConfig } = require('@vue/cli-service')
const version = new Date().getTime()
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      filename: `js/[name].[chunkhash].${version}.js`,
      chunkFilename: `js/[id].[chunkhash].${version}.js`
    }
  },
  devServer: {
    port: 80,
    proxy: {
      'rest/': {
        target: 'https://a.dev.mst.tools/rest/',
        pathRewrite: { '^/rest': '' },
        changeOrigin: true,
        secure: true
      }
    }
  }
})
