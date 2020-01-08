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

- **安装**

```js
npm i webpack-dev-server -D
```

> 自动打包并自动刷新浏览器

```js
{
  devServer:{
    contentBase:'./dist',//表示我的服务器起到哪个项目下
    open:true,//启动服务后自动打开浏览器并访问localhost:8090
    proxy:{//代理——来处理跨域
      
    }  
  }
}

# package.json
"scripts": {
  	"watch":"webpack --watch",
    "dev": "webpack-dev-server",
      
}  
```



```js
#package.json
{
  "bundle":"webpack",#打包
  "watch":"webapck --watch"  
  #自动打包，不需要手动打包，但是不会给我们起一个服务，还需要手动刷新浏览器
  "dev":"webpack-dev-server"
  #帮助启动http服务(可以发ajax请求)，并会打包代码，打包到dist目录下，自动刷新浏览器
  "middleware":"node server.js"
  #使用中间件的方式，来监听代码的改变，来刷新浏览器(这是自己实现一个webpack-dev-server)
}
```

- **安装相关**

```js
npm i express webpack-dev-middleware -D

#server.js
const express=require('express')
const webpack=require('webpack')
const webpackDevMiddkeware=require('webpack-dev-middleware')
const config=require('./webpack.config.js')
const compiler=webpack(config)

const app=express()
//中间件
//只要文件发生改变了，compiler就会重新运行，重新运行生成的文件对应的打包输出的内容的publicPath就是config.output.publicPath
app.use(webpackDevMiddkeware(compiler,{
  publicPath:config.output.publicPath
}))

app.listen(3000,()=>{
  consoe.log('监听成功')
})

# 目前到这步是需要手刷新的，如果要实现webpack-dev-server，中间需要写很多配置

```

### 14.Hot Module Replacement 热模块更新（1）

> 实现html或者css修改后，浏览器不需要自动刷新，只需要重新加载样式即可

```js
devServer:{
  hot:true,
  hotOnly:true  
  #即便是html功能没有生效，也不让浏览器自动重新刷新
}


plugins:[
  new webpack.HotModuleReplacementPlugin(), //热更新插件
]
```



### 15.Hot Module Replacement 热模块更新（2）

```js
// 当某个js文件发生改变时，要手动去更新这个js文件，这样页面上才会更新
module.hot.accept('./number',()=>{
  number()
})
```

> css-loader：底层已经实现了热更新，所以不需要额外写热更新代码
>
> vue-loader：底层实现了对js、css等热更新，所以不需要额外写更新代码
>
> react：是借助babel-preset，内置了html热更新实现



### 16.使用Babel处理ES6语法（1）

> 打包将ES6语法转为ES5语法

- **安装**

```js
#babel-loader:只是webpack与babel通信的桥梁，但babel-loader并不会将ES6的语法转为ES5
npm i babel-loader @babel/core -D

#@babel/preset-env：将ES6语法转为ES5
npm i @babel/preset-env -D
```

- **介绍**

babel-loader：帮助webpack打包用的

@babel/core：babel的核心库，babel识别js中的代码，将js代码转成AST抽象语法树，然后将语法树编译出来

```js
module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude:/node_modules/, #第三库中不需要转，人家已经做好处理了
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
          options:{
            presets:["@babel/preset-env"]#将ES6转为ES5
          }
      }
}      
```

- **除了将ES6语法转为ES5语法，还需做别的**

<font color='red'>除了将ES6语法转为ES5语法，还需要将缺失的变量还有函数补充到低版本浏览器中</font>

**这时候需要借助`babel-polyfill`**

	1. 安装

```js
npm i @babel/polyfill -S
```

2. 引入

在所有代码运行之前，先去引入`@babel/polyfill`

import '@babel/polyfill'

3. 打包后文件变得非常大

引入babel-polyfill后，入口文件变得非常大，这时候需要做配置，用到哪些方法就引入什么，不要全部都引入

```js
module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude:/node_modules/, #第三库中不需要转，人家已经做好处理了
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
          options:{
            presets:[["@babel/preset-env",{
              useBuiltIns:'usage'
              #使用babel-polyfill做填充的时候，加一些低版本浏览器可能不存在的特性的时候，不是把所有的特性都加入进去，根据您业务代码用到什么加入什么，这样入口文件就不会变特别大
            }]]#将ES6转为ES5
          }
      }
}   
```



### 17.使用Babel处理ES6语法（2）

> babel-polyfill && babel-runtime
>
> 先说两种方式的原理：
>
> babel-polyfill，它不会将代码编译成低版本的ECMAScript，他的原理是当运行环境中并没有实现的一些方法，babel-polyfill中会给做兼容
>
> babel-runtime，将es6编译成es5去运行，前端可以使用es6的语法来写，最终浏览器上运行的是es5
>
> 优缺点：
>
> babel-polyfill：通过向全局对象和内置对象的prototype上添加方法来实现，比如运行环境中不支持Array-prototype.find，引入polyfill，前端就可以放心的在代码里用es6的语法来写；但是这样会造成全局空间污染。比如像Array-prototype.find就不存在了，还会引起版本之前的冲突。不过即便是引入babel-polyfill，也不能全用，代码量比较大。
>
> babel-runtime：不会污染全局对象和内置的对象原型。比如当前运行环境不支持promise，可以通过引入babel-runtime/core-js/promise来获取promise，或者通过babel-plugin-transform-runtime自动重写你的promise。但是它不会模拟内置对象原型上的方法，比如Array-prototype.find，就没法支持了，如果运行环境不支持es6，代码里又使用了find方法，就会出错，因为es5并没有这个方法

- **安装**

```js
#polyfill是在全局注入代码，会污染全局


#以闭包的形式注入，不会污染全局环境，如果写插件什么的，就要使用这种方式
npm i @babel/plugin-transform-runtime -D

npm i @babel/runtime-corejs2 -S

module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude:/node_modules/, #第三库中不需要转，人家已经做好处理了
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
          options:{
            presets:[["@babel/preset-env",{
              useBuiltIns:'usage'
              #使用babel-polyfill做填充的时候，加一些低版本浏览器可能不存在的特性的时候，不是把所有的特性都加入进去，根据您业务代码用到什么加入什么，这样入口文件就不会变特别大
            }]],#将ES6转为ES5
            "plugins":[["@babel/plugin-transform-runtime",{
              "corejs":2,
              "helpers":true,
              "regenerator":true,
              "useESModules":false
            }]]
          }
      }
} 
```

- **在根目录下创建.babelrc文件做配置**

```js
{
  presets:[["@babel/preset-env",{
              useBuiltIns:'usage'
              #使用babel-polyfill做填充的时候，加一些低版本浏览器可能不存在的特性的时候，不是把所有的特性都加入进去，根据您业务代码用到什么加入什么，这样入口文件就不会变特别大
            }]],#将ES6转为ES5
  "plugins":[["@babel/plugin-transform-runtime",{
              "corejs":2,#配置为2表示当页面不存在promise等方法时，才会将代码打包进main.js中，需要额外安装@babel/runtime-corejs2
              "helpers":true,
              "regenerator":true,
              "useESModules":false
            }]]
}
```



### 18.webpack实现React框架代码的打包











