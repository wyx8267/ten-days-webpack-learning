let babel = require('@babel/core')
let loaderUtils = require('loader-utils')

function loader(source) { // this: loaderContext
  // loader上下文 默认有async这个方法 异步执行
  let callback = this.async();

  let options = loaderUtils.getOptions(this);
  // console.log(options);
  // console.log(this.resourcePath);
  babel.transform(source, {
    ...options,
    sourceMap: true,
    // 从绝对路径取出文件名，否则在开发者工具source中为 unknown
    filename: this.resourcePath.split('/').pop()
  }, function (err, result) {
      callback(err, result.code, result.map)
      // 返回：错误、代码、sourceMap
  })
  // return source; 使用异步回调时此处不再起作用
}

module.exports = loader