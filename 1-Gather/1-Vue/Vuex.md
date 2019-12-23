# vuex学习
## 1.vue及引入CDN

引入CDN上的vue版本
```
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>//稳定版本，以防造成不可避免的错误
```

## 2.什么是vuex
- **主要应用于vue.js中管理数据状态的一个库**
- **通过创建一个集中的数据存储，供程序中所有组件访问**
    下图的store可以理解为‘单一的数据源’
![vuex-store](/pic/store.jpg)
- **单一使用vue.js的场景**

这种组件之间相互传参非常麻烦，子组件需要通过prop来接收父组件传来的参数，而子组件给父组件传参的时候，需要$emit事件通知父组件，而父组件需要$on监听参数的传递
![vuex-store](/pic/component.jpg)
- **使用vuex.js的场景**
![vuex-store](https://i.loli.net/2019/12/23/fciDFBMeksnZRIL.png)

## 3.搭建vuex中央状态管理
- **安装vuex**
```
cnpm install --save vuex
```
- **store.js文件——存储数据state**

Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）：
```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [
      {name: '马云', price: 200,id:1},
      {name: '马化腾', price: 140,id:2},
      {name: '马冬梅', price: 20,id:3},
      {name: '马蓉', price: 10,id:4},
    ]
  },
  mutations: {

  },
  actions: {

  }
})
```

- **main.js文件**

```
//引入store.js
import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  //// 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  render: h => h(App)
}).$mount('#app')
```
## 4.使用computed获取store数据
- **组件中获取store中的数据**
```
export default {
    name: "ProductListOne",
    data() {
        return {}
    },
    computed: {
        products() {
            return this.$store.state.products;
        }
    },
}
```

## 5.Vuex-Getters——获取数据
```
//store.js-处理state中的数据
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //状态
  state: {
    products: [
      {name: '马云', price: 200,id:1},
      {name: '马化腾', price: 140,id:2},
      {name: '马冬梅', price: 20,id:3},
      {name: '马蓉', price: 10,id:4},
    ]
  },
  //
  getters:{
    saleProducts:(state)=>{
      var saleProducts=state.products.map(item=>{
        return {
          name:"**"+item.name+"**",
          price:item.price/2
        }
      })
      return saleProducts;
    }
  },
  mutations: {

  },
  actions: {

  }
})
//组件中获取调用getters中的方法
import {mapGetters} from 'vuex';
computed: {
    //取state中的数据
    products() {
        return this.$store.state.products;
    },
    //取getters返回的数据
    //saleProducts(){
        //return this.$store.getters.saleProducts;
    //},//等同于下面
    ...mapGetters([
        "saleProducts"
    ])
},

```
## 6.Vuex-Mutations——操作数据
谷歌安装有插件：vue.js devtools
- 一条重要的原则就是要记住 mutation 必须是同步函数。
- 现在想象，我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。
```
//store.js——mutation
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //状态
  state: {
    products: [
      {name: '马云', price: 200,id:1},
      {name: '马化腾', price: 140,id:2},
      {name: '马冬梅', price: 20,id:3},
      {name: '马蓉', price: 10,id:4},
    ]
  },
  //
  getters:{
    saleProducts:(state)=>{
      var saleProducts=state.products.map(item=>{
        return {
          name:"**"+item.name+"**",
          price:item.price/2
        }
      })
      return saleProducts;
    }
  },
  mutations: {
    reducePrice:state=>{
      state.products.forEach(item=>{
        item.price-=1
      })
    }
  },
  actions: {

  }
})
//组件中调用点击事件
import {mapMutations} from 'vuex';
methods: {
    reducePrice() {
        //vuex中严格模式下，会报错，不允许去修改数据
        //this.$store.state.products.forEach(item=>{
        //    item.price-=1
        //})
        //这种方式在严格模式下是可以的
        this.$store.commit('reducePrice')//这个名称是mutation中定义的方法的名称
    },//等同于下面
    ...mapMutations([
        "reducePrice"
    ]),
}
```
## 7.Vuex-action——触发事件去改变数据
**Action 类似于 mutation，不同在于：**
- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。
```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict:true,//严格模式
  //状态
  state: {
    products: [
      {name: '马云', price: 200,id:1},
      {name: '马化腾', price: 140,id:2},
      {name: '马冬梅', price: 20,id:3},
      {name: '马蓉', price: 10,id:4},
    ]
  },
  //
  getters:{
    saleProducts:(state)=>{
      var saleProducts=state.products.map(item=>{
        return {
          name:"**"+item.name+"**",
          price:item.price/2
        }
      })
      return saleProducts;
    }
  },
  mutations: {
    reducePrice:(state,payload)=>{
      state.products.forEach(item=>{
        item.price-=payload
      })
    }
  },
  actions: {//异步方法也没关系，也可以做记录
    reducePrice:(context,payload)=>{
      setTimeout(function(){
        //context相当于this.$store
        context.commit('reducePrice',payload)
      },2000)
    }
  }
})
```
**分发 Action**

Action 通过 store.dispatch 方法触发：

乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？实际上并非如此，还记得 mutation 必须同步执行这个限制么？Action 就不受约束！我们可以在 action 内部执行异步操作：
```
//组件中分发
import {mapActions} from 'vuex';
methods: {
    reducePrice(amount) {//传参
        //vuex中严格模式下，会报错，不允许去修改数据
        //this.$store.state.products.forEach(item=>{
        //    item.price-=1
        //})
        //这种方式在严格模式下是可以的
        //调用的是mutation里的方法——一般写代码都不直接提交，除非明知是同步操作，没有后台请求
        //this.$store.commit('reducePrice')//这个名称是mutation中定义的方法的名称
        //调用action中的方法——完美套路
        this.$store.dispatch('reducePrice',amount)//这个名称是action中定义的方法的名称
    },//等同于
    ...mapActions([
        "reducePrice"
    ])
},
```
## 8.Vuex-Mapping Actions&Getters

```
cnpm i babel-preset-stage-2 --save-dev
```
你在组件中使用 this.$store.dispatch('xxx') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）：
```
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```
## 9.Vuex-module