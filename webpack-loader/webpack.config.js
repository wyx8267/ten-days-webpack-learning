let path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  watch: true,
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')]
    // 别名
    // alias: {
    //   loader1: path.resolve(__dirname, 'loaders/loader1.js')
    // }
  },
  module: {
    // loader分类，pre在前面,post在后面,normal
    // loader 顺序问题，从右向左，从下到上
    // loader 顺序 pre + normal + inline + post
    rules: [
      {
        test: /\.jpg$/,
        // file-loader 作用：根据图片生成md5，发射到dist目录下,file-loader还会返回当前图片路径
        // use: 'file-loader'

        // url-loader 作用：根据设定的大小限制，选择将图片转换为base64或调用file-loader
        use: {
          loader: 'url-loader',
          options: {
            limit: 20*1024
          }
        }
      }
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'banner-loader',
      //     options: {
      //       text: 'code by XXX',
      //       filename: path.resolve(__dirname, 'banner.js')
      //     }
      //   }
      // }
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: [
      //         '@babel/preset-env'
      //       ]
      //     }
      //   }
      // }
    ]

    // rules: [
    //   {
    //     test: /\.js$/,
    //     use: ['loader3', 'loader2', 'loader1']
    //   }
    //   {
    //     test: /\.js$/,
    //     use: {
    //       loader: 'loader1'
    //     },
    //     enforce: 'pre'
    //   },
    //   {
    //     test: /\.js$/,
    //     use: {
    //       loader: 'loader2'
    //     }
    //   },
    //   {
    //     test: /\.js$/,
    //     use: {
    //       loader: 'loader3'
    //     },
    //     enforce: 'post'
    //   }

    // ]
  }
}