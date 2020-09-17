function loader(source) { // loader的参数就是源代码
  console.log('loader 11111111');
  return source
}

module.exports = loader