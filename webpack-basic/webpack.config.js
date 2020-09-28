const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'development', // 模式 默认两种 production development
  entry: './src/index.js', // 入口
  output: {
    filename: 'bundle.[hash:8].js', // 打包后的文件名
    path: path.resolve(__dirname, 'dist'), // 路径必须是绝对路径
  },
  devServer: { // 开发环境服务器配置
    port: 3000,
    // open:true,
    progress: true,
    contentBase: './dist',
    compress: true
  },
  plugins: [ // 数组，放着所有webpack插件
    new HtmlWebpackPlugin({
      // 依照模板自动创建入口html
      template: './src/index.html',
      filename: 'index.html',
      hash: true,
      // minify: {
      //   removeAttributeQuotes: true,
      //   collapseWhitespace: true,
      // }
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ],
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       enforce: 'pre'
      //     }
      //   },
      // },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {// 把es6转换成es5
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', {'legacy': true}],
              ['@babel/plugin-proposal-class-properties', { 'loose': true }],
              ['@babel/plugin-transform-runtime']
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      // { // css-loader 解析@import、url()之类语法
      //   // style-loader 把css插入到head标签中
      //   // loader特点 作用单一
      //   test: /\.css$/,
      //   use: [{
      //     loader: 'style-loader',
      //     // options:{insert: 'top'}
      //   }, 'css-loader']
      // },
      {
        test: /\.css$/,
        use: [
          // 抽离 css 文件
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      // { 
      //   // less-loader less->css
      //   test: /\.less$/,
      //   use: [{
      //     loader: 'style-loader',
      //     // options:{insert: 'top'}
      //   }, 'css-loader', 'less-loader']
      // }
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader',
        'postcss-loader', 'less-loader']
      }
    ]
  },
  optimization: { // 优化项
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssPlugin({})
    ]
  }
}