let loaderUtils = require('loader-utils')
let mime = require('mime')

function loader(source) {
  let {limit} = loaderUtils.getOptions(this);
  if (limit && limit > source.length) {
    // 文件大小小于设定限制，转换为base64
    return `module.exports="data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
  } else {
    return require('./file-loader').call(this, source)
  }
}
loader.raw = true; //二进制
module.exports = loader