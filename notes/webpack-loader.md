### loader 配置

webpack 寻找 loader 三种方式

```js
//1 直接寻址
use: {
  loader: path.resolve(__dirname, 'loaders/loader1.js')
}

//2 设置别名
resolveLoader: {
  alias: {
    loader1: path.resolve(__dirname, 'loaders/loader1.js')
  }
}
use: {
  'loader1'
}

//3 设置loaders所在文件夹
resolveLoader: {
  modules: ['node_modules', path.resolve(__dirname, 'loaders')]
}

```

### loader 顺序

```js
module: {
    // loader分类，pre在前面,post在后面,normal
     // loader 顺序问题，从右向左，从下到上
     // loader 顺序 pre + normal + inline + post
    rules: [
      // {
      //   test: /\.js$/,
      //   use: ['loader3', 'loader2', 'loader1']
      // }
      {
        test: /\.js$/,
        use: {
          loader: 'loader1'
        },
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        use: {
          loader: 'loader2'
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'loader3'
        },
        enforce: 'post'
      }

    ]
  }

// inline loader
// -! 不会让文件再通过pre + normal loader 处理
// ! 不再用normal
// !! 不用其他所有，只用行内
let str = require('!!inline-loader!./a.js')
```

### loader 组成

loader 默认由两部分组成： pitch normal

```
     //pitch 无返回值  
pitch   loader3 → loader2 → loader1  
                                    ↘ 
                                      资源
                                    ↙
normal   loader3 ← loader2 ← loader1 

    // pitch loader - 有返回值 
user: [loader3, loader2, loader1]
pitch   loader3 → loader2  loader1  
                     ↙               
               有返回值               资源
               ↙                      
normal  loader3  loader2  loader1
```

### babel-loader

```js
let babel = require('@babel/core')
let loaderUtils = require('loader-utils')

function loader(source) { // this: loaderContext
  // loader上下文 默认有async这个方法 异步执行
  let callback = this.async();

  let options = loaderUtils.getOptions(this);
  // console.log(options);
  // console.log(this.resourcePath);
  babel.transform(source, {
    ...options,
    sourceMap: true,
    // 从绝对路径取出文件名，否则在开发者工具source中为 unknown
    filename: this.resourcePath.split('/').pop()
  }, function (err, result) {
      callback(err, result.code, result.map)
      // 返回：错误、代码、sourceMap
  })
  // return source; 使用异步回调时此处不再起作用
}

module.exports = loader
```