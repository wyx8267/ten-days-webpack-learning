function loader(source) { // loader的参数
  console.log('loader 22222222');
  return source
}

loader.pitch = function () {
  // return 'ok'
}

module.exports = loader