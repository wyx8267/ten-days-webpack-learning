let path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
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
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      }
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