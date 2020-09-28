// import $ from 'jquery'

// import $ from 'expose-loader?$!jquery'
// expose-loader 暴露全局的loader 内联使用
// console.log(window.$);

console.log($); // 在每个模块注入 $ 对象

// let str = require('./a')

// require('./index.css')
// require('./index.less')

// let fn = () => {
//   console.log(str);
// }
// fn();

// @log
// class A {
//   a = 1;
// }
// let a = new A()
// console.log(a.a);

// function log(target) {
//   console.log(target);
// }