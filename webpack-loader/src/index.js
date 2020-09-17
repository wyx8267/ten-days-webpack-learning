// console.log('hello');

// -! 不会让文件再通过pre + normal loader 处理
// ! 不再用normal
// !! 不用其他所有，只用行内
// let str = require('!!inline-loader!./a.js')

// class FinalFantasy{
//   constructor() {
//     this.name = 'Erozia';
//   }
//   getName() {
//     return this.name;
//   }
// }

// let ff = new FinalFantasy();
// console.log(ff.getName());

import avatar from './avatar.jpg';
let img = document.createElement('img');
img.src = avatar;
document.body.appendChild(img);