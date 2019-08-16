# 自动化测试

## 一、为什么需要测试

1. 测试可以确保得到预期的结果
2. 作为现有代码行为的描述
3. 促使开发者写可测试的代码，一般可测试的代码可读性也会高一点
4. 如果依赖的组件有修改，受影响的组件能在测试中发现错误

## 二、测试分类

常见的开发流程里，都有测试人员，这种我们成为黑盒测试，测试人员不管内部实现机制，只看最外层的输入输 出，比如你写一个加法的页面，会设计N个case，测试加法的正确性，这种代码里，我们称之为E2E测试

更负责一些的 我们称之为集成测试，就是集合多个测试过的单元一起测试 还有一种测试叫做白盒测试，我们针对一些内部机制的核心逻辑 使用代码 进行编写 我们称之为单元测试 这仨都是我们前端开发人员进阶必备的技能

我们其实日常使用console，算是测试的雏形吧，console.log(add(1,2) == 3)

- **测试的好处：**组件的单元测试有很多好处:

  - 提供描述组件行为的文档 
  - 节省手动测试的时间 
  - 减少研发新特性时产生的 bug
  - 改进设计
  - 促进重构

  自动化测试使得大团队中的开发者可以维护复杂的基础代码。让你改代码不再小心翼翼

### 1.单元测试（Unit Tests）

- #### **概念**

指的是以原件的单元为单位，对软件进行测试。单元可以是一个函数，也可以是一个模块或一个组件，基本特征就是只要输入不变，必定返回同样的输出。一个软件越容易写单元测试，就表明它的模块化结构越好，给模块之间的耦合越弱。React的组件化和函数式编程，天生适合进行单元测试

> 单元测试(unit testing)，是指对软件中的最小可测试单元进行检查和验证。



在Vue中，推荐使用Mocha+chai或者jest，咱们使用`jestjs`演示，语法基本一致

```js
//kaikeba.spec.js  .spec.js是命名规范
 function add(num1, num2) {
    return num1 + num2
}
describe('Kaikeba', () => { 
  it('测试加法', () => {
    expect(add(1, 3)).toBe(3)
    expect(add(1, 3)).toBe(4)
    expect(add(-2, 3)).toBe(1)
	}) 
})
```

执行`npm run test:unit`

- #### **api介绍**

  - describe : 定义一个测试套件
  - it :定义一个测试用例
  - expect :断言的判断条件
  - toBe :断言的比较结果

- #### **测试Vue组件**（**用户点击**）

  1. ##### 创建项目

     ```js
     vue create test-vue
     ```

     > 做如下选择：
     >
     > - Manually select features
     > - Babel，Linter/Formatter，Unit Testing，E2E Testing
     > - jest

  2. ##### 配置husky

     > 作用：每次提交代码之前会先跑单测的代码，通过之后才可以提交成功

     ```js
     //安装
     cnpm i husky --save-dev
     
     //package.json
     
     "husky": {
         "hooks": {
           "pre-commit": "npm run test:unit"
         }
     },
       "devDependencies": {
         "@vue/cli-plugin-babel": "^3.10.0",
         "@vue/cli-plugin-e2e-cypress": "^3.10.0",
         "@vue/cli-plugin-eslint": "^3.10.0",
         "@vue/cli-plugin-unit-jest": "^3.10.0",
         "@vue/cli-service": "^3.10.0",
         "@vue/test-utils": "1.0.0-beta.29",
         "babel-core": "7.0.0-bridge.0",
         "babel-eslint": "^10.0.1",
         "babel-jest": "^23.6.0",
         "eslint": "^5.16.0",
         "eslint-plugin-vue": "^5.0.0",
         "husky": "^3.0.3",
         "sass": "^1.18.0",
         "sass-loader": "^7.1.0",
         "vue-template-compiler": "^2.6.10"
       }
     ```

  3. ##### 案例

  > **用户点击**：和写vue 没啥本质区别，只不过我们用测试的角度去写代码，vue提供了专门针对测试的 @vue/test-utils

  ```js
  //kaikeba.vue
  <template>
    <div>
      <h2>{{message}}</h2>
      <button @click="changeMsg">点击更改</button>
    </div>
  </template>
  
  <script>
  export default {
    data () {
      return {
        message: 'vue-test'
      }
    },
    created () {
      this.message = 'created-test'
    },
    methods: {
      changeMsg () {
        this.message = 'methods-test'
      }
    }
  }
  </script>
  
  <style>
  </style>
  
  //kaikeba.spec.js
  import Vue from 'vue'
  import KaikebaComp from '@/components/kaikeba.vue'
  import {
    mount
  } from '@vue/test-utils'
  describe('测试开课吧vue组件', () => {
    it('初始化的message', () => {
      let data = KaikebaComp.data()
      expect(data.message).toBe('vue-test')
    })
  
    it('生命周期created的message', () => {
      let vm = new Vue(KaikebaComp).$mount()
      expect(vm.message).toBe('created-test')
    })
    //用户点击
    it('按钮点击之后的message', () => {
      let wrapper = mount(KaikebaComp)
      wrapper.find('button').trigger('click')
      expect(wrapper.vm.message).toBe('methods-test')
    })
  })
  ```

  4. ##### 异步的单元测试

     async/await

     resolve

  5. ##### vue源码如何入手学习

     > 1. Package.json
     >
     >    ```js
     >    "scripts":{
     >      "build": "node scripts/build.js",
     >    }
     >    ```
     >
     > 2. scripts/build.js
     >
     >    ```js
     >    let builds = require('./config').getAllBuilds()
     >    ```
     >
     > 3. scripts/config.js
     >
     >    ```js
     >    // Runtime+compiler development build (Browser)
     >    'web-full-dev': {
     >        entry: resolve('web/entry-runtime-with-compiler.js'),
     >        dest: resolve('dist/vue.js'),
     >        format: 'umd',
     >        env: 'development',
     >        alias: { he: './entity-decoder' },
     >        banner
     >    },
     >    ```
     >
     > 4. src/platforms/web/entry-runtime-with-compiler.js
     >
     >    ```js
     >    import Vue from './runtime/index'
     >    ```
     >
     > 5. src/platforms/web/runtime/index
     >
     >    ```js
     >    import Vue from 'core/index'
     >    ```
     >
     > 6. src/core/index
     >
     >    ```js
     >    import Vue from './instance/index'
     >    ```
     >
     > 7. src/core/instance/index
     >
     >    这是vue的入口文件

- #### **测试覆盖率**

  ```js
  //package.json
  "jest": {
      "collectCoverage": true,
      "collectCoverageFrom": ["src/**/*.{js,vue}"]
  }
  ```

  执行`npm run test:unit`

  ![测试覆盖率](/Users/qiaoxu/Desktop/myBlog/pic/test.png)

- #### **TDD**

  所以TDD就是测试驱动开发模式，就是我们开发一个新功能，先把测试写好，然后测试跑起来，会报错，我们再开始写代码，挨个把测试跑绿，功能也就完成了

- #### **React自动化测试**

  react中也是使用jest来做自动化测试的

  https://jestjs.io/docs/en/tutorial-react

- #### **Node自动化测试**

  node中单测，除了类似vue中的输入输出测试，node很多都是网络接口数据，我们是如何去测试这些数据的呢。

  - 安装：

  ```js
  //supertest专门用来测试http请求的
  npm i koa jest supertest --save
  ```

  - 测试koa

  ```js
  let request = require('supertest')
  let assert = require('assert')
  let Koa = require('koa')
  
  describe('测试koa', () => {
    let app1 = new Koa()
    app1.context.msg = 'kaikeba'
    let app2 = new Koa()
  
    it('可以合并参数', () => {
      app1.use((ctx, next) => {
        assert.equal(ctx.msg, 'kaikeba')
        ctx.body = 'hi' + ctx.msg
        ctx.status = 200
      })
      return request(app1.listen())
        .get('/')
        .expect('hikaikeba')
        .expect(200)
    })
  })
  ```

  

### 2.端到端测试（E2E Tests）

借用浏览器的能力，站在用户的测试人员的角度，输入框，点击按钮等，完全模拟用户，这个和具体的框架关系不大，完全模拟浏览器行为



端到端测试是最顶层的测试，即完全作为一个用户一样将程序作为一个完全的黑盒，打开应用程序模拟输入，检查功能以及界面是否正确。

端到端测试需要解决的一些问题：

- 环境问题

  即如何保证每次执行测试前的环境是“干净的”，比如需要检查列表为空的表现，如果上一次测试新增了列表，则后一次测试将无法得到列表为空的状态。

  最简单的解决方式是在所有测试执行前或测试执行后调用外部脚本清除数据库等，或者可以通过拦截请求并自定义响应的方式来解决（这样会导致测试复杂度变高，并且不够”真实“）。

- 元素查找

  如果代码经常变动，组件结构经常变化，如果根据DOM结构来查找操作元素，那么你将陷入维护选择器的地狱中。最佳实践是使用test-id的方式，但是这种方式需要开发人员和测试人员配合，在可操作元素上定义语义化的test-id。

- 操作等待

  诸如异步网络请求导致界面变化，或界面动画等，将使得获取操作元素的时机未知。解决方案持续等待直到监听的请求完成，期望的元素成功获取到。

- 使用操作而不是断言

  应该更多的依赖操作，而不是依赖断言。例如如果某个操作依赖元素A存在，你不需要”判断元素A在页面中是否存在”，而应该去”直接获取元素A，并操作”，因为如果元素A不存在，那么肯定将获取不到，断言后的操作将没有意义，因此可以直接使用操作取代断言等待功能。

修改tests/e2e/specs/test.js

```js
describe('端到端测试，抢测试人员的饭碗', () => { it('先访问一下', () => {
  cy.visit('/')
  	// cy.contains('h1', 'Welcome to Your Vue.js App') 
    cy.contains('#message', '开课吧')
  }) 
})
```

执行：`npm run serve`会自动打开浏览器，使用的是Cypresshttps://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell



### 3.集成测试（Integration test）

将多个模块结合在一起进行测试，确保多个组件可以正确交互。当它失败表示你的各个代码块间无法有效协作。

集成测试是指在单元测试的基础上，将已测试过的单元测试函数进行组合集成暴露出的高层函数或类的封装，对这些函数或类进行的测试。

集成测试最大的难点就是颗粒度较大，逻辑更加复杂，外部因素更多，无法保证测试的可控和独立性。解决方式是使用测试桩（测试替身），即将调用的子函数或模块替换掉，即可以隐藏子模块的细节并且可以控制子模块的行为以达到预期的测试。（这里的前提是子模块已经经过完整的单元测试进行覆盖，因此可以假定为子模块状态可知。）



### 4.功能测试

相当于是黑盒测试，测试者不了解程序的内部情况，不需要具备编程语言的专门知识，只知道程序的输入、输出和功能，从用户的角度针对



> vue源码、测试、工程化、规范都值得学习
>
> element单元测试也不错：form.spec.js
>
> koa源码：测试代码