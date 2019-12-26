

# React-SSR

## 第一章

### 第一节-介绍

**前端性能优化：**

1. 白屏时间过长

2. 前端性能优化是个复杂的过程，大部分前端人员做前端性能优化仅针对css和js的具体优化

3. 从两方面考虑优化：

   a. 如何更快更少的加载文件

   b. 如何更快更高效的执行我们的代码

### 第二节-同构应用架构讲解

> 现在服务端渲染和同构应用是我们单页应用上做seo、性能优化比较常用的解决方式之一
>
> 目前的单页面：先执行JS——再执行router——渲染页面

#### 1.什么是ssr

- **SSR：**

> 流程：
>
> 浏览器下载HTML文档

- **CSR：**

> 流程：
>
> 1. 浏览器下载HTML文档
> 2. 浏览器下载JS文件
> 3. 浏览器进行react代码
> 4. 页面准备就绪

- **学习：**

1. 如何在server端去渲染react html
2. 通过一个简单的html+js的效果，怎么让一个应用有两个入口，两个webpack配置，打出两个包，并且通过node让html渲染不同的入口包呢？

![同构](/Users/qiaoxu/Desktop/myBlog/pic/ssr-des.png)

### 第三节-ssr环境搭建

#### 1.简单的react-ssr

`react-dom`提供了server的渲染api `renderToString`，负责把react组件解析成html，这里比vue的ssr多了一个细节，就是node是不支持jsx的，所以需要babel支持

而且我们之前vue ssr的学习，我们知道，一个同构应用，需要两个入口，分别编译client和server的代码。我们新建`webpack.server.js`



有几个注意事项标记一下：

1. 针对服务端渲染代码，我们可以剔除node_modules，从而大幅减少服务端代码生成耗时
2. 使用babel-loader，在node层面解析jsx

项目结构：

![项目结构](/Users/qiaoxu/Desktop/myBlog/pic/ssr-structure.png)

#### 2.初始化项目

```js
#初始化项目
npm init -y
#安装相关依赖
npm install webpack webpack-cli webpack-node-externals @babel/core @babel/preset-env @babel/preset-react -D


npm i react react-dom express babel-laoder -S
```

#### 3.server层执行两个命令

- **package.json**

```js
"scripts": {
  	"dev:client": "webpack --config webpack.client.js --watch",
    "dev:server": "webpack --config webpack.server.js --watch",
    "dev:start": "nodemon --watch build --exec node \"./build/bundle.js\""
 },
```



### 第四节-renderToString实现服务端渲染

- **src/App.js——页面层**

```js
import React, { useState } from 'react'

const App = props => {
  const [count, setCount] = useState(1)
  return (
    <div>
      <h1>
        hello {props.title} {count}
      </h1>
      <p>ioioi</p>
      <button onClick={() => setCount(count + 1)}>累加</button>
    </div>
  )
}

export default <App title="开课吧" />

```

- **server/index.js**

```js
// 这里的node代码，会用babel处理
import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import App from '../src/App'

const app = express()
// 静态资源目录
app.use(express.static('public'))
app.get('/', (req, res) => {
  // 把react组件(JSX)解析成html
  const content = renderToString(App)
  // 字符串模板
  res.send(`
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>react ssr</title>
      </head>
      <body>
        <div id='root'>${content}</div>
        <script src='/bundle.js'></script>
      </body>
    </html>
    `)
})
app.listen(7099, () => {
  console.log('监听完毕')
})
```



### 第五节-实现hooks累加器的同构应用

- **client/index.js**

```js
import React from 'react'
import ReactDom from 'react-dom'

import App from '../src/App'

//注水
ReactDom.hydrate(App, document.getElementById('root'))
```



### 总：webpack配置

- **webpack.server.js**

```js
const path = require('path')
const nodeExternals = require('webpack-node-externals')

// 服务端的webpack
module.exports = {
  target: "node",
  mode: "development",
  entry: "./server/index.js",
  externals: [nodeExternals()], //用于规避一些代码,例如：node_modules
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "build")
  },
  // 支持babel
  module: {
    rules: [{
      test: /\.js$/,
      // 才能支持import 支持jsx
      loader: 'babel-loader',
      exclude: /node-modules/,
      options: {
        // 这样才能支持最新的js代码
        presets: ['@babel/preset-react', ['@babel/preset-env']]
      }
    }]
  }
}
```



- **webpack.client.js**

```js
const path = require('path')

// 客户端的webpack
module.exports = {
  mode: "development",
  entry: "./client/index.js",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "public")
  },
  // 支持babel
  module: {
    rules: [{
      test: /\.js$/,
      // 才能支持import 支持jsx
      loader: 'babel-loader',
      exclude: /node-modules/,
      options: {
        // 这样才能支持最新的js代码
        presets: ['@babel/preset-react', ['@babel/preset-env']]
      }
    }]
  }
}
```



### 第六节-使用concurrently提升开发体验

> concurrently 同时跑多条命令

- **安装**

```js
npm i concurrently --save
```

- **package.json-添加命令**

```js
"scripts": {
    "start": "concurrently \"npm run dev:client\" \"npm run dev:server\" \"npm run dev:start\" ",
    "dev:client": "webpack --config webpack.client.js --watch",
    "dev:server": "webpack --config webpack.server.js --watch",
    "dev:start": "nodemon --watch build --exec node \"./build/bundle.js\""
  },
```

### 第七节-ssr支持路由

> server：做server层面的路由支持  staticRouter（刷新报404需要处理）
>
> client：BrowserRouter



### 第八节-使用StaticRouter支持多页面ssr

- **安装**

```js
npm i react-router-dom -S
```

- **App.js**

```js
// 入口文件
import React, { useState } from 'react'
// 路由
import { Route } from 'react-router-dom'

// 页面
import Index from './container/index'
import About from './container/about'

export default (
  <div>
    <Route path="/" exact component={Index}></Route>
    <Route path="/about" exact component={About}></Route>
  </div>
)

```

- **server/index.js**

```js
// 这里的node代码，会用babel处理
import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import App from '../src/App'
// 静态路由
import { StaticRouter } from 'react-router-dom'
import { format } from 'path'
const app = express()
// 静态资源目录
app.use(express.static('public'))
app.get('*', (req, res) => {
  // 把react组件(JSX)解析成html
  const content = renderToString(
    <StaticRouter location={req.url}>{App}</StaticRouter>
  )
  // 字符串模板
  res.send(`
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>react ssr</title>
      </head>
      <body>
        <div id='root'>${content}</div>
        <script src='/bundle.js'></script>
      </body>
    </html>
    `)
})
app.listen(7099, () => {
  console.log('监听完毕')
})
```

- **client/index.js**

```js
import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from '../src/App'

//注水客户端

const Page = <BrowserRouter> {App} </BrowserRouter>

ReactDom.hydrate(Page, document.getElementById('root'))

```

### 第九节-ssr支持数据流

![ssr数据流](/Users/qiaoxu/Desktop/myBlog/pic/ssr_data.png)

### 第十节-redux同构支持

- **安装**

```js
npm i axios -S
npm i redux redux-thunk -S
#链接react与redux
npm i react-redux -S
```

- **redux数据流**

```js
#store/index.js
import axios from "axios"

// 首页逻辑
// actionType
const GET_LIST = 'INDEX/GET_LIST'

// actionCreator
const changeList = list => ({
  type: GET_LIST,
  list
})

export const getIndexList = server => {
  return (dispatch, getState, axiosInstance) => {
    return axios.get('http://localhost:7088/api/course/list')
      .then(res => {

        const {
          list
        } = res.data
        dispatch(changeList(list))
      })
  }
}

const defaultState = {
  list: []
}

export default (state = defaultState, action) => {

  switch (action.type) {
    case GET_LIST:
      const newState = {
        ...state,
        list: action.list
      }
      return newState
    default:
      return state
  }
}

#store/store.js
// 存储入口
import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'

import thunk from 'redux-thunk'
import indexReducer from './index'

const reducer = combineReducers({
  index: indexReducer
})

// 创建store
const store = createStore(reducer, applyMiddleware(thunk))

// 对外暴露
export default store
```

- **server/index.js——需要注入数据**

```js
// 这里的node代码，会用babel处理
import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import App from '../src/App'
// 静态路由
import { StaticRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from '../src/store/store'
const app = express()
// 静态资源目录
app.use(express.static('public'))
app.get('*', (req, res) => {
  // 把react组件(JSX)解析成html
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>{App}</StaticRouter>
    </Provider>
  )
  // 字符串模板
  res.send(`
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>react ssr</title>
      </head>
      <body>
        <div id='root'>${content}</div>
        <script src='/bundle.js'></script>
      </body>
    </html>
    `)
})
app.listen(7099, () => {
  console.log('监听完毕')
})

```

- **client/index.js——需要注入数据**

```js
import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from '../src/App'
import store from '../src/store/store'
//注水客户端

const Page = (
  <Provider store={store}>
    <BrowserRouter> {App} </BrowserRouter>
  </Provider>
)

// hydrate
ReactDom.render(Page, document.getElementById('root'))
```

- **页面：container/index.js**

```js
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getIndexList } from '../store/index'
const Index = props => {
  const [count, setCount] = useState(1)
  useEffect(() => {
    props.getIndexList()
  })
  return (
    <div>
      <h1>
        hello {props.title} {count}
      </h1>
      <p> ioioi </p> <button onClick={() => setCount(count + 1)}> 累加 </button>
      <br />
      <ul>
        {props.list.map(item => {
          return <li key={item.id}>{item.name}</li>
        })}
      </ul>
    </div>
  )
}

export default connect(state => ({ list: state.index.list }), { getIndexList })(
  Index
)
```

- **总结：hydrate()与render()区别**

```js
ReactDOM.hydrate(element, container[, callback])
```

> 与 [`render()`](https://react.docschina.org/docs/react-dom.html#render) 相同，但它用于在 [`ReactDOMServer`](https://react.docschina.org/docs/react-dom-server.html) 渲染的容器中对 HTML 的内容进行 hydrate 操作。React 会尝试在已有标记上绑定事件监听器。
>
> React 希望服务端与客户端渲染的内容完全一致。React 可以弥补文本内容的差异，但是你需要将不匹配的地方作为 bug 进行修复。在开发者模式下，React 会对 hydration 操作过程中的不匹配进行警告。但并不能保证在不匹配的情况下，修补属性的差异。由于性能的关系，这一点非常重要，因为大多是应用中不匹配的情况很少见，并且验证所有标记的成本非常昂贵。
>
> 如果单个元素的属性或者文本内容，在服务端和客户端之间有无法避免差异（比如：时间戳），则可以为元素添加 `suppressHydrationWarning={true}` 来消除警告。这种方式只在一级深度上有效，应只作为一种应急方案（escape hatch）。请不要过度使用！除非它是文本内容，否则 React 仍不会尝试修补差异，因此在未来的更新之前，仍会保持不一致。
>
> 如果你执意要在服务端与客户端渲染不同内容，你可以采用双重（two-pass）渲染。在客户端渲染不同内容的组件可以读取类似于 `this.state.isClient` 的 state 变量，你可以在 `componentDidMount()` 里将它设置为 `true`。这种方式在初始渲染过程中会与服务端渲染相同的内容，从而避免不匹配的情况出现，但在 hydration 操作之后，会同步进行额外的渲染操作。注意，因为进行了两次渲染，这种方式会使得组件渲染变慢，请小心使用。
>
> 记得保证弱网环境下的用户体验。JavaScript 代码的加载要比最初的 HTML 渲染晚的多。因此如果你只在客户端渲染不同的内容，其转换可能会不稳定。但是，如果执行顺利，那么在服务端负责渲染的 shell 会对渲染提供帮助，并且只显示客户端上额外的小组件。欲了解如何在不出现标记不匹配的情况下执行此操作，请参考上一段的解释。

### 第十一节-异步获取数据思路





















