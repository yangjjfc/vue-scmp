var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: { 
    app: ["babel-polyfill", "./src/main.js"] //babel-polyfill是新属性兼容老浏览器
  },
  output: {
    path: config.build.assetsRoot, //输出地址
    filename: '[name].js', //文件名
    publicPath: process.env.NODE_ENV === 'production'  //创建的每个 URL加前缀
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: { //解析
    extensions: ['.js', '.vue', '.json'], //自动解析确定的扩展,引用文件不需要加扩展名
    alias: {
      'vue$': 'vue/dist/vue.esm.js', //别名
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader', //应用模块
        enforce: 'pre', //指定 loader 种类
        include: [resolve('src'), resolve('test')], //检测的文件路径
        options: {
          formatter: require('eslint-friendly-formatter') //格式化
        }
      },
      {
        test: /\.vue$/, 
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader', //es6
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,  //图片处理
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, //字体处理
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
