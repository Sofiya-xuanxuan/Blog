# 前端性能优化

## 一、前端性能优化——网络层

### 1. 从输入URL到页面加载完成，发生了什么？

- 用户输入kaikeba.com
- 浏览器通过DNS，把url解析为IP
- 和IP地址建立TCP链接，发送Http请求
- 服务器接收请求，查库，读文件等，拼接好返回的HTTP响应
- 浏览器收到首屏html，开始渲染
- 解析html为dom
- 解析css为css-tree
- dom+css生成render- tree绘图
- 加载script的js文件
- 执行js

所谓性能优化，就是上面的步骤加一起，时间尽可能的短，所以基本也有两个大方向：

​	1）少加载文件

​	2）少执行代码

![浏览器运行](/Users/qiaoxu/Desktop/myBlog/pic/browser.png)

### 2. DNS

- 查看dns缓存
- 本地没缓存，发起dns请求，向本地配置的DNS服务器发请求（递归）

优化：prefetch预获取，比如使用的cdn域名

![prefetch](/Users/qiaoxu/Desktop/myBlog/pic/prefetch.png)

### 3. TCP

**IP TCP HTTP 的关系：**

- IP负责找到（寻址）

- TCP负责数据完整性和有序性，三次握手，粘包，滑动窗口等机制

  UDP：只发不管别的

  > 《图解TCP/IP》

- http应用层，负责应用层数据，数据终止时机

  缓存、cookie等等

  > 
  >
  > 《图解http协议》
  >
  > 《HTTP权威指南》

**优化策略：**

- 长连接

- 减少文件体积

  - js打包压缩、css压缩

  - 图片压缩 雪碧图

    > 图片通常是最占用流量的，PC端加载的平均图片大小是600k，简直比js打包后的文件还大了，所以针对图片的优化，也是收益不错的。
    >
    > 不同的场景，使用不同的文件类型：
    >
    > png：
    >
    > ​	无损压缩，质量高，支持透明
    >
    > ​	色彩线条丰富的小图，用png，比如logo、商品icon
    >
    > jpg：
    >
    > ​	有损压缩
    >
    > ​	体积小，不支持透明
    >
    > ​	用于背景图，轮播图、大图（banner）
    >
    > gif：
    >
    > webp：
    >
    > ​	需要调研兼容性（比jpg还小）
    >
    > svg：
    >
    > ​	文本，体积小 矢量图 各种缩放不会失真（有额外的计算量）
    >
    > ​	渲染成本，学习成本
    >
    > iconfont：
    >
    > ​	字体图标
    >
    > 雪碧图：
    >
    > ​	更新起来很麻烦

  - gizp

    ```js
    accept-encoding:gzip  //开启gzip
    ```

    > HTTP压缩就是以缩小体积为目的，对HTTP内容进行重新编码的过程
    >
    > Gzip压缩背后的原理，是在一个文本文件中找出一些重复出现的字符串、临时替换它们，从而使整个文件变小。根据这个原理，文件中代码的重复率越高，那么压缩的效率就越高，使用Gzip的收益就越大。反之亦然
    >
    > 基本上来说，Gzip都是服务器干的活，比如nginx

- 减少文件请求次数

  - 文件打包

  - 缓存（http缓存、数据缓存-频繁用到的放在内存，redis中）

    > http缓存：
    >
    > 1. 浏览器：获取index.js
    >
    >    ```js
    >    请求
    >    GET /index.js http/1.1
    >    协议头：值
    >    协议头：值
    >    
    >    http请求体
    >    ```
    >
    > 2. 服务器：给你文件
    >
    >    ```js
    >    expires：过期时间 具体的日期
    >    cache-control：max-age=时间戳 这些时间之内不过期
    >    ```
    >
    > 3. 再次获取，如果过期时间还没到，直接200 （from cache）不发请求——强缓存
    > 4. 如果已经过期了，浏览器也不会直接加载，而是问一下后端，这个文件有没有过期——弱缓存
    >    - if-modified-since：日期 这个日子之后，有没有修改过文件
    >    - Etag：文件指纹
    >    - 响应304 用缓存
    >
    > 5. 都不行的话，只能重新加载了
    >
    > 
    >
    > 思考：
    >
    > 大公司是怎么上线前端代码的？
    >
    >  - 如果直接文件替换（上线后，用户缓存问题）
    >
    >  - webpack上线过程：
    >
    >    ```js
    >    //1.有冗余加载的问题，比如jq文件并没有变，但是时间戳发生变化后，也会重新加载，那就出现冗余加载的问题了
    >    <script src='xxx.js?_v=1.0.1/时间戳'></script>
    >    
    >    //2.使用md5，只要内容没有变化，那么文件的哈希值就不会变化
    >    //获取文件哈希值，必须配合工程化，webpack、fis等
    >    <script src='xxx.js?_v=文件的哈希值'></script>
    >    
    >    //3.html和js上线先后顺序，怎么回滚，cdn
    >    1.html或者说模板，线上html或者模板，导致加载的是老js，会报错
    >    2.线上js，会导致老的dom结构用的是新的js
    >    
    >    //最优上线方式
    >    <script src='xxx.文件的哈希值(6).js'></script>
    >    线上js，哈希值变了，就是新文件（这样不会覆盖老的版本，）旧文件——半年清理一次
    >    ```
    >
    >    html永不缓存
    >
    >    js长期缓存，前端通过文件名来控制缓存

  - 懒加载

- 减少用户和服务器的距离
  - cdn：分发网络

### 4. 三次握手

1. 你在不
2. 我在呢
3. 那我开始发数据了呦

文件打包 可以节省这部分优化

### 5. HTTP

1. 携带无用的数据，比如header(cookie)
2. 合理利用缓存

### 6. 浏览器缓存机制

广义的缓存，可以分为这四个：

- http Cache

  > 浏览器大佬: 需要获取main.js ，看下强缓存里有么有
  >
  > 1. Expires 和 Cache-Control两个header来控制强缓存
  >
  >    ```js
  >     expires: Wed, 11 Mar 2019 16:12:18 GMT 
  >     cache-control: max-age=31536000 // 1.1 精准 优先级高
  >    ```
  >
  > 2. 如果命中强缓存，就不会和服务器交互了，直接用缓存
  >
  > 3. 如果强缓存失效了，需要执行协商缓存
  >
  >    - 服务器小老弟。浏览器大佬需要main.js 这个文件上次修改
  >
  >      ```js
  >      If-Modified-Since: Fri, 27 Oct 2017 06:35:57 GMT
  >      ```
  >
  >    - 服务器: 小老弟，没改过，直接用缓存把，这次请求返回304 not Modified
  >
  >    - 如果有etag 类似文件的指纹，这个优先级更高 因为更准确
  >
  >      ```js
  >      ETag: W/"2aaa-129892f459"
  >      If-None-Match: W/"2aaa-129892f459"
  >      ```

- memory Cache

  > 内存缓存，短命 比如常用数据存js里，浏览器也有自己的策略， base64图片，体积小的静态资源

- Service Worker Cache

  > Service Worker 是一种独立于主线程之外的 Javascript 线程。它脱离于浏览器窗体，算是幕后工作，可以实现离线缓存，网络代理等
  >
  > ```js
  > window.navigator.serviceWorker.register('/kaikeba.js')
  >   .then(function () {
  > 		console.log('注册成功') })
  >   .catch(err => {
  > 		console.error("注册失败") })
  > ```

- Push Cache

  > http2的缓存

### 7. 文件打包



### 8. 图片优化

图片通常是最占用流量的，PC端加载的平均图片大小是600k，简直比js打包后的文件还大了，所以针对图片的优化，也是收益不错的。

不同的场景，使用不同的文件类型：

**png：**

​	无损压缩，质量高，支持透明

​	色彩线条丰富的小图，用png，比如logo、商品icon

**jpg：**

​	有损压缩

​	体积小，不支持透明

​	用于背景图，轮播图、大图（banner）

**gif：**

**webp：**

​	需要调研兼容性（比jpg还小）

**svg：**

​	文本，体积小 矢量图 各种缩放不会失真（有额外的计算量）

​	渲染成本，学习成本

**iconfont：**

​	字体图标

**雪碧图：**

​	减少http请求，但是更新起来很麻烦

### 9. gzip

accept-encoding:gzip 开启gzip



**HTTP压缩就是以缩小体积为目的，对HTTP内容进行重新编码的过程**

Gzip压缩背后的原理，是在一个文本文件中找出一些重复出现的字符串、临时替换它们，从而使整个文件变小。根据这个原理，文件中代码的重复率越高，那么压缩的效率就越高，使用Gzip的收益就越大。反之亦然

基本上来说，Gzip都是服务器干的活，比如nginx

### 10. 本地  存储

cookie、localStorage、sessionStorage、indexDB

1. cookie

   最早，体积限定，性能浪费，所有请求都带上所有当前域名的cookie

2. WebStorage

   LocalStorage与sessionStorage

   存储量大，不自动发给服务器，js控制

3. indexDB

   运行在浏览器上的非关系型数据库

4. PWA

   基于缓存技术的应用模型

### 11. CDN

海南的哥们，访问开课吧，光电线就要那么远，肯定慢，所有我们可以把静态资源，部署在分布式的cdn上，海南的哥们，就近获取资源，比如广州机房

cdn单独的域名，浏览器并发获取

### 12. 服务端渲染

如果是SPA首屏，SSR就是性能优化的重要一环

nuxt和next

> nuxt渲染：
>
> 1. 基于Vuejs
> 2. 服务端宁渲染3. 路由
> 4. 热加载
> 5. 支持http2

#### 1.react服务端渲染

```js
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
const app = express()
// renderToString 是把虚拟DOM转化为真实DOM的关键方法 const RDom = renderToString(<App />)
// 编写HTML模板，插入转化后的真实DOM内容
const Page = `
            <html>
              <head>
                <title>test</title>
              </head>
              <body>
                <span>ssr </span>
                ${RDom}
              </body>
            </html>
`
app.get('/index', function(req, res) {
  res.send(Page)
})
// 配置端口号
const server = app.listen(8000)
```

#### 2.vue服务端渲染

```js
 const Vue = require('vue')
// 创建一个express应用
const server = require('express')()
// 提取出renderer实例
const renderer = require('vue-server-renderer').createRenderer()
server.get('*', (req, res) => { // 编写Vue实例(虚拟DOM节点) const app = new Vue({
    data: {
      url: req.url
},
// 编写模板HTML的内容
template: `<div>访问的 URL 是: {{ url }}</div>` })
// renderToString 是把Vue实例转化为真实DOM的关键方法 renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
}
// 把渲染出来的真实DOM字符串插入HTML模板中 
res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
`) })
})
server.listen(8080)
```

## 二、前端性能优化——代码执行层面

### 1.雅虎军规

> 尽量减少 HTTP 请求个数——须权衡
>  使用 CDN(内容分发网络)
>  为文件头指定 Expires 或 Cache-Control ，使内容具有缓存性。 避免空的 src 和 href
>  使用 gzip 压缩内容
>  把 CSS 放到顶部
>  把 JS 放到底部
>  避免使用 CSS 表达式
>  将 CSS 和 JS 放到外部文件中
>  减少 DNS 查找次数
>  精简 CSS 和 JS
>  避免跳转
>  剔除重复的 JS 和 CSS
>  配置 ETags
>  使 AJAX 可缓存
>  尽早刷新输出缓冲
>  使用 GET 来完成 AJAX 请求
>  延迟加载
>  预加载
>  减少 DOM 元素个数
>  根据域名划分页面内容
>  尽量减少 iframe 的个数
>  避免 404
>  减少 Cookie 的大小
>  使用无 cookie 的域
>  减少 DOM 访问
>  开发智能事件处理程序
>  用 代替 @import
>  避免使用滤镜
>  优化图像
>  优化 CSS Spirite
>  不要在 HTML 中缩放图像——须权衡
>  favicon.ico要小而且可缓存
>  保持单个内容小于25K
>  打包组件成复合文本 

### 2. 性能监控——performance（浏览器自带）

	- 重定向耗时:redirectEnd - redirectStart
	- DNS查询耗时 :domainLookupEnd - domainLookupStart
	- TCP链接耗时 :connectEnd - connectStart
	- HTTP请求耗时 :responseEnd - responseStart
	- 解析dom树耗时 : domComplete - domInteractive
	- 白屏时间 :responseStart - navigationStart
	- DOMready时间 :domContentLoadedEventEnd - navigationStart 
	- onload时间:loadEventEnd - navigationStart，也即是onload回调函数执行的时间。

### 3. LightHouse

chrome插件

```js
npm install -g lighthouse
lighthouse https://www.kaikeba.com/ --view
```

![lighthose](/Users/qiaoxu/Desktop/myBlog/pic/lighthouse.png)

### 4. 节流和防抖

- **节流**

  > 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率

  每次触发事件时都判断当前是否有等待执行的延时函数

  ```js
  function throttle(fn) {
        let canRun = true; // 通过闭包保存一个标记
        return function () {
          if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
          canRun = false; // 立即设置为false
          setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
            fn.apply(this, arguments);
            // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
            canRun = true;
          }, 500);
        };
  }
  
  function sayHi(e) {
    console.log(e.target.innerWidth, e.target.innerHeight);
  }
  
  window.addEventListener('resize', throttle(sayHi));
  ```

- **防抖**

  > 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次触发，则重新计算时间

  每次触发事件时都取消之前的延时调用方法

  ```js
  function debounce(fn) {
        let timeout = null; // 创建一个标记用来存放定时器的返回值
        return function () {
          clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
          timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
            fn.apply(this, arguments);
          }, 500);
        };
  }
      
  function sayHi() {
      console.log('防抖成功');
  }
  
  var inp = document.getElementById('inp');
  inp.addEventListener('input', debounce(sayHi)); // 防抖
  ```

### 5. 浏览器重绘和回流

- **回流**

  当我们对 DOM 的修改引发了 DOM 几何尺寸的变化(比如修改元素的宽、高或隐藏元素等)时，浏览器需 要重新计算元素的几何属性(其他元素的几何属性和位置也会因此受到影响)，然后再将计算的结果绘制出来。这 个过程就是回流(也叫重排)。

- **重绘**

  当我们对 DOM 的修改导致了样式的变化、却并未影响其几何属性(比如修改了颜色或背景色)时，浏览器 不需重新计算元素的几何属性、直接为该元素绘制新的样式(跳过了上图所示的回流环节)。这个过程叫做重绘。

  由此我们可以看出，重绘不一定导致回流，回流一定会导致重绘。（回流影响是最大的）

### 6. 懒加载

```js
 // 获取所有的图片标签
const imgs = document.getElementsByTagName('img')
// 获取可视区域的高度
const viewHeight = window.innerHeight || document.documentElement.clientHeight 
// num用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出
let num = 0
function lazyload(){
  for(let i=num; i<imgs.length; i++) {
    // 用可视区域高度减去元素顶部距离可视区域顶部的高度
    let distance = viewHeight - imgs[i].getBoundingClientRect().top 
    // 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明元素露出 
    if(distance >= 0 ){
      // 给元素写入真实的src，展示图片
    imgs[i].src = imgs[i].getAttribute('data-src') 
    // 前i张图片已经加载完毕，下次从第i+1张开始检查是否露出 
    num = i + 1
     } 
  }
}

// 监听Scroll事件
window.addEventListener('scroll', lazyload, false);
```

### 7. vue

其实我们只要做好异步组件，vue本身已经足够用了，但是还是有一些可以优化的点

- v-if vs v-show

  初始性能 VS 频繁切换性能

- 和渲染无关的数据，不要放在data上data也不要嵌套过多层

  data也不要嵌套过多层

- nextTick

  修改数据的当下，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新

  ```js
  this.$nextTick(function() { 
    // DOM 更新了
  })
  ```

- Object.freeze()

  冻结数据 取消setters

### 8. react

- 只传递需要的props

  不要随便 <Component {...props} />

- pureComponent shouldComponentUpdate

- 少在render中绑定事件

- redux + reselect

  data扁平化 每当store发生改变的时候，connect就会触发重新计算，为了减少重复的不必要计算，减少大型项目的性能开支，

  需要对selector函数做缓存。推荐使用reactjs/reselect, 缓存的部分实现代码如下。

### 9. 虚拟列表——长列表优化react-virtualized

​	只渲染可见的，

​	如果有1000个， 只渲染20个，鼠标滚动的时候，新节点替换老节点、