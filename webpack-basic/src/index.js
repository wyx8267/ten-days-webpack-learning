let str = require('./a')


require('./index.css')
require('./index.less')

let fn = () => {
  console.log(str);
}
fn();

@log
class A {
  a = 1;
}
let a = new A()
console.log(a.a);

function log(target) {
  console.log(target);
}