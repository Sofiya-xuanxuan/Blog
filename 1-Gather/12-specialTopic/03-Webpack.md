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
- `assetsPublicPath`: 代表打包后，index.html里面引用资
- 

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

file-loader：将图片复制了一个

vue-loader：处理.vue结尾的文件

commonjs：require

### 7.使用Loader打包静态资源（图片篇）

```js
{
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 20000,
          #占位符：placeholder
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
}
```

> url-loader：可以将图片打包成base64，放入了出口文件中app.js中
>
> 注意：当图片的大小在limit范围内容，则会打包成base64，插入出口文件app.js中，这个limit限制不能设置太大，插入过大的图片，会导致出口文件app.js过大，影响加载的速度
>
> 当图片大小超过limit限制时，url-loader会与file-loader有一样的作用，将图片直接复制到相应的文件中
>
> <font color='red'>需要注意两种处理方式，引入图片的方式要怎么处理</font>

### 8.使用Loader打包静态资源（样式篇-上）

> 直接引入.css文件是不能识别的，必须装相应的loader来解析
>
> Loader是有顺序的，从下到上，从右到左，所以配置的时候要注意顺序

```js
{
  test:/\.scss$/,
  use:[
    'style-loader',
    'css-loader',
    'sass-loader',
    'postcss-loader'// 兼容各个浏览器，样式加hacker前缀
  ]  
}
```

- **安装相关依赖**

```js
npm i postcss-loader -D

npm i autoprefixer -D
```

> postcss-loader有一个配置文件，在根目录下创建：`.postcssrc.js`文件：

```js
# 方式一：
module.exports = {

  "plugins": {

​    "postcss-import": {},

​    "postcss-url": {},

​    // to edit target browsers: use "browserslist" field in package.json

​    "autoprefixer": {}

  }
}

# 方式二：
module.exports = {
  "plugins": {
		require('autoprefixer')
  }
}
```

### 9.使用Loader打包静态资源（样式篇-下）

- **css模块化打包**

```js
{
  test:/\.scss$/,
  use:[
    'style-loader',
    {
      loader:'css-loader',
      options:{
        importLoaders:2,// 表示必须先走下面的两个loader来处理css
        modules:true//表示css打包-模块化，这里不配置的话，引入的css就是全局的，修改的话会污染全局
      }
    },
    'sass-loader',
    'postcss-loader'// 兼容各个浏览器，样式加hacker前缀
  ]  
}
```

- **使用wabpack打包字体库**

```js
{
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
}
```

### 10.使用plugins让打包更便捷

> plugin 可以在webpack运行到某个时刻的时候，帮你做一些事情

- **HtmlWebpackPlugin**

会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入这个html文件中

- **clean-webpack-plugin**

会在打包之前运行，每次打包之前会将dist目录删除，然后重新生成新的dist目录

### 11.Entry与Output的基础配置

```js
output: {
  	publicPath:'http://cdn.com.cn',//打包后的出口文件，在引入html文件中的路径前缀会加上这个
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
```

### 12.SourceMap的配置

> 它是一个映射关系，映射出当前报错的地方，配置source-map后，打包速度会变慢

```js
{
  devtool:'#source-map'
  # cheap-inline-source-map 只告诉我报错的行即可，只管业务代码，不会管第三方插件中的代码错误
  # cheap-module-inline-source-map 会将第三方的报错地方也告知
  # inline-source-map
  # eval 打包速度最快，性能最好，但是面对复杂代码，可能提示信息不全
  # development：cheap-module-eval-source-map 打包速度快，提示信息全
  # production：cheap-module-source-map  线上用这个比较好
}
```



### 13.使用WebpackDevServer提升开发效率











