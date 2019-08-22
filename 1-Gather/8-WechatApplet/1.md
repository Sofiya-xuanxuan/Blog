

## 一、实现一个Cli工具 - vue自动路由配置 

> 约定优于定义

### 1.准备工作

```js
mkdir vue-auto-router-cli
cd vue-auto-router-cli
npm init -y
npm i commander download-git-repo ora handlebars -s
```

```js
//vue-auto-router-cli/bin/kkb

#! /usr/bin/env node

console.log('kkb...');

//修改package.json文件
"bin": {
  "kkb": "./bin/kkb"
}
```

```js
npm link

# 删除的情况
ls /usr/local/bin/
rm /usr/local/bin/kkb
```

### 2.bin/kkb

> 引入commander

```js
#! /usr/local/bin node
const program = require('commander')
program.version(require('../package').version, '-v', '--version')
  .command('init <name>', 'init project')
  .command('refresh', 'refresh routers...')
program.parse(process.argv)
```

### 3.bin/kkb-init

- **bin/kkb-init**

```js
#! /usr/local/bin node
const program = require('commander')
program.action(async name => {
  const {
    clone
  } = require('../lib/download')
  await clone('github:su37josephxia/vue-template', name)

})

program.parse(process.argv)
```

- **lib/download.js**

```js
//lib/download.js
const {
  promisify
} = require('util')

module.exports.clone = async function (repo, desc) {
  const download = promisify(require('download-git-repo'))
  const ora = require('ora')
  const process = ora(`正在下载...${repo}`)
  process.start()
  await download(repo, desc)
  process.succeed()
}
```

### 4.bin/kkb-refresh

```js
#! /usr/local/bin node

const program = require('commander')
const symbols = require('log-symbols')
const chalk = require('chalk')
program.action(() => {
  console.log('refresh...');
})
program.parse(process.argv)
const fs = require('fs')
const handlebars = require('handlebars')
const list = fs.readdirSync('./src/views')
  .filter(v => v !== 'Home.vue')
  .map(v => ({
    name: v.replace('.vue', '').toLocaleLowerCase,
    file: v
  }))

compile({
  list
}, './src/router.js', './template/router.js.hbs')
compile({
  list
}, './src/App.vue', './template/App.vue.hbs')

function compile(mata, filePath, templatePath) {
  if (fs.existsSync(templatePath)) {
    const content = fs.readFileSync(templatePath).toString()
    const result = handlebars.compile(content)(mata)
    fs.writeFileSync(filePath, result)
  }
  console.log(symbols.success, chalk.green(`🚀${filePath} 创建成功`))
}
```

### 5.发布

> 根目录下创建publish.sh文件
>
> 发布完成后，这个自己实现的cli工具，就可以在npm网站上看到了，开源的，别人也可以使用

```js
#!/usr/bin/env bash
npm config get registry # 检查仓库镜像库
npm config set registry=http://registry.npmjs.org
echo '请进行登录相关操作：'
npm login # 登陆
echo "-------publishing-------"
npm publish # 发布
npm config set registry=https://registry.npm.taobao.org # 设置为淘宝镜像
echo "发布完成"
exit
```

## 二、实现零编码Restful后台 

> 约定优于定义——keystone等

### 1.conf.js

```js
module.exports = {
  db: {
    url: "mongodb://localhost:27017/test",
    options: {
      useNewUrlParser: true
    }
  }
}
```

### 2.model/user.js

```js
module.exports = {
  schema: {
    mobile: {
      type: String,
      required: true
    },
    realName: {
      type: String,
      required: true
    }
  }
}
```

### 3.入口文件index.js

```js
const Koa = require('koa')
const app = new Koa()

//初始化数据库
const config = require('./conf')
const {
  loadModel
} = require('./framework/loader')
loadModel(config)(app)

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

const router = require('./framework/router')
app.use(router)

const port = 3000
app.listen(port, () => {
  console.log('启动');
})
```

### 4.framewor/loader.js

```js
const fs = require('fs')
const path = require('path')

const mongoose = require('mongoose')

function load(dir, cb) {
  //获取绝对路径
  const url = path.resolve(__dirname, dir)
  const files = fs.readdirSync(url)
  files.forEach(filename => {
    //去掉文件的后缀名
    filename = filename.replace('.js', '')
    //导入文件
    const file = require(url + '/' + filename)
    //处理逻辑
    cb(filename, file)
  })
}

const loadModel = config => app => {
  mongoose.connect(config.db.url, config.db.options)
  const conn = mongoose.connection
  conn.on('error', () => console.log('数据库连接错误'))
  app.$model = {}
  load('../model', (filename, {
    schema
  }) => {
    console.log('load model' + filename, schema);
    app.$model[filename] = mongoose.model(filename, schema)
  })
}

module.exports = {
  loadModel
}
```

### 5.framework/router.js

```js
const router = require('koa-router')()

const {
  init,
  get,
  create,
  update,
  del
} = require('./api')

router.get('/api/:list', init, get)
router.get('/api/:list', init, create)
router.get('/api/:list/:id', init, update)
router.get('/api/:list/:id', init, del)

module.exports = router.routes()
```

### 6.framework/api.js

```js
module.exports = {
  async init(ctx, next) {
    console.log(ctx.params);
    const model = ctx.app.$model[ctx.params.list]
    if (model) {
      ctx.list = model
      await next()
    } else {
      ctx.body = 'no this model'
    }
  },
  async get(ctx) {
    ctx.body = await ctx.list.find({})
  },
  async create(ctx) {
    const res = await ctx.list.create(ctx.request.body)
    ctx.body = res
  },
  async update(ctx) {
    const res = await ctx.list.updateOne({
      _id: ctx.params.id
    }, ctx.request.body)

    ctx.body = res
  },
  async del(ctx) {
    const res = await ctx.list.deleteOne({
      _id: ctx.params.id
    })
    ctx.body = res
  },
  async page(ctx) {
    ctx.body = await ctx.list.find({})
  }
}
```



## 三、设计模式  

> http://c.biancheng.net/view/1383.html

设计模式(Design Pattern)是前辈们对代码开发经验的总结，是解决特定问题的一系列套路。它不是语法规定， 而是一套用来提高代码可复用性、可维护性、可读性、稳健性以及安全性的解决方案。 1995 年，GoF(Gang of Four，四人组/四人帮)合作出版了《设计模式:可复用面向对象软件的基础》一书，共收录了 23 种设计模式，从 此树立了软件设计模式领域的里程碑，人称「GoF设计模式」。 这 23 种设计模式的本质是面向对象设计原则的实 际运用，是对类的封装性、继承性和多态性，以及类的关联关系和组合关系的充分理解。

### 1.观察者模式 - 数据绑定 

观察者(Observer)模式的定义:指多个对象间存在一对多的依赖关系，当一个对象的状态发生改变时，所有依 赖于它的对象都得到通知并被自动更新。这种模式有时又称作发布-订阅模式、模型-视图模式，它是对象行为型模 式。

1. 降低了目标与观察者之间的耦合关系，两者之间是抽象耦合关系。
2. 目标与观察者之间建立了一套触发机制。

### 2.策略模式 - 数据有效性检查

策略(Strategy)模式的定义:该模式定义了一系列算法，并将每个算法封装起来，使它们可以相互替换，且算法 的变化不会影响使用算法的客户。策略模式属于对象行为模式，它通过对算法进行封装，把使用算法的责任和算法 的实现分割开来，并委派给不同的对象对这些算法进行管理。

1. 多重条件语句不易维护，而使用策略模式可以避免使用多重条件语句。

2. 策略模式提供了一系列的可供重用的算法族，恰当使用继承可以把算法族的公共代码转移到父类里面，从而

   避免重复的代码。

3. 策略模式可以提供相同行为的不同实现，客户可以根据不同时间或空间要求选择不同的。

4. 策略模式提供了对开闭原则的完美支持，可以在不修改原代码的情况下，灵活增加新算法。

5. 策略模式把算法的使用放到环境类中，而算法的实现移到具体策略类中，实现了二者的分离。

思考一下这个怎么搞



