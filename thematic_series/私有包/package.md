# package.json

https://zhuanlan.zhihu.com/p/93228859



```js
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "build-component":"vue-cli-service build --target lib --name lepu-button src/main.js"
  }
```

### 项目中安装包升级

> 注意：升级后需要重启项目

1. 升级Npm

   ```js
   npm install -g npm
   ```

2. 全局升级插件（以Vue-cli为例）

   ```js
   npm update vue -g
   ```

3. 局部升级（项目内部升级）

   ```js
   npm update axios --save
   ```

### "license": "MIT"

MIT[许可证](https://baike.baidu.com/item/许可证)（The MIT License）是许多软件授权条款中，被广泛使用的其中一种。与其他常见的软件[授权条款](https://baike.baidu.com/item/授权条款)（如[GPL](https://baike.baidu.com/item/GPL)、[LGPL](https://baike.baidu.com/item/LGPL)、[BSD](https://baike.baidu.com/item/BSD)）相比，MIT是相对[宽松](https://baike.baidu.com/item/宽松/10962030)的[软件](https://baike.baidu.com/item/软件/12053)授权条款。

> 详细介绍：https://baike.baidu.com/item/MIT%E8%AE%B8%E5%8F%AF%E8%AF%81/6671281?fr=aladdin

内容如下：

```js
Copyright (C) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. [1] 
```

### "license": "BSD"

相较于GPL许可证和MPL许可证的严格性，BSD许可证就宽松许多了，一样是只需要附上许可证的原文，不过比较有趣的是，它还要求所有进一步开发者将自己的版权资料放上去，所以拿到以BSD许可证发行的软件可能会遇到一个小状况，就是这些版权资料许可证占的空间比程序还大。



### nvm安装

https://www.jianshu.com/p/622ad36ee020





## cp-cli

- **安装**

  ```js
  npm install -g cp-cli
  ```

- **作用**

  复制文件

  ```js
  # 命令
  cp-cli source target
  
  # 实际使用
  cp-cli src/theme-chalk/lib lib/theme-chalk
  ```

  

## umd打包

```js
"build-component": "vue-cli-service build --target lib --name lepu-button lib/index.js"
```























