# Node

## 一、基础

### 1. 环境

- **nodejs是什么**

  nodejs是一个异步的事件驱动的JavaScript

  类比学习运行时这个概念：

  - JRE Java运行时环境
  - C Runtime
  - .NET Common Language Runtime

  运行时，runtime就是程序运行的时候

  运行时库就是程序运行的时候所需要依赖的库

  运行的时候指的是指令加载到内存并由CPU执行的时候。

  C代码编译成可执行文件的时候，指令没有被CPU执行，这个时候算是编译时，就是编译的时候。

- **nodejs特性**
  - 非阻塞I/O
  - 时间驱动

- **node历史——为性能而生**
  - 多进程-C、Apache
  - 多线程-Java
  - 异步IO-JS
  - 协程-lua、openresty、go、[deno](<https://studygolang.com/articles/13101>)

- **与前端的不同**
  - JS核心语法不变
  - 前端BOM DOM
  - 后端fs、http、buffer、event、os

- **运行nodemon——自动重启**

  ```bash
  //node 命令不会实时监控内容的更改
  node 01-runcode.js
  //所以使用nodemon
  //全局安装nodemon
  npm i -g nodemon
  //运行
  nodemon 01-runcode.js
  ```

- **debug**

- **ES6 babel**

  node10版本以上，对于ES6的语法基本都支持，但是对于import和export支持的并不好，所以还使用原生的require和module.exports。

  > ES6导入语法：Node处于试验阶段，需要js变为mjs node9.0以上   
  >
  > node  --experimental-modules ./server.mjs   
  >
  > import http from 'http';

### 2. 常用模块

##### 1. 核心

- **global**

- **buffer**

  - alloc
  - from
  - write
  - concat
  - toString

  ```bash
  //buffer处理二进制
  const buf1=Buffer.alloc(10);
  console.log(buf1);
  
  
  const buf2=Buffer.from('a');
  console.log(buf2);
  
  const buf3=Buffer.from('中国');
  console.log(buf3);
  //合并buffer
  const buf4=Buffer.concat([buf2,buf3]);
  console.log(buf4);
  console.log(buf4.toString('utf8'));//utf-8、utf-32、utf-16
  ```

  > Buffer类似数组，所以很多数组方法它都有   
  >
  > GBK转码使用iconv-lite

- **module**

  - require
  - module.exports

- **process**

##### 2. 内置

- **os**

  ```bash
  //内置模块
  const os=require('os');
  const util=require('util');
  const mem=os.freemem()/os.totalmem()*100;
  console.log(`内存占用率${mem}%`);
  
  //第三方模块
  const cpuStat=require('cpu-stat');
  const getCpu=util.promisify(cpuStat.usagePercent);
  getCpu().then(percent=>{
      console.log(`CPU占用率${percent.toFixed(2)}`);
  });
  
  const showStat=async ()=>{
      const mem=os.freemem()/os.totalmem()*100;
      const percent=await getCpu();
      console.log(`CPU占用：${percent}，内存占用${mem}`);
  };
  
  //导出两种方式
  module.exports={showStat};
  //module.exports.showStat=showStat;
  ```

  > 安装第三方模块：npm i cpu -stat -S

- **fs**

  ```bash
  const fs=require('fs');
  //同步读取文件
  const data=fs.readFileSync('index.js');
  //异步读取文件
  fs.readFile('index.js',(err,data)=>{
      console.log(data.toString());
  })
  ```

- **path**

  ```bash
  const fs=require('fs');
  const path=require('path');
  
  console.log(path.resolve(__dirname));//表示运行的文件所在的目录
  fs.readFile(path.resolve(__dirname,'./index.js'),(err,data)=>{
      console.log(data.toString());
  })
  ```

  

- **http**

  ```bash
  const http=require('http');
  const fs=require('fs');
  const server=http.createServer((req,res)=>{
      //解构
      const {url,method,headers}=req;
      if(url=='/'&&method=='GET'){
          fs.readFile('index.html',(err,data)=>{
              res.statusCode=200;
              res.setHeader('Content-Type','text/html');
              res.end(data);
          })
      }else if(url=='/users'&&method=='GET') {
          //模拟ajax请求
          res.writeHead(200,{'Content-Type':'application/json'});
          res.end(JSON.stringify([{name:'abc'}]));
      }else if(method==='GET' && headers.accept.indexOf('image/*')!==-1) {
          fs.createReadStream('.'+url).pipe(res);
      }else {
  
      }
  });
  
  server.listen(3000);
  //html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
  </head>
  <body>
      <h2>hello...</h2>
      <img src="img.png" alt="">
  </body>
  </html>
  ```

  > stream：文件流
  >
  > ```bash
  > const fs=require('fs');
  > const rs2=fs.createReadStream('./img.png');
  > const ws2=fs.createWriteStream('./img2.png');
  > rs2.pipe(ws2);
  > ```

- **event**


### 3. EventLoop

>  EventLoop是什么？
>
> 一个循环 每次循环叫tick 每次循环的代码叫task
>
> - V8引擎单线程无法同时干两件事
> - 文件读取、网络IO缓慢且具有不确定性
> - 要通过异步回调方式处理又称为异步IO
> - 先同步再异步 异步放入队列等同步完成后再执行 每次循环叫一个tick（process.nextTick()）
>
> 唯一，整个事件循环当中，仅存在一个；执行为同步，同一个事件循环中的micro task会按队列顺序，串行执行完毕。

##### 1. micro task（优先执行——微任务）

- **process.nextTick**
- **promise.then**

##### 2. marcro task（后续执行——宏任务）

- **setTimeout**
- **setInterval**
- **setImmediate**

> 细说setTimeout/setImmediate/process.nextTick的区别<https://blog.csdn.net/hkh_1012/article/details/53453138>

```bash
(new Promise(resolve=>{
    console.log('resolve');
    resolve();
})).then(()=>console.log('promise then') );

setImmediate(()=>{
    console.log('setImmediate');
});

setTimeout(()=>{
    console.log('setTimeout');
},0);

process.nextTick(()=>{
    console.log('nextTick');
});

//打印顺序
//resolve
// nextTick
// promise then
// setTimeout
// setImmediate
```

### 4. Node流程制度

> 如何让异步任务串行化

- **ES7 async await**
- **promise then** 
- **ES6 generater**
- **callback**

```bash
const log=name=>{
    console.log(`Log.....${name} ${new Date().getTime()}`);
}


setTimeout(()=>{
    log('callback');
    setTimeout(()=>{
        log('callback2');
    },1000)
},1000);

const promise=name=>new Promise(resolve => {
    setTimeout(()=>{
        resolve();
        log(name);
    },1000)
});
promise('promise')
.then(()=>promise('promise2'))
.then(()=>promise('promise3'));



const generator=function*(name){
    yield promise(name);
    yield promise(name);
};

const gen=generator('Generator');
gen.next().value.then(()=>{
    gen.next();
});

let co=function(gen,name){
    var it=gen(name);
    var ret=it.next();
    ret.value.then(function(res){
        it.next(res)
    })
};

co(generator,'CO');


setTimeout(async ()=>{
    await promise('Async/await');
    await promise('Async/await');
});

// Log.....callback 1560162255883
// Log.....promise 1560162255893
// Log.....Generator 1560162255895
// Log.....CO 1560162255896
// Log.....Async/await 1560162255897
// Log.....callback2 1560162256891
// Log.....promise2 1560162256899
// Log.....Generator 1560162256900
// Log.....CO 1560162256901
// Log.....Async/await 1560162256902
// Log.....promise3 1560162257903
```



### 5. express-router源码实现

```bash
//kpress.js
const http=require('http');
const url=require('url');
const {EventEmitter}=require('events');

let routers=[];

class Application {
    get(path,handler){
       if(typeof path==='string') {
           routers.push({
               path,
               method:'get',
               handler
           })
       } else {
           routers.push({
               path:'*',
               method:'get',
               handler:path
           })
       }
    }
    listen(){
        const server=http.createServer((req,res)=>{
            let {pathname}=url.parse(req.url,true);
            for(let router of routers) {
                const {path,method,handler}=router;
                if(pathname===path&&req.method.toLocaleLowerCase()==method) {
                    return handler(req,res);
                }
                if(path==='*') {
                    return handler(req,res);
                }
            }
            process.on('uncaughtException',e=>{
                console.log('Server Exception',e);
            })
        });
        server.listen(...arguments);
    }
}

module.exports=function createApplication(){
    return new Application();
}
//index.js
const express=require('./kpress');
const app=express();
app.get('/',(req,res)=>{
    Add();
    res.end('hello world');
});


app.get('/user',(req,res)=>{
    res.end(JSON.stringify([{name:'sofiya',age:18}]))
});

app.listen(3000,()=>{
    console.log('Example app listen at 3000');
})
```



### 6.时间异常处理

- **EventEmitter**
- **error**

## 二、Koa

**[koa github地址]**https://github.com/koajs/koa

### 1. Koa特点

- 概述：

  Koa是一个新的**web框架**，致力于成为**web应用**和**API开发**领域中的更小、更富有表现力、更健壮的基石。

  Koa是Express的下一代基于NodeJS的web框架。

  Koa1是基于ES6 generator来实现的。

  koa2完全使用Promise并配合async来实现异步。

- 特点：

  - 轻量无捆绑

  - 中间件架构——洋葱圈结构

    koa中间件机制：koa中间件机制就是函数组合的概念，将一组需要顺序执行的函数复合为一个函数，外层函数的参数实际就是内层函数的返回值。洋葱模型可以形象表示这种机制，是源码中的精髓和难点。

  ![koa](D:/7/Desktop/pic/koa.png)

  - 优雅的API设计
  - 增强的错误处理

  - 上下文环境

- 安装

  ```bash
  npm i koa -S
  ```

### 2. koa简单应用

1. ##### 静态服务

   ```bash
   //static静态中间件：app.js
   app.use(require('koa-static')(__dirname+'/'));
   ```

2. ##### router

   ```bash
   const router=require('koa-router')();
   router.get('/string',async (ctx,next)=>{
       ctx.body='string';
   });
   
   router.get('/json',(ctx,next)=>{
       ctx.body={
           name:'json'
       }
   });
   app.use(router.routes());
   ```

3. ##### 常用中间件

   - logger

### 3. 原理

##### 1. context上下文

- ES6 getter  setter
- Object.create：是ES6语法，对象继承

```bash
//context.js
module.exports={
    get url(){
        return this.request.url
    },
    get body(){
        return this.response.body;
    },
    set body(val){
        this.response.body=val;
    },
    get method(){
        return this.request.method;
    }
}
//response.js
module.exports={
    get body(){
        return this._body;
    },
    set body(val){
        this._body=val;
    }
}
//request.js
module.exports={
    get url(){
        return this.req.url
    },

    get method(){
        return this.req.method.toLocaleLowerCase();
    }
}
```



##### 2. 中间件机制

- 函数式编程compose

- 异步compose

  ```bash
  const add = (x, y) => x + y;
  const square = z => z * z;
  
  //同步组合实现
  // function compose(fn1,fn2) {
  //     return (...args)=>{
  //         return fn2(fn1(...args));
  //     }
  // }
  
  //上面等同于
  //const compose=(fn1,fn2)=>(...args)=>fn2(fn1(...args));
  
  //多个方法合并
  // const compose = (first, ...other) => (...args) => {
  //     let ret = first(...args);
  //     other.forEach(fn => {
  //         ret = fn(ret);
  //     });
  //     return ret;
  //
  // };
  // const fn = compose(add, square, square, square);
  // console.log(fn(1, 2));
  
  //异步组合实现
  function compose(middlewares){
     return function () {
         return dispatch(0);
         function dispatch(i) {
             let fn=middlewares[i];
             if(!fn){
                 return Promise.resolve();
             }
             return Promise.resolve(
                 fn(function next() {
                     return dispatch(i+1)
                 })
             )
         }
     }
  }
  
  
  async function fn1(next) {
      console.log('fn1');
      await next();
      console.log('end fn1');
  }
  
  async function fn2(next) {
      console.log('fn2');
      await delay();
      await next();
      console.log('end fn2');
  }
  
  
  async function fn3(next) {
      console.log('fn3');
  }
  
  function delay(){
      return Promise.resolve(resolve=>{
          setTimeout(()=>{
              console.log(999);
              resolve();
          },3000);
      })
  }
  
  const middlewares=[fn1,fn2,fn3];
  const finalFn=compose(middlewares);
  
  finalFn();
  ```

- JS中间对比学习
  - express
  - koa
  - redux
  - 示例：https://github.com/nanjixiong218/analys-middlewares/tree/master/src

**koa实现**

> kkb.js+app.js

```bash
//kkb.js
//http是内置模块，不需要安装
const http = require('http');
const context=require('./context');
const request =require('./request');
const response=require('./response');

class KKB {
    constructor(){
        this.middlewares=[];
    }
    listen(...args) {
        const server = http.createServer(async (req, res) => {
            //创建上下文环境
            const ctx=this.createContext(req,res);
            //中间件合成
            const fn=this.compose(this.middlewares);
            //执行中间件函数
            await fn(ctx)
            //this.callback(req, res)
            //this.callback(ctx);
            res.end(ctx.body);
        });
        server.listen(...args)
    }

    // use(callback) {
    //     this.callback = callback;
    // }
    use(middleware) {
        this.middlewares.push(middleware);
    }

    createContext(req,res){
        const ctx=Object.create(context);
        ctx.request=Object.create(request);
        ctx.response=Object.create(response);

        ctx.req=ctx.request.req=req;
        ctx.res=ctx.response.res=res;
        return ctx;
    }

    compose(middlewares){
        return function (ctx) {
            return dispatch(0);
            function dispatch(i) {
                let fn=middlewares[i];
                if(!fn){
                    return Promise.resolve();
                }
                return Promise.resolve(
                    fn(ctx,function next() {
                        return dispatch(i+1)
                    })
                )
            }
        }
    }
}

module.exports = KKB;
```

```bash
//app.js
const KKB=require('./kkb');

const app=new KKB();

// app.use((req,res)=>{
//     res.writeHead(200);
//     res.end('hi  kaikeba')
// });

// app.use(ctx=>{
//     ctx.body='hhh...';
// });

// app.use(async (ctx,next)=>{
//     ctx.body='1';
//
//     await next();
//
//     ctx.body+='2';
// });
//
// app.use(async (ctx,next)=>{
//     ctx.body+='3';
//
//     await next();
//
//     ctx.body+='4';
// });
//
// app.use(async (ctx,next)=>{
//     ctx.body+='5';
// });
//13542

//static静态中间件
// const static=require('./static');
// app.use(static(__dirname+'/public'));

//router中间件
const Router=require('./router');
const router=new Router();
router.get('/index',async ctx=>{ctx.body='index page'});
router.get('/list',async ctx=>{ctx.body='list page'});
router.post('/about',async ctx=>{ctx.body=[{name:'sofiya'}]});

app.use(router.routes())
app.listen(3000)
```

##### 3. 重要中间件原理

- static

  ```bash
  // static.js
  const fs = require("fs");
  const path = require("path");
  
  module.exports = (dirPath = "./public") => {
      return async (ctx, next) => {
          if (ctx.url.indexOf("/public") === 0) {
              // public开头 读取文件
              const url = path.resolve(__dirname, dirPath);
              const fileBaseName = path.basename(url);
              const filepath = url + ctx.url.replace("/public", "");
              console.log(filepath);
              // console.log(ctx.url,url, filepath, fileBaseName)
              try {
                  stats = fs.statSync(filepath);
                  if (stats.isDirectory()) {
                      const dir = fs.readdirSync(filepath);
                      // const
                      const ret = ['<div style="padding-left:20px">'];
                      dir.forEach(filename => {
                          console.log(filename);
                          // 简单认为不带小数点的格式，就是文件夹，实际应该用statSync
                          if (filename.indexOf(".") > -1) {
                              ret.push(
                                  `<p><a style="color:black" href="${
                                      ctx.url
                                      }/${filename}">${filename}</a></p>`
                              );
                          } else {
                              // 文件
                              ret.push(
                                  `<p><a href="${ctx.url}/${filename}">${filename}</a></p>`
                              );
                          }
                      });
                      ret.push("</div>");
                      ctx.body = ret.join("");
                  } else {
                      console.log("文件");
  
                      const content = fs.readFileSync(filepath);
                      ctx.body = content;
                  }
              } catch (e) {
                  // 报错了 文件不存在
                  ctx.body = "404, not found";
              }
          } else {
              // 否则不是静态资源，直接去下一个中间件
              await next();
          }
      };
  };
  ```

- router

  ```bash
  class Router {
      constructor() {
          this.stack = [];
      }
  
      register(path, methods, middleware) {
          let route = {path, methods, middleware}
          this.stack.push(route);
      }
      // 现在只支持get和post，其他的同理
      get(path,middleware){
          this.register(path, 'get', middleware);
      }
      post(path,middleware){
          this.register(path, 'post', middleware);
      }
      routes() {
          let stock = this.stack;
          return async function(ctx, next) {
              let currentPath = ctx.url;
              let route;
  
              for (let i = 0; i < stock.length; i++) {
                  let item = stock[i];
                  if (currentPath === item.path && item.methods.indexOf(ctx.method) >= 0) {
                      // 判断path和method
                      route = item.middleware;
                      break;
                  }
              }
  
              if (typeof route === 'function') {
                  route(ctx, next);
                  return;
              }
  
              await next();
          };
      }
  }
  module.exports = Router;
  ```

## 三、网络编程

##### 1.socket——传输层

- **原理简介**

  Net模块提供一个异步API能够创建基于流的TCP服务器，客户端与服务器建立连接后，服务器可以获得一个全双工Socket对象，服务器可以保存Socket对象列表，在接收某客户端消息时，推送给其他客户端。

  ```bash
  telnet localhost 9099
  ```

  

- **TCP**

  - 建立：三次握手
    - 第一次握手：建立连接时，客户端发送syn包（syn=j）到服务器，并进去SYN_SENT状态，等待服务器确认；SYN：同步序列编号（Synchronize Sequence Number）
    - 第二次握手：服务器收到syn包，必须确认客户的SYN（ack=j+1），同时自己也发送一个SYN包（syn=k），即SYN+ACK包，此时服务器进入SYN_RECV状态；
    - 第三次握手：客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK（ack=k+1），此包发送完毕，客户端和服务器进入ESTABLISHED（TCP连接成功）状态，完成三次握手
  - 断开：四次挥手

- **UDP**

  无连接的传输层协议——快

- **针对TCP/IP协议的传输层**

##### 2.http——应用层

- **http协议**

  ```bash
  //查看清晰的报文
  curl -v http://www.baidu.com
  ```

  [http协议思维导图](<https://www.processon.com/view/link/5cbfb934e4b09a3e45a8c60e#map>)

- **跨域——协议、端口、host**

  - CORS原理

    跨域：浏览器同源策略引起的接口调用问题

    设置报头：解决跨域的问题

    ```bash
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
    ```

    

    响应preflight请求，需要响应浏览器发出的options请求（预检请求），并genuine情况设置响应头。[预检](https://www.jianshu.com/p/b55086cbd9af)

    ```bash
    //请求的时候，加上参数，则接口没有做应答
    const res = await axios.get("/api/users",{headers:{'X-Token':'jilei'}});
    //处理预检问题
    else if(method==='OPTIONS'&&url==='/api/users') {
       res.writeHead(200, {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Headers": "X-Token,Content-Type",
        "Access-Control-Allow-Methods": "PUT"
       });
       res.end();
    }
    ```

    如果需要携带cookie信息，则请求需要变为credential请求：

    设置session：

    ```bash
    //请求接口处也需要设置允许写入session
    axios.defaults.withCredentials = true
    
    //预检options中和/users接口中均需要添加
    else if(method==='GET'&&url==='/api/users') {
        //设置session
        console.log(req.headers.cookie);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Set-Cookie','cookie1=aaa');
        res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
        res.setHeader('Content-Type','application/json');
        res.end(JSON.stringify([{name:'sofiya',age:18}]))
    }else if(method==='OPTIONS'&&url==='/api/users') {
        //允许鉴权
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.writeHead(200, {
           "Access-Control-Allow-Origin": "http://localhost:3000",
           "Access-Control-Allow-Headers": "X-Token,Content-Type",
           "Access-Control-Allow-Methods": "PUT"
        });
        res.end();
    }
    ```

  - proxy代理模式

    ```bash
    var express=require('express');
    const proxy=require('http-proxy-middleware');
    
    const app=express();
    app.use(express.static(__dirname+'/'));
    app.use('/api',proxy({target:'http://localhost:4000',changeOrigin:false}));
    
    module.exports=app;
    ```

    

  - jsonp——js

- **Nginx与webpack**

  - 重新加载配置|重启|停止|退出：

  ```bash
  nginx -s reload|reopen|stop|quit
  ```

  - 配置nginx开机自启：

  ```bash
  ln -sfv /usr/local/opt/nginx/*.plist ~/Library/LaunchAgents
  launchctl load ~/Library/LaunchAgents/homebrew.mxcl.nginx.plist
  ```

  

- 代理服务器与转发+跨域**

- **http爬虫**

  原理：服务端模拟客户端发送请求到目标服务器获取页面内容并解析，获取其中关注部分的数据。

  ```bash
  const originRequest=require('request');
  const cheerio=require('cheerio');
  const iconv=require('iconv-lite');
  
  function request(url, callback) {
      const options = {
          url: url,
          encoding: null
      };
      originRequest(url, options, callback);
  }
  
  for(let i = 100553; i < 100563; i++) {
      const url=`https://www.dy2018.com/i/${i}.html`;
      request(url, function (err, res, body) {
          const html = iconv.decode(body, "gb2312");
          const $ = cheerio.load(html);
          console.log($(".title_all h1").text());
      });
  }
  ```

  

- **埋点**
  
  - img.href

    ```bash
    const img = new Image()
    img.src='/api/users?abc=123'
    ```
  
- **bodyparser**

  - 未使用bodyparser时

  ```bash
  //未使用bodyparser时，form表单提交的数据结构
  <form action="/api/save" method="post">
      <input type="text" name="abc" value="123">
      <input type="text" name="def" value="123">
      <input type="submit" value="save">
  </form>
  else if(method==='POST'&&url==='/api/save') {
          let reqData=[];
          let size=0;
          req.on('data',data=>{
              console.log('>>>req on',data);
              reqData.push(data);
              size+=data.length;
          });
          req.on('end',function(){
              console.log('end');
              const data=Buffer.concat(reqData,size);
              console.log('data:', size, data.toString());
              res.end(`formdata:${data.toString()}`)
          })
  }//data: 15 abc=123&def=123
  ```

  - 使用bodyparser后

  ```bash
  //index.html
  <form action="/add" method="post">
      <input type="text" name="abc" value="123">
      <input type="submit" value="Add">
  </form>
  //index.js
  const Koa=require('koa');
  const app=new Koa();
  const bodyparser=require('koa-bodyparser');
  app.use(require('koa-static')(__dirname+'/'));
  app.use(bodyparser());
  const router=require('koa-router')();
  router.post('/add',async (ctx,next)=>{
      console.log('body', ctx.request.body);
      ctx.body=ctx.request.body
  });
  app.use(router.routes());
  app.listen(3000);
  ```

  

- **上传原理——onprogress实现**

  ```bash
  //index.html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Title</title>
      <script>
          window.onload = function () {
              var files = document.getElementsByTagName('input'),
                  len = files.length,
                  file;
              for (var i = 0; i < len; i++) {
                  file = files[i];
                  if (file.type !== 'file') continue; // 不是文件类型的控件跳过
                  file.onchange = function () {
                      var _files = this.files;
                      console.log(_files);
                      if (!_files.length) return;
                      if (_files.length === 1) { // 选择单个文件
                          var xhr = new XMLHttpRequest();
                          xhr.open('POST', 'http://localhost:3000/upload');
                          var filePath = files[0].value;
                          xhr.setRequestHeader('file-name', filePath.substring(filePath.lastIndexOf('\\') + 1));
                          xhr.send(_files[0]);
                      } else {
                      }
                  };
              }
          };
      </script>
  </head>
  <body>
  <input type="file" id="file1">
  </body>
  </html>
  //index.js
  const http=require('http');
  const fs=require('fs');
  const path=require('path');
  const chunk=[];
  let size =0;
  const server=http.createServer((req,res)=>{
      const {pathname}=require('url').parse(req.url);
      console.log(pathname);
      if(pathname==='/upload') {
          const filename=req.headers['file-name']?req.headers['file-name']:'abc.png';
          const outputFile=path.resolve(__dirname,filename);//文件輸出地址
          const fis=fs.createWriteStream(outputFile);
  
          //Buffer concat
          req.on('data',data=>{
              chunk.push(data);
              size+=data.length;
              console.log('data:',data ,size)
          });
          req.on('end',()=>{
              console.log('end...')
              const buffer=Buffer.concat(chunk,size);
              size=0;
              fs.writeFileSync(outputFile,buffer);
              res.end();
          });
          //流事件寫入
          req.on('data',data=>{
              console.log('data:',data)
              fis.write(data);
          });
          req.on('end',()=>{
              fis.end();
              res.end();
          })
  
          req.pipe(fis);
          res.end();
      }else {
          const filename = pathname === '/' ? 'index.html' : pathname.substring(1)
          var type = (function (_type) {
              switch (_type) { // 扩展名
                  case 'html':
                  case 'htm': return 'text/html charset=UTF-8'
                  case 'js': return 'application/javascript charset=UTF-8'
                  case 'css': return 'text/css charset=UTF-8'
                  case 'txt': return 'text/plain charset=UTF-8'
                  case 'manifest': return 'text/cache-manifest charset=UTF-8'
                  default: return 'application/octet-stream'
              }
          }(filename.substring(filename.lastIndexOf('.') + 1)))
          // 异步读取文件,并将内容作为单独的数据块传回给回调函数
          // 对于确实很大的文件,使用API fs.createReadStream()更好
          fs.readFile(filename, function (err, content) {
              if (err) { // 如果由于某些原因无法读取文件
                  req.writeHead(404, { 'Content-type': 'text/plain charset=UTF-8' })
                  res.write(err.message)
              } else { // 否则读取文件成功
                  res.writeHead(200, { 'Content-type': type })
                  res.write(content) // 把文件内容作为响应主体
              }
              res.end()
          })
      }
  });
  server.listen(3000);
  ```

  

- **下载——下载包头解决打开方式**

##### 3.websocket

- **实时通讯IM**

- **socket.io**

  > 特点
  >
  > - 源于HTML5标准
  > - 支持优雅降级
  >   - Websocket
  >   - Websocket over Flash
  >   - XHR Polling
  >   - XHR Multipart Streaming
  >   - Forever Iframe
  >   - JSONP Polling

  - http实现IM

    ```bash
    //index.html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>http chat</title>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    </head>
    <body>
        <div id="app">
            <input type="text" v-model="message">
            <button @click="send">发送</button>
            <button @click="clear">清空</button>
            <div v-for="item in list">{{item}}</div>
        </div>
        <script>
            const host='http://localhost:3000';
            var app=new Vue({
                el:'#app',
                data:{
                    list:[],
                    message:'Hello vue!'
                },
                methods:{
                    send:async function(){
                        let res=await axios.post(host+'/send',{
                            message:this.message
                        });
                        this.list=res.data;
                    },
                    clear:async function() {
                        let res=await axios.post(host+'/clear');
                        this.list=res.data;
                    }
                },
                mounted:function(){
                    setInterval(async ()=>{
                        const res=await axios.get(host+'/list');
                        this.list=res.data;
                    },1000)
                }
            })
        </script>
    </body>
    </html>
    //index.js
    const express=require('express');
    const app=express();
    const bodyParser=require('body-parser');
    const path=require('path');
    
    app.use(bodyParser.json());
    const list=['ccc','ddd'];
    
    app.get('/',(req,res)=>{
        res.sendFile(path.resolve('./index.html'));
    });
    
    app.get('/list',(req,res)=>{
        res.end(JSON.stringify(list));
    });
    
    app.post('/send',(req,res)=>{
        list.push(req.body.message);
        res.end(JSON.stringify(list));
    });
    
    app.post('/clear',(req,res)=>{
        list.length=0;
        res.end(JSON.stringify(list));
    });
    
    app.listen(3000);
    ```

    

  - socketio实现IM

    ```bash
    //index.html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Socket.IO chat</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js"></script>
        <script src="http://libs.baidu.com/jquery/2.1.1/jquery.min.js"></script>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font: 13px Helvetica, Arial;
            }
            form {
                background: #000;
                padding: 3px;
                position: fixed;
                bottom: 0;
                width: 100%;
            }
            form input {
                border: 0;
                padding: 10px;
                width: 90%;
                margin-right: 0.5%;
            }
            form button {
                width: 9%;
                background: rgb(130, 224, 255);
                border: none;
                padding: 10px;
            }
            #messages {
                list-style-type: none;
                margin: 0;
                padding: 0;
            }
            #messages li {
                padding: 5px 10px;
            }
            #messages li:nth-child(odd) {
                background: #eee;
            }
        </style>
    </head>
    <body>
        <ul id="messages"></ul>
        <form action="">
            <input type="text" autocomplete="off" id="m"><button>Send</button>
        </form>
        <script>
            $(function() {
                var socket=io();
                $('form').submit(function(e) {
                    e.preventDefault();//避免表单提交行为
                    socket.emit('chat message',$('#m').val());
                    $('#m').val('');
                    return false;
                });
    
                socket.on('chat message',function(msg){
                 $('#messages').append($('<li>').text(msg));
                })
            })
        </script>
    </body>
    </html>
    //index.js
    var app=require('express')();
    var http=require('http').Server(app);
    var io=require('socket.io')(http);
    
    app.get('/',function(req,res) {
        res.sendFile(__dirname+'/index.html');
    });
    
    io.on('connection',function(socket) {
        //响应某用户发送消息
        socket.on('chat message',function(msg) {
            //广播给所有人
            io.emit('chat message',msg)
        });
        socket.on('disconnect',function(){
            console.log('user disconnected');
        })
    });
    http.listen(3000,function() {
        console.log('listening on *:3000');
    });
    ```

    

##### 4.http2

- **多路复用**
  - 官方演示-https://http2.akamai.com/demo
  - 多路复用允许同时通过单一的HTTP/2连接发起多重的请求-响应消息。而HTTP/1.1协议中，浏览器客户端在同一时间，针对同一域名下的请求有一定数量的限制。超过限制数目的请求会被阻塞。
- **首部压缩**
  - http1.x的header由于cookie和user agent很容易膨胀，而且每次都要重复发送。http/2使用encode来减少需要传输的header大小，通讯双方各自cache一份header fields表，即避免了重复header的传输，又减小了需要传输的大小。高效的压缩算法可以很大的压缩header，减少发送包的数量从而降低延迟。
- **服务器推送**
  - 在HTTP/2中，服务器可以对客户端分一个请求发送多个响应。举个例子，如果一个请求的index.html，服务器很可能会同时响应index.html、logo.jpg以及css和js文件，因为它知道客户端会用到这些东西。这相当于在一个HTML文档内集合了所有资源。

##### 5.简单部署策略 前后端分离

- **nginx+node**

## 四、持久化

### 1. fs

```bash
const fs = require("fs");

function get(key) {
    fs.readFile("./db.json", (err, data) => {
        const json = JSON.parse(data);
        console.log(json[key]);
    });
}
function set(key, value) {
    fs.readFile("./db.json", (err, data) => {
        // 可能是空文件，则设置为空对象
        const json = data ? JSON.parse(data) : {};
        json[key] = value; // 设置值
        // 重新写入文件
        fs.writeFile("./db.json", JSON.stringify(json), err => {
            if (err) {
                console.log(err);
            }
            console.log("写入成功！");
        });
    });
}

// 命令行接口部分
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on("line", function(input) {
    const [op, key, value] = input.split(" ");

    if (op === 'get') {
        get(key)
    } else if (op === 'set') {
        set(key, value)
    } else if(op === 'quit'){
        rl.close();
    }else {
        console.log('没有该操作');
    }
});

rl.on("close", function() {
    console.log("程序结束");
    process.exit(0);
});
```



### 2. mysql

- **native**

  - 安装mysql：https://www.mysql.com/

  ```bash
  cnpm i mysql2 -S
  ```

  

  ```bash
  (async () => {
      const mysql = require('mysql2/promise')
  
      // 连接配置
      const cfg = {
          host: "localhost",
          user: "root",
          password: "QXFY105729", // 修改为你的密码
          database: "kaikeba" // 请确保数据库存在（需要在mysql中创建kaikeba数据库）
      };
  
      const connection = await mysql.createConnection(cfg)
  	//建表
      let ret = await connection.execute(`
          CREATE TABLE IF NOT EXISTS test (
              id INT NOT NULL AUTO_INCREMENT,
              message VARCHAR(45) NULL,
          PRIMARY KEY (id))
      `);
      console.log('create', ret);
  	//插入一条数据
      ret = await connection.execute(`
              INSERT INTO test(message)
              VALUES(?)
      `, ['ABC']);
      console.log('insert:', ret);
  
  	//查询创建的数据
      ret = await connection.execute(`
              SELECT * FROM test
      `);
      console.log(JSON.stringify(ret[0]));
      // console.log(ret[1])
  
      connection.end();
  
  })();
  ```

  

- **squelize——中间件**:http://docs.sequelizejs.com/

  - 概述

    基于Promise的ORM（Object Relation Mapping），支持多种数据库、事务、关联等。

    思维导图：https://www.processon.com/view/link/5cc0718ae4b01941c8bab3f8

  - 安装
  
    ```bash
  npm i sequelize mysql2 -S
    ```

  - 基本使用
  
    - UUID处理id自增的问题
  
      ```bash
    id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.DataTypes.UUIDV1,
          primaryKey: true
      }
      ```
    
      
    
    - 指定表名{underscored: true}
    
      > 指定表名:设置前者则以modelName作为表名；设置后者则按其值作为表名
      > 蛇形命名：underscored:true
      > 默认驼峰命名
    
    - 解决：建表的时候，自动生成时间戳字段{timestamps: false}
    
      ```bash
      const Fruit = sequelize.define('TblFruit', {
              //因为id是自增的，数据容易被盗，所以使用UUID处理id
              id: {
                  type: Sequelize.DataTypes.UUID,
                  defaultValue: Sequelize.DataTypes.UUIDV1,
                  primaryKey: true
              },
              name: {type: Sequelize.STRING(20), allowNull: false},
              price: {type: Sequelize.FLOAT, allowNull: false},
              stock: {type: Sequelize.INTEGER, defaultValue: 0},
      }, {timestamps: false, underscored: true});
      ```
    
    - 综合代码
    
    ```bash
    (async () => {
        const Sequelize = require('sequelize');
        //建立连接（数据库、用户名、密码，连接用的配置）
        const sequelize = new Sequelize('kaikeba', 'root', 'QXFY105729', {
            host: 'localhost',
            dialect: 'mysql',//中间件支持很多数据库，所以标明你连接的是哪个
            operatorsAliasez: false//操作符别名
        });
    
        //定义模型
        const Fruit = sequelize.define('TblFruit', {
            //因为id是自增的，数据容易被盗，所以使用UUID处理id
            id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV1,
                primaryKey: true
            },
            name: {type: Sequelize.STRING(20), allowNull: false},
            price: {type: Sequelize.FLOAT, allowNull: false},
            stock: {type: Sequelize.INTEGER, defaultValue: 0},
        }, {timestamps: false, underscored: true});
        //timestamps:false避免自动是呢过程时间戳字段
        //指定表名:设置前者则以modelName作为表名；设置后者则按其值作为表名
        //蛇形命名：underscored:true
        //默认驼峰命名
    
        //同步数据库
        let ret = await Fruit.sync({force: true});//{force:true}强制同步，创建表之前先删除已存在的表
        console.log('sync', ret);
    
        //添加数据
        ret = await Fruit.create({
            name: '香蕉',
            price: 3.5
        });
        ret = await Fruit.create({
            name: '苹果',
            price: 8.5
        });
        console.log('create', ret);
    
        //修改数据
        await Fruit.update(
            {price: 4},
            {where: {name: '香蕉'}}
        );
    
        //查询
        const Op = Sequelize.Op;
        ret = await Fruit.findAll({
            where: {price: {[Op.lt]: 5, [Op.gt]: 2}}
        });
    
        console.log('findAll', JSON.stringify(ret, '', '\t'));
    
    
    })();
    ```
    
    - shop案例

- **并发**

  ```bash
  const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));
  
  const asyncFun = async (fun, curMax = 4, sum = 200) => {
      let num = 0;
      let curNum = 0;
      console.log('beginTime:' + new Date().toLocaleString());
      const result = [];
      console.log(curNum);
      while (num !== sum) {
  
          if (curNum <= curMax) {
              result.push(new Promise(async resolve => {
                  console.log(`Process Run 并发数:${curNum} 完成:${num}/${sum} `);
                  res = await fun();
                  curNum--;
                  console.log(curNum+'并发数1');
                  resolve(res)
              }));
              num++;
              curNum++;
              console.log(curNum+'并发数2');
          } else {
              console.log(curNum+'并发数3');
              await sleep(10)
          }
      }
      console.log('endTime:' + new Date().toLocaleString())
  };
  module.exports = {asyncFun};
  
  // 测试
  const test = async () => {
      const delay = (Math.random() * 1000).toFixed();
      await sleep(delay)
  };
  setTimeout(() => asyncFun(test, 4, 10));
  ```

  

- **连接池**

  数据库连接池负责分配、管理和释放数据库连接，它允许应用程序重复使用一个现有的数据库连接，而不是重新建立一个；释放空闲时间超过最大空闲时间的数据库连接来避免因为没有释放数据库连接而引起的数据库连接遗漏。这项技术能明显提高数据库操作的性能。async.mapLimit库

  - mysql原生连接池

  ```bash
  // mysql2.js
  (async () => {
      // get the client
      const mysql = require('mysql2/promise');
      // 连接配置
      const cfg = {
          host: "localhost",
          user: "root",
          password: "QXFY05729", // 修改为你的密码
          database: "shop", // 请确保数据库存在
          connectionLimit: 5,//不设置的情况下，默认是10
      };
  
      // 设置连接池
      const pool = await mysql.createPool(cfg);
  
      // 非连接池
      // const query = async () => {
      //     const connection = await mysql.createConnection(cfg);
      //     const [rows, fields] = await connection.execute(`SELECT * FROM users`);
      //     console.log('select:', rows);
      //     connection.destroy();//需要将连接清除掉，不然会越来越多的
      // };
  
      // 连接池
      const query = async () => {
          const connection = await pool.getConnection()
          const [rows, fields] = await connection.execute(`SELECT * FROM users`)
          console.log('select:', rows)
          connection.release()
      }
  
      const {asyncFun} = require('./async');
      await asyncFun(query, 4, 10);
  
  })();
  ```

  - sequelize使用连接池

  ```bash
  (async () => {
      const Sequelize = require("sequelize");
  
      // 建立连接
      const sequelize = new Sequelize("kaikeba", "root", "QXFY105729", {
          host: "localhost",
          dialect: "mysql",
          // operatorsAliases: false,
          pool: {
              max: 10,
              min: 0,
              idle: 30000
          }
      });
  
      // 定义模型
      const Fruit = sequelize.define("Fruit", {
          name: {type: Sequelize.STRING(20), allowNull: false},
          price: {type: Sequelize.FLOAT, allowNull: false},
          stock: {type: Sequelize.INTEGER, defaultValue: 0}
      });
  
      // 同步数据库，force: true则会删除已存在表
      let ret = await Fruit.sync({force: true});
      console.log('sync', ret);
      ret = await Fruit.create({
          name: "香蕉",
          price: 3.5
      });
      // console.log('create', ret)
  
      const find = async () => {
          Fruit.findAll()
          // console.log('findAll', JSON.stringify(ret, '', '\t'))
      };
  
      // await find()
      const {asyncFun} = require('./async');
      asyncFun(find, 20, 100)
  
  })();
  ```

  

### 3. MongoDB

- **native**

  - 安装

    ```bash
    npm i mongodb -S
    ```

  - 连接mongodb

    ```bash
    const log = (text, json) => {
        console.log(text, JSON.stringify(json, '', '\t'))
    };
    setTimeout(async () => {
    
        const {MongoClient: MongoDB} = require('mongodb');
        const client = new MongoDB(
            'mongodb://localhost:27017',
            {
                useNewUrlParser: true
            }
        );
        let ret;
        // 创建连接
        ret = await client.connect();
        const db = client.db('test');
    
        const fruits = db.collection('fruits');
        ret = await fruits.insertOne({
            name: '芒果',
            price: 20.1
        });
        log('插入成功', ret);
    
        // 查询文档
        ret = await fruits.findOne();
        console.log('find:', ret);
    
        // 更新文档
        ret = await fruits.updateOne({name: '芒果'}, {
            $set: {name: '苹果'}
        });
        console.log('update', ret.result);
    
        ret = await fruits.deleteOne({name: '苹果'});
    
        await fruits.deleteMany();
    
        const stations = db.collection("stations");
        // 添加测试数据，执行一次即可
        await stations.insertMany([
            {name: "天安门东", loc: [116.407851, 39.91408]},
            {name: "天安门西", loc: [116.398056, 39.913723]},
            {name: "王府井", loc: [116.417809, 39.91435]}
        ]);
        await stations.createIndex({loc: "2dsphere"});
        r = await stations.find({
            loc: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [116.403847, 39.915526]
                    },
                    $maxDistance: 1000
                }
            }
        }).toArray();
        console.log("天安门附近地铁站", r);
    
    
        client.close()
    
    
    });
    ```

  - 案例：瓜果超市

    - 提取数据库配置：models/conf.js

    ```bash
    module.exports={
        url:'mongodb://localhost:27017',
        dbName:'test'
    };
    ```

    - 封装数据库连接：models/db.js

    ```bash
    const conf=require('./conf');
    
    const {EventEmitter}=require('events');
    
    //客户端
    const {MongoClient}=require('mongodb')
    
    class Mongodb{
        constructor(conf){
            this.conf=conf;
            this.emitter=new EventEmitter();
            this.client=new MongoClient(conf.url,{
                useNewUrlParser: true
            });
            this.client.connect(err=>{
                if(err) throw err;
                console.log('连接成功');
                this.emitter.emit('connect');
            });
        }
        col(colName,dbName=conf.dbName){
            return this.client.db(dbName).collection(colName);
        }
        once(event,cb){
            this.emitter.once(event,cb)
        }
    }
    
    module.exports=new Mongodb(conf);
    ```

    - 添加数据测试:initData.js

    ```bash
    const mongodb = require('./models/db');
    
    mongodb.once('connect', async () => {
        const col = mongodb.col('fruits');
        //删除已存在
        await col.deleteMany();
        const data = new Array(100).fill().map((v, i) => {
            return {
                name: 'xxx' + i,
                price: i,
                category: Math.random() > 0.5 ? '蔬菜' : '水果'
            }
        });
    
        //插入
        await col.insertMany(data);
        console.log('插入测试数据成功');
    });
    ```

    - 前端页面展示数据：index.html

    ```bash
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <script src="https://unpkg.com/element-ui/lib/index.js"></script>
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css" />
        <title>瓜果超市</title>
    </head>
    
    <body>
    <div id="app">
        <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select"  @change="changeHandler">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-radio-group v-model="category" @change="getData">
            <el-radio-button v-for="v in categorys" :label="v" :key="v">{{v}}</el-radio-button>
        </el-radio-group>
        <el-table :data="fruits" style="width: 100%">
            <el-table-column prop="name" label="名称" width="180">
            </el-table-column>
            <el-table-column prop="price" label="价格" width="180">
            </el-table-column>
            <el-table-column prop="category" label="种类">
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" @current-change="currentChange" :total="total">
        </el-pagination>
    </div>
    <script>
        var app = new Vue({
            el: "#app",
            data: {
                page: 1,
                total: 0,
                fruits: [],
                categorys: [],
                category: [],
                keyword:''
            },
            created() {
                this.getData();
    
                this.getCategory()
            },
            methods: {
                //切换分页
                async currentChange(page) {
                    this.page = page;
                    await this.getData()
                },
                //切换分类
                async changeHandler(val){
                    console.log('search...',val);
                    this.keyword = val;
                    await this.getData()
                },
                //获取列表数据
                async getData() {
                    const res = await axios.get(`/api/list?page=${this.page}&category=${this.category}&keyword=${this.keyword}`);
                    const data = res.data.data;
                    this.fruits = data.fruits;
                    this.total = data.pagination.total
                },
                //获取分类
                async getCategory() {
                    const res = await axios.get(`/api/category`);
                    this.categorys = res.data.data;
                    console.log('category', this.categorys)
                }
            }
        });
    </script>
    </body>
    
    </html>
    ```
    
    - 前端页面的接口编写index.js
    
    ```bash
    const express = require('express');
    const app = express();
    const path = require('path');
    const mongo = require('./models/db');
    
    app.get('/', (req, res) => {
        res.sendFile(path.resolve('./index.html'));
    });
    
    app.get('/api/list', async (req, res) => {
        //分页查询
        const {page, category, keyword} = req.query; //从query中解构出请求的页面
    
        //构造条件
        const condition = {};
        if (category) {
            condition.category=category;
        }
    
        if(keyword) {
            condition.name={$regex:new RegExp(keyword)}
        }
    
        console.log(condition);
        try {
            const col = mongo.col('fruits');
            const total = await col.find(condition).count();
            const fruits = await col
                .find(condition)
                .skip((page - 1) * 5)//表示一页展示5个
                .limit(5)
                .toArray();
            res.json({code: 1, data: {fruits, pagination: {total, page}}})
    
        } catch (err) {
            throw err;
        }
    });
    
    app.get('/api/category', async (req, res) => {
        const col = mongo.col('fruits');
        const data = await col.distinct('category');
        res.json({code: 1, data});
    });
    
    app.listen(3000);
    ```
    
    

- **ODM-mongoose**

  - 概述：优雅的NOdeJS对象文档模型object document model。

    Mongoose有两个特点：

    - 通过关系型数据库的思想来设计非关系型数据库

    - 基于mongodb驱动，简化操作

      ![mongoose](D:/7/Desktop/pic/mongoose.png)

  - 安装：npm i mongoose -S

  - 基本使用

    ```bash
    //mongoose.js
    const mongoose = require('mongoose');
    
    //1.连接
    mongoose.connect('mongodb://localhost:27017/test', {userNewUrlParser: true});
    
    const conn = mongoose.connection;
    conn.on('error', () => console.log('连接数据库失败'));
    
    conn.once('open', async () => {
        //2.定义一个Schema-Table
        const Schema = mongoose.Schema({
            category: String,
            name: String
        });
    
        //3.编译一个Model，它对应数据库中复数、小写的Collection
        const Model = mongoose.model('fruit', Schema);
        try {
            //4.创建create返回Promise
            let r = await Model.create({
                category: '温带水果',
                name: '苹果',
                price: 5
            });
    
            console.log('插入数据：', r);
    
            //5.查询：find返回Query，它实现了then和catch，可以当Promise使用，如果需要返回Promise，调用其exec()
            r = await Model.find({name: '苹果'});
            console.log('查询结果：', r);
    
            //6.更新updateOne返回Query
            r = await Model.updateOne({name: '苹果'}, {$set: {name: '啊蒙古'}});
            console.log('更新结果：', r);
    
            //7.删除deleteOne返回Query
            r = await Model.deleteOne({name: '苹果'});
            console.log('删除结果：', r);
        } catch (err) {
            console.log(err);
        }
    });
    ```

    

  - Schema模型

    ```bash
    const blogSchame=mongoose.Schema({
        title:{type:String,required:[true,'标题为必填项']},//定义校验规则
        author:String,
        body:String,
        comments:[{body:String,date:Date}],//定义对象数组
        date:{type:Date,default:Date.now},//指定默认值
        hidden:Boolean,
        meta:{
            //定义对象
            votes:Number,
            favs:Number
        }
    });
    //获取模型实例
    const BlogModel=mongoose.model('blog',blogSchame);
    const blog=new BlogModel({
        title:'nodejs持久化',
        author:'sofiya',
        body:'...'
    });
    r=await blog.save();
    console.log('新增blog：', r);
    ```

  - 实例方法

    ```bash
    blogSchame.methods.findByAuthor=function(author) {
    	return this.model('blog').find({author}).exec();
    };
    //调用实例方法
    r=await blog.findByAuthor('sofiya');
    console.log('实例方法findByAuthor：', r);
    ```

  - 静态方法

    ```bash
    blogSchame.statics.findByAuthor=function(author) {
        return this.model('blog')
                .find({author})
                .exec();
    };
    //调用静态方法
    r=await BlogModel.findByAuthor('sofiya');
    console.log('静态方法findByAuthor：', r);
    ```

  - 虚拟属性

    ```bash
    blogSchame.virtual('commentsCount').get(function(){
    	return this.comments.length;
    });
    //调用虚拟属性
    r=await BlogModel.findOne({author:'sofiya'});
    console.log('blog留言数：', r.commentsCount);
    ```

- **keystoneJS——快速开发平台**

  https://keystonejs.com/

  

## 五、鉴权

### 1. cookie-session模式

- **cookie原理解析**

  ```bash
  // cookie.js
  const http = require("http")
  http.createServer((req, res) => {
    if(req.url === '/favicon.ico'){
      res.end('')
      return
  	}
  // 观察cookie存在
  console.log('cookie:', req.headers.cookie) // 设置cookie
  res.setHeader('Set-Cookie', 'cookie1=abc;') 
  res.end('hello cookie!!')
  
  }).listen(3000)
  ```

  > Header Set-Cookie负责设置cookie
  > 请求传递Cookie

- **session原理解析**

  ```bash
  //cookie.js
  const http=require('http');
  const session={};
  http.createServer((req,res)=>{
      if(req.url==='/favicon.ico'){
          res.end(' ');
          return;
      }
      //观察cookie
      console.log('cookie:', req.headers.cookie);
  
      const sessionKey='sid';
      const cookie=req.headers.cookie;
      if(cookie && cookie.indexOf(sessionKey)>-1){
          res.end('come back');
          const pattern=new RegExp(`${sessionKey}=([^;]+);?\S*`);
          //\S表示可见字符
          //^只有在[]内才表示非 在外边表示开始
          //"*"  重复零次或更多 x>=0
          //"+"  重复一次或更多次 x>=1
          //"?"  重复零次或一次  x=(0||1)
          const sid=pattern.exec(cookie)[1];
          console.log('session:', sid, session, session[sid]);
      }else {
          //设置
          const sid=(Math.random()*999999999).toFixed();
          res.setHeader('Set-Cookie',`${sessionKey}=${sid};`);
          session[sid]={name:'laowang'};
          res.end('Hello');
      }
  }).listen(3000);
  
  //cookie: undefined
  // cookie: sid=523606354
  // session: 523606354 { '523606354': { name: 'laowang' } } { name: 'laowang' }
  ```

  - 原理

  ![session](/pic/session.jpeg)

  > 实现原理：
  >
  > 1.服务器在接受客户端首次访问时在服务端创建session，然后保存session（我们可以将session保存在内存中，也可以保存在Redis中，推荐使用后者），然后给这个session生成一个唯一的标识字符串，然后在响应头中种下这个唯一标识字符串
  >
  > 2.签名。这一步通过秘钥对sid进行签名处理，避免客户端修改sid。（非必须步骤）
  >
  > 3.浏览器中收到请求响应的时候会解析响应头，然后将sid保存在本地cookie中，浏览器在下次http请求的请求头中会带上该域名下的cookie信息
  >
  > 4.服务器在接受客户端请求时会去解析请求头cookie中的sid，然后根据这个sid去找服务器端保存的该客户端的session，然后判断该请求是否合法。

- **koa中session使用**

  - 安装依赖

  ```bash
  npm i koa koa-session -S
  ```

  

  - 使用

  ```bash
  const Koa=require('koa');
  const app=new Koa();
  const session=require('koa-session');
  
  //签名key keys作用  用来cookie进行签名
  app.keys=['some secret'];
  
  
  //配置项
  const SESS_CONFIG={
      key:'kkb:sess',//cookie键名
      maxAge:86400000,//有效期，默认一天
      httpOnly:true,//仅服务器修改
      signed:true//签名cookie
  };
  
  //注册
  app.use(session(SESS_CONFIG,app));
  
  //测试
  app.use(ctx=>{
      if(ctx.path==='/favicon.ico')return;
      //获取
      console.log(ctx.session.count);
      let n=ctx.session.count || 0;
      //设置
      ctx.session.count=++n;
  
      ctx.body='第'+n+'次访问';
  
  });
  
  app.listen(3000);
  ```

  

- **Redis存储session**

  - 依赖安装

  ```bash
  npm i redis koa-redis co-redis -S
  ```

  

  - redis基本使用

  ```bash
  //redis.js
  const redis=require('redis');
  
  const client=redis.createClient(6379,'localhost');
  
  client.set('hello','this is a value');
  
  client.get('hello',function(err,v){
      console.log('redis get', v);
  });
  ```

  > 注意需要安装redis，并启动

  - redis存储session

  ```bash
  const Koa=require('koa');
  const app=new Koa();
  const session=require('koa-session');
  //引入redis
  const redisStore=require('koa-redis');
  const redis=require('redis');
  const redisClient=redis.createClient(6379,'localhost');
  
  //将redisClient套一下，转换成promise的形式
  const wrapper=require('co-redis');
  const client=wrapper(redisClient);
  //签名key keys作用  用来cookie进行签名
  app.keys=['some secret'];
  
  
  //配置项
  const SESS_CONFIG={
      key:'kkb:sess',//cookie键名
      maxAge:86400000,//有效期，默认一天
      httpOnly:true,//仅服务器修改
      signed:true,//签名cookie
      store:redisStore({client})//session存储的地方，此处可以不必指定client
  };
  
  //注册
  app.use(session(SESS_CONFIG,app));
  
  //
  app.use(async (ctx,next)=>{
      const keys=await client.keys('*');
      keys.forEach(async key=>console.log(key,await client.get(key)));
      await next();
  });
  //测试
  app.use(ctx=>{
      if(ctx.path==='/favicon.ico')return;
      //获取
      console.log(ctx.session.count);
      let n=ctx.session.count || 0;
      //设置
      ctx.session.count=++n;
  
      ctx.body='第'+n+'次访问';
  
  });
  
  app.listen(3000);
  ```

> redis优势：
>
> - 性能极高-redis能读的速度是110000次/s，写的速度是81000次/s
> - 丰富的数据类型-redis支持二进制案例的Strings、Lists、Hashes，Sets及Ordered Sets数据类型操作。
> - 原子-redis的所有操作都是原子性的，意思就是要么成功执行要么失败完全不执行。单个操作是原子性的。多个操作也支持事务，即原子性，通过MULTI和EXEC指令包起来。
> - 丰富的特性-redis还支持publish/subscribe，通知，key过期等等特性。



> redis高性能：
>
> - redis支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用
> - redis不仅仅支持简单的key-value类型的数据，同时还提供list、set、zset、hash等数据结构的存储
> - redis支持数据的备份，即master-slave模式的数据备份

- **案例：登录**

```bash
//index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</head>
<body>
<div id="app">
    <div>
        <input type="text" v-model="username">
        <input type="password" v-model="password">
    </div>
    <div>
        <button @click="login">Login</button>
        <button @click="logout">Logout</button>
        <button @click="getUser">GetUser</button>
    </div>
    <div>
        <button onclick="document.getElementById('log').innerHTML = ''">Clear Log</button>
    </div>
    <h6 id="log"></h6>
</div>
<script>
    // axios.defaults.baseURL = 'http://localhost:3000'
    axios.defaults.withCredentials = true;
    axios.interceptors.response.use(
        response => {
            document.getElementById('log').append(JSON.stringify(response.data));
            return response;
        }
    );
    var app = new Vue({
        el: '#app',
        data: {
            username: 'test',
            password: 'test'
        },
        methods: {
            async login() {
                await axios.post('/login', {
                    username: this.username,
                    password: this.password
                })
            },
            async logout() {
                await axios.post('/logout')
            },
            async getUser() {
                await axios.get('/getUser')
            }
        }
    });
</script>
</body>
</html>
```

```bash
//index.js
const Koa=require('koa');
const router=require('koa-router')();
const session=require('koa-session');
const cors=require('koa2-cors');
const bodyParser=require('koa-bodyparser');//用于解析post请求体
const static=require('koa-static');
const app=new Koa();

//配置session中间件
app.use(cors({
    credentials:true
}));

app.keys=['some secret'];


app.use(static(__dirname+'/'));
app.use(bodyParser());
app.use(session(app));

//鉴权
app.use((ctx,next)=>{
    if(ctx.url.indexOf('login')>-1) {
        next()
    } else {
        console.log('session', ctx.session.userinfo);
        if(!ctx.session.userinfo) {
            ctx.body={
                message:'登录失败'
            }
        }else {
            next();
        }
    }
});

router.post('/login',async (ctx)=>{
    const {body}=ctx.request;
    //设置session
    ctx.session.userinfo=body.username;
    ctx.body={
        message:'登录成功'
    }
});

router.post('/logout',async (ctx)=>{
    //删除session
    delete ctx.session.userinfo;
    ctx.body={
        message:'登出成功'
    }
});

router.get('/getUser',async (ctx)=>{
    ctx.body={
        message:'获取数据成功',
        userinfo:ctx.session.userinfo
    }
});

app.use(router.routes());

app.use(router.allowedMethods());

app.listen(3000);
```



- 哈希Hash-SHA MD5

> - 把一个不定长摘要定长结果
> - 摘要wanglaoshi——>w4l3a3——>防篡改
> - 雪崩效应   

​	摘要

​	对称DES

​	非对称-RSA

- **总结**
  - 用户登录的时候，服务端生成一个唯一的会话标识，并以它为key存储数据
  - 会话标识在客户端和服务端之间通过cookie进行传输
  - 服务端通过会话标识可以获取到会话相关的信息，然后对客户端的请求进行响应；如果找不到有效的会话，那么认为通过一些操作（比如登出）来主动删除

### 2. token jwt模式

- **session不足**

  - 服务器有状态
  - 不灵活，如果APP该怎么办，跨域怎么办（session是基于cookie的，cookie是基于浏览器的）

- **token原理**

  ![token](https://i.loli.net/2019/12/24/irTBsMkm1ZCbw9R.jpg)

  - 客户端使用用户名跟密码请求登录
  - 服务端收到请求，去验证用户名与密码
  - 验证成功后，服务端会签发一个令牌（token），再把这个token发送给客户端
  - 客户端收到token以后可以把它存储起来，比如放在cookie里或者Local Storage里
  - 服务端收到请求，然后去验证客户端请求里面呆着token，如果验证成功，就向客户端返回请求的数据

- **案例：令牌认证**

  ```bash
  //token/index.html
  <html>
  <head>
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  </head>
  
  <body>
  <div id="app">
      <div>
          <input v-model="username" />
          <input v-model="password" />
      </div>
      <div>
          <button v-on:click="login">Login</button>
          <button v-on:click="logout">Logout</button>
          <button v-on:click="getUser">GetUser</button>
      </div>
      <div>
          <button @click="logs=[]">Clear Log</button>
      </div>
      <!-- 日志 -->
      <ul>
          <li v-for="(log,idx) in logs" :key="idx">
              {{ log }}
          </li>
      </ul>
  </div>
  <script>
      axios.interceptors.request.use(
          config => {
              const token = window.localStorage.getItem("token");
              if (token) {
                  // 判断是否存在token，如果存在的话，则每个http header都加上token
                  // Bearer是JWT的认证头部信息
                  config.headers.common["Authorization"] = "Bearer " + token;
              }
              return config;
          },
          err => {
              return Promise.reject(err);
          }
      );
  
      axios.interceptors.response.use(
          response => {
              app.logs.push(JSON.stringify(response.data));
              return response;
          },
          err => {
              app.logs.push(JSON.stringify(response.data));
              return Promise.reject(err);
          }
      );
      var app = new Vue({
          el: "#app",
          data: {
              username: "test",
              password: "test",
              logs: []
          },
          methods: {
              async login() {
                  const res = await axios.post("/login-token", {
                      username: this.username,
                      password: this.password
                  });
                  localStorage.setItem("token", res.data.token);
              },
              async logout() {
                  localStorage.removeItem("token");
              },
              async getUser() {
                  await axios.get("/getUser-token");
              }
          }
      });
  </script>
  </body>
  </html>
  ```

  ```bash
  //token/index.js
  const Koa=require('koa');
  const router=require('koa-router')();
  const static=require('koa-static');
  const bodyParser=require('koa-bodyparser');
  const app=new Koa();
  const jwt=require('jsonwebtoken');
  const jwtAuth=require('koa-jwt');
  
  const secret="it's a secret";
  app.use(bodyParser());
  app.use(static(__dirname+'/'));
  
  router.post('/login-token',async ctx=>{
      const {body}=ctx.request;
     //设置session
     const userinfo=body.username;
     ctx.body={
         message:'登录成功',
         user:userinfo,
         token:jwt.sign({
             data:userinfo,
             //设置token过期时间，一小时后，秒为单位
             exp:Math.floor(Date.now()/1000)+60*60
         },secret)
     }
  });
  
  router.get('/getUser-token',jwtAuth({secret}),async ctx=>{
      //验证通过
      console.log(ctx.state.user);//state 用于存储中间件的一些值
     //获取session
     ctx.body={
         message: '获取数据成功',
         userinfo:ctx.state.user.data
     }
  });
  
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(3000);
  ```

  

- **JWT(JSON WEB TOKEN)原理解析**

  1. Bearer Token包含三个组成部分:令牌头、payload、哈希 

  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWJjIiwicGFzc3dvcmQiOiIxMTExMTEifSwiZXhwIjoxNTU3MTU1NzMwLCJpYXQiOjE1NTcxNTIxMzB9.pjGaxzX2srG_MEZizzmFEy7JM3t8tjkiu3yULgzFwUk 

  1. 签名:默认使用base64对payload编码，使用hs256算法对令牌头、payload和密钥进行签名生成哈希 
  2. 验证:默认使用hs256算法对hs256算法对令牌中数据签名并将结果和令牌中哈希比对 

  ```bash
  //jsonwebtoken.js
  const jsonwebtoken=require('jsonwebtoken');
  
  const secret='123334';
  const opt={
      secret:'jwt_secret',
      key:'user'
  };
  
  const user={
      username:'abc',
      password:'111111'
  };
  
  const token=jsonwebtoken.sign({
      data:user,
      //设置token过期时间
      exp:Math.floor(Date.now()/100)+60*60
  },secret);
  
  console.log('生成token：', token);
  
  //解码
  console.log('解码：', jsonwebtoken.verify(token, secret, opt));
  ```

  

- **session与token简单对比**
  - session要求服务端存储信息，并且根据id能够检索，而token不需要（因为信息就在token中，这样实现了服务端无状态化）。在大规模系统中，对每个请求都检索会话信息可能是一个复杂和耗时的过程。但另外一方面服务端要通过token来解析用户身份也需要定义好相应的协议（比如JWT）
  - session一般通过cookie来交互，而token方式更加灵活，可以是cookie，也可以是header，也可以放在请求的内容中。不使用cookie可以带来跨域上的便利性。
  - token的生成方式更加多样化，可以由第三方模块来提供
  - token若被盗用，服务端无法感知，cookie信息存储在用户自己电脑中，被盗风险略小。

> **参考文档**
>
> [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
>
> [koa-jwt](https://www.npmjs.com/package/koa-jwt)
>
> 阮一峰JWT解释
>
> http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html

### 3. 扩展知识

 1. ##### **OAuth模式（第三方认证）——授权码方式**

    - 概述：

      第三方登入主要基于OAuth 2.0。OAuth协议为用户资源的授权提供了一个安全的、开放而又简易的标
      准。与以往的授权方式不同之处是OAUTH的授权不会使第三方触及到用户的帐号信息(如用户名与密码)，
      即第三方无需使用用户的用户名与密码就可以申请获得该用户资源的授权，因此OAUTH是安全的。

    - OAuth登录流程：

      ![oauth](/pic/oauth.png)

    - 案例：oauth登录

    ```bash
    //oauth/index.html
    <html>
    
    <head>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    
    </head>
    
    <body>
    <div id="app">
        <button @click='oauth()'>Login with Github</button>
        <div v-if="userInfo">
            Hello {{userInfo.name}}
            <img :src="userInfo.avatar_url" />
        </div>
    </div>
    <script>
    
    </script>
    <script>
        axios.interceptors.request.use(
            config => {
                const token = window.localStorage.getItem("token");
                if (token) {
                    // 判断是否存在token，如果存在的话，则每个http header都加上token
                    // Bearer是JWT的认证头部信息
                    config.headers.common["Authorization"] = "Bearer " + token;
                }
                return config;
            },
            err => {
                return Promise.reject(err);
            }
        );
    
        axios.interceptors.response.use(
            response => {
                app.logs.push(JSON.stringify(response.data));
                return response;
            },
            err => {
                app.logs.push(JSON.stringify(response.data));
                return Promise.reject(err);
            }
        );
        var app = new Vue({
            el: "#app",
            data: {
                logs: [],
                userInfo: null
            },
            methods: {
                async oauth() {
                    window.open('/auth/github/login', '_blank');
                    const intervalId = setInterval(() => {
                        console.log("等待认证中..");
                        if (window.localStorage.getItem("authSuccess")) {
                            clearInterval(intervalId);
                            window.localStorage.removeItem("authSuccess");
                            this.getUser()
                        }
                    }, 500);
                },
                async getUser() {
                    const res = await axios.get("/auth/github/userinfo");
                    console.log('res:',res.data);
                    this.userInfo = res.data
                }
            }
        });
    </script>
    </body>
    
    </html>
    ```

    ```bash
    //oauth/index.js
    const Koa = require('koa');
    const router = require('koa-router')();
    const static = require('koa-static');
    const app = new Koa();
    const axios = require('axios');
    const querystring = require('querystring');
    const jwt = require("jsonwebtoken");
    const jwtAuth = require("koa-jwt");
    const accessTokens = {};
    
    const secret = "it's a secret";
    app.use(static(__dirname + '/'));
    const config = {
        client_id: 'c8f9a05f5ac3fa5376b9',
        client_secret: '155ec0b78515ca4bbe6b16d8280c387b442ea028',
    };
    
    router.get('/auth/github/login', async (ctx) => {
        var dataStr = (new Date()).valueOf();
        //重定向到认证接口,并配置参数
        var path = `https://github.com/login/oauth/authorize?${querystring.stringify({ client_id: config.client_id })}`;
    
        //转发到授权服务器
        ctx.redirect(path);
    });
    
    router.get('/auth/github/callback', async (ctx) => {
        console.log('callback..');
        const code = ctx.query.code;
        const params = {
            client_id: config.client_id,
            client_secret: config.client_secret,
            code: code
        };
        let res = await axios.post('https://github.com/login/oauth/access_token', params);
        const access_token = querystring.parse(res.data).access_token;
        const uid = Math.random() * 99999;
        accessTokens[uid] = access_token;
    
        const token = jwt.sign(
            {
                data: uid,
                // 设置 token 过期时间，一小时后，秒为单位
                exp: Math.floor(Date.now() / 1000) + 60 * 60
            },
            secret
        );
        ctx.response.type = 'html';
        console.log('token:', token);
        ctx.response.body = ` <script>window.localStorage.setItem("authSuccess","true");window.localStorage.setItem("token","${token}");window.close();</script>`;
    });
    
    router.get('/auth/github/userinfo', jwtAuth({
        secret
    }), async (ctx) => {
        // 验证通过，state.user
        console.log('jwt playload:', ctx.state.user);
        const access_token = accessTokens[ctx.state.user.data];
        res = await axios.get('https://api.github.com/user?access_token=' + access_token);
        console.log('userAccess:', res.data);
        ctx.body = res.data
    });
    
    app.use(router.routes()); /*启动路由*/
    app.use(router.allowedMethods());
    app.listen(7001);
    ```

    

 2. ##### 单点登录sso

https://github.com/hezhii/nodejs-sso-example

- 简介

  单点登录是在多个应用系统中，用户只需要登录一次就可以访问所有相互信任的应用系统的保护资源，若用户在某个应用系统中进行注销登录，所有的应用系统都不能再直接访问保护资源，像一些知名的大型网站，如：淘宝与天猫、新浪微博与新浪博客等都用到了这个技术。

- 原理

  有一个独立的认证中心，只有认证中心才能接受用户的用户名和密码等信息进行认证，其他系统不提供登录入口，只接受认证中心的间接授权。间接授权通过令牌实现，当用户提供的用户名和密码通过认证中心认证后，认证中心会创建授权令牌，在接下来的跳转过程中，授权令牌作为参数发送给各个子系统，子系统拿到令牌即得到了授权，然后创建局部会话。

  ![sso](/pic/sso.png)

  ![sso](/pic/sso2.png)

下面对上图进行解释：

1. 当用户还没进行用户登录的时候
   1. 用户去访问系统1的保护资源 ，系统1检测到用户还没登录，跳转至SSO认证中心，SSO认证中心也发现用户没有登录，就跳转到用户至认证中心的登录页面
   2. 用户在登录页面提交用户相应信息后，认证中心会校验用户信息，如果用户信息正确的话认证中心就会创建与该用户的全局会话（全局会话过期的时候，用户就需要重新登录了。全局会话中存的信息可能有令牌，用户信息，及该在各个系统的一些情况），同时创建授权令牌，然后进行下一步，否则认证中心给出提示（用户信息有误），待用户再次点击登录的时候，再一次进行校验用户信息
   3. 认证中心带着令牌跳转到用户最初请求的地址（系统1），系统1拿到令牌后去SSO认证中心校验令牌是否有效，SSO认证中心校验令牌，若该令牌有效则进行下一步
   4. 注册系统1，然后系统1使用该令牌创建和用户的局部会话（若局部会话过期，跳转至SSO认证中心，SSO认证中心发现用户已经登录，然后执行第3步），返回受保护资源
2. 用户已经通过认证中心的认证后
   用户访问系统2的保护资源，系统2发现用户未登录，跳转至SSO认证中心，SSO认证中心发现用户已经登录，就会带着令牌跳转回系统2，系统2拿到令牌后去SSO认证中心校验令牌是否有效，SSO认证中心返回有效，注册系统2，系统2使用该令牌创建与用户的局部会话，返回受保护资源。
3. 如果系统1的局部会话存在的话，当用户去访问系统1的保护资源时，就直接返回保护资源，不需要去认证中心验证了

**局部会话存在，全局会话一定存在；全局会话存在，局部会话不一定存在；全局会话销毁，局部会话必须销毁**
**如果在校验令牌过程中发现客户端令牌和服务器端令牌不一致或者令牌过期的话，则用户之前的登录就过期了，用户需要重新登录**

## 六、eggjs MVC分层原理

### 1. Eggs——企业级web开发框架

https://eggjs.org/zh-cn/intro/quickstart.html

- **三层结构**
- **MVC**
- **约定优于配置**
  - convention over configuration
  - 软件设计范式
  - 减少软件开发人员需要做决定的数量
  - 简单不失灵活 

> 创建项目

```bash
// 创建项目
$ npm i egg-init -g
$ egg-init egg-example --type=simple 
$ cd egg-example
$ npm i
// 启动项目
$ npm run dev
$ open localhost:7001
```

> 项目结构

​	-Public

​	-Router——>Controller——>Service——>Model

​	-Schedule

> 创建一个路由router.js

```bash
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/user', controller.user.index);
}
```

> 创建一个控制器./app/controller/user.js

```bash
'use strict';

const {Controller}=require('egg');

class UserController extends Controller{
    async index(){
        this.ctx.body=[
            {name:'sofiya'},
            {age:18}
        ]        
    }
}

module.exports=UserController;
```

> 创建一个服务./app/service/user.js

```bash
'use strict';

const {Service}=require('egg');

class UserService extends Service{
    async getAll(){
        return [
            {name:'tom'},
            {age:99}
        ]
    }
}

module.exports=UserService;
```

> 使用服务./app/controller/user.js

```bash
'use strict';

const {Controller}=require('egg');

class UserController extends Controller{
    async index(){
        // this.ctx.body=[
        //     {name:'sofiya'},
        //     {age:18}
        // ]   
        this.ctx.body=await this.ctx.service.user.getAll();     
    }
}

module.exports=UserController;
```

> 创建模型层：以mysql+sequelize为例演示数据持久化    

- 安装

  ```bash
  npm i egg-sequelize mysql2 -S
  ```

- 在config/plugin.js中引入egg-sequelize插件

  ```bash
  sequelize: {
      enable: true,
      package: 'egg-sequelize'
  }
  ```

- 在config/config.default.js中编写sequelize配置

  ```bash
  const userConfig = {
      // myAppName: 'egg'
      sequelize: {
        dialect: "mysql",
        host: "127.0.0.1",
        port: 3306,
        username: "root",
        password: "QXFY105729",
        database: "test"
      }
  };
  ```

- 编写User模型./app/model/user.js

  ```bash
  module.exports = app => {
      const { STRING } = app.Sequelize;
  
      const User = app.model.define(
          'user',
          { name: STRING(30) },
          { timestamps: false }
      );
  
      //数据库同步
      User.sync({ force: true });
  
      return User;
  }
  ```

- 服务中或者控制器中调用:ctx.model.User——./app/service/user.js

  ```bash
  'use strict';
  
  const {Service}=require('egg');
  
  class UserService extends Service{
      async getAll(){
          // return [
          //     {name:'tom'},
          //     {age:99}
          // ]
          return await this.ctx.model.User.findAll();
      }
  }
  
  module.exports=UserService;
  ```

### 2. 实现一个MVC框架

基于koa定制自己的企业级MVC框架

- 目标是创建约定大于配置、开发效率高、可维护性强的项目架构

- 路由处理

  - 规范

    - 所有路由，都要放在routes文件夹中
    - 若导出路由对象，使用动词+空格+路径作为key，值是操作方式
    - 若导出函数，则函数返回第二条约定格式的对象

  - 路由定义

    - 新建routes/index.js，默认index.js没有前缀

    ```bash
    module.exports={
        'get /':async ctx=>{
            ctx.body='首页'
        },
        'get /detail':async ctx=>{
            ctx.body='详情页面'
        }
    }
    ```

    - 新建routes/user.js，路由前缀是/user

    ```bash
    module.exports={
        'get /':async ctx=>{
            ctx.body='用户首页'
        },
        'get /info':async ctx=>{
            ctx.body='用户详情页面'
        }
    }
    ```

    - 路由加载器，新建kkb-loader.js

    ```bash
    const fs = require('fs');
    const path = require('path');
    const Router = require('koa-router');
    
    //读取指定目录下文件
    function load(dir, cb) {
        //获取绝对路径
        const url = path.resolve(__dirname, dir);
    
        //读取路径下文件
        const files = fs.readdirSync(url);
    
        //遍历路由文件，将路由配置解析到路由器中
        files.forEach(filename => {
            //去掉后缀名
            filename = filename.replace('.js', '');
            //导入文件
            const file = require(url + '/' + filename);
            //回调处理逻辑
            cb(filename, file);
        })
    }
    
    //初始化路由
    function initRouter() {
        const router = new Router();
        load('routes', (filename, routes) => {
            //若是index，则无前缀，别的文件前缀就是文件家名
            const prefix=filename==='index'?'':`/${filename}`;
            //遍历路由并添加到路由器
            Object.keys(routes).forEach(key=>{
                const [method,path]=key.split(' ');
                `正在映射地址：${method.toLocaleLowerCase}${prefix}${path}`
                //执行router
                router[method](prefix+path,routes[key])
            })
        });
        return router
    }
    module.exports={initRouter};
    ```

    - 测试index.js，引入kkb-loader.js

    ```bash
    const Koa=require('koa');
    const app=new Koa();
    const {initRouter}=require('./kkb-loader');
    app.use(initRouter().routes());
    app.listen(3000);
    ```

    - 封装，创建kkb.js

    ```bash
    const koa=require('koa');
    const {initRouter}=require('./kkb-loader');
    class kkb{
        constructor(conf){
            this.$app=new koa(conf);
            this.$router=initRouter();
            this.$app.use(this.$router.routes())
        }
        start(port){
            this.$app.listen(port,()=>{
                console.log('服务器启动成功，端口为'+port);
            })
        }
    }
    
    module.exports=kkb;
    ```

    - 创建app.js作为启动文件

    ```bash
    const kkb=require('./kkb');
    const app=new kkb();
    app.start(3000);
    ```

    - 控制器：抽取route中业务逻辑至controller

      - 约定：controller文件夹下面存放业务逻辑代码，框架自动加载并集中暴露

      - 新建controller/home.js-user.js

        ```bash
        //home.js
        module.exports = {
            index: async ctx => {
                ctx.body = '首页 ctrl'
            },
            detail: async ctx => {
                ctx.body = '详情页 ctrl'
            }
        }
        //user.js
        module.exports = {
            index: async ctx => {
                ctx.body = '用户首页 ctrl'
            },
            info: async ctx => {
                ctx.body = '用户详情页 ctrl'
            }
        }
        ```

      - 修改路由声明：routes/index.js-user.js

        ```bash
        //index.js
        module.exports=app=>({
            'get /':app.$ctrl.home.index,
            'get /detail':app.$ctrl.home.detail
        })
        //user.js
        module.exports=app=>({
            'get /':app.$ctrl.user.index,
            'get /info':app.$ctrl.user.info
        })
        ```

      - 加载控制器，更新kkb-loader.js

        ```bash
        //初始化controller
        function initController() {
            const controllers = {};
            //读取控制器目录
            load('controller', (filename, controller) => {
                //添加路由
                controllers[filename] = controller;
            })
            return controllers;
        }
        module.exports = { initRouter, initController };
        ```

      - 修改路由初始化逻辑，能够处理函数形式的声明，kkb-loader.js

        ```bash
        //初始化路由:routes = typeof routes === 'function' ? routes(app) : routes;
        function initRouter(app) {
            console.log(app);
        
            const router = new Router();
            load('routes', (filename, routes) => {
                //若是index，则无前缀，别的文件前缀就是文件家名
                const prefix = filename === 'index' ? '' : `/${filename}`;
                routes = typeof routes === 'function' ? routes(app) : routes;
        
                //遍历路由并添加到路由器
                Object.keys(routes).forEach(key => {
                    const [method, path] = key.split(' ');
                    //执行router
                    router[method](prefix + path, routes[key])
                })
            });
            return router
        }
        ```

      - 初始化控制器kkb.js

        ```bash
        const koa=require('koa');
        const {initRouter,initController}=require('./kkb-loader');
        class kkb{
            constructor(conf){
                this.$app=new koa(conf);
                this.$ctrl=initController();
                this.$router=initRouter(this);
                this.$app.use(this.$router.routes())
            }
            start(port){
                this.$app.listen(port,()=>{
                    console.log('服务器启动成功，端口为'+port);
                })
            }
        }
        
        module.exports=kkb;
        ```

    - 服务：抽离通用逻辑至service文件夹，利于复用

      - 新建service/user.js

        ```bash
        const delay=(data,tick)=>new Promise(resolve=>{
            setTimeout(()=>{
                resolve(data)
            },tick)
        });
        
        module.exports={
            getName(){
                return delay('sofiya',1000)
            },
            getAge(){
                return 18
            }
        }
        ```

      - 加载service-kkb-loader.js

        ```bash
        //加载service
        function initService(){
            const services={};
            //读取控制器目录
            load('service',(filename,service)=>{
                services[filename]=service;
            });
            return services;
        }
        module.exports = { initRouter, initController,initService};
        ```

        

      - 修改路由初始化逻辑，挂载和使用service

        ```bash
        function initRouter(app) {
            console.log(app);
        
            const router = new Router();
            load('routes', (filename, routes) => {
                //若是index，则无前缀，别的文件前缀就是文件家名
                const prefix = filename === 'index' ? '' : `/${filename}`;
                routes = typeof routes === 'function' ? routes(app) : routes;
        
                //遍历路由并添加到路由器
                Object.keys(routes).forEach(key => {
                    const [method, path] = key.split(' ');
                    //执行router
                    router[method](prefix + path, async ctx=>{
                        app.ctx=ctx;//将上下文挂载至app
                        await routes[key](app)//路由处理器现在接收的是app
                    })
                })
            });
            return router
        }
        ```

        

      - 更新路由

        ```bash
        //routes/user.js
        module.exports = app => ({
            'get /': async (app) => {
                const name = await app.$service.user.getName();
                app.ctx.body = '用户：' + name
            },
            'get /info': async (app) => {
                app.ctx.body = '用户年龄：' + app.$service.user.getAge();
            }
        })
        //routes/index.js
        module.exports = app => ({
            "get /": app.$ctrl.home.index,
            "get /detail": app.$ctrl.home.detail
        })
        ```

      - 更新controller

        ```bash
        //controller/home.js
        module.exports ={
            index: async app => {
                //ctx.body = '首页 ctrl'
                const name = await app.$service.user.getName();
                console.log(name);
                
                app.ctx.body = '用户：' + name
            },
            detail: async app => {
                app.ctx.body = '详情页 ctrl'
            }
        }
        ```

    - 数据库集成

      - 集成sequelize

        ```bash
        npm install sequelize mysql2 --save
        ```

      - 约定

        config/index.js中存放项目配置项
        key表示对应配置目标
        model中存放数据模型

      - 配置sequelize连接配置项，config.js

        ```bash
        module.exports = {
            db: {
                dialect: 'mysql',
                host: 'localhost',
                database: 'test',
                username: 'root',
                password: 'QXFY105729'
            }
        }
        ```

      - 加载loadModel和loadConfig-kkb-loader.js

        ```bash
        //加载config配置项
        function loadConfig(app) {
            load('config', (filename, config) => {
                if (config.db) {
                    app.$db = new sequelize(config.db);
                    //加载模型
                    app.$model = {};
                    load('model', (filename, { schema, options }) => {
                        app.$model[filename] = app.$db.define(filename, schema, options)
                    })
                    app.$db.sync();
                }
            })
        }
        module.exports = { initRouter, initController, initService, loadConfig };
        ```

      - 新建数据库模型model/user.js

        ```bash
        const { STRING } = require('sequelize');
        
        module.exports = {
            schema: {
                name: STRING(30)
            },
            options: {
                timestamps: false
            }
        }
        ```

      - controller中使用$db

        ```bash
        //controller/home.js
        module.exports = {
            index: async app => {
                //ctx.body = '首页 ctrl'
                //const name = await app.$service.user.getName();
                const name = await app.$model.user.findAll();
                
                app.ctx.body = '用户：' +JSON.stringify(name)
            },
            detail: async app => {
                app.ctx.body = '详情页 ctrl'
            }
        }
        ```

      - service中做修改

        ```bash
        // 修改service结构，service/user.js module.exports = app => ({ // 变为函数，传入app
        //...
        });
        // 修改kkb-loader.js
        services[filename] = service(app); // 服务变为函数，传入app
        ```

    - 中间件

      - 规定koa中间件放入middleware文件夹

      - 编写一个请求记录中间件，./middleware/logger.js

        ```bash
        module.exports = async (ctx, next) => {
            const start = new Date();
            await next();
            const duration = new Date() - start;
            console.log(ctx.path,ctx.method,ctx.status,duration)
        }
        ```

      - 配置中间件config/index.js

        ```bash
        module.exports = {
            db: {
                dialect: 'mysql',
                host: 'localhost',
                database: 'test',
                username: 'root',
                password: 'QXFY105729'
            },
            middleware:['logger']
        }
        ```

      - 加载中间件kkb-loader.js

        ```bash
        //加载config配置项
        function loadConfig(app) {
            load('config', (filename, config) => {
                if (config.db) {
                    app.$db = new sequelize(config.db);
                    //加载模型
                    app.$model = {};
                    load('model', (filename, { schema, options }) => {
                        app.$model[filename] = app.$db.define(filename, schema, options)
                    })
                    app.$db.sync();
                }
                if (config.middleware) {
                    load('middleware', (filename) => {
                        config.middleware.forEach(mid => {
                            const midPath=path.resolve(__dirname,'middleware',mid);
                            app.$app.use(require(midPath));
                        })
                    })
                }
            })
        }
        module.exports = { initRouter, initController, initService, loadConfig };
        ```

      - 调用kkb.js

        ```bash
        loadConfig(this);
        ```

    - 定时任务

      - 使用node-schedule来管理定时任务

        ```bash
         npm install node-schedule --save
        ```

        

      - 约定：schedule目录，存放定时任务

        ```bash
        //schedule/log.js
        module.exports={
            interval:'*/3 * * * * *',
            handle(){
                console.log('每隔3s执行定时任务',new Date());
                
            }
        }
        //schedule/user.js
        module.exports={
            interval:'30 * * * * *',
            handle(){
                console.log('每隔30s执行定时任务',new Date());
            }
        }
        ```

        

      - 加载loadSchedule，kkb-loader.js

        ```bash
        //加载定时任务
        function initSchedule() {
            load('schedule', (filename, { interval, handle }) => {
                schedule.scheduleJob(interval, handle);
            })
        }
        module.exports = { initRouter, initController, initService, loadConfig, initSchedule };
        ```

      - 调用kkb.js

        ```bash
        const {initSchedule} = require("./kkb-loader");
        class kkb {
          constructor(conf) {
            initSchedule();
        } }
        ```

### 3. koa怎么加互斥锁，读写锁

## 七、eggjs最佳实践

```bash
//初始化项目
egg-init egg-server2
```

### 1. swager-doc接口文档

- **controller**

```bash
//./controller/user.js
'use strict';

const Controller = require('egg').Controller;

/**
 * @Controller 用户管理
 */
class UserController extends Controller {
    constructor(ctx) {
        super(ctx);
    }

    /**
     * @summary 创建用户
     * @description 创建用户，记录用户账户/密码/类型
     * @router post /api/user
     * @request body createUserRequest *body
     * @response 200 baseResponse 创建成功
     */
    async create() {
        const {ctx} = this;
        ctx.body = 'ctrl 666';
    }
}

module.exports = UserController;
```

- **contract**

```bash
//contract/index.js
module.exports={
    baseRequest:{
        id:{type:'string',description:'id 唯一键',required:true,example:'1'}
    },
    baseResponse:{
        code:{type:'integer',required:true,example: 0},
        data:{type:'string',example:'请求成功'},
        errorMessage:{type:'string',example:'请求成功'}
    }
};

//contract/user.js
module.exports={
    createUserRequest:{
        mobile:{type:'string',required:true,description:'手机号',example:'18501368704',format:/^1[34578]\d{9}$/},
        password:{type:'string',required: true,description: '密码',example: '123456'},
        realName:{type:'string',required:true,description:'姓名',example:'sofiyas'}
    }
};
```

- **添加swaggerDoc功能**

  ```bash
  //依据jsdoc生成接口文档
  npm install egg-swagger-doc-feat -S
  ```

  - config/plugin.js

    ```bash
    swaggerdoc:{
    	enable:true,
    	package:'egg-swagger-doc-feat'
    }
    ```

  - config/config.default.js

    ```bash
    config.swaggerdoc = {
    	dirScanner: './app/controller',
    	apiInfo: {
    		title: '开课吧接口',
    		description: '开课吧接口 swagger-ui for egg',
    		version: '1.0.0',
    	},
    	schemes: ['http', 'https'],
    	consumes: ['application/json'],
    	produces: ['application/json'],
    	enableSecurity: false,
    	// enableValidate: true,
    	routerMap: true,//根据文档自动生成路由
    	enable: true,
    };
    ```

### 2. 统一处理异常——中间件

-  **增加异常处理中间件**

```bash
//./middleware/error_handler.js
'use strict';
module.exports = (option, app) => {
    return async function (ctx, next) {
        try {
            await next();
        } catch (err) {
            //所有的异常都在app上触发一个error事件，框架会记录一条错误日志
            app.emit('error', err, this);
            const status = err.status || 500;
            //生产环境时500错误的详细错误内容不返给客户端，因为可能包含敏感信息
            const error = status === 500 && app.config.env === 'prod' ? 'Internal Server Error' : err.message;
            //从error对象上读出各个属性，设置到响应中
            ctx.body = {
                code: status,
                error: error
            };
            if (status === 422) {
                ctx.body.detail = err.errors;
            }
            ctx.status = 200;
        }
    }
};
//config/config.default.js
// add your middleware config here
config.middleware = ['errorHandler'];
```

### 3. 基于扩展的helper方法实现统一响应格式

Helper 函数用来提供一些实用的 utility 函数。

它的作用在于我们可以将一些常用的动作抽离在 helper.js 里面成为一个独立的函数，这样可以用 JavaScript
来写复杂的逻辑，避免逻辑分散各处。另外还有一个好处是 Helper 这样一个简单的函数，可以让我们更容易
编写测试用例。
框架内置了一些常用的 Helper 函数。我们也可以编写自定义的 Helper 函数。

```bash
//extend/helper.js
exports.success=({ctx,res=null,msg='请求成功'})=>{
    ctx.body={
        code:0,
        data:res,
        msg
    };
    ctx.status=200
}
```

```bash
//controller/user.js
const res={abc:123};
ctx.helper.success({ctx,res});
```

### 4. validate接口格式检查

- **安装**

  ```bash
  npm i egg-validate -S
  ```

- **配置**

  ```bash
  //config/plugin.js
  validate:{
          enable:true,
          package:'egg-validate'
  }
  ```

- **使用**

  ```bash
  //controller/user.js
  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(ctx.rule.createUserRequest)
  }
  ```

- **添加model层——数据库**

  - 安装

  ```bash
  npm install egg-mongoose -S
  ```

  - 配置

  ```bash
  //config/plugin.js
  mongoose : {
      enable: true,
      package: 'egg-mongoose',
  },
  //config/config.default.js
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/egg_x',
    options: {
     // useMongoClient: true,
     autoReconnect: true,
     reconnectTries: Number.MAX_VALUE,
     bufferMaxEntries: 0,
   },
  }
  ```

  - 创建model/user.js

  ```bash
  module.exports=app=>{
    const mongoose=app.mongoose;
    const UserSchema=new mongoose.Schema({
        mobile:{type:'string',required:true,unique:true},
        password:{type:'string',required: true},
        realName:{type:'string',required:true},
        avatar:{type:'string',default:'https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm'},
        extra:{type:mongoose.Schema.Types.Mixed},
        createdAt:{type:Date,default: Date.now()}
    });
    return mongoose.model('User',UserSchema)
  };
  ```

  - 解析哈希需安装

  ```bash
  npm install egg-bcrypt -S
  ```

  - 配置config/plugin.js

  ```bash
  bcrypt : {
    enable: true,
    package: 'egg-bcrypt'
  }
  ```

  - service/user.js

  ```bash
  const Service=require('egg').Service;
  class UserService extends Service{
      async create(payload){
          const {ctx}=this;
          payload.password=await ctx.genHash(payload.password);
          return ctx.model.User.create(payload)
      }
  }
  
  module.exports=UserService;
  ```

  - controller调用

  ```bash
  async create() {
          const {ctx,service} = this;
          //检验参数
          ctx.validate(ctx.rule.createUserRequest);
  
          //组装参数
          const payload=ctx.request.body || {};
          //调用service进行业务处理
          const res=await service.user.create(payload);
          ctx.helper.success({ctx,res});
  }
  ```

### 5. 通过生命周期初始化数据

https://eggjs.org/en/basics/app-start.html#mobileAside

根目录下创建app.js

```bash
//入口文件
// /app.js
/**
 * 全局定义
 * @param app
 */
class AppBootHook {
    constructor(app) {
        this.app = app;
        app.root_path = __dirname;
    }
    configWillLoad() {
        // Ready to call configDidLoad,
        // Config, plugin files are referred,
        // this is the last chance to modify the config.
    }
    configDidLoad() {
        // Config, plugin files have been loaded.
    }
    async didLoad() {
        // All files have loaded, start plugin here.
    }
    async willReady() {
        // All plugins have started, can do some thing before app ready
    }
    async didReady() {
        // Worker is ready, can do some things
        // don't need to block the app boot.
        console.log('========Init Data=========')
        const ctx = await this.app.createAnonymousContext();//createAnonymousContext创建匿名上下文
        await ctx.model.User.remove();//将数据库全部清除
        await ctx.service.user.create({
            mobile: '13611388415',
            password: '9999999',
            realName: '乔旭',
        })
    }
    async serverDidReady() {
    }
    async beforeClose() {
        // Do some thing before app close.
    }
}

module.exports=AppBootHook;
```

### 6. 用户jwt统一鉴权

- **安装**

  ```bash
  npm i egg-jwt -S
  ```

- **配置**

  ```bash
  //config/plugin.js
  jwt:{
          enable: true,
          package: 'egg-jwt'
  }
  
  //config/config.default.js
  config.jwt = {
    secret: 'Great4-M',
    enable: true, // default is false
    match: /^\/api/, // optional
  }
  ```

- **service层**

  ```bash
  //service/actionToken.js
  const Service = require('egg').Service;
  
  class ActionTokenService extends Service {
      async apply(_id) {
          const {ctx} = this;
          return ctx.app.jwt.sign({
              data:{
                  _id:_id
              },
              exp:Math.floor(Date.now()/1000)+(60*60*24*7)
          },ctx.app.config.jwt.secret)
      }
  }
  
  module.exports = ActionTokenService;
  
  //service/userAccess.js
  const Service=require('egg').Service;
  
  class UserAccessService extends Service{
      /**
       * 登录
       * @param payload
       * @returns {Promise<void>}
       */
      async login(payload){
          const {ctx,service}=this;
          const user=await service.user.findByMobile(payload.mobile);
          console.log(user+'-----------------');
          if(!user) {
              ctx.throw(404,'user not found')
          }
          let verifypsw=await ctx.compare(payload.password,user.password);
          if(!verifypsw) {
              ctx.throw(404,'user password is error');
          }
          //生成token令牌
          return {token:await service.actionToken.apply(user._id)};
      }
  
      /**
       * 退出登录
       * @returns {Promise<void>}
       */
      async logout() {
      }
  
      /**
       * 当前用户信息
       * @returns {Promise<void>}
       */
      async current(){
          const {ctx,service}=this;
          //ctx.state.user可以提取到JWT编码的data
          const _id=ctx.state.user.data._id;
          const user=await service.user.find(_id);
          if(!user) {
              ctx.throw(404,'user is not found');
          }
          user.password='how old are you?';
  
          return user;
      }
  
  }
  
  module.exports=UserAccessService;
  ```

- **contract层**

  ```bash
  module.exports={
      loginRequest:{
          mobile:{type:'string',required:true,description:'手机号',example:'18501368704',format:/^1[34578]\d{9}$/},
          password:{type:'string',required: true,description: '密码',example: '123456'}
      }
  }
  ```

- **controller层**

  ```bash
  'use strict';
  
  const Controller = require('egg').Controller;
  
  /**
   * @Controller 用户鉴权
   */
  class UserAccessController extends Controller {
      constructor(ctx){
          super(ctx)
      }
  
      /**
       * @summary 用户登入
       * @description 用户登入
       * @router post /auth/jwt/login
       * @request body loginRequest *body
       * @response 200 baseResponse 创建成功
       */
      async login() {
          console.log('ahahhah');
          const {ctx,service} = this;
          //校验参数
          ctx.validate(ctx.rule.loginRequest);
          //组装参数
          const payload=ctx.request.body||{};
          //调用service进行业务处理
          const res=await service.userAccess.login(payload);
          //设置响应内容和响应状态码
          ctx.helper.success({ctx,res});
      }
  
      /**
       * @summary 用户登出
       * @description 用户登出
       * @router post /auth/jwt/logout
       * @request body loginRequest *body
       * @response 200 baseResponse 创建成功
       */
      async logout() {
          const { ctx, service } = this;
          // 调用 Service 进行业务处理
          await service.userAccess.logout();
          // 设置响应内容和响应状态码
          ctx.helper.success({ ctx })
      }
  }
  
  module.exports = UserAccessController;
  ```

### 7. 文件上传

- **安装**

  ```bash
  npm i await-stream-ready stream-wormhole image-downloader -S
  ```

- **controller**

  ```bash
  //controller/uploader.js
  // app/controller/upload.js
  const fs = require('fs');
  const path = require('path');
  const Controller = require('egg').Controller;
  const awaitWriteStream = require('await-stream-ready').write;
  const sendToWormhole = require('stream-wormhole');
  const download = require('image-downloader');
  /**
  
  - @Controller 上传
    */
    class UploadController extends Controller {
    constructor(ctx) {
        super(ctx)
    }
  
    // 上传单个文件
    /**
  
    - @summary 上传单个文件
  
    - @description 上传单个文件
  
    - @router post /api/upload/single
      */
      async create() {
      const { ctx } = this;
      // 要通过 ctx.getFileStream 便捷的获取到用户上传的文件，需要满足两个条件：
      // 只支持上传一个文件。
      // 上传文件必须在所有其他的 fields 后面，否则在拿到文件流时可能还获取不到 fields。
      const stream = await ctx.getFileStream();
      // 所有表单字段都能通过 `stream.fields` 获取到
      const filename = path.basename(stream.filename) ;// 文件名称
      const extname = path.extname(stream.filename).toLowerCase(); // 文件扩展名称
      const uuid = (Math.random() * 999999).toFixed();
  
      // 组装参数 stream
      const target = path.join(this.config.baseDir, 'app/public/uploads', `${uuid}${extname}`);
      const writeStream = fs.createWriteStream(target);
      // 文件处理，上传到云存储等等
      try {
          await awaitWriteStream(stream.pipe(writeStream))
      } catch (err) {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(stream);
          throw err
      }
      // 调用 Service 进行业务处理
      // 设置响应内容和响应状态码
      ctx.helper.success({ ctx })
      }
      }
  
  module.exports = UploadController;
  ```
  
  
  

## 八、TypeScript与装饰器

### 1. Typescript

- 类classes
- 接口interfaces
- 模块Modules
- 类型注解Type annotation
- 编译时类型检查Compile time type checking
- 箭头函数Arrow——Lambda表达式

### 2. 装饰器

- 类装饰器
- 方法装饰器
- AOP功能
- https://www.cnblogs.com/winfred/p/8216650.html

### 3. 架构

#### 1）项目结构

1.package.json创建

```bash
npm init -y
```

2.开发依赖安装

```bash
npm i typescript ts-node-dev tslint @types/node -D
npm i koa koa-static koa-body koa-xtime koa-router -S
```

3.启动脚本

```bash
scripts: {
    "start": "ts-node-dev ./src/index.ts -P tsconfig.json --no-cache",
    "build": "tsc -P tsconfig.json && node ./dist/index.js",
    "tslint": "tslint --fix -p tsconfig.json"
}
```

4.创建tsconfig.json文件

```bash
{
    "compilerOptions": {
        "outDir": "./dist",
        "target": "es2017",
        "module": "commonjs",
        "sourceMap": true,
        "moduleResolution": "node",
        "experimentalDecorators": true,//声明使用装饰器
        "allowSyntheticDefaultImports": true,
        "lib": ["es2015"],
        "typeRoots": ["./node_modules/@types"],
    },
    "include": ["src/**/*"]
}
```

5.创建入口文件./src/index.ts

```bash
import * as Koa from 'koa'
import * as bodify from 'koa-body'
import * as serve from 'koa-static'
import * as timing from 'koa-xtime'
import { load } from './utils/decors'
import { resolve } from 'path'
import { Sequelize } from 'sequelize-typescript'

const database = new Sequelize({
    host: 'localhost',
    port: 3306,
    database: 'test',
    username: 'root',
    password: 'QXFY105729',
    dialect: 'mysql',
    modelPaths: [`${__dirname}/model`],
    operatorsAliases: false
})
const router = load(resolve(__dirname, './routes'))
const app = new Koa();

app.use(timing())
app.use(serve(`${__dirname}/public`))

app.use(
    bodify({
        multipart: true,
        //使用非严格模式，解析delete请求的请求体
        strict: false
    })
)

app.use(router.routes());

app.listen(3000, () => {
    console.log('启动成功');

})
```

6.运行测试

```bash
npm start
```



#### 2）路由定义及发现——router

> 知识点补充:装饰器的编写，以@get('/users')为例，它是函数装饰器且有配置项，其函数签名为:
>
> ```bash
> function get(path) {
>     return function(target, property, descriptor) {}
> }
> ```
>
> 有两个需要注意的：
>
> 1.路由发现
>
> 2.路由注册

1.路由发现及注册，创建./utils/decors.ts

```bash
import * as glob from 'glob'//用于文件夹遍历
import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'


type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch'

type LoadOptions = {
    extname?: string
}

type RouterOptions = {
    /**
     * 适用于某个请求比较特殊，需要单独制定前缀的情形
     */
    prefix?: string;
    /**
     * 给当前路由添加一个或多个中间件
     */
    middlewares?: Array<Koa.Middleware>
}
const router = new KoaRouter();

const decorate = (method: HTTPMethod, path: string, options: RouterOptions = {}, router: KoaRouter) => {
    return (target, property: string) => {
        //处理成异步
        process.nextTick(() => {
            //添加中间件
            const mws = [];
            if (options.middlewares) {
                mws.push(...options.middlewares)
            }
            if(target.middlewares) {
                mws.push(...target.middlewares)
            }
            mws.push(target[property])
            const url = options.prefix ? options.prefix + path : path
            router[method](url, target[property])
        })
    }
}

const method = method => (path: string, options?: RouterOptions) => decorate(method, path, options, router)
const get = method('get');
console.log(get);
export {get};
export const post = method('post');
export const put = method('put');
export const del = method('del');



export const load = (folder: string, options: LoadOptions = {}): KoaRouter => {
    const extname = options.extname || '.{js,ts}'
    glob.sync(require('path').join(folder, `./**/*${extname}`)).forEach(item => require(item));
    return router;
}

export const middlewares = (middlewares: Koa.middlewares[]) => {
    return target => {
        target.prototype.middlewares = middlewares;
    }
}
```



2.路由使用,./routes/user.ts

```bash
import * as Koa from 'koa'
import { get, post, middlewares } from '../utils/decors'
import model from '../model/user'

const users = [{ name: 'tom' }];
const api = {
    findByName(name) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (name === 'xia') {
                    reject('用户已存在')
                } else {
                    resolve()
                }
            }, 500)
        })
    }
}
//类装饰器
@middlewares([
    async function guard(ctx: Koa.Context, next: () => Promise<any>) {
        console.log('guard', ctx.header);
        if (ctx.header.token) {
            await next()
        } else {
            throw '请登录'
        }
    }
])

export default class User {
    /**
     * @router get /api/user/list
     * @param {*} ctx 
     */

    @get('/users')
    public async list(ctx: Koa.Context) {
        const users = await model.findAll()
        ctx.body = { ok: 1, data: users }
    }

    @post('/users', {
        middlewares: [
            async function validation(ctx: Koa.Context, next: () => Promise<any>) {
                // 用户名必填
                const name = ctx.request.body.name.trim()
                if (!name) {
                    throw "请输入用户名";
                }
                // 用户名不能重复
                try {
                    await api.findByName(name);
                    // 校验通过
                    await next();
                } catch (error) {
                    throw error;
                }
            }
        ]
    })
    public add(ctx: Koa.Context) {
        users.push(ctx.request.body)
        ctx.body = { ok: 1 }
    }
}
```

入口文件index.ts

```bash
import { load } from './utils/decors'
const router = load(resolve(__dirname, './routes'))
const app = new Koa();
app.use(router.routes());
```

#### 3）数据校验——validation

利用中间件机制实现

1.方法级别路由守卫

- utils/decors.ts

```bash
const decorate = (method: HTTPMethod, path: string, options: RouterOptions = {}, router: KoaRouter) => {
    return (target, property: string) => {
        //处理成异步
        process.nextTick(() => {
            //添加中间件
            const mws = [];
            //若设置了中间选项则加入到中间件数组
            if (options.middlewares) {
                mws.push(...options.middlewares)
            }
            //添加路由处理器
            mws.push(target[property])
            const url = options.prefix ? options.prefix + path : path
            router[method](url, target[property])
        })
    }
}
```

- routes/user.ts

```bash
const api = {
    findByName(name) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (name === 'xia') {
                    reject('用户已存在')
                } else {
                    resolve()
                }
            }, 500)
        })
    }
}
export default class User {
    @post('/users', {
        middlewares: [
            async function validation(ctx: Koa.Context, next: () => Promise<any>) {
                // 用户名必填
                const name = ctx.request.body.name.trim()
                if (!name) {
                    throw "请输入用户名";
                }
                // 用户名不能重复
                try {
                    await api.findByName(name);
                    // 校验通过
                    await next();
                } catch (error) {
                    throw error;
                }
            }
        ]
    })
    public add(ctx: Koa.Context) {
        users.push(ctx.request.body)
        ctx.body = { ok: 1 }
    }
}
```

2.类级别路由守卫

- utils/decors.ts

```bash
const decorate = (method: HTTPMethod, path: string, options: RouterOptions = {}, router: KoaRouter) => {
    return (target, property: string) => {
        //处理成异步
        process.nextTick(() => {
            //添加中间件
            const mws = [];
            //获取class上定义的中间件
            if(target.middlewares) {
                mws.push(...target.middlewares)
            }
            //添加路由处理器
            mws.push(target[property])
            const url = options.prefix ? options.prefix + path : path
            router[method](url, target[property])
        })
    }
}
//增加中间装饰器
export const middlewares = (middlewares: Koa.middlewares[]) => {
    return target => {
        target.prototype.middlewares = middlewares;
    }
}
```

- routes/user.ts

```bash
//类装饰器
@middlewares([
    async function guard(ctx: Koa.Context, next: () => Promise<any>) {
        console.log('guard', ctx.header);
        if (ctx.header.token) {
            await next()
        } else {
            throw '请登录'
        }
    }
])
export default class User {}
```

#### 4）数据库整合——models

1.安装相关依赖

```bash
npm i sequelize sequelize-typescript reflect-metadata mysql2 -S
```

2.初始化，index.ts

```bash
import { Sequelize } from 'sequelize-typescript'

const database = new Sequelize({
    host: 'localhost',
    port: 3306,
    database: 'test',
    username: 'root',
    password: 'QXFY105729',
    dialect: 'mysql',
    modelPaths: [`${__dirname}/model`],
    operatorsAliases: false
})
```

3.创建模型，model/user.js

```bash
import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({ modelName: 'users' })
export default class User extends Model<User> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER
    })
    public id: number

    @Column(DataType.CHAR)
    public name: string
}
```

4.使用模型，routes/user.ts

```bash
import model from '../model/user'
export default class User {
    /**
     * @router get /api/user/list
     * @param {*} ctx 
     */

    @get('/users')
    public async list(ctx: Koa.Context) {
        const users = await model.findAll()
        ctx.body = { ok: 1, data: users }
    }
}   
```

#### 案例：

张紫月：https://github.com/lichangwei/koa-router-decorators

#### 作业：日志应用和切面AOP实现

参考：https://cnpmjs.org/package/egg-swagger-decorator

表单校验：koa-bouncer中间件实现

- **<font color='red'>什么是AOP？</font>**

  AOP(面向切面编程)的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。把这些功能抽离出来之后， 再通过“动态织入”的方式掺入业务逻辑模块中。

- **<font color='red'>AOP能给我们带来什么好处？</font>**

  AOP的好处首先是可以保持业务逻辑模块的纯净和高内聚性，其次是可以很方便地复用日志统计等功能模块。

- **<font color='red'>JavaScript实现AOP的思路？</font>**

  通常，在 JavaScript 中实现 AOP，都是指把一个函数“动态织入”到另外一个函数之中，具体的实现技术有很多，下面我用扩展 Function.prototype 来做到这一点。请看下面代码：

  ```bash
  Function.prototype.before = function (beforefn) {
    var _self = this; //保存原函数引用
    return function () { //返回包含了原函数和新函数的"代理函数"
     beforefn.apply(this, arguments); //执行新函数，修正this
     return _self.apply(this, arguments); //执行原函数
    }
   };
   Function.prototype.after = function (afterfn) {
    var _self = this;
    return function () {
     var ret = _self.apply(this, arguments);
     afterfn.apply(this, arguments);
     return ret;
    }
   };
   var func = function () {
    console.log("2")
   }
   func = func.before(function () {
    console.log("1");
   }).after(function () {
    console.log("3");
   } )
   func();//123
  ```

  

## 九、部署

### 1. 常规

#### 1）cluster模块

作用：如何构建一个高可用的node环境

> 主要解决问题：
>
> - 故障恢复
> - 多核利用
> - http://www.sohu.com/a/247732550_796914
> - 多进程共享端口

- **cluster/app.js**

```bash
const Koa = require('koa')
//创建一个koa对象表示web app本身
const app = new Koa();

//对于任何请求，app将调用该异步函数处理请求
app.use(async (ctx, next) => {
    //随机产生错误
    Math.random() > 0.9 ? aaaaaa() : '2'
    await next();
    ctx.response.type = 'text/html'
    ctx.response.body = '<h1>hello koa2</h1>'
})

//!module.parent用于在没有require的情况下直接运行某段代码，如果是被require的，则不执行。
if (!module.parent) {
    //直接执行：nodemon app.js
    app.listen(3000)
    console.log('app started at port 3000');

} else {
    //引入到别的文件，执行别的文件
    module.exports = app
}
```

- **cluster/test.js**

```bash
var http = require('http')
setInterval(async () => {
    try {
        await http.get('http://localhost:3000')
    } catch (error) {

    }
}, 1000)
```

- **cluster/cluster.js**

```bash
const cluster = require('cluster')
const os = require('os')//获取CPU数量
const numCpus = os.cpus().length;

const process = require('process')

console.log('numCpus:', numCpus)


let workers = {}

if (cluster.isMaster) {
    //主进程分支
    cluster.on('death', function (worker) {
        //当一个工作进程结束时，重启工作进程
        worker = cluster.fork()
        workers[worker.pid] = worker
    })


    //初始开启与cpu数量相同的工作进程
    for (var i = 0; i < numCpus; i++) {
        var worker = cluster.fork()//每有一个内核，就复制一个进程出来
        workers[worker.pid] = worker
    }
} else {
    //工作进程分支，启动服务
    const app = require('./app')
    app.use(async (ctx, next) => {
        console.log('worker:', cluster.worker.id, ',PID:', process.pid);
        next()
    })
    app.listen(3000)
}
//守护进程
process.on('SIGTERM', function () {
    for (var pid in workers) {
        process.kill(pid)
    }
    process.exit(0)
})

require('./test')

```

#### 2）文件上传至服务器

- **scp（原始）**

```bash
 //上传至服务器
 scp docker-compose.yml root@47.98.252.43:/root/source/ #文件 
 scp -r mini-01 root@47.98.252.43:/root/source/ #文件夹
```

> FTP 基于TCP来传输文件，明文传输用户信息和数据。
>
> SFTP 基于SSH来加密传输文件，可靠性高，可断点续传。
>
> SCP 是基于SSH来加密拷贝文件，但要知道详细目录，不可断点续传。

- **git（实际工作中）**
- **deploy插件（debug）**

#### 3）PM2的应用

- **安装**

```bash
npm install -g pm2
```

- **作用**
  - 内建负载均衡
  - 线程守护，keep alive
  - 0秒停机重载，维护升级的时候不需要停机
  - 现在Linux（stable）&MacOSX（stable）&Windows（stable）多平台支持
  - 停止不稳定的进程（避免无限循环）
  - 控制台检测https://id.keymetrics.io/api/oauth/login#/register
  - 提供HTTP API

- **配置**

```bash
npm install -g pm2
pm2 start app.js --watch -i 2 
// watch 监听文件变化
// -i 启动多少个实例
pm2 stop all
pm2 list
pm2 start app.js -i max # 根据机器CPU核数，开启对应数目的进程


- 配置process.yml
 apps:
  - script : app.js
    instances: 2
    watch  : true
    env    :
      NODE_ENV: production
      
      
- Keymetrics在线监控
https://id.keymetrics.io
pm2 link 8hxvp4bfrftvwxn uis7ndy58fvuf7l TARO-SAMPLE

- pm2设置为开机启动
pm2 startup
```

#### 4）nginx反向代理+前端打包dist

	- **安装**

```bash
yum install nginx
-----
apt update
apt install nginx
```

	- **添加静态路由**

```bash
# /etc/nginx/sites-enable
# taro
server {
    listen 80;
    server_name taro.josephxia.com;
    location / {
        root /root/source/taro-node/dist;
        index index.html index.htm;
    }
    location ~ \.(gif|jpg|png)$ {
        root /root/source/taro-node/server/static;
	} 
  location /api {
    proxy_pass  http://127.0.0.1:3000;
    proxy_redirect     off;
    proxy_set_header   Host  $host;
    proxy_set_header   X-Real-IP  $remote_addr;
    proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
  }
}
```

- **nginx命令**

```bash
# 验证Nginx配置 
nginx -t
# 重新启动Nginx 
service nginx restart
----
nginx -s reload
```

### 2. docker

https://yeasy.gitbooks.io/docker_practice/container/run.html

#### 1）docker概念

- 操作系统层面的虚拟化技术
- 隔离的进程独立于宿主和其它的隔离进程-容器
- GO语言开发

#### 2）特点

- 高效的利用系统资源
- 快速的启动时间
- 一致的运行环境
- 持续交付和部署
- 更轻松的迁移

#### 3）对比传统虚拟机总结

![docker](/pic/docker.png)

#### 4）三个核心概念

- 镜像
- 容器
- 仓库

#### 5）docker基本使用

1. **构建一个nginx服务器**

   - 拉取官方镜像

   ```bash
   # 拉取官方镜像
   docker pull nginx
   
   # 启动镜像
   mkdir www
   echo 'hello docker！！！' >> www/index.html
   
   # 启动
   # www目录里面放一个index.html
   docker run -p 80:80 -v $PWD/www:/usr/share/nginx/html -d nginx
   
   # 查看进程
   docker ps
   docker ps -a //查看全部
   
   # 伪终端 ff6容器的uuid
   # -t 选项让Docker分配一个伪终端(pseudo-tty)并绑定到容器的标准输入上， 
   # -i 则让容器的标准输入保持打开
   docker exec -it ff6 /bin/bash
   
   # 停止
   docker stop ff6
   
   # 删除镜像
   docker rm ff6
   ```

#### 6）dockerfile定制镜像

- **创建Dockerfile文件**

  ```bash
   #docker/nginx/Dockerfile
  FROM nginx:latest
  RUN echo '<h1>Hello, Kaikeba!</h1>' > /usr/share/nginx/html/index.html
  ```

- **定制镜像**

  ```bash
  # 定制镜像-nginx下执行
  docker build -t mynginx .
  ```

- **运行**

  ```bash
  # 运行-nginx 下运行
  # -d 守护态运行
  docker run -p 80:80 -d mynginx
  ```

- **定制一个程序nodejs镜像**

  ```bash
  # 创建node文件
  cd node
  npm init -y
  npm i koa -S
  
  # package.json
  {
    "name": "node",
    "version": "1.0.0",
    "description": "",
    "main": "app.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "koa": "^2.7.0"
    }
  }
  
  # app.js
  const Koa = require('koa')
  const app = new Koa()
  app.use(ctx => {
      Math.random() > 0.8 ? abc() : ''
      ctx.body = 'hello dockernode'
  })
  
  app.listen(3000, () => {
      console.log('启动成功');
  })
  
  # Dockerfile文件
  # 制定node镜像的版本
  FROM node:10-alpine 
  # 移动当前目录下面的文件到app目录下 
  ADD . /app/ 
  # 进入到app目录下面，类似cd 
  WORKDIR /app
  # 安装依赖
  RUN npm install
  # 对外暴露的端口
  EXPOSE 3000
  # 程序启动脚本
  CMD ["node", "app.js"]
  
  # 定制镜像
  docker build -t mynode .
  
  # 运行
  docker run -p 3000:3000 -d mynode
  ```

- **pm2——利用多核资源**

  ```bash
  # pm2/.dockerignore
  node_modules
  
  # pm2/process.yml
  apps:
    - script : app.js
      instances: 2
      watch  : true
      env    :
        NODE_ENV: production
  
  # pm2/Dockerfile
  FROM keymetrics/pm2:latest-alpine
  WORKDIR /usr/src/app
  ADD . /usr/src/app
  RUN npm config set registry https://registry.npm.taobao.org/ && npm i
  EXPOSE 3000
  # pm2在docker中使用命令为pm2-docker
  CMD ["pm2-runtime", "start", "process.yml"]
   
  # 定制镜像
  docker build -t mypm2 .
  
  # 运行
  docker run -p 3000:3000 -d mypm2
  ```

#### 7）docker-compose

- **创建docker-compose.yml**

  ```bash
  #docker-compose.yml
  app-pm2:
      container_name: app-pm2 
      #构建容器
      build: .
      # volumes:
      # - .:/usr/src/app 
      ports:
            - "3000:3000"
  
  ```

  ```bash
  # 项目中实际用到
  version: '3.1'
  services:
    mongo:
      image: mongo
      restart: always
      ports:
          - 27017:27017
    mongo-express:
      image: mongo-express
      restart: always
      ports:
        - 8081:8081
    mysql:
      image: mysql
      command: --default-authentication-plugin=mysql_native_password
      restart: always
      environment:
        MYSQL_ROOT_PASSWORD: example
      ports:
        - 3306:3306
    adminer:
      image: adminer
      restart: always
      ports:
        - 8080:8080
    redis:
      image: redis
      ports:
        - "6379:6379" 
  ```

  

- **运行**

  ```bash
  docker-compose up
  ```

- **后台运行**

  ```bash
  docker-compose up -d
  ```

- **结束**

  ```bash
  docker-compose down
  ```

- **部署Mongo+MongoExpress**

  ```bash
  #docker-compose.yml
  version: '3.1'
  services:
    mongo:
      image: mongo
      restart: always
      ports:
        - 27017:27017
    mongo-express:
      image: mongo-express
      restart: always
      ports:
  - 8081:8081
  
  # const mongoose = require("mongoose");
  // 1.连接
  mongoose.connect("mongodb://mongo:27017/test", { useNewUrlParser: true }); const conn = mongoose.connection;
  conn.on("error", () => console.error("连接数据库失败"));
  
  # app.js
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://mongo:27017/test', {useNewUrlParser: true});
  const Cat = mongoose.model('Cat', { name: String });
  Cat.deleteMany({})
  const kitty = new Cat({ name: 'Zildjian' });
  kitty.save().then(() => console.log('meow'));
  
  app.use(async ctx => {
      ctx.body = await Cat.find()
  })
  ```

#### 8）GitHub WebHook实现CI持续集成

​		启动Nodejs监听

```bash
# webhooks.js
var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/webhooks', secret: 'myHashSecret' })
// 上面的 secret 保持和 GitHub 后台设置的一致

function run_cmd(cmd, args, callback) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) { resp += buffer.toString(); });
    child.stdout.on('end', function () { callback(resp) });
}
// debug用
// run_cmd('sh', ['./deploy-dev.sh'], function(text){ console.log(text) });

http.createServer(function (req, res) {

    handler(req, res, function (err) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(7777,() =>{
    console.log('WebHooks Listern at 7777');
})

handler.on('error', function (err) {
    console.error('Error:', err.message)
})


// handler.on('*', function (event) {
//     console.log('Received *', event.payload.action);
//     //   run_cmd('sh', ['./deploy-dev.sh'], function(text){ console.log(text) });
// })

handler.on('push', function (event) {
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref);
        // 分支判断
        if(event.payload.ref === 'refs/heads/master'){
            console.log('deploy master..')
            run_cmd('sh', ['./deploy-dev.sh'], function(text){ console.log(text) });

        }
})


// handler.on('issues', function (event) {
//     console.log('Received an issue event for % action=%s: #%d %s',
//         event.payload.repository.name,
//         event.payload.action,
//         event.payload.issue.number,
//         event.payload.issue.title)
// })


```

> 扩展
>
> 1. plugin
>
> 3. restful服务
>
> 4. 模板引擎
>
> 5. easymock
>
> 6. 表单校验
>
> 10. 图形验证码
>
> 11. 发送短信
>
> 12. 前后端统一开发
>
> 13. 阿里云ECS
> 14. ssh公私钥
> 15. sftp上传
> 16. webstore同步插件
> 17. 域名解析
> 18. nodejs
> 19. MongoDB