const webpack = require('webpack')
const path = require('path')
const resolve = dir => path.join(__dirname, '..', dir)
const pages = require('./pages.config')

module.exports = {
  productionSourceMap: false,

  configureWebpack: {
    plugins: [
      new webpack.BannerPlugin({
        banner: new Date().toString()
      })
    ]
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('common', resolve('src/common'))
      .set('pages', resolve('src/pages'))
    // 修改babel-loader规则
    config.module.rule('compile')
      .test(/\.js$/)
      .include
      .add(path.resolve(__dirname, '../src'))
      .add(path.resolve(__dirname, '../node_modules/@yzj/appParams'))
      .end()
      .use('babel')
      .loader('babel-loader')
    // 修改preload、prefetch plugin配置
    // config.plugin('preload').tap(options => {
    //   return options
    // })
  },

  runtimeCompiler: true,

  pages,
}
