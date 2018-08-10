const webpack = require('webpack')
const merge = require('webpack-merge')
const ip = require('ip')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 9000,
    useLocalIp: true,
    host: ip.address(),
    hot: true,
    noInfo: true,
    open: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
})
