# Vue 系列之组件化



## 学习方法

- 小组讨论
- 实作演练
- 应用到项目中

## 理解vue组件化机制
### 1.组件化
组件化是vue的核心思想，它能提高开发效率，方便**重复**使用，简化调试步骤，**提升整个项目的可维护性**，便于多人协同开发

### 2.组件通信
**父组件——>子组件**
- props
- $attrs
- $refs
- $children

**子组件——>父组件**
- this.$emit():谁派发谁监听

**兄弟组件通信**
- `$parent或$root`
```js
// brother1
this.$parent.$on('foo',(val)=>{
    console.log(val)
})
// brother2
this.$parent.$emit('foo','me')
```
**祖先与后代之间通信**
- provide/inject：单向的
```js
provide(){
    return {
        name:'sofiya'
    }
}

inject:['name']
```
**任意两个组件之间通信**
- 事件总线方式Bus

```js
Vue.prototype.$bus=new Vue()

// child1
this.$bus.$on('name',(val)=>{
    console.log(val)
})

// child2
this.$bus.$emit('name'，'sofiya')

```
- Vuex
创建唯一的全局数据管理者store，通过它管理数据并通知组件状态变更

### 3.插槽
- 匿名插槽
```js
//子组件-comp
<div>
    <slot></slot>
</div>

// 父组件
<comp>hello</comp>
```
- 具名插槽
```js
// comp2
<div>
    <slot></slot>
    <slot name="content"></slot>
</div>
// parent
<Comp2>
    <!-- 默认插槽用default做参数 -->
    <template v-slot:default>具名插槽</template> 
    <!-- 具名插槽用插槽名做参数 -->
    <template v-slot:content>内容...</template>
</Comp2>
```
- 作用域插槽：显示的数据来自子组件，分发内容要用到子组件中的数据
```js
// comp3
<div>
    <slot :foo="foo"></slot>
</div>
// parent
<Comp3>
    <!-- 把v-slot的值指定为作用域上下文对象 --> 
    <template v-slot:default="slotProps">
        来自子组件数据:{{slotProps.foo}} 
    </template>
</Comp3>
```

## 组件化实战

> 仿element表单，实现form    formItem   input 组件

input：表单元素——【数据收集(输入)】、【数据双向绑定(监听@input，给value赋值)】

formItem：表单项——【label显示】、【数据校验】、【显示校验错误】、【显示input】

form：表单——【数据容器(model)】、将数据传递给后代、数据提交、【全局校验(rules)】

**一些小优雅：**
- 父组件传递的属性，不需要全都通过props接收,`v-bind="$attrs"`，可全部展示到子组件上
```js
<div>
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs"/>
</div>

input事件：
1.onfocus 当input 获取到焦点时触发
2.onblur 当input失去焦点时触发，注意：这个事件触发的前提是已经获取了焦点再失去焦点的时候会触发相应的js
3.onchange 当input失去焦点并且它的value值发生变化时触发
4.onkeydown 在 input中有键按住的时候执行一些代码
5.onkeyup 在input中有键抬起的时候触发的事件，在此事件触发之前一定触发了onkeydown事件
6.onclick 主要是用于 input type=button，当被点击时触发此事件
7.onselect 当input里的内容文本被选中后执行一段，只要选择了就会触发，不是非得全部选中
8.oninput 当input的value值发生变化时就会触发，不用等到失去焦点（与onchange的区别）

注意：如果用户选择粘贴复制的话，keyup事件不能触发，也就不能通过判断input内容来改变提交按钮的状态。
```
- inheritAttrs: false

如果你要禁止组件的根元素继承特性，你可以在组件的选项中设置`inheritAttrs: false`

> 校验工具：async-validator `yarn add async-validator -S`

```js
methods: {
    validate (callback) {
      const tasks = this.$children.filter(item => !!item.prop).map(item => item.validate())
      Promise.all(tasks)
        .then(() => {
          const flag = true
          callback(flag)
        })
        .catch(() => {
          const flag = false
          callback(flag)
        })
    }
}
```
> .sync与v-model的异同

- **v-model通常用于表单控件，这样子组件有更强控制能力。**

```js
// 父
<!--v-model是语法糖-->
<m-input v-model="form.username"></m-input>
<!--等同于：-->
<m-input :value="form.username" @input="form.username=$event"></m-input>

// 子
<input :value="value" @input="onInput"/>

export deault {
    props:{
        value:{
            type:String,
            default:''
        }
    },
    methods:{
       onInput(e){
            // 此处的input事件名不能随意修改，语法糖
           this.$emit('input',e.target.value)
       } 
    }
}

// 子组件修改父组件传的值及，接受事件的名称
export deault {
    model:{
        prop:'val',
        event:'eventInput'
    }
}

// 上面的设置，v-model行为变化相当于
<m-input :val="form.username" @eventInput="form.username=$event"></m-input>

```

- **.sync**

 v-model 做不了的事，对传入的 props 进行多个数据双向绑定.sync 能轻松做到。
```js
// 父
<!--语法糖.sync-->
<my-comp :value.sync="msg" />
<!--编译后的写法-->
<my-comp :value="msg" @update:value="(val) => msg = val" />

// 子
<input @input="$emit('update:value', $event)"/>

```
```js
// 父
<template>
  <div class="hello">
    <button @click="show=true">打开弹窗</button>
    <dialog :show.sync="show" :title.sync="title"></dialog>
  </div>
</template>

<script>
  import Dialog from './Dialog.vue'
  export default {
    name: 'test',
    components: {
      Dialog
    },
    data () {
      return {
        show: false,
        title: '这是一个model'
      }
    }
  }
</script>

// 子
<template>
   <div v-show="show">
      <p>{{title}}</p>
      <button @click="closeModel">关闭弹窗</button>
     <button @click="$emit('update:title','改变了弹窗文案')">change文案</button>
   </div>
</template>
<script>
export default {
  name:'Dialog',
  props: ['show', 'title'],
  methods: {
    closeModel () {
      this.$emit('update:show',false)
    }
  }
}
</script>
```

> $dispatch派发事件

实现表单组件的时候，input通过`$parent`去派发事件是不严谨的，用户嵌套多层div时，这时候的`$parent`是不准确的，所以实现`$dispatch`方法来解决这个问题。

参考：[element](https://github.com/ElemeFE/element/blob/dev/src/mixins/emitter.js)

- **mixins/emitter.js**
```js
export default {
  methods: {
    $dispatch (componentName, eventName, params) {
      var parent = this.$parent || this.$root
      // 这里取componentName，组件中必须定义，不然取到的是undefined
      var name = parent.$options.componentName
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    }
  }
}
```
- **input中使用**

```js
import emitter from '@/mixins/emitter.js'
export default {
  name: 'mInput',
  componentName: 'mInput',
  mixins: [emitter],
  methods: {
    onInput (e) {
      this.$emit('input', e.target.value)
      // 数据改变后，通知formItem校验
      this.$dispatch('mFormItem', 'validate', [e.target.value])
    }
  }
}
```
- **mixins介绍**

混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

选项合并：当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。（同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。）
```js
例如：
// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```


> 父子组件创建与挂载顺序

父组件先创建还是子组件先创建：父组件先创建
- 创建是自上而下
- 挂载是自下而上

> 
## 实现弹窗组件化
弹窗这类组件的特点是它们在当前vue实例之外独立存在，通常挂载于body;它们是通过JS动态创建 的，不需要在任何组件中声明。常见使用姿势:

- create.js
```js
import Vue from 'vue'

export default function create (component, props) {
  // 方式1：
  const extendCom = Vue.extend(component);

  const comp1 = new extendCom({ propsData: props });

  comp1.$mount();
  // 将生成dom元素追加至body
  document.body.appendChild(comp1.$el);

  comp1.remove=()=>{
    document.body.removeChild(comp1.$el);
    comp1.$destroy();
  }
  
   // 方式2：
  // 创建vue的新实例
  const vm = new Vue({
    render (h) {
      // render函数将传入组件配置对象转换为虚拟dom
      return h(component, { props })
    }
  }).$mount()// 执行挂载函数，但未指定挂载目标，表示只执行初始化工作

  // 将生成dom元素追加至body
  document.body.appendChild(vm.$el)

  // 销毁组件方法
  const comp = vm.$children[0]

  comp.remove = () => {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }

  return comp
}
```
- 将create方法挂载到prototype上
```js
import create from '@/utils/create.js'
Vue.config.productionTip = false
```
- 使用
```js
import mNotice from '@/components/notice.vue'
this.$create(mNotice, {
  title: '提示',
  message: valid ? '提交成功' : '校验失败',
  duration: 1000
}).show()
```
## vue创建组件的三种方式
### 1.Vue.extend创建全局组件
```js
var com1 = Vue.extend({
   //通过template属性指定组件要展示的html结构 
   template : "<h3>使用vue.extend创建的组件</h3>"   
})
//1.2使用Vue.component('组件名称',创建出来的组件模板对象)
Vue.component('myCom1',com1)
```

### 2.Vue.component创建组件
```js
Vue.component('com2',{
    template : "<h3>这是直接Vue.component创建的组件</h3>"
})
```
### 3.使用模板
```js
<template id="temp1">
    <div>
        <h1>好用，有代码提示快捷键</h1>
    </div>
</template>

Vue.component("com3",{
   template : '#temp1' 
})
```
## 递归组件
递归组件是可以在它们自己模板中调用自身的组件。(递归组件必须设置name)
```js
<template>
  <div class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="generateTitle(onlyOneChild.meta.title)" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" >
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="generateTitle(item.meta.title)" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>
<script>
export default {
  name: 'SidebarItem'
} 
</script>
```
## 参考
[element的minxins方法](https://github.com/ElemeFE/element/blob/dev/src/mixins/emitter.js)