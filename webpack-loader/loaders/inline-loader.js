function loader(source) { // loader的参数
  console.log('loader inline');
  return source
}

module.exports = loader