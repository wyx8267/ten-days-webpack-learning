let loaderUtils = require('loader-utils')
function loader(source) {
  // 根据当前文件生成路径
  let filename = loaderUtils.interpolateName(this, '[hash].[ext]', { content: source })
  // 发射文件
  this.emitFile(filename, source);
  return `module.exports="${filename}"`;
}
loader.raw = true; //二进制
module.exports = loader