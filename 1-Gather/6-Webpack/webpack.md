# webpack

## 一、webpack工程化

### 1. 什么是webpack

![webpack](/pic/webpack.png)

Webpack is module bundler（模块打包工具）

webpack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的扩展语言（Scss，typescript等），并将其打包为合适的格式以供浏览器使用。

官方网站：https://webpack.js.org/

### 2. webpack安装

- **安装**

  - 全局安装——不推荐

    ```basic
     //webpack-cli 可以帮助我们在命令⾏行行⾥里里使⽤用npx ,webpack等相关指令
    npm install webpack webpack-cli -g
    
    webpack -v
    
    npm uninstall webpack webpack-cli -g
    ```

  - 局部安装——项目内安装

    ```basic
    cnpm i webpack webpack-cli -D
    
    npm install webpack webpack-cli --save-dev //-D
    
    webpack -v //command not found 默认在全局环境中查找
    
    npx webpack -v// npx帮助我们在项⽬目中的node_modules⾥里里查找webpack
    ```

  - 安装指定的版本

    ```basic
    npm info webpack//查看webpack的历史发布信息 
    
    npm install webpack@x.xx webpack-cli -D
    ```

- **测试：启动webpack打包**

  ```basic
  // es moudule 模块引⼊入 
  // commonJs 模块引⼊入
  import add from "./a"; //需要使⽤用es moudule导出 
  import minux from "./b";////需要使⽤用es moudule导出
  npx webpack index.js //打包命令 使⽤用webpack处理理index.js这个⽂文件
  ```

- **总结**

  webpack是一个模块打包工具，可以识别出引入模块的语法，早起的webpack只是个js模块的打包工具，现在可以是css、png、vue的模块打包工具

### 3. webpack配置文件

零配置是很弱的，特定的需求，总是需要自己进行配置



当我们使用npx webpack index.js时，表示的是使用webpack处理打包，名为index.js的入口模块。默认放在当前目录下的dist目录，打包后的模块名称是main.js，当然我们也可以修改



webpack有默认的配置文件，叫webpack.config.js，我们可以对这个文件进行修改，进行个性化配置

- **默认配置文件：webpack.config.js**

  ```basic
  npx webpack //执⾏行行命令后，webpack会找到默认的配置⽂文件，并使⽤用执⾏行行
  ```

- **不使用默认配置文件：webpackconfig.js**

  ```basic
   npx webpack --config webpackconfig.js //指定webpack使⽤用webpackconfig.js⽂文件来作为 配置⽂文件并执⾏行行
  ```

- **修改package.json scripts字段:有过vue react开发经验的同学 习惯使⽤用npm run来启动，我们也可以修改下**

  ```basic
   
  "scripts":{
  	"bundle":"webpack"
    //这个地⽅不要添加npx ,因为npm run执行的命令，会优先使⽤项目工程里的包，效果和npx非常类似 
    }
  npm run bundle
  ```

### 4. 项目结构优化

```basic
 
dist //打包后的资源⽬目录
node_modules //第三⽅方模块
src //源代码
  css
  images
  index.js
package.json
webpack.config.js
```

### 5. webpack的核心概念

#### 1）entry

指定打包入口文件:Webpack 执行构建的第一步将从 Entry 开始，可抽象成输⼊

```bash
 entry:{
  main: './src/index.js'
}
==相当于简写=== entry:"./src/index.js"
```

#### 2）output

打包后的文件位置:输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。

```bash
output: {
  publicPath:"xxx",
  filename: "bundle.js",
  // 必须是绝对路路径
  path: path.resolve(__dirname, "dist")
},
```

#### 3）loader

模块转换器，用于把模块原内容按照需求转换成新内容。
webpack是模块打包工具，而模块不仅是js，还可以是css，图片或者其他格式
但是webpack默认只知道如何处理理js模块，那么其他格式的模块处理，和处理方式就需要loader了

#### 4）module

模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。

```bash
 
module:{
  rules:[
    {
      test:/\.xxx$/,
      use:{
        loader: 'xxx-load'
      }
    }
  ] 
}
```

当webpack处理到不认识的模块时，需要在webpack中的module处进行配置，当检测到是什么格式的
模块，使⽤什么loader来处理。

- **file-loader-处理静态资源模块**

  原理是把打包入口中识别出的资源模块，移动到输出目录，并且返回一个地址名称

  所以我们什么时候用file-loader呢？

  场景：就是当我们需要模块，仅仅是从源代码挪移到打包目录，就可以使用file-loader来处理，txt、svg、csv、excel，图片资源等等

  ```basic
  npm i file-loader -D
  ```

  ```bash
  module:{
          rules:[
              {
                  test:/\.(png|jpe?g|gif)$/,
                  use:{
                      loader:'file-loader',
                      options:{
                          name:'[name]_[hash].[ext]',//[hash]哈希占位符，解决缓存entity   [ext]表示占位符
                          outputPath:'imgs/'//图片输出目录
                      }
                  }
              }
          ]
  }
  ```

- **url-loader**

  可以处理file-loader所有的事情，但是遇到jpg格式的模块，会把该图片转换成base64格式字符串，并打包到js里。对小体积的图片比较适合，大图片不适合。

  ```basic
  npm i url-loader -D
  ```

  ```basic
  module:{
          rules:[
              {
                  test:/\.(png|jpe?g|gif)$/,
                  use:{
                      //file-loader
                      loader:'url-loader',
                      options:{
                          name:'[name]_[hash].[ext]',//[hash]哈希占位符，解决缓存entity   [ext]表示占位符
                          outputPath:'imgs/',//图片输出目录
                          limit:2048//⼩小于2048，才转换成base64
                      }
                  }
              }
          ]
      }
  ```

- **css-loader style-loader**

  css-loader：分析模块之间的关系，并合成一个css

  style-loader：会把css-loader生成的内容，以style挂载到页面的head部分

  ```bash
  npm i style-loader css-loader -D
  ```

  ```basic
  {
     test:/\.css$/,
     use:["style-loader","css-loader"]//css-loader：识别.css文件，然后用style-loader将css的代码放到html的头部，是动态插入
  }
  ```

  loader有顺序：自右往左，自下往上

- **sass-loader**

  sass-loader把sass语法转换成css，依赖node-sass模块

  ```basic
  npm i sass-loader node-sass -D
  ```

  ```bash
  {
     test:/\.scss$/,
     use:["style-loader","css-loader","sass-loader"]//sass-loade：遇到scss后缀的文件，转成css文件，css-loader：识别.css文件，然后用style-loader将css的代码放到html的头部，是动态插入
  }
  ```

- **postcss-loader-样式自动添加前缀**

  ```bash
  npm i postcss-loader autoprefixer -D
  ```

  autoprefixer：是postcss的一个插件，可以自动给css属性加前缀

  ```bash
  {
     test: /\.scss$/,
     use: [
         "style-loader",
         "css-loader",
         {
            loader:'postcss-loader',
            options:{
              ident:"postcss",
              plugins:[require('autoprefixer')]
            }
         },
         "sass-loader"]//sass-loade：遇到scss后缀的文件，转成css文件，css-loader：识别.css文件，然后用style-loader将css的代码放到html的头部，是动态插入
  }
  ```

#### 5）Plugins

plugin可以再webpack运行到某个阶段的时候，帮你做一些事情，类似于生命周期的概念

扩展插件，在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情

##### - html-webpack-plugin

html-webpack-plugin会在打包结束后，自动生成一个html文件，并把打包生成的js模块引入到该html中。

```bash
npm i html-webpack-plugin -D
```

配置：

```bash
 
title: 用来生成页面的 title 元素
filename: 输出的 HTML 文件名，默认是 index.html, 也可以直接配置带有子目录。
template: 模板文件路径，支持加载器，比如 html!./index.html
inject: true | 'head' | 'body' | false ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
favicon: 添加特定的 favicon 路径到输出的 HTML ⽂文件中。
minify: {} | false , 传递 html-minifier 选项给 minify 输出
hash: true | false, 如果为 true, 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用。
cache: true | false，如果为 true, 这是默认值，仅在文件修改之后才会发布文件。 
showErrors: true | false, 如果为 true, 这是默认值，错误信息会写入到 HTML ⻚面中 
chunks: 允许只添加某些块 (比如，仅仅 unit test 块)
chunksSortMode: 允许控制块在添加到⻚面之前的排序⽅方式，支持的值:'none' | 'default' | {function}-default:'auto'
excludeChunks: 允许跳过某些块，(⽐比如，跳过单元测试的块)
```

使用：

```bash
const htmlWebpackPlugin = require('html-webpack-plugin')
plugins: [
  new htmlWebpackPlugin({
    title: 'hello 我是首页',
    template: './index.html',
    inject: 'body',//表示打包后的js文件放到哪里
    filename: 'index.html'//输出文件的名称
  })
]
```

title中的内容如何展示在index.html中，使用ejs模板语法

```bash
<title><%= htmlWebpackPlugin.options.title %></title>
```

多入口，多出口

```bash
module.exports={
	entry: {
        index: './src/index.js',
        list: './src/list.js',
        detail: './src/detail.js'
  },
  plugins: [
        new htmlWebpackPlugin({
            title: 'hello 我是首页',//页面title，可以使用ejs模板语法插入进去
            template: './index.html',//以哪个为模板
            inject: 'body',//表示打包后的js文件放到哪里
            filename: 'index.html',//输出的 HTML 文件名
            chunks: ["index"]//只允许添加一些块（例如，只允许单元测试块）
        }),
        new htmlWebpackPlugin({
            title: 'hello 我是列表页',
            template: './index.html',
            inject: 'body',
            filename: 'list.html',
            chunks: ["list"]
        }),
        new htmlWebpackPlugin({
            title: 'hello 我是详情页',
            template: './index.html',
            inject: true,
            filename: 'detail.html',
            chunks: ["detail"]
        })
 ]
}
```

##### - clean-webpack-plugin

打包之前删除打包目录的

```bash
npm i clean-webpack-plugin -D
```

```bash
const {CleanWebpackPlugin} =require('clean-webpack-plugin')

plugins: [
  new CleanWebpackPlugin(),//打包之前将dist目录删除，重新打包
]        
```

##### - mini-css-extract-plugin

将css处理成单独的一个css文件

```bash
npm i mini-css-extract-plugin -D
```

```bash
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module:{
	rules:[
	{
     test: /\.scss$/,
     use: [
        //"style-loader",//需要打包成单独的css文件，则不需要style-loader
       	MiniCssExtractPlugin.loader,
        "css-loader",
        {
           loader: 'postcss-loader',
           options: {
             ident: "postcss",
             plugins: [require('autoprefixer')]
           }
        },
        "sass-loader"
     	]//sass-loade：遇到scss后缀的文件，转成css文件，css-loader：识别.css文件，然后用style-loader将css的代码放到html的头部，是动态插入
            },
   {
     test: /\.css$/,
     use: [
       //"style-loader",//需要打包成单独的css文件，则不需要style-loader
       MiniCssExtractPlugin.loader,
       "css-loader",
       {
          loader: 'postcss-loader',
          options: {
            ident: "postcss",
            plugins: [require('autoprefixer')]
          }
        }
      ]
    }
	]
}

plugins: [
  new MiniCssExtractPlugin({
  	filename: "[name].css"
  }),//将css打成一个独立的文件
]        
```

##### - 谈谈性能优化

最早接触性能优化，雅虎军规提出来的黄金优化12条：图片压缩，减少请求，减少冗余代码，合并js代码，

pc端优化：现在则转向服务端，接口合并

移动端性能优化：启动页加速

异步、图片懒加载、代码懒加载、预加载，当主线程是空闲状态的时候，可以懒加载一些东西

#### 6）source-map

源代码和打包后的代码的映射关系

在dev模式中，默认开启，关闭的话，可以在配置文件里

```bash
devtool:'none'
```

devtool的介绍:https://webpack.js.org/configuration/devtool#devtool

- eval：速度最快，使用eval包裹模块代码
- source-map：产生.map文件
- cheap：较快，定位错误只定位到行，不会定位到列，也不包含loader的sourcemap
- Module：第三方模块，包含loader的sourcemap（比如jsx to js，babel的sourcemap）
- inline：将.map作为DataURL嵌入，不单独生成.map

配置推荐：

```bash
 devtool:"cheap-module-eval-source-map",// 开发环境配置 
 devtool:"cheap-module-source-map", // 线上⽣生成配置
```

#### 7）WebpackDevServer

提升开发效率的利器

每次改完代码都需要重新打包一次，打开浏览器，舒心一次，很麻烦

我们可以安装使用webpackdevserver来改善这块体验

启动服务后，会发现dist目录没有了，这是因为devServer把打包后的模块不会放在dist目录下，而是放到了内存中，从而提升速度

- 安装

```bash
npm i webpack-dev-server -D
```

- 修改package.json文件

```bash
"scripts": {
    "server": "webpack-dev-server"
}
```

- 在webpack.config.js配置

```bash
devServer: {
   contentBase: "./dist",//资源文件目录
   open: true,//自动打开浏览器
   port: 9099//服务器端口
},
```

- 跨域

联调期间，前后端分离，直接获取数据会跨域，上线后我们使用nginx转发，开发期间，webpack就可以搞定这件事

启动一个服务，mock一个接口

```bash
# server.js
# npm i express -D
const express = require('express')
const app = express()

app.get('/favicon.ico', (req, res) => {
    res.json({
        data: 0,
        msg: '找不到favicon'
    })
})
app.get('/api/info', (req, res) => {
    res.json({
        name: '开课吧',
        age: 5,
        msg: '欢迎欢迎'
    })
})

app.listen('9092')
```

入口文件：index.js

```bash
# npm i axios -D
import axios from 'axios'
axios.get('/api/info').then(res => {
    console.log(res);
})
```

修改webpack.config.js，配置反向代理

```bash
devServer: {
        contentBase: "./dist",//资源文件目录
        open: true,//自动打开浏览器
        port: 8081,//服务器端口
        proxy: {
            '/api': {
                target: 'http://localhost:9092'
            }
        }
},
```

#### 8）Hot Module Replacement（HMR：热模块替换）

有两种：关于css的和js的

热更新是webpack自带的，所以需要引入webpack

##### - 处理css模块热更新

- 配置文件头部引入webpack

```bash
const webpack = require('webpack')
```

- 在插件处实例化热更新模块

```bash
plugins: [
	//热更新
  new webpack.HotModuleReplacementPlugin()
]
```

- 启动hmr

```bash
devServer: {
        contentBase: "./dist",//资源文件目录
        open: true,//自动打开浏览器
        port: 8081,//服务器端口
        hot: true,//开启热模块功能
        hotOnly: true,//即便HMR不生效，浏览器也不自动刷新，就开启hotOnly
}        
```

- 案例

```bash
# index.js
import './css/index.css'
var btn=document.createElement('button')
btn.innerHTML='新增'
document.body.appendChild(btn)

btn.onclick=function(){
    var div=document.createElement('div')
    div.innerHTML='item'
    document.body.appendChild(div)
}
#css/index.css
div:nth-of-type(odd){
    background-color: yellow;
}
```

##### - 处理js模块热更新

保存住一个状态，其实就是局部刷新

需要使用module.hot.accept来观察模块更新从而更新

```bash
# counter.js
function counter() {
    var div = document.createElement('div')
    div.setAttribute('id', 'counter')
    div.innerHTML = 1
    div.onclick = function () {
        div.innerHTML = parseInt(div.innerHTML) + 1
    }
    document.body.appendChild(div)
}
export default counter

# number.js
function number() {
    var div = document.createElement('div')
    div.setAttribute('id', 'number')
    div.innerHTML = 80
    document.body.appendChild(div)
}
export default number

# index.js
import counter from './counter'
import number from './number'

counter()
number()

if(module.hot) {
    module.hot.accept('./number',function() {
        document.body.removeChild(document.getElementById('number'))
        number()
    })
}
```

#### 9）Babel处理ES6

官⽅方⽹网站:https://babeljs.io/
中⽂文⽹网站:https://www.babeljs.cn/

##### - babel-loader @babel/core @babel/preset-env

- 安装

```bash
#babel-loader是webpack 与 babel的通信桥梁，不会做把es6转成es5的工作，这部分工作需要用到@babel/preset-env来做

#@babel/preset-env⾥里里包含了了es6转es5的转换规则

npm i babel-loader @babel/core @babel/preset-env -D
```

```bash
# index.js
const arr = [new Promise(() => { }), new Promise(() => { })]
arr.map(item => {
    console.log(item);
})
```

- 配置

```bash
module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, './src'),
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env"]
                }
            },
         ]
}
```

通过上面几步还不够，Promise等一些还没有转换过来，这时候需要借助@babel/polyfill，把es的新特性都装进来，来弥补低版本浏览器中缺失的特性

##### - @babel/polyfill安装

```bash
npm install @babel/polyfill -S
```

- 入口文件顶部引入@babel/polyfill

```bash
# index.js
import "@babel/polyfill";
```

> 会发现打包的体积大了很多，这是因为polyfill默认会把所有的特性注入进来，假如我想用到es6+，才会注入，没用到的不注入，从而减少打包的体积。

- 修改webpack.config.js

```bash
{
   test: /\.js$/,
   exclude: /node_modules/,
   include: path.resolve(__dirname, './src'),
   loader: 'babel-loader',
   options: {
      presets: [[
       "@babel/preset-env",
       {
         targets: {
           edge: "17",
           firefox: "60",
           chrome: "67",
           safari: "11.1"
        },
        useBuiltIns: "usage"//按需注⼊入
       }
      ]]
   }
}
```

> 当我们开发的是组件库，工具库这些场景的时候，polyfill就不适合了，因为polyfill是注入到全局变量，window下的，会污染全局环境，所以推荐闭包方式：@babel/plugin-transform-runtime

##### - @babel/plugin-transform-runtime

不会造成全局污染

- 安装

```bash
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
```

- 创建.babelrc文件——将原先options下的配置挪到这个文件中

```bash
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "edge": "17",
                    "firefox": "60",
                    "chrome": "67",
                    "safari": "11.1"
                },
                "useBuiltIns": "usage" //按需注⼊入
            }
        ]
    ],
    "plugins": [
        [
            "@babel/plugin-transform-runtime",
            {
                "absoluteRuntime": false,
                "helpers": true,
                "regenerator": true,
                "useESModules": false
            }
        ]
    ]
}
```

> useBuiltIns 选项是 babel 7 的新功能，这个选项告诉 babel 如何配置 @babel/polyfill 。 它有三 个参数可以使⽤用: 
>
> 1entry: 需要在 webpack 的⼊入⼝口⽂文件⾥里里 import "@babel/polyfill" ⼀一
>  次。 babel 会根据你的使⽤用情况导⼊入垫⽚片，没有使⽤用的功能不不会被导⼊入相应的垫⽚片。 2usage: 不需要 import ，全自动检测，但是要安装 @babel/polyfill 。(试验阶段)
>
>  3false: 如果你 import "@babel/polyfill" ，它不会排除掉没有使用的垫片，程序体积会庞大。(不推荐) 
>
> 
>
> 请注意: usage 的行为类似 babel-transform-runtime，不会造成全局污染，因此也会不会对类似
> Array.prototype.includes() 进⾏行 polyfill。

#### 10）配置react打包环境

- 安装react

```bash
npm install react react-dom --save
```

- 安装babel与react转换的插件

```bash
npm install --save-dev @babel/preset-react
```

- 在.babelrc文件里添加

```bash
{
	 "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "edge": "17",
                    "firefox": "60",
                    "chrome": "67",
                    "safari": "11.1"
                },
                "useBuiltIns": "usage" //按需注⼊入
            }
        ],
        "@babel/preset-react"
    ]
}
```

- 编写react代码

```bash
import "@babel/polyfill"
import React, { Component } from 'react'
import ReactDom from 'react-dom'

class App extends Component {
    render() {
        return <div>hello word</div>
    }
}

ReactDom.render(<App />, document.getElementById('app'))
```

#### 11）tree Shaking

摇树只支持export的模式

- 配置webpack.config.js

```bash
#开启摇树功能
optimization: {
	usedExports: true
},
```

- 修改package.json文件

```bash
# package.json
// false表示对所有模块进行摇树，像引入的css，并没有导出东西，就会摇掉，所以需要在下面配置上，排除到摇树的外面

"sideEffects": [
    "*.css",
    "@babel/polyfill"
],
```

- 案例

```bash
# expo.js
export const add = (a, b) => {
    console.log(a + b);
}

export const minus = (a, b) => {
    console.log(a - b);
}

# index.js
import { add } from './expo'
import './css/index.css'
import "@babel/polyfill"
add(1, 2)
```

- 打包后看效果

>  开发模式设置后，不会帮助我们把没有引用的代码去掉
>
> 注意：devtool: "cheap-module-source-map",开发模式下的source-map模式会影响摇树的功能，必须改成线上模式的source-map

#### 12）development vs Production模式区分打包

- 安装

```bash
npm install webpack-merge -D
```

- 创建config文件

  - webpack.base.js

  ```bash
  const path = require('path')
  const htmlWebpackPlugin = require('html-webpack-plugin')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const baseConfig = {
      //入口配置文件  string | array | object
      entry: './src/index.js',
      // entry: {
      //     index: './src/index.js',
      //     list: './src/list.js',
      //     detail: './src/detail.js'
      // },
      //出口文件
      output: {
          //必须是绝对路径
          path: path.resolve(__dirname, '../dist'),
          //[]占位符
          filename: '[name].js',
          //打包后的文件前面的前缀
          //publicPath:''
      },
      //开启摇树功能
      optimization: {
          usedExports: true
      },
      module: {
          rules: [
              {
                  test: /\.js$/,
                  exclude: /node_modules/,
                  include: path.resolve(__dirname, './src'),
                  loader: 'babel-loader'
              },
              {
                  test: /\.(png|jpe?g|gif)$/,
                  use: {
                      //file-loader
                      loader: 'url-loader',
                      options: {
                          name: '[name]_[hash].[ext]',//[hash]哈希占位符，解决缓存entity   [ext]表示占位符
                          outputPath: 'imgs/',//图片输出目录
                          limit: 2048//⼩小于2048，才转换成base64
                      }
                  }
              },
              {
                  test: /\.scss$/,
                  use: [
                      //"style-loader",//需要打包成单独的css文件，则不需要style-loader
                      MiniCssExtractPlugin.loader,
                      "css-loader",
                      {
                          loader: 'postcss-loader',
                          options: {
                              ident: "postcss",
                              plugins: [require('autoprefixer')]
                          }
                      },
                      "sass-loader"]//sass-loade：遇到scss后缀的文件，转成css文件，css-loader：识别.css文件，然后用style-loader将css的代码放到html的头部，是动态插入
              },
              {
                  test: /\.css$/,
                  use: [
                      "style-loader",//需要打包成单独的css文件，则不需要style-loader
                      //MiniCssExtractPlugin.loader,
                      "css-loader",
                      {
                          loader: 'postcss-loader',
                          options: {
                              ident: "postcss",
                              plugins: [require('autoprefixer')]
                          }
                      }
                  ]
              }
          ]
      },
      plugins: [
          new CleanWebpackPlugin(),//打包之前将dist目录删除，重新打包
          new MiniCssExtractPlugin({
              filename: "[name].css"
          }),//将css打成一个独立的文件
          new htmlWebpackPlugin({
              title: 'hello 我是首页',//页面title，可以使用ejs模板语法插入进去
              template: './index.html',//以哪个为模板
              inject: 'body',//表示打包后的js文件放到哪里
              filename: 'index.html',//输出的 HTML 文件名
              //chunks: ["index"]//只允许添加一些块（例如，只允许单元测试块）
          })
          // new htmlWebpackPlugin({
          //     title: 'hello 我是列表页',
          //     template: './index.html',
          //     inject: 'body',//表示打包后的js文件放到哪里
          //     filename: 'list.html',//输出文件的名称
          //     chunks: ["list"]
          // }),
          // new htmlWebpackPlugin({
          //     title: 'hello 我是详情页',
          //     template: './index.html',
          //     inject: true,
          //     filename: 'detail.html',
          //     chunks: ["detail"]
          // })
      ]
  }
  
  module.exports = baseConfig
  ```

  - webpack.dev.js

  ```bash
  const webpack = require('webpack')
  const merge=require('webpack-merge')
  const baseConfig=require('./webpack.base')
  const devConfig = {
      devtool: "cheap-module-eval-source-map",
      mode: 'development',
      devServer: {
          contentBase: "./dist",//资源文件目录
          open: true,//自动打开浏览器
          port: 8081,//服务器端口
          hot: true,//开启热模块功能
          hotOnly: true,//即便HMR不生效，浏览器也不自动刷新，就开启hotOnly
          proxy: {
              '/api': {
                  target: 'http://localhost:9092'
              }
          }
      },
      plugins: [
          //热更新
          new webpack.HotModuleReplacementPlugin()
      ]
  }
  
  module.exports=merge(devConfig,baseConfig)
  ```

  - webpack.pro.js

  ```bash
  const merge = require('webpack-merge')
  const baseConfig = require('./webpack.base')
  
  const proConfig = {
      devtool: "cheap-module-source-map",
      mode: 'production'
  }
  
  module.exports = merge(proConfig, baseConfig)
  ```

- 修改package.json文件

```bash
"scripts": {
    "dev": "webpack-dev-server --config ./config/webpack.dev.js",
    "build": "webpack --config ./config/webpack.pro.js",
    "server": "webpack-dev-server",
    "bundle": "webpack"
},
```

- 基于环境变量

```basic
#外部传入的全局变量
#webpack.base.js
module.exports = env => {
    if (env && env.production) {
        return merge(baseConfig, proConfig)
    } else {
        return merge(baseConfig, devConfig)
    }
}
    
#package.json  
"scripts": {
    "dev": "webpack-dev-server --config ./config/webpack.base.js",
    "build": "webpack --env.production --config ./config/webpack.base.js"
},    
```

#### 13）代码分割code spliting

业务代码 与 第三方库 拆分 很重要

- 引入lodash库

其实code spliting概念与webpack并没有直接的关系，只不过webpack中提供了一种更加方便的方法供我们实现代码分割

```bash
optimization: {
        usedExports: true,
        #做代码分割
        splitChunks:{
           chunks:"all"//默认是支持异步，我们使用all，表示不管异步还是还是同步，都做代码分割 
        }
},
```

```bash
 
optimization: {
  splitChunks: {
      chunks: 'async',#all表示对同步，异步，所有的模块有效，默认情况下是异步
      minSize: 30000,#当模块大于30kb
      maxSize: 0,#对模块进行二次分割时使用，不推荐使用
      minChunks: 1,/#打包生成的chunk文件最少有几个chunk引用了这个模块 
      maxAsyncRequests: 5,#模块请求5次
      maxInitialRequests: 3,#⼊口文件同步请求3次 
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
        	test: /[\\/]node_modules[\\/]/, 
        	name:'vendor',#要缓存的 分隔出来的 chunk名称
        	priority: -10#缓存组优先级 数字越大，优先级越高
        },
        other:{
        	chunks:"initial",#必须三选一  initial|all|async(默认)
        	test:/react/lodash/,#正则校验，如果符合就提取chunk
        	name:'other',
        	minSize:30000,
        	minChunks:1
        },
        default: {
           minChunks: 2,
           priority: -20,
           reuseExistingChunk: true#可设置是否重用该chunk
        }
      }
	} 
}
```

#### 14）打包分析

github地址：https://github.com/webpack/analyse

分析工具地址：http://webpack.github.io/analyse/

可以通过运行为此工具生成所需的JSON文件 `webpack --profile --json > stats.json`

1.修改package.json文件

```bash
"scripts": {
    "test": "webpack --profile --json > stats.json --config ./config/webpack.base.js",
    "dev": "webpack-dev-server --config ./config/webpack.base.js",
    "build": "webpack --env.production --config ./config/webpack.base.js"
},
```

2.执行npm run test生成stats.json文件

3.将生成的stats.json文件上传到打包分析工具上

![打包分析](/pic/analyse.png)

4.官方推荐其余打包分析工具 

https://webpack.js.org/guides/code-splitting/#bundle-analysis 

![官方推荐](/pic/official_analyse.png)

#### 15）webpack官方推荐的编码方式

```bash
 
optimization:{ 
  #帮我们⾃自动做代码分割 
  splitChunks:{
  	chunks:"async",#默认是⽀支持异步 
  }	
}
```

- **代码利用率问题**

```bash
#index.js
document.addEventListener('click', () => {
    const element = document.createElement('div')
    element.innerHTML = 'welcome  to  webpack4.x'
    document.body.appendChild(element)
})
```

​	a）然后通过控制台查看代码利用率

​	b）打开network，command+shift+p调出工具，搜索coverage，选择

​	c）查看代码利用率

![代码利用率](/pic/use-rate.png)

- **将异步代码抽离出来**

```bash
#async.js
function handleClick() {
    const element = document.createElement('div')
    element.innerHTML = 'welcome  to  webpack4.x'
    document.body.appendChild(element)
}

export default handleClick
#index.js
document.addEventListener('click', () => {
    import(/* webpackPrefetch:true */'./async').then(({default:func})=>{
        func()
    })
})
```

> Prefetching/Preloading modules
>
> - prefetch(预取)：将来某些导航下可能需要的资源
> - preload(预加载)：当前导航下可能需要资源
>
> 与 prefetch 指令相比，preload 指令有许多不同之处：
>
> - preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
> - preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
> - preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
> - 浏览器支持程度不同。

![代码利用率](/pic/code-useRate.png)

## 二、webpack互动扩展



## 三、webpack原理

### 1.编写loader

自己编写一个Loader的过程比较简单

Loader就是一个函数，声明式函数，不能用箭头函数

拿到源代码，做进一步的修饰处理，再返回处理后的源代码就可以了

> 官⽅方⽂文档:https://webpack.js.org/contribute/writing-a-loader/
> 接⼝口⽂文档:https://webpack.js.org/api/loaders/

- **创建一个替换源码中字符串的loader**

```bash
#loaders/replaceLoader.js

module.exports = function (source) {
    return source.replace('word', '开课吧')
}
#需要声明式函数，因为要用到上下文的this，用到this的数据，该函数接受一个参数，就是源码

#index.js
console.log('hello word');
```

- **在webpack.config.js文件中使用loader**

```basic
const path = require('path')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: path.resolve(__dirname, './loaders/replaceLoader.js')
            }
        ]
    }
}
```

- **给loader配置参数，loader如何接受参数**
  - this.query
  - loader-utils

```bash
#webpack.config.js
module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader:path.resolve(__dirname, './loaders/replaceLoader.js'),
                    options:{
                        name:'sofiya'
                    }
                }
            }
        ]
}
#index.js——this.query
module.exports = function (source) {
    return source.replace('word', this.query.name)
}
#index.js——loader-utils
#cnpm i loader-utils -D
const loaderUtils = require('loader-utils')#官⽅方推荐处理理loader,query的⼯工具
module.exports = function (source) {
    //1.this.query
    //return source.replace('word', this.query.name)

    //2.loader-utils
    const options = loaderUtils.getOptions(this)
    const result = source.replace('word', options.name + '我')
    return result
}
```

- **this.callback**：loader返回多个信息—不仅仅是处理好的源代码，可以使用this.callback来处理

```bash
const loaderUtils = require('loader-utils')#官⽅方推荐处理理loader,query的⼯工具
module.exports = function (source) {
    const options = loaderUtils.getOptions(this)
    const result = source.replace('word', options.name + '你')
    this.callback(null,result)
}
```

- **this.async**：如果loader里面有异步的事情要怎么处理

```bash
const loaderUtils = require('loader-utils')//官方推荐
module.exports = function (source) {
    const options = loaderUtils.getOptions(this)
    //4.异步如何处理
    const cb = this.async()
    setTimeout(() => {
        const result = source.replace('word', options.name + '哈哈')
        cb(null,result)
    }, 2000)
}
```

- **多个loader的使用**

```bash
#replaceLoader.js
module.exports = function (source) {
    return source.replace('word', 'hhhhhhh')
}
#replaceLoaderAsync.js
const loaderUtils = require('loader-utils')//官方推荐
module.exports = function (source) {
    const cb = this.async()
    const options=this.query
    setTimeout(() => {
        const result = source.replace('word', options.name + '哈哈')
        cb(null, result)
    }, 2000)
}
#webpack.config.js
module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    path.resolve(__dirname, './loaders/replaceLoader.js'),
                    {
                        loader: path.resolve(__dirname, './loaders/replaceLoaderAsync.js'),
                        options: {
                            name: 'sofiya'
                        }
                    }
                ]
            }
        ]
}
```

> 执行顺序：自下而上，自右向左

- **处理loader的路径问题**

```bash
#resolveLoader是webpack自带的
resolveLoader: {
   modules: ["node_modules", "./loader"]
   #会先在node_modules里面查找相应的loader，没有的话，再去当前目录下找loaders
},
module: {
   rules: [
       {
           test: /\.js$/,
           use: [
               './loaders/replaceLoader.js',
               {
                   loader: './loaders/replaceLoaderAsync.js',
                   options: {
                       name: '旭旭'
                   }
               }
           ]
       }
   ]
}
```

> loader API：https://webpack.js.org/api/loaders

### 2.编写plugin

plugin：开始打包，在某个时刻，帮助我们处理一些什么事情的机制

plugin要比loader稍微复杂一些，在webpack的源码中，用plugin的机制还是占有非常大的场景，可以说plugin是webpack的灵魂

<font color='red'>plugin是一个具有 `apply`方法的 js对象。 apply方法会被 webpack的 `compiler`（编译器）对象调用，并且 `compiler` 对象可在整个 `compilation`（编译）生命周期内访问。</font>

webpack插件的组成：

- 一个JavaScript`函数`或者`class`（ES6语法）。
- 在它的原型上定义一个`apply`方法。
- 指定挂载的webpack`事件`钩子。
- 处理webpack内部实例的特定数据。
- 功能完成后调用webpack提供的`回调`。

> 官⽅文档:https://webpack.js.org/contribute/writing-a-plugin/

- **创建copyright-webpack-plugin.js**

```bash
class CopyrightWebpackPlugin {
    constructor(options) {
        console.log(options);
    }

    //compiler：webpack实例
    apply(compiler) {
        
    }
}

module.exports = CopyrightWebpackPlugin
```

- **配置文件webpack.config.js里使用**

```bash
const CopyrightWebpackPlugin=require('./plugins/copyright-webpack-plugin')
plugins:[
   new CopyrightWebpackPlugin()
],
```

- **如何传递参数**

```bash
#webpack.config.js
plugins:[
  new CopyrightWebpackPlugin(
     {name:'sofiya'}
  )
]

#copyright-webpack-plugin.js
class CopyrightWebpackPlugin {
    constructor(options) {
        //接受参数
        console.log(options);
    }

    //compiler：webpack实例
    apply(compiler) {
        //同步
        //异步
    }
}

module.exports = CopyrightWebpackPlugin
```

- **配置plugin在什么时刻进行**

```bash
class CopyrightWebpackPlugin {
    constructor(options) {
        #接受参数
        console.log(options);
    }

    //compiler：webpack实例
    apply(compiler) {
        #同步
        compiler.hooks.compilation.tap(
            'CopyrightWebpackPlugin',
            compilation => {
                console.log('compilation')
            }
        )
        #异步
        #hooks.emit 定义在某个时刻
        compiler.hooks.emit.tapAsync(
            'CopyrightWebpackPlugin',
            (compilation, cb) => {
                compilation.assets['copyright.txt'] = {
                    source: function () {
                        return 'hello  copy'
                    },
                    size: function () {
                        return 2048
                    }
                }
                cb()
            }
        )
    }
}

module.exports = CopyrightWebpackPlugin
```

> 参考：compiler-hooks  https://webpack.js.org/api/compiler-hooks

### 3.node调试工具

- 修改scripts

```bash
"debug": "node --inspect --inspect-brk node_modules/webpack/bin/webpack.js"
```

### 4.webpack打包原理

webpack在执行npx webpack进行打包时，都干了什么事情？

```bash
 
(function(modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {   
			return installedModules[moduleId].exports;
    }
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    });
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    module.l = true;
    return module.exports;
}
  return __webpack_require__((__webpack_require__.s = "./index.js"));
})({
  "./index.js": function(module, exports) {
    eval(
      '// import a from "./a";\n\nconsole.log("hello word");\n\n\n//#
sourceURL=webpack:///./index.js?'
); }
});
```

大概的意思就是，我们实现了一个webpack_require来实现自己的模块化，把代码都缓存在installModules里，代码文件以对象传递进来，key是路径，value是包裹的代码字符串，并且代码内部的require，都被替换成了webpack_require

### 5.手写打包模块bundle.js

- **自己实现一个bundle.js**

  - 模块分析：读取入口文件，分析代码

  ```bash
  const fs = require('fs')
  
  const entry = (filename) => {
      const content = fs.readFileSync(filename, 'utf-8')
      return content
  }
  
  const info = entry('./src/index.js')
  console.log(info);
  ```

  - 拿到文件中依赖，这里我们不推荐使用字符串截取，引入的模块名越多，就越麻烦，不灵活，这里我们推荐使用`@babel/parser`，这是babel7的工具，来帮助我们分析内部的语法，包括es6，返回一个ast抽象语法树

  ```bash
  #安装
  npm i @babel/parser -S
  
  const fs = require('fs')
  const parser = require('@babel/parser')
  const entry = (filename) => {
      const content = fs.readFileSync(filename, 'utf-8')
      const ast = parser.parse(content, {
          sourceType: 'module'
      })
      console.log(ast.program.body);
  }
  
  const info = entry('./src/index.js')
  console.log(info);
  
  ```

  - 接下来我们就可以根据body里面的分析结果，遍历出所有的引入模块，但是比较麻烦，这里还是推荐babel推荐的一个模块`@babel/traverse`，来帮我们处理

  ```bash
  #安装
  npm i @babel/traverse -S
  
  const fs = require('fs')
  const parser = require('@babel/parser')
  const traverse = require('@babel/traverse').default
  const entry = (filename) => {
      const content = fs.readFileSync(filename, 'utf-8')
      const ast = parser.parse(content, {
          sourceType: 'module'
      })
      const dependencies = []
      traverse(ast, {
          ImportDeclaration({ node }) {
              dependencies.push(node.source.value)
          }
      })
      console.log(dependencies);
  }
  
  const info = entry('./src/index.js')
  ```

  ![bundle](/pic/bundle.png)

  >  分析上图，我们要分析出信息：
  >
  > - 入口文件
  > - 入口文件引入的模块
  >   - 引入路径
  >   - 在项目中的路径
  >
  > - 可以在浏览器里执行的代码

  - 处理现在的路径问题

  ```bash
  const fs = require('fs')
  const path = require('path')
  const parser = require('@babel/parser')
  const traverse = require('@babel/traverse').default
  const entry = (filename) => {
      const content = fs.readFileSync(filename, 'utf-8')
      //分析ast抽象语法树，根据需要返回对应数据
      //根据结果返回对应的模块，定义一个数组，接受一个node.source.value的值
      const ast = parser.parse(content, {
          sourceType: 'module'
      })
      const dependencies = {}
      traverse(ast, {
          ImportDeclaration({ node }) {
              const newfilename = './' + path.join(path.dirname(filename), node.source.value)
              dependencies[node.source.value] = newfilename
          }
      })
      console.log(dependencies);
  }
  
  const info = entry('./src/index.js')
  ```

  - 把代码处理成浏览器可运行的代码，需要借助@babel/core，和@babel/preset-env，把ast语法树转换成合适的代码

  ```bash
  #安装
  npm i @babel/core @babel/preset-env -S
  
  const fs = require('fs')
  const path = require('path')
  const parser = require('@babel/parser')
  const traverse = require('@babel/traverse').default
  const babel = require('@babel/core')
  const entry = (filename) => {
      const content = fs.readFileSync(filename, 'utf-8')
      //分析ast抽象语法树，根据需要返回对应数据
      //根据结果返回对应的模块，定义一个数组，接受一个node.source.value的值
      const ast = parser.parse(content, {
          sourceType: 'module'
      })
      const dependencies = {}
      traverse(ast, {
          ImportDeclaration({ node }) {
              const newfilename = './' + path.join(path.dirname(filename), node.source.value)
              dependencies[node.source.value] = newfilename
          }
      })
      const { code } = babel.transformFromAst(ast, null, {
          presets: ['@babel/preset-env']
      })
      return {
          filename,
          dependencies,
          code
      }
  }
  
  const info = entry('./src/index.js')
  console.log(info);
  
  ```

  打印结果：

  ![info](/pic/info.png)

  - 分析依赖——完成项目中所有模块的分析

  ```bash
  const fs = require('fs')
  const path = require('path')
  const parser = require('@babel/parser')
  const traverse = require('@babel/traverse').default
  const babel = require('@babel/core')
  const entry = (filename) => {
      const content = fs.readFileSync(filename, 'utf-8')
      //分析ast抽象语法树，根据需要返回对应数据
      //根据结果返回对应的模块，定义一个数组，接受一个node.source.value的值
      const ast = parser.parse(content, {
          sourceType: 'module'
      })
      const dependencies = {}
      traverse(ast, {
          ImportDeclaration({ node }) {
              const dirname = path.dirname(filename)
              const newfilename = './' + path.join(dirname, node.source.value)
              dependencies[node.source.value] = newfilename
          }
      })
      const { code } = babel.transformFromAst(ast, null, {
          presets: ['@babel/preset-env']
      })
      return {
          filename,
          dependencies,
          code
      }
  }
  //深层次分析文件内容
  const deepModule = filename => {
      const entryInfo = entry(filename)
      const deepModuleArray = [entryInfo]
      console.log(deepModuleArray);
  
      for (let i = 0; i < deepModuleArray.length; i++) {
          const item = deepModuleArray[i]
          const { dependencies } = item
          console.log(dependencies);
  
          if (dependencies) {
              for (let j in dependencies) {
                  deepModuleArray.push(entry(dependencies[j]))
              }
          }
      }
      const graph = {}
      deepModuleArray.forEach(item => {
          graph[item.filename] = {
              dependencies: item.dependencies,
              code: item.code
          }
      })
      return graph
  }
  const info = deepModule('./src/index.js')
  
  ```

  - 生成代码

```bash
#生成代码
const generateCode = filename => {
    const dependenciesAll = JSON.stringify(deepModule(filename))
    return `
        (function(dependenciesAll){
            function require(module){
                function localRequire(relativePath){
                    return require(dependenciesAll[module].dependencies[relativePath])
                }
                var exports={}
                (function(require,exports,code){
                    eval(code)
                })(localRequire,exports,dependenciesAll[module].code)
                return exports
            }
            require('${filename}')
        })(${dependenciesAll})
    `
}

const info = generateCode('./src/index.js')
console.log(info);
```





问题汇总：

1.css-loader中，使用style-loader则热更新会生效，如果替换成MiniCssExtractPlugin.loader，那么热更新就失效了



2.真实项目中，js文件很多，如何配置热更新



3.配置@babel/plugin-transform-runtime后，为什么打包后体积变很大

















