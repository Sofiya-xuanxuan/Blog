# require.context

这个方法有3个参数：

- 要搜索的文件夹目录
- 是否还应该搜索它的子目录，
- 以及一个匹配文件的正则表达式。

```js
require.context(directory, useSubdirectories = false, regExp = /^\.\//)
 

require.context("./test", false, /\.test\.js$/);
//（创建了）一个包含了 test 文件夹（不包含子目录）下面的、所有文件名以 `.test.js` 结尾的、能被 require 请求到的文件的上下文。
 

require.context("../", true, /\.stories\.js$/);
//（创建了）一个包含了父级文件夹（包含子目录）下面，所有文件名以 `.stories.js` 结尾的文件的上下文。
```

> **require.context模块导出(返回)一个(require)函数**，这个函数可以接收一个参数：request函数
>
> 这里的request函数应该是指在require()语句中的表达式

导出的方法有3个属性：resolve，keys，id：

- resolve是一个函数，它返回请求被解析后得到的模块 id
- keys也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求组成
- id是上下文模块里所包含的模块id，它可能在你使用module.hot.accept的时候被用到

```js
const requireAll = context => context.keys().map(context);
const rcModule=require.context('@/pages/', true, /router\.js$/)
let routers=[]
requireAll(rcModule).forEach(({
      default: item
}) => {
      routers.push(...item)
})
```

