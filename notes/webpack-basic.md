### install
`yarn add webpack webpack-cli`

### webpack.config.js

#### 全局变量引入

1. ```js
   import $ from 'expose-loader?$!jquery';
   // expose-loader 暴露全局的loader 内联使用
   
    {
      test: require.resolve('jquery'),
      use: 'expose-loader?$'
    }
    // 或写在webpack.config.js
   ```

2. ```js
   new webpack.ProvidePlugin({ // 在每个模块注入 $ 对象
      $: 'jquery'
    })
   ```

3. ```js
   externals:{
     jquery: '$'
   }
   // CDN引入，在 webpack.config`中忽略该模块打包
   ```

### bundle.js
```js
 (function (modules) { // webpackBootstrap
   // The module cache 定义缓存
   var installedModules = {};

   // The require function 实现require方法
   function __webpack_require__(moduleId) {

     // Check if module is in cache 检查是否在缓存中
     if (installedModules[moduleId]) {
       return installedModules[moduleId].exports;
     }
     // Create a new module (and put it into the cache) 创建新模块并放入缓存
     var module = installedModules[moduleId] = {
       i: moduleId,
       l: false,
       exports: {}
     };

     // Execute the module function 执行该模块函数
     modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

     // Flag the module as loaded
     module.l = true;

     // Return the exports of the module
     return module.exports;
   }


   // expose the modules object (__webpack_modules__)
   __webpack_require__.m = modules;

   // expose the module cache
   __webpack_require__.c = installedModules;

   // define getter function for harmony exports
   __webpack_require__.d = function (exports, name, getter) {
     if (!__webpack_require__.o(exports, name)) {
       Object.defineProperty(exports, name, {
         enumerable: true,
         get: getter
       });
     }
   };

   // define __esModule on exports
   __webpack_require__.r = function (exports) {
     if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
       Object.defineProperty(exports, Symbol.toStringTag, {
         value: 'Module'
       });
     }
     Object.defineProperty(exports, '__esModule', {
       value: true
     });
   };

   // create a fake namespace object
   // mode & 1: value is a module id, require it
   // mode & 2: merge all properties of value into the ns
   // mode & 4: return value when already ns object
   // mode & 8|1: behave like require
   __webpack_require__.t = function (value, mode) {
     if (mode & 1) value = __webpack_require__(value);
     if (mode & 8) return value;
     if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
     var ns = Object.create(null);
     __webpack_require__.r(ns);
     Object.defineProperty(ns, 'default', {
       enumerable: true,
       value: value
     });
     if (mode & 2 && typeof value != 'string')
       for (var key in value) __webpack_require__.d(ns, key, function (key) {
         return value[key];
       }.bind(null, key));
     return ns;
   };

   // getDefaultExport function for compatibility with non-harmony modules
   __webpack_require__.n = function (module) {
     var getter = module && module.__esModule ?
       function getDefault() {
         return module['default'];
       } :
       function getModuleExports() {
         return module;
       };
     __webpack_require__.d(getter, 'a', getter);
     return getter;
   };

   // Object.prototype.hasOwnProperty.call
   __webpack_require__.o = function (object, property) {
     return Object.prototype.hasOwnProperty.call(object, property);
   };

   // __webpack_public_path__
   __webpack_require__.p = "";


   // Load entry module and return exports
   return __webpack_require__(__webpack_require__.s = "./src/index.js"); // 入口模块
 })
 ({

   "./src/a.js": // key 模块路径
     (function (module, exports) { // value 函数
       eval("module.exports = 'YDSK'\n\n//# sourceURL=webpack:///./src/a.js?");
     }),
   "./src/index.js":
     (function (module, exports, __webpack_require__) {
       eval("let str = __webpack_require__(/*! ./a */ \"./src/a.js\")\r\n\r\nconsole.log(str);\n\n//# sourceURL=webpack:///./src/index.js?");
     })
 });
```