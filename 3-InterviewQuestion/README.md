## 面试题分类汇总

### JavaScript面试题
- JavaScript有几种类型的值？
- 堆，栈，队列的区别
- 请指出 JavaScript 宿主对象 (host objects) 和原生对象 (native objects) 的区别
- 为什么扩展 JavaScript 内置对象不是好的做法
- js的类型判断
- 请解释可变 (mutable) 和不变 (immutable) 对象的区别
- 有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣
- Array(...)和Array.of(...)的区别
- 类数组对象转换为数组
- 你熟悉 Typed Arrays 吗？ 如果熟悉，请解释他们与 JavaScript 中的传统数组相比的异同？
- symbol应用
- 深浅拷贝
== 和 === 有什么区别？
Object.is() 与比较操作符 ===、== 有什么区别
什么是三元表达式 (Ternary expression)？“三元 (Ternary)” 表示什么意思
从内存来看 null 和 undefined 本质的区别是什么？
为什么普通 for 循环的性能远远高于 forEach 的性能，请解释其中的原因
箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用 new 生成实例，那么箭头函数可以吗？为什么
箭头函数与普通函数的区别？
JavaScript 中有哪些不同的函数调用模式
解释 function foo() {} 与 var foo = function() {} 用法的区别
纯函数的概念？
Javascript中，有一个函数，执行时对象查找时，永远不会去查找原型，这个函数是？
请解释为什么接下来这段代码不是 IIFE (立即调用的函数表达式)：function foo(){ }();要做哪些改动使它变成 IIFE
请举出一个匿名函数的典型用例
请指出以下代码的区别：function Person(){}、var person = Person()、var person = new Person()？
caller, callee和arguments分别是什么?
for of , for in 和 forEach,map 的区别
介绍下深度优先遍历和广度优先遍历，如何实现？
Object.assion()和...解构的区别
何为作用域链
执行上下文(EC)
为什么 var 可以重复声明
全局作用域中，用const 和let声明的变量不在 window 上,那到底在哪里？如何去获取
var、let 和 const 区别的理是什么
什么是闭包，作用是什么，会带来哪些影响
4类常见内存泄漏及如何避免
eval是做什么的？
javascript 代码中的”use strict”;是什么意思 ? 使用它区别是什么？
XML和JSON的区别？
如何在 JSON 中序列化以下对象？
javascript的运行机制
说一说对原型链对理解
Function.proto(getPrototypeOf)是什么？
this的用法以及优先级
call 和 apply 的区别是什么，哪个性能更好一些
请解释 Function.prototype.bind
new的原理是什么
什么是防抖和节流？有什么区别？如何实现?
介绍下 Set、Map、WeakSet 和 WeakMap 的区别？
javascript继承方式
ES5/ES6 的继承除了写法以外还有什么区别？
javascript创建对象方式
可迭代对象有什么特点
JavaScript 中的迭代器（iterators）和迭代（iterables）是什么？ 你知道什么是内置迭代器吗？
defineProperty, hasOwnProperty, propertyIsEnumerable都是做什么用的？
介绍下观察者模式和订阅-发布模式的区别，各自适用于什么场景
XMLHttpRequest通用属性和方法
介绍Ajax
防止重复发送Ajax请求
Fetch API 相对于传统的 Ajax 有哪些改进？
请解释 JSONP 的工作原理，以及它为什么不是真正的 Ajax
requestAnimationFrame 原理？是同步还是异步
JS 异步解决方案的发展历程以及优缺点
异步编程的实现方式？
解释同步 (synchronous) 和异步 (asynchronous) 函数的区别
默认参数如何工作？
解释 TCO - 尾调用优化（Tail Call Optimization）。 有没有支持尾调用优化的 JavaScript 引擎？
promise的用法
手写一个promise及其 polyfills 实现,如何实现多个请求并行？
如何实现 Promise.all
如何实现 Promise.finally
如何实现 Promise.race
Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？
setTimeout、Promise、Async/Await 的区别
简单实现async/await中的async函数
使用 async/await 需要注意什么？
装饰器的原理
如何解决跨域问题?
javascript跨域通信
Proxy / Object.defineProperty相比优劣如何
用Proxy 与 Object.defineProperty实现双向绑定
Web Worker 通常应用于哪些方面
简述下对 webWorker 的理解？
从IIFE、AMD、CMD、CommonJS、UMD、webpack(require.ensure)、ES Module等模块化介绍发展历程
AMD、CMD的分别
ES6模块和CommonJS模块的差异？
介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块
线性顺序存储结构和链式存储结构有什么区别？以及优缺点
解释一下何为面向对象编程
什么是面向对象编程及面向过程编程，它们的异同和优缺点
什么是事件代理
事件流
什么是事件循环 (event loop)？
解释 JavaScript 并发模型
js如何自定义事件？
请问调用栈 (call stack) 和任务队列 (task queue) 的区别是什么？
事件模型
事件模型
代码的复用
为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片
图片懒加载与预加载
webSocket如何兼容低浏览器？
页面可见性（Page Visibility API） 可以有哪些用途？
如何在页面上实现一个圆形的可点击区域？
实现不使用 border 画出1px高的线，在不同浏览器的标准模式与怪异模式下都能保持一致的效果
页面重构怎么操作？
请解释什么是单页应用 (single page app), 以及如何使其对搜索引擎友好 (SEO-friendly)
使用一种可以编译成 JavaScript 的语言来写 JavaScript 代码有哪些优缺点
前端日志
前端跟踪
JWT优缺点
介绍下如何实现 token 加密
100 * 100 的 Canvas 占内存多大？
说说svg和canvas各自的优缺点？
描述二叉树的几种遍历方式？
CDN的原理
用过哪些设计模式
重载和重写有什么区别
怎么计算在一个页面上的停留时间
二维码怎么工作的，扫描pc端的二维码，怎么让pc端登录
Object.freeze和Object.seal的区别
mouseover和mouseenter的区别
一个图片url访问后直接下载怎样实现？
input 搜索如何防抖，如何处理中文输入
异步加载 js 脚本的方法有哪些？
JSONP原理及简单实现
在 JavaScript 和前端的上下文中，函数式编程与响应式编程有什么关系？
使函数式编程与面向对象或命令式编程不同的关键因素是什么？
解释即将发布的任一新 ECMAScript 提案
如何在 JavaScript 中检测触摸事件？
### JS笔试题
### CSS面试题
### html面试题
### 计算机网络面试题
### 浏览器面试题
### 框架面试题
### 前端工程
### 安全性能相关
### 版本控制
### Node
### 测试相关
### 开放性题目
[技术选型、前端工程化、架构、设计模式、复杂模块、性能、安全问题、团队管理]
[公司的研发发布流程]
[你用的得心应手用的熟练地编辑器&开发环境是什么样子？]
[你最熟悉哪一套版本控制系统？]
[你能描述当你制作一个网页的工作流程吗]
[平时如何管理你的项目？]
[原来公司工作流程是怎么样的，如何与其他人协作的？如何跨部门合作的？]
[你遇到过比较难的技术问题是？你是如何解决的？]
[常使用的库有哪些？常用的前端开发工具？开发过什么应用或组件？]
[除了前端以外还了解什么其它技术么？你最最厉害的技能是什么？]
[对前端工程师这个职位是怎么样理解的？它的前景会怎么样？]
[你在现在的团队处于什么样的角色，起到了什么明显的作用？]
[你有自己的技术博客吗，用了哪些技术？]
[你的优点是什么？缺点是什么？]
[最近在学什么？能谈谈你未来3，5年给自己的规划吗？]
[对前端工程师这个职位是怎么样理解的？它的前景会怎么样？]
[你使用哪些工具和技术来调试 JavaScript 代码]
[你的技术有什么特点]
[说一下你觉得你最得意的一个项目？你这个项目有什么缺陷，弊端吗？]
[说一下你上一家公司的主要业务流程，你参与到其中了吗？]
### 反问环节
[目前咱们的业务，有一个什么样时间规划，这期间有哪些milestone]
[我的过往工作经历，有哪些是对咱们团队有帮助的？]
[您对我在团队中的定位是怎么样的]
[对于团队成员的成长，您有哪些方案]
### 技巧
确定核心诉求、筛选目标公司
一份确保可以拿到 offer 的简历
打磨自我介绍
打磨项目介绍
面试录音（征得许可后）、面后复盘
私下与业务负责人互动
offer 谈判
### 算法学习
手写算法
动画学习算法https://cxyxiaowu.com/
程序员小吴动画算法
五大算法
leetcode
JavaScript 算法与数据结构
