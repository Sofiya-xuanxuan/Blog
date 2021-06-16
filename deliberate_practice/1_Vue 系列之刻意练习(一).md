# Vue 系列之刻意练习(一)

### 使用Vue.extend方式实现create方法





### 1.v-if和v-for哪个优先级更高？如果两个同时出现，应该怎么优化得到更好的性能？

**从vue源码出发**

位置：compiler/codegen/index.js

> 从如下源码可看出，判断条件会先执行for循环，然后才会执行if条件

```js
if (el.staticRoot && !el.staticProcessed) {
  return genStatic(el, state)
} else if (el.once && !el.onceProcessed) {
  return genOnce(el, state)
} else if (el.for && !el.forProcessed) {
  return genFor(el, state)
} else if (el.if && !el.ifProcessed) {
  return genIf(el, state)
} else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
  return genChildren(el, state) || 'void 0'
} else if (el.tag === 'slot') {
  return genSlot(el, state)
} else {
  // component or element
  let code
  if (el.component) {
    code = genComponent(el.component, el, state)
  } else {
    let data
    if (!el.plain || (el.pre && state.maybeComponent(el))) {
      data = genData(el, state)
    }

    const children = el.inlineTemplate ? null : genChildren(el, state, true)
    code = `_c('${el.tag}'${
    data ? `,${data}` : '' // data
  }${
    children ? `,${children}` : '' // children
  })`
  }
  // module transforms
  for (let i = 0; i < state.transforms.length; i++) {
    code = state.transforms[i](el, code)
  }
  return code
}
```



**两者同级，渲染函数如下**



**两者不同级，渲染函数如下：**



**总结：**

- 显然v-for优先于v-if被解析
- 如果同时出现，每次渲染都会先执行循环再判断条件，无论如何循环都不可避免，浪费了性能
- 要避免出现这种情况，则在外层嵌套template，在这一层进行v-if判断，然后再内部进行v-for循环

### 2.Vue组件data选项为什么必须是个函数而Vue的根实例则没有此限制

**从源码出发**

位置：src/core/instance/state.js-initData()

> 函数每次执行都会返回全新data对象实例



**总结**

Vue组件可能存在多个实例，如果使用对象形式定义data，则会导致它们共用一个data对象，那么状态变更将会影响所有组件实例，这是不合理的；采用函数形式定义，在initData时会将其作为工厂函数返回全新data对象，有效规避多实例之间状态污染问题。而在Vue根实例创建过程中则不存在该限制，也是因为根实例只能有一个，不需要担心这种情况。

### 3.你知道vue中key的作用和工作原理吗？说说你对它的理解

**从源码出发**

位置：src/core/vdom/patch.js-updateChildren()



**总结**

- key的作用主要是为了高效的更新虚拟DOM，其原理是vue在patch过程中通过key可以精准判断两个节点是否是同一个，从而避免频繁更新不同元素，使得整个patch过程更加高效，减少DOM操作量，提高性能。
- 另外，若不设置key还可能在列表更新时引发一些隐蔽bug
- vue中在使用相同标签名元素的过渡切换时，也会使用到key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。

### 4.你怎么理解vue中的diff算法？

**必要性**

位置：lifecycle.js-mountComponent()

组件中可能存在很多个data中的key使用





**执行方式**

位置：patch.js-patchVnode()

patchVnode是diff发生的地方，整体策略：深度优先，同层比较



**高效性**

位置：patch.js-updateChildren()



**总结**

- diff算法是虚拟DOM技术的必然产物：通过新旧虚拟DOM作对比（即diff），将变化的地方更新在真实DOM上；另外，也需要diff高效的执行对比过程，从而降低时间复杂度为O(n)。
- Vue2.x中为了降低Watcher粒度，每个组件只有一个Watcher与之对应，只有引入diff才能精确找到发生变化的地方。
- vue中diff执行的时刻是组件实例执行其更新函数时，它会比对上一次渲染结果oldVnode和新的渲染结果newVnode，此过程称为patch
- diff过程整体遵循深度优先、同层比较的策略；两个节点之间比较会根据它们是否拥有子节点或者文本节点做不同操作；比较两组子节点是算法的重点，首先假设头尾节点可能相同做4次比对尝试，如果没有找到相同节点才按照通用方式遍历查找，查找结果再按情况处理剩下的节点；借助key通常可以非常精确找到相同节点，因此整个patch过程非常高效。

### 5.谈一谈对vue组件化的理解？

**回答思路**

组件化定义、优点、使用场景和注意事项等方面展开陈述，同时要强调vue中组件化的一些特点。



**组件定义**



**组件化优点**



**组件化实现**



**总结**

- 组件是独立和可复用的代码组织单元。组件系统是Vue核心特性之一，它使开发者使用小型、独立和通常可复用的组件构建大型应用
- 组件化开发能大幅提高应用开发效率、测试性、复用性等
- 组件使用按分类有：页面组件、业务组件就、通用组件
- vue的组件是基于配置的，我们通常编写的组件是组件配置而非组件，框架后续会生成其构造函数，它们基于VueComponent，扩展于Vue
- vue中常见组件化技术有：属性prop，自定义事件，插槽等，它们主要用于组件通信、扩展等
- 合理的划分组件，有助于提升应用性能
- 组件应该是高内聚、低耦合的
- 遵循单向数据流原则

### 6.谈一谈对vue的设计原则的理解

**渐进式JavaScript框架**

**易用性**

**灵活性**

**高效性**



### 7.谈谈你对MVC、MVP和MVVM的理解？



backbone.js







