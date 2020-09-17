### loader 配置

webpack 配置 loader 三种方式

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

### banner-loader

(给每个文件加上自定义头部)

```js
// webpack.config.js
{
  test: /\.js$/,
  use: {
    loader: 'banner-loader',
    options: {
      text: 'code by XXX',
      filename: path.resolve(__dirname, 'banner.js')
    }
  }
}

// banner.js
code by XZX @2020

// banner-loader
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
```

### file-loader & url-loader

1. file-loader 作用：根据图片生成md5，发射到dist目录下,file-loader还会返回当前图片路径

```js
let loaderUtils = require('loader-utils')
function loader(source) {
  // 根据当前文件生成路径
  let filename = loaderUtils.interpolateName(this, '[hash].[ext]', { content: source })
  // 发射文件
  this.emitFile(filename, source);
  return `module.exports="${filename}"`;
}
loader.raw = true; //二进制
module.exports = loader
```

2. url-loader 作用：根据设定的大小限制，选择将图片转换为base64或调用file-loader

```js
let loaderUtils = require('loader-utils')
let mime = require('mime')

function loader(source) {
  let {limit} = loaderUtils.getOptions(this);
  if (limit && limit > source.length) {
    // 文件大小小于设定限制，转换为base64
    return `module.exports="data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
  } else {
    return require('./file-loader').call(this, source)
  }
}
loader.raw = true; //二进制
module.exports = loader
```

### less-loader & css-loader & style-loader

1. less-loader

```js
let less = require('less')

function loader(source) {
  let css;
  less.render(source, function (err, result) {
    css = result.css
  })
  return css
}

module.exports = loader;
```

2. css-loader

```js
const {
  match
} = require("micromatch");

function loader(source) {
  let reg = /url\((.+?)\)/g
  let pos = 0;
  let current;
  let arr = ['let list = []']
  while (current = reg.exec(source)) {
    let [matchUrl, g] = current;
    // console.log(current, matchUrl, g)
    // matchUrl:url('./avatar.jpg')  g:'./avatar.jpg'
    let last = reg.lastIndex - matchUrl.length;
    arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`)
    pos = reg.lastIndex;
    // g 替换成 require 写法
    arr.push(`list.push('url('+require(${g})+')')`);
    arr.push(`list.push(${JSON.stringify(source.slice(pos))})`)
    arr.push(`module.exports = list.join('')`)
    // console.log(arr.join(`\r\n`));
    return arr.join('\r\n');
  }
  return source;
}

module.exports = loader;
```

3. style-loader

```js
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
```