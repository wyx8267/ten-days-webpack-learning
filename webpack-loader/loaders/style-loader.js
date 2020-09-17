let loaderUtils = require('loader-utils')

// 作用：导出脚本
function loader(source) {
  let str = `
    let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(style);
  `
  return str;
}
// 在 style-loader 上写了pitch
// css-loader!less-loader!./index.less
loader.pitch = function (remainingRequest) { // 剩余请求
  // console.log(remainingRequest);
  // console.log(loaderUtils.stringifyRequest(this, '!!' + remainingRequest));

  // stringifyRequest将请求转换为可在require()或import中使用的字符串，同时避免使用绝对路径。
  // require 路径，返回的是css-loader处理后的结果 require('!!css-loader!less-loader!index.less)
  let str = `
    let style = document.createElement('style');
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)});
    document.head.appendChild(style);
  `
  return str;
}
module.exports = loader;