## 1. 什么是服务器端渲染
服务器端渲染：后端先调用数据库，获得数据之后，将数据和页面元素进行拼装，组合成完整的html页面，再直接返回给浏览器，以便用户浏览
## 2.什么是客户端渲染
客户端渲染：数据由浏览器通过ajax动态取得，再通过js将数据填充到dom元素上最终展示到网页中，这样的过程叫做客户端渲染。
## 3.服务器端渲染&客户端渲染
1. 服务器端渲染需要消耗更多的服务器端资源（cpu、内存等）
2. 客户端渲染可以加个静态资源部署到cdn上，实现高并发，减少服务器的数量，这样可以做到前后端分离
3. 服务器端渲染对SEO更友好（搜索引擎是不能对js进行解析的，只能对html解析）

## 4.vue服务器端渲染
1. 安装依赖：
```
npm i vue vue-serve-renderer --save
```
2. 编写代码
```
//初始化
npm init 
//安装依赖
npm i vue vue-server-renderer express --save
//编写代码
const Vue = require('vue');
const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer();
//与服务器集成

server.get('*', (req, res) => {
    const app = new Vue({
        template: '<h1>hello world!!{{name}}</h1>',
        data: function () {
            return {
                name: 'sofiya'
            }
        }
    });
    renderer.renderToString(app, (err, html) => {
        if (err) {
            res.status(502).end('Internal Server Error');
            return;
        }
        console.log(html);
        res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
      `)
    })

});
server.listen(8080);
```
3. 服务端渲染单文件组件

如果使用单文件组件，需要配合webpack来使用。

如果想要了解服务器端的webpack配置，可以看这个官方提供的工程：[服务端渲染工程文件](http://github.com/vuejs/vue-hackernews-2.0)
## 5.nuxt安装

npm v5.2.0引入的一条命令（npx），引入这个命令的目的是为了提升开发者使用包内提供的命令行工具的体验。

举例：使用create-react-app创建一个react项目

老方法：npx方式
```
npm i -g create-nuxt-app
create-nuxt-app my-app
```
新方法：
```
npx create-nuxt-app my-app
```
安装自己的项目
```
npx create-nuxt-app my-nuxt
```
- nuxtjs框架是如何运作的

基于 Vue、Webpack 和 Babel

Nuxt.js 集成了以下组件/框架，用于开发完整而强大的 Web 应用：
```
Vue 2
Vue-Router
Vuex (当配置了 Vuex 状态树配置项 时才会引入)
Vue 服务器端渲染 (排除使用 mode: 'spa')
Vue-Meta
压缩并 gzip 后，总代码大小为：57kb （如果使用了 Vuex 特性的话为 60kb）。
```
另外，Nuxt.js 使用 Webpack 和 vue-loader 、 babel-loader 来处理代码的自动化构建工作（如打包、代码分层、压缩等等）。
- 特性
```
基于 Vue.js
自动代码分层
服务端渲染
强大的路由功能，支持异步数据
静态文件服务
ES2015+ 语法支持
打包和压缩 JS 和 CSS
HTML 头部标签管理
本地开发支持热加载
集成 ESLint
支持各种样式预处理器： SASS、LESS、 Stylus 等等
支持 HTTP/2 推送
```
## 6.nuxt-目录结构

- 资源目录assets

资源目录 assets 用于组织未编译的静态资源如 LESS、SASS 或 JavaScript。
- 组件目录components

组件目录 components 用于组织应用的 Vue.js 组件。Nuxt.js 不会扩展增强该目录下 Vue.js 组件，即这些组件不会像页面组件那样有 asyncData 方法的特性。
- 布局目录layouts

布局目录 layouts 用于组织应用的布局组件。

该目录名为Nuxt.js保留的，不可更改。
- 中间件目录middleware

middleware 目录用于存放应用的中间件。
- 页面目录pages

页面目录 pages 用于组织应用的路由及视图。Nuxt.js 框架读取该目录下所有的 .vue 文件并自动生成对应的路由配置。

该目录名为Nuxt.js保留的，不可更改。
- 插件目录plugins

插件目录 plugins 用于组织那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件。
- 静态文件目录static

静态文件目录 static 用于存放应用的静态文件，此类文件不会被 Nuxt.js 调用 Webpack 进行构建编译处理。 服务器启动的时候，该目录下的文件会映射至应用的根路径 / 下。

举个例子: /static/robots.txt 映射至 /robots.txt

该目录名为Nuxt.js保留，不可更改。
- store目录

store 目录用于组织应用的 Vuex 状态树 文件。 Nuxt.js 框架集成了 Vuex 状态树 的相关功能配置，在 store 目录下创建一个 index.js 文件可激活这些配置。

该目录名为Nuxt.js保留，不可更改。
- nuxt.config.js文件

nuxt.config.js 文件用于组织Nuxt.js 应用的个性化配置，以便覆盖默认配置。

该文件名为Nuxt.js保留的，不可更改。
- package.json文件

package.json 文件用于描述应用的依赖关系和对外暴露的脚本接口。

该文件名为Nuxt.js保留的，不可更改。
- 别名
![别名](https://i.loli.net/2019/12/18/hQGUi1mdxtlvjus.png)

默认情况下，src目录和根目录相同

<font color='red'>提示: 在您的 vue 模板中, 如果你需要引入 assets 或者 static 目录, 使用 ~/assets/your_image.png 和 ~/static/your_image.png方式。</font>

## 7.nuxt配置
nuxt.config.js

比如：给css配置预编译的loader
```
module.exports = {
  css: [
    // 直接加载一个 Node.js 模块。（在这里它是一个 Sass 文件）
    'bulma',
    // 项目里要用的 CSS 文件
    '@/assets/css/main.css',
    // 项目里要使用的 SASS 文件
    '@/assets/css/main.sass'
  ]
}
```
需要先安装依赖包
```
//如果要使用 sass 就必须要安装 node-sass和sass-loader 。

npm install --save-dev node-sass sass-loader
```
编写sass不识别语法问题解决
```

```
## 8.nuxt路由

- **基础路由**

假设 pages 的目录结构如下：
```
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```
那么，Nuxt.js 自动生成的路由配置如下：
```
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```
- **动态路由**

在 Nuxt.js 里面定义带参数的动态路由，需要创建对应的以下划线作为前缀的 Vue 文件 或 目录。
```
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```
Nuxt.js 生成对应的路由配置表为：
```
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',//占位参，通过params取，$route.params.id
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```
- **嵌套路由**

创建内嵌子路由，你需要添加一个 Vue 文件，同时添加一个与该文件同名的目录用来存放子视图组件。
```
pages/
--| users/
-----| _id.vue
-----| index.vue
--| users.vue
```
Nuxt.js 自动生成的路由配置如下：
```
router: {
  routes: [
    {
      path: '/users',
      component: 'pages/users.vue',
      children: [
        {
          path: '',
          component: 'pages/users/index.vue',
          name: 'users'
        },
        {
          path: ':id',
          component: 'pages/users/_id.vue',
          name: 'users-id'
        }
      ]
    }
  ]
}
//users.vue
<template>
    <div>
      <h2>用户列表</h2>
      <!--嵌套路由-->
      <nuxt-link to="/users/">嵌套首页</nuxt-link>
      <nuxt-link to="/users/profile">嵌套详情</nuxt-link>
      <!--坑-->
      <nuxt />
    </div>
</template>
```
- **动态嵌套路由**
- **过渡动效**
```
//assets/css/styles.css

body {
  background-color: aqua;
}

.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-active {
  opacity: 0;
}
```
- **中间件**

在middleware下面创建js文件
```
//middleware/auth.js——权限控制
export default function (context) {
  //context可以解构{store,redirect}
  context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
}

//nuxt.config.js配置中间件
router:{
    middleware:'auth'
}
```
## 9.nuxt视图
- **模板**
定制化默认的 html 模板，只需要在应用根目录下创建一个 app.html 的文件。

默认模板为：
```
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```
举个例子，你可以修改模板添加 IE 的条件表达式：
```
<!DOCTYPE html>
<!--[if IE 9]><html lang="en-US" class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```
- **布局**

Nuxt.js 允许你扩展默认的布局，或在 layout 目录下创建自定义的布局。

默认布局：
可通过添加 layouts/default.vue 文件来扩展应用的默认布局。

自定义布局：
layouts 目录中的每个文件 (顶级) 都将创建一个可通过页面组件中的 layout 属性访问的自定义布局。

假设我们要创建一个 博客布局 并将其保存到layouts/blog.vue:
```
<template>
  <div>
    <div>我的博客导航栏在这里</div>
    <nuxt/>
  </div>
</template>
```
然后我们必须告诉页面 (即pages/posts.vue) 使用您的自定义布局：
```
<template>
<!-- Your template -->
</template>
<script>
export default {
  layout: 'blog'
  // page component definitions
}
</script>
```
- **页面**

页面组件实际上是 Vue 组件，只不过 Nuxt.js 为这些组件添加了一些特殊的配置项（对应 Nuxt.js 提供的功能特性）以便你能快速开发通用应用。
```
<template>
  <h1 class="red">Hello {{ name }}!</h1>
</template>

<script>
export default {
  asyncData (context) {
    // called every time before loading the component
    return { name: 'World' }
  },
  fetch () {
    // The fetch method is used to fill the store before rendering the page
  },
  head () {
    // Set Meta Tags for this Page
  },
  // and more functionality to discover
  ...
}
</script>

<style>
.red {
  color: red;
}
</style>
```
Nuxt.js 为页面提供的特殊配置项：
![nuxt页面配置项](https://i.loli.net/2020/01/02/LtCg82R6Kk3iovS.png)
- **HTML头部**

## 10.nuxt异步数据
- **asyncData方法**
```
//_id.vue
<template>
  <div>
    <h2>详情页</h2>
    <p>{{$route.params.id}}</p>
    <p>{{detail.price}}</p>
    <p>{{detail.des}}</p>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "_id",
    asyncData() {
        return axios.get('/data/test.json').then((res)=>{
          return {
            detail:res.data
          }
        })
    }
  }
</script>

//async await

<script>
  import axios from 'axios';

  export default {
    name: "_id",
    async asyncData() {
      // return axios.get('/data/test.json').then((res) => {
      //   return {
      //     detail: res.data
      //   }
      // })
      const res = await axios.get('/data/test.json');
      return {detail: res.data}
    }
  }
</script>
```
- **上下文对象**
- **错误处理**

Nuxt.js 在上下文对象context中提供了一个 error(params) 方法，
```
export default {
  asyncData ({ params, error }) {
    return axios.get(`https://my-api/posts/${params.id}`)
    .then((res) => {
      return { title: res.data.title }
    })
    .catch((e) => {
      error({ statusCode: 404, message: 'Post not found' })
    })
  }
}
```
## 11.nuxt资源文件
```
-| assets/
----| image.png
-| pages/
----| index.vue
```
- **assets**

如果我们在CSS代码中使用 url('~assets/image.png'), 那么编译后它将被转换成 require('~/assets/image.png')。

又或者如果我们在 pages/index.vue 中使用以下代码引用图片资源：
```
<template>
  <img src="~/assets/image.png">
</template>
```
那么编译后会被转换成：
```
createElement('img', { attrs: { src: require('~/assets/image.png') }})
```

.png 并非 JavaScript 文件, 因此 Nuxt.js 通过配置Webpack使用file-loader 和 url-loader 这两个加载器来处理此类引用。

这样做的好处有：

file-loader 能让你指定从什么地方拷贝资源文件以及发布后放到哪个目录去，并能让你使用版本哈希码来重命名发布后的文件来实现增量更新和更好的缓存策略。
url-loader 能根据你指定的文件大小阈值，来判断一个文件是转换成内联的base-64码（如果该文件尺寸小于该阈值）还是使用file-loader来降级处理。小文件base-64化能有效减少HTTP请求数。

实际上, Nuxt.js 默认的加载器配置如下：
```
[
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1KB
      name: 'img/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1 KB
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]
```
也即文件（图片或字体）的尺寸小于1K的时候，它将会被转换成 Base-64 data URL 来内联引用；否则它将被拷贝至指定的子目录（在 .nuxt 目录下），并被重命名（加上7位的哈希码作为版本标识）以实现更好的缓存策略。

当用 nuxt 命令运行我们的应用时，pages/index.vue 中的模板代码：
```
<template>
  <img src="~/assets/image.png">
</template>
```
将被编译生成：
```
<img src="/_nuxt/img/image.0c61159.png">
```
- **static**

如果你的静态资源文件需要 Webpack 做构建编译处理，可以放到 assets 目录，否则可以放到 static 目录中去。

Nuxt 服务器启动的时候，该目录下的文件会映射至应用的根路径 / 下，像 robots.txt 或 sitemap.xml 这种类型的文件就很适合放到 static 目录中。

你可以在代码中使用根路径 / 结合资源相对路径来引用静态资源：
```
<!-- 引用 static 目录下的图片 -->
<img src="/my-image.png"/>

<!-- 引用 assets 目录下经过 webpack 构建处理后的图片 -->
<img src="~/assets/my-image-2.png"/>
```
## 12.nuxt插件
- **第三方插件**

比如：使用axios
```
npm install --save axios
```
然后页面中使用即可

每个页面都使用的情况下，build的时候，会打包多个axios，解决方式:

 在 nuxt.config.js 内配置build
 ```
 build: {
    transpile: [/^element-ui/],
    extend(config, ctx) {
    },
    vendor:['axios']
  },
 ```
- **Vue插件**

假如我们想使用 vue-notifications 显示应用的通知信息，我们需要在程序运行前配置好这个插件。

首先增加文件 plugins/vue-notifications.js：
```
import Vue from 'vue'
import VueNotifications from 'vue-notifications'

Vue.use(VueNotifications)
```
然后, 在 nuxt.config.js 内配置 plugins 如下：
```
module.exports = {
  plugins: ['~/plugins/vue-notifications']
}
```
- **注入**
context注入方式和在其它vue应用程序中注入类似。

plugins/ctx-inject.js:
```
export default ({ app }, inject) => {
  // Set the function directly on the context.app object
  app.myInjectedFunction = (string) => console.log('Okay, another function', string)
}
```
nuxt.config.js:
```
export default {
  plugins: ['~/plugins/ctx-inject.js']
}
```
现在，只要您获得context，你就可以使用该函数（例如在asyncData和fetch中）。 ctx-example-component.vue:
```
export default {
  asyncData(context){
    context.app.myInjectedFunction('ctx!')
  }
}
```
- **联合注入**
如果您需要同时在context，Vue实例，甚至Vuex中同时注入，您可以使用inject方法,它是plugin导出函数的第二个参数。 将内容注入Vue实例的方式与在Vue应用程序中进行注入类似。系统会自动将$添加到方法名的前面。

plugins/combined-inject.js:
```
export default ({ app }, inject) => {
  inject('myInjectedFunction', (string) => console.log('That was easy!', string))
}
```
nuxt.config.js:
```
export default {
  plugins: ['~/plugins/combined-inject.js']
}
```
现在您就可以在context，或者Vue实例中的this，或者Vuex的actions/mutations方法中的this来调用myInjectedFunction方法。 ctx-example-component.vue:
```
export default {
  mounted(){
    this.$myInjectedFunction('works in mounted')
  },
  asyncData(context){
    context.app.$myInjectedFunction('works with context')
  }
}
```
- **只在浏览器里使用的插件**

不支持ssr的系统，插件只在浏览器里使用，这种情况下下，你可以用 ssr: false ，使得插件只会在客户端运行。

举个例子：
```
//nuxt.config.js:
module.exports = {
  plugins: [
    { src: '~/plugins/vue-notifications', ssr: false }
  ]
}
```
## 13.nuxt模块
模块只是在引导Nuxt时按顺序调用的函数。 框架在加载之前等待每个模块完成。 如此，模块几乎可以自定义Nuxt的任何地方。 我们可以使用功能强大的 Hookable Nuxt.js系统来完成特定事件的任务。

- **基本模块**

如上所述，模块只是简单的功能。它们可以打包为npm模块或直接包含在项目源代码中。

modules/simple.js
```
export default function SimpleModule (moduleOptions) {
  // Write your code here
}

// REQUIRED if publishing as an npm package
// module.exports.meta = require('./package.json')
```
moduleOptions

这是用户使用modules数组传递对象，我们可以使用它来定制它的行为。

this.options

您可以使用此属性直接访问Nuxt选项。这是nuxt.config.js，其中包含所有默认选项，可用于模块之间的共享选项。

this.nuxt

这是对当前Nuxt实例的引用。 请参考 Nuxt class docs for available methods.

this

modules中的context, 请参考 ModuleContainer 来查看可用的方法。

module.exports.meta

如果要将模块发布为npm包，则需要配置此选项。Nuxt内部使用meta来更好地处理您的包。

nuxt.config.js
```
export default {
  modules: [
    // Simple usage
    '~/modules/simple'

    // Passing options
    ['~/modules/simple', { token: '123' }]
  ]
}
```
然后，我们告诉Nuxt为项目加载一些特定模块，并将可选参数作为选项。 请参考 模块配置 文档来查看更多!

- **异步模块**

并非所有模块都会同步完成所有操作，例如：您可能希望开发一个需要获取某些API或执行异步IO的模块。为此，Nuxt支持在异步模块中返回Promise或调用回调。

使用 async/await
```
import fse from 'fs-extra'

export default async function asyncModule() {
  // You can do async works here using `async`/`await`
  let pages = await fse.readJson('./pages.json')
}
```
返回 Promise
```
import axios from 'axios'

export default function asyncModule() {
  return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      // Do something by extending Nuxt routes
    })
}
```
使用回调
```
import axios from 'axios'

export default function asyncModule(callback) {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => res.data.map(user => '/users/' + user.username))
    .then(routes => {
      callback()
    })
}
```
- **常见模块**

优先级最高选项
有时在nuxt.config.js中注册模块时可以使用顶级选项更方便，这允许我们组合多个选项源。

nuxt.config.js
```
export default {
  modules: [
    ['@nuxtjs/axios', { anotherOption: true }]
  ],

  // axios module is aware of this by using `this.options.axios`
  axios: {
    option1,
    option2
  }
}
```
module.js
```
export default function (moduleOptions) {
  const options = Object.assign({}, this.options.axios, moduleOptions)
  // ...
}
```
1. **提供插件**

通常，模块在添加时需提供一个或多个插件。 例如：bootstrap-vue 模块需要将自己注册到Vue中。 为此我们可以使用 this.addPlugin 方法。

plugin.js
```
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

Vue.use(BootstrapVue)
```
module.js
```
import path from 'path'

export default function nuxtBootstrapVue (moduleOptions) {
  // Register `plugin.js` template
  this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
```
2. **模板插件**

已注册的模板和插件可以利用lodash templates模板有条件地更改已注册插件的输出。

plugin.js
```
// Set Google Analytics UA
ga('create', '<%= options.ua %>', 'auto')

<% if (options.debug) { %>
// Dev only code
<% } %>
```
module.js
```
import path from 'path'

export default function nuxtBootstrapVue (moduleOptions) {
  // Register `plugin.js` template
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options: {
      // Nuxt will replace `options.ua` with `123` when copying plugin to project
      ua: 123,

      // conditional parts with dev will be stripped from plugin code on production builds
      debug: this.options.dev
    }
  })
}
```
 3. **添加CSS库**

考虑是否存在CSS库以避免重复，并添加一个选项来禁用模块中的CSS库。请参见下面的示例。

module.js
```
export default function (moduleOptions) {
  if (moduleOptions.fontAwesome !== false) {
    // Add Font Awesome
    this.options.css.push('font-awesome/css/font-awesome.css')
  }
}
```
 4. **Emit assets**

我们可以注册webpack插件用来在构建期间发出资源。

module.js
```
export default function (moduleOptions) {
  const info = 'Built by awesome module - 1.3 alpha on ' + Date.now()

  this.options.build.plugins.push({
    apply (compiler) {
      compiler.plugin('emit', (compilation, cb) => {

        // This will generate `.nuxt/dist/info.txt' with contents of info variable.
        // Source can be buffer too
        compilation.assets['info.txt'] = { source: () => info, size: () => info.length }

        cb()
      })
    }
  })
}
```
 5. **注册自定义 loaders**

我们可以使用this.extendBuild在nuxt.config.js中执行与build.extend相同的操作。

module.js
```
export default function (moduleOptions) {
    this.extendBuild((config, { isClient, isServer }) => {
      // `.foo` Loader
      config.module.rules.push({
        test: /\.foo$/,
        use: [...]
      })

      // Customize existing loaders
      // Refer to source code for Nuxt internals:
      // https://github.com/nuxt/nuxt.js/tree/dev/packages/builder/src/webpack/base.js
      const barLoader = config.module.rules.find(rule => rule.loader === 'bar-loader')
  })
}
```
 6. **在指定钩子上运行任务**

您的模块可能只需要在特定条件下执行操作，而不仅仅是在Nuxt初始化期间。我们可以使用强大的Tapable插件来执行特定事件的任务。Nuxt将等待钩子返回Promise或被定义为async(异步)。
```
export default function () {
  // Add hook for modules
  this.nuxt.hook('module', moduleContainer => {
    // This will be called when all modules finished loading
  })

  // Add hook for renderer
  this.nuxt.hook('renderer', renderer => {
    // This will be called when renderer was created
  })

  // Add hook for build
  this.nuxt.hook('build', async builder => {
    // This will be called once when builder created

    // We can even register internal hooks here
    builder.hook('compile', ({compiler}) => {
        // This will be run just before webpack compiler starts
    })
  })

  // Add hook for generate
  this.nuxt.hook('generate', async generator => {
    // This will be called when a Nuxt generate starts
  })
}
```
## 14.nuxt-vuex状态树
- **使用状态树**

Nuxt.js 会尝试找到应用根目录下的 store 目录，如果该目录存在，它将做以下的事情：
```
1.引用 vuex 模块
2.将 vuex 模块 加到 vendors 构建配置中去
3.设置 Vue 根实例的 store 配置项
```
Nuxt.js 支持两种使用 store 的方式，你可以择一使用：
```
1.模块方式： store 目录下的每个 .js 文件会被转换成为状态树指定命名的子模块 （当然，index 是根模块）

2.Classic(不建议使用)： store/index.js返回创建Vuex.Store实例的方法。
```
<font color="red">无论使用那种模式，您的state的值应该始终是function，为了避免返回引用类型，会导致多个实例相互影响。</font>

- **普通方式**

只需将状态导出为 函数，将变量和操作作为 store/index.js 中的对象导出：
```
export const state = () => ({
  counter: 0
})

export const mutations = {
  increment (state) {
    state.counter++
  }
}
```
store/todos.js 文件：
```
export const state = () => ({
  list: []
})

export const mutations = {
  add (state, text) {
    state.list.push({
      text: text,
      done: false
    })
  },
  remove (state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle (state, todo) {
    todo.done = !todo.done
  }
}
```
```
//vue页面中使用
this.$store.state.todos.list
```
- **模块方式**
您可以将其他插件添加到store（在模块模式下），将其放入store/index.js文件中：
```
import myPlugin from 'myPlugin'

export const plugins = [ myPlugin ]

export const state = () => ({
  counter: 0
})

export const mutations = {
  increment (state) {
    state.counter++
  }
}
```
- **fetch方法**

<font color='red'>fetch 方法会在渲染页面前被调用，作用是填充状态树 (store) 数据，与 asyncData 方法类似，不同的是它不会设置组件的数据。</font>

如果页面组件设置了 fetch 方法，它会在组件每次加载前被调用（在服务端或切换至目标路由之前）。

fetch 方法的第一个参数是页面组件的上下文对象 context，我们可以用 fetch 方法来获取数据填充应用的状态树。为了让获取过程可以异步，你需要返回一个 Promise，Nuxt.js 会等这个 promise 完成后再渲染组件。

例如 pages/index.vue：
```
<template>
  <h1>Stars: {{ $store.state.stars }}</h1>
</template>

<script>
export default {
  fetch ({ store, params }) {
    return axios.get('http://my-api/stars')
    .then((res) => {
      store.commit('setStars', res.data)
    })
  }
}
</script>
```
你也可以使用 async 或 await 的模式简化代码如下：
```
<template>
  <h1>Stars: {{ $store.state.stars }}</h1>
</template>

<script>
export default {
  async fetch ({ store, params }) {
    let { data } = await axios.get('http://my-api/stars')
    store.commit('setStars', data)
  }
}
</script>
```
- **nuxtServerInit方法**

如果在状态树中指定了 nuxtServerInit 方法，Nuxt.js 调用它的时候会将页面的上下文对象作为第2个参数传给它（服务端调用时才会酱紫哟）。当我们想将服务端的一些数据传到客户端时，这个方法是灰常好用的。

举个例子，假设我们服务端的会话状态树里可以通过 req.session.user 来访问当前登录的用户。将该登录用户信息传给客户端的状态树，我们只需更新 store/index.js 如下：
```
actions: {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  }
}
```

如果你使用_状态树模块化_的模式，只有主模块（即 store/index.js）适用设置该方法（其他模块设置了也不会被调用）。

这时context被赋予nuxtServerInit作为第二个参数，它与asyncData或fetch方法相同。

nuxtServerInit 方法接收的上下文对象和 fetch 的一样，但不包括 context.redirect() 和 context.error()。

注意：异步nuxtServerInit操作必须返回Promise来通知nuxt服务器等待它们。
```
actions: {
  async nuxtServerInit({ dispatch }) {
    await dispatch('core/load')
  }
}
```
## 15.nuxt命令和部署
- **命令列表**
![执行命令](https://i.loli.net/2019/12/18/7K2Vmnf6Rlqj54D.png)
- **开发模式**
```
nuxt
// 或
npm run dev
```
- **发布部署**
1. 服务端渲染应用部署

部署 Nuxt.js 服务端渲染的应用不能直接使用 nuxt 命令，而应该先进行编译构建，然后再启动 Nuxt 服务，可通过以下两个命令来完成：
```
nuxt build
nuxt start
```
2. 静态应用部署

Nuxt.js 可依据路由配置将应用静态化，使得我们可以将应用部署至任何一个静态站点主![build](/Users/qiaoxu/Desktop/myBlog/pic/build.png)机服务商。

可利用下面的命令生成应用的静态目录和文件：
```
npm run generate
```
这个命令会创建一个 dist 文件夹，所有静态化后的资源文件均在其中。

如果你的项目需要用到动态路由，请移步 generate配置API 了解如何让 Nuxt.js 生成此类动态路由的静态文件。

3. 单页应用程序部署（SPA）

nuxt generate 在 build/generate 时间内仍然需要SSR引擎，同时具有预渲染所有页面的优势，并具有较高的SEO优化和页面加载能力。 内容在构建时生成。例如，我们不能将它用于内容依赖于用户身份验证或实时API的应用程序（至少对于第一次加载）。

SPA应用的想法很简单！ 使用时启用SPA模式 mode: 'spa' 或 --spa，并且我们运行打包，生成在导报后自动启动，生成包含常见的meta和资源链接，但不包含页面内容。

因此，对于SPA部署，您必须执行以下操作：

```
将nuxt.config.js中的mode更改为spa。
运行 npm run build.
自动生成dist/文件夹，部署到您的服务器，如Surge，GitHub Pages或nginx。
```
另一种可能的部署方法是在spa模式下将Nuxt用作框架中的中间件。这有助于减少服务器负载，并在无法进行SSR的项目中使用Nuxt。