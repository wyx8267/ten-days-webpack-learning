let loaderUtils = require('loader-utils')
let validateOptions = require('schema-utils')
let fs = require('fs')

function loader(source) {
  // 打包提示不缓存 [./src/index.js] 403 bytes {main} [not cacheable] [built]
  // this.cacheable(false);

  this.cacheable && this.cacheable();
  let options = loaderUtils.getOptions(this);
  let cb = this.async();
  let schema = {
    type: 'object',
    properties: {
      text:{
        type: 'string',
      },
      filename:{
        type: 'string',
      }
    }
  }
  validateOptions(schema, options, 'banner-loader')
  if (options.filename) {
    // 字段添加文件依赖，将banner.js文件变化加入打包watch监听
    this.addDependency(options.filename)
    fs.readFile(options.filename, {encoding: 'utf-8'}, function (err, data) {
      cb(err, `/**\n* ${data}\n*/\n${source}`)
    })
  } else {
    cb(null, `/**\n* ${options.text}\n*/\n${source}`)
  }
}
module.exports = loader;