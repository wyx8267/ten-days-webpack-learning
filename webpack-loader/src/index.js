console.log('hello');

// -! 不会让文件再通过pre + normal loader 处理
// ! 不再用normal
// !! 不用其他所有，只用行内
let str = require('!!inline-loader!./a.js')