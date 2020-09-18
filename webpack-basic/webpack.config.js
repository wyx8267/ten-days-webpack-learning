const path = require('path');
console.log(path.resolve(__dirname, 'dist'));
module.exports = {
  mode: 'development', // 模式 默认两种 production development
  entry: './src/index.js', // 入口
  output: {
    filename: 'bundle.js', // 打包后的文件名
    path: path.resolve(__dirname, 'dist'), // 路径必须是绝对路径
  }
}