# Webpack

```js
index: path.resolve(__dirname, '../dist/index.html'),
assetsRoot: path.resolve(__dirname, '../dist'),
assetsSubDirectory: 'static',
assetsPublicPath: './',

```

- `index`: 模板
- `assetRoot`: 打包后文件要存放的路径
- `assetsSubDirectory`: 除了 index.html 之外的静态资源要存放的路径，
- `assetsPublicPath`: 代表打包后，index.html里面引用资源的的相对地址

## 第章-Webpack初探

### 1.wenbpack究竟是什么

### 2.Bundler:模块打包工具

> webpack是 模块打包工具
>
> 1. ES Module模块引入方式（import    export）
> 2. CommonJS 模块引入规范（require  module.exports）
> 3. CMD
> 4. AMD
>
> 扩展：webpack官网：CONCEPTS——Modules    API——Modules

### 3.webpack的正确安装方式

> - 不推荐webpack全局安装
>
> - 推荐项目内安装webpack
> - 卸载掉全局的webpack  `npm uninstall webpack webpack-cli -g`
> - 查看webpack安装的版本 `npx webpack -v`
> - 查看webpack所有版本：`npm info webpack `       `npm i webpack@4.26.0 webpack-cli -D`

### 4.webpack配置文件

`npx webpack 文件名`

Webpack有默认的运行文件，

- **新建webpack.config.js(默认配置文件名)**

> 如果配置文件名更改后，执行打包的命令需要config
>
> npx webpack --config 文件名

```js

```



- **配置package.json(配置打包命令)**

```js
"scripts": {
    "bundle": "webpack"
},
```



- **打包文件的几种方式：**

```js
#global
webpack index.js

#local
npx webpack index.js

#npm scripts
npm run bundle——>webpack

```

- **安装webpack-cli的作用：**

> 安装webpack-cli，是为了在命令行能正确的使用`webpack`命令

### 5.浅析Webpack打包输出内容

![webpack打包](https://i.loli.net/2020/01/04/ae7pCGIzch2A8xn.png)

> - Hash
>
>   本次打包对应的唯一的hash值
>
> - Version
>
>   本次打包的webpack版本(`npx webpack -v`可查看webpack版本)
>
> - Time
>
>   本次打包的时间
>
> - Asset
>
>   表示打包出的文件名
>
> - Size
>
>   打包出的文件的大小
>
> - Chunks
>
>   打包出的文件对应的id，每个文件都有一个id
>
> - Chunk name
>
>   每个js文件对应的名字，比如：app这个名字
>
>   ```js
>   module.exports = {
>     entry: {
>         app: './src/main.js'
>     }
>   } 
>   ```
>
> - 警告
>
>   未指定打包模式时，会报警告
>
>   ```js
>   module.exports = {
>     mode:'production'
>     # 默认为production，也可以设置成development
>   } 
>   ```
>
>   `development`：打包的代码不会压缩
>
>   `production`：打包的代码会压缩

### 6.Loader是什么？

> webpack不能识别非js结尾的模块，所以需要loader来让webpack识别出来

file-loader

commonjs：require













