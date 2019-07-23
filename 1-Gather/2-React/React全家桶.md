# React全家桶

# 一、react核心

### 1.react上手
- **简介**

特点：

jsx语法

虚拟dom

高效的diff算法

单向数据流

- **vue&react比较**

数据劫持方式不同

- **安装**
```
//方法1：
npm i -g create-react-app
create-react-app my-react
//方法2：
npx create-react-app my-react
```
### 2.核心Api
```
//看到项目的原有配置及文件
npm run eject
```
- **1.JSX语法**
   - 介绍
    ```
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';
    import * as serviceWorker from './serviceWorker';
    //引入react的目的是：React.createElement() -> vdom是将JSX语法转成虚拟dom
    ReactDOM.render(<App />, document.getElementById('root'));
    //render相当于vue中的$mount挂载
    serviceWorker.unregister();
    
    //例如：
    //——JSX语法
    class HelloMessage extends React.Component {
      render() {
        return (
          <div>
            Hello {this.props.name}
          </div>
        );
      }
    }
    
    ReactDOM.render(
      <HelloMessage name="Taylor" />,
      document.getElementById('hello-example')
    );
    
    //实际是这样的
    class HelloMessage extends React.Component {
      render() {
        return React.createElement(
          "div",
          null,
          "Hello ",
          this.props.name
        );
      }
    }
    
    ReactDOM.render(React.createElement(HelloMessage, { name: "Taylor" }), document.getElementById('hello-example'));
    ```
   - 插值表达式
   - 属性绑定
   - 事件处理
    创建一个组件：JsxTest.js
    ```
    //JsxTest.js
    //快捷键：rcc
    import React, {Component} from 'react';
    import logo from './logo.svg';
    import './index.css'
    function formatName(user) {
        return user.firstName+'-'+user.lastName
    }
    class JsxTest extends Component {
        render() {
            const name='Sofiya';
            const greet=<p>hello,sofiya!</p>
            return (
                <div>
                    {/*表达式：任意的合法的表达式即可*/}
                    <h1>{name}</h1>
                    {/*函数也是表达式*/}
                    <p>{formatName({firstName:'qiao',lastName:'xu'})}</p>
                    {/*jsx也是表达式*/}
                    {greet}
    
                    {/*属性*/}
                    <img src={logo} style={{width:'100px'}} className='img'/>
                    <label htmlFor="">fff</label>
                </div>
            )
        }
    }
    
    export default JsxTest;
    
    //App.js
    import React from 'react';
    import './App.css';
    import JsxTest from './JsxTest'
    
    function App() {
        return (
            <div className="App">
                {/* 自定义组件开头大写 */}
                {/* <JsxTest /> */}
                <JsxTest/>
            </div>
        );
    }
    
    export default App;
    ```
   >注意this指向
- **2.组件**

   两种形式：

   - 函数的形式
   - 类的形式
   ```
   //CompType.js
   import React, {Component} from 'react';

    //函数形式的组件
    function Welcome1(props) {
        return <div>Welcome1,{props.name}</div>;
    }
    
    //类形式的组件
    class Welcome2 extends Component {
        render() {
            return <div>Welcome2,{this.props.name}</div>
        }
    }
    
    export default function CompType() {
        return (
            <div>
                {/*属性是只读的不能改*/}
                {/*将嵌套复杂的组件抽取为更小的组件是最佳实践*/}
                <Welcome1 name='sofiya'/>
                <Welcome2 name='tom'/>
            </div>
        )
    };
   ```
- **3.组件状态**
   - 状态声明
   ```
   
   ```
   - 修改状态
   ```
   setState()
   ```
   > setState注意事项：   
   >     &emsp;1.状态是封闭的，只有组件自己能访问和修改  
   >     &emsp;2.批量执行：对同一个key多次操作会合并，会执行最后一次  
   >     &emsp;3.可能是异步的，如果要获取到最新的状态值  
   >     &emsp;&emsp;+ 传递函数给setState（setState的回调函数也可以）——react机制  
   >     &emsp;&emsp;+ 使用定时器——react机制  
   >     &emsp;&emsp;+ 原生事件中  
   
    - CartSample.js
    > JSX实质  
    > class和函数组件  
    > props数据传递  
    > state  
    > setState  
    > 条件渲染  
    > 循环渲染  
    > render函数  
    > 事件监听  
    > 组件通讯  
    >  &emsp;1.props  
    >  &emsp;2.context  
    >  &emsp;3.大名鼎鼎的虚拟dom    
   
    ```
    import React, {Component} from 'react';

    //购物车
    function Cart(props) {
        return (
            <table>
                <tbody>
                {props.data.map(d => (
                    <tr key={d.id} onClick={()=>props.onSelect(d.text)}>
                        <td>{d.text}</td>
                        <td>{d.count}</td>
                        <td>￥{d.price * d.count}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }
    
    class CartSample extends Component {
        constructor(props) {
            super(props);
            this.state = {
                title: '',
                name: '',
                goods: [
                    {text: '百万年薪架构师', price: 100, id: 1},
                    {text: 'web全栈架构师', price: 2200, id: 2},
                    {text: 'Python爬虫', price: 330, id: 3},
                ],
                cart: []
            }
    
            setTimeout(() => {
                this.setState({title: 'react购物车'})
            }, 1000)
        }
    
        //inputchange事件
        handleChange = (e) => {
            this.setState({name: e.target.value})
        }
    
        //添加新课
        addGood = () => {
            this.setState({
                goods: [...this.state.goods, {text: this.state.name, price: 999, id: this.state.goods.length + 1}]
            })
        }
    
        //加入购物车
    
        addCart = (good) => {
            const item = this.state.cart.find(c => c.text == good.text);
            if (item) {
                item.count++
                this.setState({
                    cart: [...this.state.cart]
                })
            } else {
                this.setState({
                    cart: [...this.state.cart, {...good, count: 1}]
                })
            }
        };
        //子父通信
        onSelect=name=>{
            console.log(name);
        }
        render() {
            const goods = this.state.goods.map(good => {
                return <li key={good.id}>
                    {good.text}
                    <button onClick={() => this.addCart(good)}>+加购物车</button>
                </li>
            });
            return (
                <div>
                    {/*条件语句*/}
                    {this.state.title && <h1>{this.state.title}</h1>}
                    {/*事件处理*/}
                    <div>
                        {/*react中的单向数据流*/}
                        <input type="text"
                               value={this.state.name}
                               onChange={e => this.handleChange(e)}
                            // onChange={this.handleChange}两种方式
                        />
                        <button onClick={e => this.addGood()}>添加</button>
                    </div>
                    <ul>
                        {goods}
                    </ul>
                    {/*购物车*/}
    
                    <Cart data={this.state.cart} onSelect={this.onSelect}></Cart>
                </div>
            );
        }
    }
    
    export default CartSample;
    ```
### 3.生命周期
![react生命周期](/Users/qiaoxu/Desktop/pic/react.jpg)

> React v16.0前的生命周期
> ![react生命周期v16.0之前](/Users/qiaoxu/Desktop/pic/react_v16.0.png)
- **1.第一个是组件初始化(initialization)阶段**

也就是以下代码中类的构造⽅方法( constructor() ),Test类继承了了react Component这个基类，也就继承这个react的基类，才能有render(),生命周期等方法可以使用，这也说明为什么函数组件不不能使⽤用这些方法的原因。

super(props) 用来调用基类的构造方法( constructor() ),也将父组件的props注⼊入给子组件，供子组件读取(组件中props只读不不可变，state可变)。 而 constructor() 用来做一些组件的初始化工作，如定义this.state的初始内容。

```
import React, { Component } from 'react';
class Test extends Component {
    constructor(props) {
    super(props);
}
}
```
- **2.第二个是组件的挂载(Mounting)阶段**

此阶段分为componentWillMount，render，componentDidMount三个时期。
> componentWillMount:

在组件挂载到DOM前调用，且只会被调用一次，在这边调用this.setState不会引起组件重新渲染，也可以把写在这边的内容提前到constructor()中，所以项⽬目中很少⽤用。
> render:

根据组件的props和state（无论两者的重传递和重赋值，无论值是否有变化，都可以引起组件重新render） ，return一个React元素（描述组件，即UI），不负责组件实际渲染工作，之后由React⾃身根据此元素去渲染出⻚页⾯面DOM。render是纯函数（Pure function：函数的返回结果只依赖于它的参数；函数行行过程里面没有副作用），不能在里⾯执行this.setState，会有改变组件状态的副作用。
> componentDidMount:

组件挂载到DOM后调用，且只会被调用一次

- **3.第三个是组件的更新(update)阶段**

在讲述此阶段前需要先明确下react组件更新机制。setState引起的state更新或父组件重新render引起的props更新，更新后的state和props相对之前无论是否有变化，都将引起子组件的重新render。详细可看[这篇文章](https://www.cnblogs.com/penghuwan/p/6707254.html)

- **4.造成组件更新有两类（三种）情况** 
   - **1）父组件重新render**
   
   父组件重新render引起子组件重新render的情况有两种
   
   a、直接使用，每当父组件重新render导致重传props，子组件将直接跟着重新渲染，无论props是否有变化。可通过shouldComponentUpdate⽅方法优化。
   
   ```
   class Child extends Component {
    shouldComponentUpdate(nextProps){ // 应该使⽤用这个⽅方法，否则⽆无论props是否有变化
    都将会导致组件跟着重新渲染
    if(nextProps.someThings === this.props.someThings){
    return false
    }
    }
    render() {
    return <div>{this.props.someThings}</div>
    }
   }
   ```
   b、在componentWillReceiveProps方法中，将props转换成自己的state
   ```
   class Child extends Component {
    constructor(props) {
        super(props);
        this.state = {
            someThings: props.someThings
        };
    }
    componentWillReceiveProps(nextProps) { // 父组件重传props时就会调用这个方法
        this.setState({someThings: nextProps.someThings});
    }
    render() {
        return <div>{this.state.someThings}</div>
    }
   }
   ```
   根据官网的描述
   > 在该函数(componentWillReceiveProps)中调用 this.setState() 将不会引起第二次渲染.
   
   是因为componentWillReceiveProps中判断props是否变化了，若变化了，this.setState将引起state变化，从而引起render，此时就没必要再做第二次因重传props引起的render了，不然重复做一样的渲染了。
   
   - **2）组件本身调用setState，无论state有没有变化。可通过shouldComponentUpdate⽅法优化。**
   
   ```
   class Child extends Component {
    constructor(props) {
        super(props);
        this.state = {
            someThings:1
        }
    }
    shouldComponentUpdate(nextStates){ // 应该使用这个方法，否则无论state是否有变化都将会导致组件重新渲染
        if(nextStates.someThings === this.state.someThings){
            return false
        }
    }
    handleClick = () => { // 虽然调⽤了setState ，但state并无变化
        const preSomeThings = this.state.someThings
        this.setState({
            someThings: preSomeThings
        })
    }
    render() {
        return <div onClick = {this.handleClick}>{this.state.someThings}
        </div>
    }
   }
   ```
   
- **5.此阶段分为componentWillReceiveProps，shouldComponentUpdate，
componentWillUpdate，render，componentDidUpdate**

   - componentWillReceiveProps(nextProps)
  
    此方法只调用于props引起的组件更新过程中，参数nextProps是父组件传给当前组件的新props。但父组件render方法的调用不能保证重传给当前组件的props是有变化的，所以在此⽅方法中根据nextProps和this.props来查明重传的props是否改变，以及如果改变了要执行啥⽐比如根据新的props调⽤用this.setState出发当前组件的重新render
   - shouldComponentUpdate(nextProps, nextState)
  
    此方法通过比较nextProps，nextState及当前组件的this.props，this.state，返回true时当前组件将继续执行更新过程，返回false则当前组件更新停止，以此可⽤用来减少组件的不必要渲染，优化组件性能。

    ps：这边也可以看出，就算componentWillReceiveProps()中执行了this.setState，更更新了state，但
    在render前（如shouldComponentUpdate，componentWillUpdate），this.state依然指向更新前的state，不然nextState及当前组件的this.state的对比就一直是true了。
   - componentWillUpdate(nextProps, nextState)
  
    此方法在调用render方法前执行，在这边可执⾏一些组件更新发生前的工作，一般较少用。
   - render
  
    render方法在上文讲过，这边只是重新调用。
   - componentDidUpdate(prevProps, prevState)
  
    此方法在组件更新后被调用，可以操作组件更新的DOM，prevProps和prevState这两个参数指的是组件更新前的props和state

- **6.卸载阶段**

   此阶段只有一个生命周期方法：componentWillUnmount

   - componentWillUnmount
   
    此方法在组件被卸载前调用，可以在这里执行一些清理工作，比如清楚组件中使用的定时器，清楚componentDidMount中手动创建的DOM元素等，以避免引起内存泄漏。

> React v16.4 的生命周期

![react生命周期v16.4](/Users/qiaoxu/Desktop/pic/react_v16.4.png)

- **1.变更原因**

    原来（React v16.0前）的生命周期在React v16推出的Fiber之后就不合适了，因为如果要开启async rendering，在render函数之前的所有函数，都有可能被执行多次。
    原来（React v16.0前）的生命周期有哪些是在render前执行的呢？

   - componentWillMount
   - componentWillReceiveProps
   - shouldComponentUpdate
   - componentWillUpdate

    如果开发者开了async rendering，而且又在以上这些render前执行的生命周期方法做AJAX请求的话，那AJAX将被无谓地多次调用。。。明显不是我们期望的结果。而且在componentWillMount里发起AJAX，不管多快得到结果也赶不上首次render，而且componentWillMount在服务器端渲染也会被调用到（当然，也许这是预期的结果），这样的IO操作放在componentDidMount里更合适。

    禁止不能用比劝导开发者不要这样用的效果更好，所以除了shouldComponentUpdate，其他在render函数之前的所有函数（componentWillMount，componentWillReceiveProps，componentWillUpdate）都被getDerivedStateFromProps替代。
   
    也就是用一个静态函数getDerivedStateFromProps来取代被deprecate的几个生命周期函数，就是强制开发者在render之前只做无副作用的操作，而且能做的操作局限在根据props和state决定新的state

    React v16.0刚推出的时候，是增加了一个componentDidCatch生命周期函数，这只是一个增量式修改，完全不影响原有生命周期函数；但是，到了React v16.3，大改动来了，引入了两个新的生命周期函数。

- **2.新引入了两个新的生命周期函数**

   - **getDerivedStateFromProps**
   
    getDerivedStateFromProps本来（Reactv16.3中）是只在创建和更新（由父组件引发部分），也就是不是不由父组件引发，那么getDerivedStateFromProps也不会被调用，如自身setState引发或者forceUpdate引发。
    >> React v16.3 的生命周期图

    ![react生命周期v16.3](/Users/qiaoxu/Desktop/pic/react_v16.3.png)
   
    这样的话理解起来有点乱，在React v16.4中改正了这一点，让getDerivedStateFromProps无论是Mounting还是Updating，也无论是因为什么引起的Updating，全部都会被调用，具体可看React v16.4 的生命周期图。
   
    >> React v16.4后的getDerivedStateFromProps
   
    **static getDerivedStateFromProps(props, state)** 在组件创建时和更新时的render方法之前调用，它应该返回一个对象来更新状态，或者返回null来不更新任何内容。
   - **getSnapshotBeforeUpdate**
   
    getSnapshotBeforeUpdate()被调用于render之后，可以读取但无法使用DOM的时候。它使您的组件可以在可能更改之前从DOM捕获一些信息（例如滚动位置）。此生命周期返回的任何值都将作为参数传递给componentDidUpdate（）。

    官网给的例子：
    ```
    class ScrollingList extends React.Component {
      constructor(props) {
        super(props);
        this.listRef = React.createRef();
      }
    
      getSnapshotBeforeUpdate(prevProps, prevState) {
        //我们是否要添加新的 items 到列表?
        // 捕捉滚动位置，以便我们可以稍后调整滚动.
        if (prevProps.list.length < this.props.list.length) {
          const list = this.listRef.current;
          return list.scrollHeight - list.scrollTop;
        }
        return null;
      }
    
      componentDidUpdate(prevProps, prevState, snapshot) {
        //如果我们有snapshot值, 我们已经添加了 新的items.
        // 调整滚动以至于这些新的items 不会将旧items推出视图。
        // (这边的snapshot是 getSnapshotBeforeUpdate方法的返回值)
        if (snapshot !== null) {
          const list = this.listRef.current;
          list.scrollTop = list.scrollHeight - snapshot;
        }
      }
    
      render() {
        return (
          <div ref={this.listRef}>{/* ...contents... */}</div>
        );
      }
    }
    ```
# 二、react组件化
### 0. 勘误

cra项目中的css模块化
1. 创建xx.module.css
2. 组件中写法
```
import style from './xx.module.css'
<div className={style.img}>
```
### 1.使用第三方组件库
[antd组件库](https://ant.design/docs/react/use-with-create-react-app-cn)

-S生产依赖
```
npm install antd --save
```

- 全局引入
```
import Button from 'antd/lib/button'
import 'antd/dist/antd.css'

<Button type='primary'>Button</Button>
```
### 2.配置按需加载

<font color='red'>安装react-app-rewired取代react-scripts，可扩展webpack的配置 ，类似vue.config.js</font>

-D开发依赖
```
npm install react-app-rewired customize-cra babel-plugin-import -D
```
在根目录下创建config-overrides.js文件
```
const { override, fixBabelImports} = require("customize-cra");

// override返回一个函数，该函数返回对象将作为webpack的配置对象
module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css"
    })
);
```
package.json修改
```
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
},
```

### 3.容器组件&展示组件
基本原则：容器组件负责数据获取，展示组件负责根据props显示信息

> 优势：  
> 1.如何工作和如何展示分离    
> 2.重用性高    
> 3.更高的可用性  
> 4.更易于测试  

```
import React, {Component} from 'react';
//展示组件
function Comment({data}){
    console.log('react render');//每隔1s执行一次
    return (
        <div>
            <p>{data.body}</p>
            <p>---{data.author}</p>
        </div>
    )
}


//容器组件
export default class CommontList extends Component {
    constructor(props){
        super(props);
        this.state={
            comments:[]
        }
    }

    componentDidMount() {
    //定时器的目的是每隔1s，去服务器看一下，数据有没有变化，不管数据变化没有，都会导致组件重新render
        setInterval(()=>{
            //immutable.js
            this.setState({
                comments:[
                    {body:'react is very good',author:'facebook'},
                    {body:'vue is very good',author:'youyuxi'},
                ]
            })
        },1000)
    }

    render() {
        return (
            <div>
                {this.state.comments.map((item,index)=>(
                    <Comment key={index} data={item}></Comment>
                ))}
            </div>
        );
    }
}
```

### 4.PureComponent纯组件
v15.3之后出来的

immutable.js——优化手段

```
//解决方式一：shouldComponentUpdate
class Comment extends Component {
    shouldComponentUpdate(nextProps) {
        if(nextProps.data.body==this.props.data.body && nextProps.data.author==this.props.data.author) {
           return false;
        }
        return true;
    }

    render() {
        console.log('react render');//每隔1s执行一次
        const {data} = this.props;
        return (
            <div>
                <p>{data.body}</p>
                <p>---{data.author}</p>
            </div>
        )
    }
}
```

纯组件是一个浅比较：复杂数据类型会先比较引用地址，引用地址不同则，会重新render，而每次的setState都会给comment重新赋值，相当于更换引用地址了，

> 由于比较方式是浅比较，注意传值方式，值类型或者地址不变的且仅根属性变化的引用类型才能享受该特性  

![PureComponent源码](/Users/qiaoxu/Desktop/pic/pureComponent.png)
```
//解决方式二：使用纯组件PureComponent
import React, {Component, PureComponent} from 'react';
//使用纯组件来解决：不管数据变化没变化，都会重复render这个过程，会影响性能
class Comment extends PureComponent{
    render() {
        console.log('react render');//每隔1s执行一次
        // const {data} = this.props;
        const {body,author} = this.props;
        return (
            <div>
                <p>{body}</p>
                <p>---{author}</p>
            </div>
        )
    }
}
//容器组件
export default class CommontList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        setInterval(() => {
            //定时器的目的是每隔1s，去服务器看一下，数据有没有变化，不管数据变化没有，都会导致组件重新render
            //优化：immutable.js
            this.setState({
                comments: [
                    {body: 'react is very good', author: 'facebook'},
                    {body: 'vue is very good', author: 'youyuxi'},
                ]
            })
        }, 1000)
    }

    render() {
        return (
            <div>
                {this.state.comments.map((item, index) => (
                    //data={item}——直接将属性展开去传递数据
                    <Comment key={index} {...item}></Comment>
                ))}
            </div>
        );
    }
}
```
### 5.React.memo——高阶组件
v16.6之后的版本，可以使用一个新功能React.memo来完美实现React组件，让函数式的组件，也有了PureComponent的功能
```
//使用React.memo使用函数式的组件也能拥有PureComponent的功能

const Comment=React.memo(function({body,author}){
    console.log('react render');//每隔1s执行一次
    return (
        <div>
            <p>{body}</p>
            <p>---{author}</p>
        </div>
    )
})
```

### 6.高阶组件
提高组件复用率，首先想到的就是抽离相同逻辑，在React里就有了HOC（Higher-Order-Components）的概念,高阶组件也是一个函数，但是它返回另外一个组件，产生新的组件可以对属性进行包装，也可以重写部分生命周期

```
//Hoc.js
import React, {Component} from 'react';

function Kaikeba(props){
    return (
        <div>
            {props.stage}--{props.name}
        </div>
    )
}

//创建一个函数，接收一个组件，返回另外一个组件
function WithStage(Component) {
    const NewComponent=props=>{
        return <Component {...props} stage='react'/>
    }
    return NewComponent;
}

export default WithStage(Kaikeba);

//引用
{/*高阶组件*/}
<Hoc name='sofiya'/>
```
### 7.高阶链式调用
高阶组件最巧妙的一点，是可以链式调用

```
import React, {Component} from 'react';

function Kaikeba(props){
    return (
        <div>
            {props.stage}--{props.name}
        </div>
    )
}

//创建一个函数，接收一个组件，返回另外一个组件
function WithStage(Component) {
    const NewComponent=props=>{
        return <Component {...props} stage='react'/>
    }
    return NewComponent;
}

//功能：日志记录log
function WithLog(Component){
    console.log(Component.name);
    return props=>{
        return <Component {...props}/>
    }
}
export default WithLog(WithStage(WithLog(Kaikeba)));
```
### 8.高阶组件装饰器写法
这种链式写法略显蛋疼，逻辑比较绕，ES7中有一个优秀的语法——装饰器，专门处理这种问题的
```
//安装
npm install -D @babel/plugin-proposal-decorators

//config-overrides.js配置addDecoratorsLegacy

const {override, fixBabelImports, addDecoratorsLegacy} = require("customize-cra");

// override返回一个函数，该函数返回对象将作为webpack的配置对象
module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css"
    }),
    addDecoratorsLegacy()
);
```

装饰器写法
```
import React, {Component} from 'react';

//创建一个函数，接收一个组件，返回另外一个组件
function withStage(Component) {
    const NewComponent=props=>{
        return <Component {...props} stage='react'/>
    }
    return NewComponent;
}

//功能：日志记录log
function withLog(Component){
    console.log(Component.name);
    return props=>{
        return <Component {...props}/>
    }
}

//装饰器
@withLog
@withStage
@withLog
class Kaikeba extends Component{
    render() {
        return (
            <div>
                {this.props.stage}--{this.props.name}
            </div>
        )
    }
}

export default Kaikeba;
```
### 9.组件复合composition
复合组件给与你足够的敏捷去自定义组件的外观和行为，而且是以一种明确和安全的方式进行。如果组件间有公用的非UI逻辑，将它们抽取为JS模块导入使用而不是继承它。

> 虚拟dom是不可扩展的  

```
import React, {Component} from 'react';

function Dialog(props){
    const color=props.color||'blue';
    return (
        <div style={{border:`4px solid ${color}`}}>
            {/*children是固定名称，类似于匿名插槽*/}
            {props.children}
            <div>{props.foo('这个内容是dialog传递的')}</div>
            <div>{props.footer}</div>
        </div>
    )
}

//WelcomDialog通过符合提供内容
function WelcomDialog(){
    const footer=<button onClick={()=>alert('react')}>点我</button>;
    return (
        //传递任意合法表达式
        <Dialog color='red' footer={footer} foo={c=><p>{c}</p>}>
            <h1>欢迎光临</h1>
            <p>感谢使用react</p>
        </Dialog>
    )
}

//将p之外的标签过滤掉，不显示
function FilterP(props){
    return (
        <div>
            {React.Children.map(props.children,child=>{
                if(child.type !='p') {
                    return;
                }
                return child;
            })}
        </div>
    )
}

//实现radio组合
function RadioGroup(props){
   //将name属性值赋给Radio
   return(
       <div>
           {React.Children.map(props.children,child=>React.cloneElement(child,{name:props.name}))}
       </div>
   )
}

function Radio(props){
    return (
        <label>
            <input type="radio" name={props.name}/>{props.children}
        </label>
    )
}


export default function Composition(){
    return(
        <>
            <WelcomDialog />

            <FilterP>
                <p>sofiya</p>
                <h1>穷徐</h1>
                <p>Hello</p>
                <span>你好</span>
            </FilterP>

            <RadioGroup name='mvvm'>
                <Radio value='vue'>vue</Radio>
                <Radio value='react'>react</Radio>
                <Radio value='angular'>angular</Radio>
            </RadioGroup>
        </>
    )
};
```
### 10.组件跨层级通信-Context
vuejs的provide和inject模式的来源——context

这种模式下有两个角色：

- Provider：外层提供数据的组件
- Consumer：内层获取数据的组件

```
import React, {Component} from 'react';

//创建上下文
const Context =React.createContext();

const store={
    token:'jilei'
}
export default class ContextTest extends Component {
    render() {
        return (
            <Context.Provider value={store}>
                <div>
                    <Context.Consumer>
                        {store=><p>{store.token}</p>}
                    </Context.Consumer>
                </div>
            </Context.Provider>

        );
    }
}
```
### 11.Hook
- **Hook介绍**

    Hook是react16.8一个新增项，它可以让你在不编写class的情况下使用state以及其他的react特性。
    
    Hook的特点：

   - 使你在无需修改组件结构的情况下复用状态逻辑
   - 可将组件汇总相互关联的部分拆分成更小的函数，复杂组件将变得更容易理解
   - 更简洁、更易理解代码
   
- **准备工作**

升级react、react-dom
```
npm i react react-dom -S
```
- **状态钩子State Hook**
```
//HookTest.js
import React, {useState} from 'react';

//水果列表
function FruitList({fruits, setFruit}) {
    return (
        fruits.map(f => (
            <li key={f} onClick={() => setFruit(f)}>{f}</li>
        ))
    )
}
//添加水果
function FruitAdd(props) {
    const [pname, setPname] = useState('草莓');
    const onAddFruit=(e)=>{
        if(e.key==='Enter') {
            props.onAddFruit(pname);
            //清空输入框
            setPname('');
        }
    }
    return (
        <div>
            <input type="text" value={pname} onChange={e=>setPname(e.target.value)} onKeyDown={onAddFruit}/>
        </div>
    )
}
export default function HookTest() {
    //useState参数是状态初始值
    //返回一个数组，第一个元素是状态变量，第二个元素是状态变更函数
    const [fruit, setFruit] = useState('草莓');
    const [fruits, setFruits] = useState(['草莓', '香蕉']);

    return (
        <div>
            <p>{fruit === '' ? "请选择喜爱的水果" : `您选择的是${fruit}`}</p>

            <FruitAdd onAddFruit={pname=>setFruits([...fruits,pname])}/>
            <FruitList fruits={fruits} setFruit={setFruit}/>
        </div>
    )
}
```
### 12.副作用钩子Effect hook

useEffect给函数组件增加了执行副作用操作的能力。

数据获取，设置订阅以及手动更改React组件中的Dom都属于副作用。

- **异步数据获取，更新HookTest.js**
- **设置依赖**
```
import React, {useState, useEffect} from 'react';
export default function HookTest() {
    //useState参数是状态初始值
    //返回一个数组，第一个元素是状态变量，第二个元素是状态变更函数
    const [fruit, setFruit] = useState('草莓');
    const [fruits, setFruits] = useState([]);

    //使用useEffect操作副作用，第一个参是回调函数，第二个参是数组
    //任何的状态变更都会执行useEffect
    //请务必设置依赖选项，如果没有则设置空数组表示仅执行一次
    useEffect(() => {
        console.log('get Fruits');
        setTimeout(() => {
            setFruits(['草莓', '香蕉'])
        }, 1000)
    },[]);

    //设置依赖选项
    useEffect(() => {
        document.title=fruit;
    },[fruit]);

    //清除工作
    useEffect(()=>{
        const timer=setInterval(()=>{
            console.log('应用启动了');
        },1000)

        //返回清除函数
        return function(){
            clearInterval(timer)
        }
    },[]);
    return (
        <div>
            <p>{fruit === '' ? "请选择喜爱的水果" : `您选择的是${fruit}`}</p>

            <FruitAdd onAddFruit={pname => setFruits([...fruits, pname])}/>
            <FruitList fruits={fruits} setFruit={setFruit}/>
        </div>
    )
}
```
### 13.useReducer
useState的另一个可选项，useReducer常用于组件有复杂状态逻辑时，类似于redux中reducer概念。
```
//将状态移至全局
function fruitReducer(state, action) {
    switch (action.type) {
        case 'init':
            return action.payload;
        case'add':
            return [...state, action.payload];
        default:
            return state;
    }
}
export default function HookTest() {
    //useState参数是状态初始值
    //返回一个数组，第一个元素是状态变量，第二个元素是状态变更函数
    const [fruit, setFruit] = useState('草莓');
    //const [fruits, setFruits] = useState([]);

    //参数1是相关reducer，参数2是初始值
    const [fruits, dispatch] = useReducer(fruitReducer, []);
    
    return (
        <div>
            <p>{fruit === '' ? "请选择喜爱的水果" : `您选择的是${fruit}`}</p>

            <FruitAdd onAddFruit={pname => dispatch({type:'add',payload:pname})}/>
            <FruitList fruits={fruits} setFruit={setFruit}/>
        </div>
    )
}
```
基于useReducer的方式实现异步action

```
import React, {useState, useEffect, useReducer, useContext} from 'react';

//水果列表
function FruitList({fruits, setFruit}) {
    return (
        fruits.map(f => (
            <li key={f} onClick={() => setFruit(f)}>{f}</li>
        ))
    )
}

//添加水果
function FruitAdd(props) {
    const [pname, setPname] = useState('草莓');

    const {dispatch} = useContext(Context);

    const onAddFruit = (e) => {
        if (e.key === 'Enter') {
            dispatch({type: 'add', payload: pname})
            //props.onAddFruit(pname);
            //清空输入框
            setPname('');
        }
    }
    return (
        <div>
            <input type="text" value={pname} onChange={e => setPname(e.target.value)} onKeyDown={onAddFruit}/>
        </div>
    )
}

//将状态移至全局
function fruitReducer(state, action) {
    switch (action.type) {
        case 'init':
            return {...state, list: action.payload};
        case'add':
            return {...state, list: [...state, action.payload]};
        case'loading_start':
            return {...state, loading: true};
        case'loading_end':
            return {...state, loading: false}
        default:
            return state;
    }
}

//判断对象是否是promise
function isPromise(obj) {
    return (
        !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
    )
}

//mock一个异步方法
async function asyncFetch(p) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(p);
        }, 1000)
    })
}


//对dispatch函数进行封装，使其支持处理异步数据
function wrapDispatch(dispatch) {
    return function (action) {
        if (isPromise(action.payload)) {
            dispatch({type: 'loading_start'});
            action.payload.then(v => {
                dispatch({type: action.type, payload: v});
                dispatch({type: 'loading_end'})
            })
        } else {
            dispatch(action)
        }
    }
}

//创建上下文
const Context = React.createContext();

export default function HookTest() {
    //useState参数是状态初始值
    //返回一个数组，第一个元素是状态变量，第二个元素是状态变更函数
    const [fruit, setFruit] = useState('草莓');
    //const [fruits, setFruits] = useState([]);

    //参数1是相关reducer，参数2是初始值
    //const [fruits, dispatch] = useReducer(fruitReducer, []);
    const [{list: fruits, loading}, originDispatch] = useReducer(fruitReducer, {
        list: [],
        loading: false
    })

    //包装dispatch
    const dispatch=wrapDispatch(originDispatch);

    //使用useEffect操作副作用，第一个参是回调函数，第二个参是数组
    //任何的状态变更都会执行useEffect
    //请务必设置依赖选项，如果没有则设置空数组表示仅执行一次
    useEffect(() => {
        console.log('get Fruits');
        dispatch({type: 'init', payload: asyncFetch(['草莓', '香蕉'])})
        // setTimeout(() => {
        //     //setFruits(['草莓', '香蕉'])
        //     dispatch({type: 'init', payload: ['草莓', '香蕉']})
        // }, 2000)
    }, []);

    //设置依赖选项
    useEffect(() => {
        document.title = fruit;
    }, [fruit]);

    //清除工作
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('应用启动了');
        }, 1000)

        //返回清除函数
        return function () {
            clearInterval(timer)
        }
    }, []);


    return (
        //提供上下文的值
        <Context.Provider value={{fruits, dispatch}}>
            <div>
                <p>{fruit === '' ? "请选择喜爱的水果" : `您选择的是${fruit}`}</p>

                {/*<FruitAdd onAddFruit={pname => dispatch({type: 'add', payload: pname})}/>*/}
                {/* 这里不再需要给FruitAdd传递变更函数，实现了解耦 */}
                <FruitAdd/>

                {/*加载状态处理*/}
                {
                    loading?(<div>数据加载中...</div>):(<FruitList fruits={fruits} setFruit={setFruit}/>)
                }
            </div>
        </Context.Provider>
    )
}
```
### 14.useContext

```
import React, {useState, useEffect, useReducer, useContext} from 'react';
//创建上下文
const Context=React.createContext();

export default function HookTest() {
    return (
        //提供上下文的值
        <Context.Provider value={{fruits,dispatch}}>
            <div>
                <p>{fruit === '' ? "请选择喜爱的水果" : `您选择的是${fruit}`}</p>

                {/*<FruitAdd onAddFruit={pname => dispatch({type: 'add', payload: pname})}/>*/}
                {/* 这里不再需要给FruitAdd传递变更函数，实现了解耦 */}
                <FruitAdd/>
                <FruitList fruits={fruits} setFruit={setFruit}/>
            </div>
        </Context.Provider>
    )
}


//添加水果
function FruitAdd(props) {
    const [pname, setPname] = useState('草莓');
    //获取上下文，并解构出dispatch
    const {dispatch}=useContext(Context);

    const onAddFruit = (e) => {
        if (e.key === 'Enter') {
            dispatch({type:'add',payload:pname })
            //props.onAddFruit(pname);
            //清空输入框
            setPname('');
        }
    }
    return (
        <div>
            <input type="text" value={pname} onChange={e => setPname(e.target.value)} onKeyDown={onAddFruit}/>
        </div>
    )
}
```
- **Hook相关拓展**
   - 基于useReducer的方式能否处理异步action
   - [Hook规则](https://zh-hans.reactjs.org/docs/hooks-rules.html)
   - [自定义Hook](https://zh-hans.reactjs.org/docs/hooks-custom.html)
   - [一堆第三方hook的实现](https://github.com/streamich/react-use)
   
### 14.组件设计与实现
- **antd表单试用**
- **表单组件设计思路**
- **表单组件实现**
```
//KFormTest.js
import React, {Component} from 'react';


//高阶组件：扩展现有表单，提供控件包装、事件处理、表单校验
function kFormCreate(Comp) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            //选项
            this.options = {};
            //数据
            this.state = {}
        }

        //处理输入事件
        handleChange = e => {
            //数据设置和校验
            const {name, value} = e.target;
            this.setState({[name]: value}, () => {
                //单字段校验
                this.validateField(name);
            })
        }

        //校验
        validateField = field => {
            const rules = this.options[field].rules;
            //some里面任何一项不通过就返回true跳出，取反表示校验失败
            const isValid = !rules.some(rule => {
                if (rule.required) {
                    if (!this.state[field]) {//表示用户没有填写，是空的
                        //校验失败
                        this.setState({
                            [field + 'Message']: rule.message
                        })
                        return true;
                    }
                }
                return false;
            });
            if (isValid) {
                this.setState({
                    [field + 'Message']: ''
                })
            }

            return isValid;
        }

        validateFields = cb => {
            const rets = Object.keys(this.options).map(field => {
                return this.validateField(field);
            })
            const ret = rets.every(v => v === true);
            cb(ret, this.state);
        }

        //包装函数：接收字段名和校验选项返回一个高阶组件
        getFieldDec = (field, option) => {
            this.options[field] = option;//传进来要校验的项
            return InputComp => (
                <div>
                    {
                        React.cloneElement(InputComp, {
                            name: field,
                            value: this.state[field] || '',
                            onChange: this.handleChange//执行校验设置状态等
                        })
                    }
                </div>
            )
        }

        render() {
            return (
                <Comp getFieldDec={this.getFieldDec} validateFields={this.validateFields}/>
            )
        }

    }
}

@kFormCreate
class KFormTest extends Component {
    onSubmit=()=>{
        this.props.validateFields((isValid,values)=>{
            if(isValid) {
                console.log(values);
                alert('登录成功！')
            }else {
                console.log(values);
                alert('校验失败！')
            }
        })
    }
    render() {
        const {getFieldDec} = this.props;
        return (
            <div>
                <div>
                    {getFieldDec('username',{
                        rules:[{ required: true, message: "Please input your username!" }]
                    })(<input type='text'/>)}
                </div>
                <div>
                    {getFieldDec('password',{
                        rules:[{ required: true, message: "Please input your Password!" }]
                    })(<input type='password'/>)}
                </div>

                <button onClick={this.onSubmit}>登录</button>
            </div>
        );
    }
}

export default KFormTest;
```

- **实现Form（布局、提交）、FormItem（错误信息）、Input（前缀图标）**
```
import React, {Component} from 'react';
import {Icon} from 'antd';

//高阶组件：扩展现有表单，提供控件包装、事件处理、表单校验
function kFormCreate(Comp) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            //选项
            this.options = {};
            //数据
            this.state = {}
        }

        //处理输入事件
        handleChange = e => {
            //数据设置和校验
            const {name, value} = e.target;
            this.setState({[name]: value}, () => {
                //单字段校验
                this.validateField(name);
            })
        }

        //校验
        validateField = field => {
            const rules = this.options[field].rules;
            //some里面任何一项不通过就返回true跳出，取反表示校验失败
            const isValid = !rules.some(rule => {
                if (rule.required) {
                    if (!this.state[field]) {//表示用户没有填写，是空的
                        //校验失败
                        this.setState({
                            [field + 'Message']: rule.message
                        })
                        return true;
                    }
                }
                return false;
            });
            if (isValid) {
                this.setState({
                    [field + 'Message']: ''
                })
            }

            return isValid;
        }

        validateFields = cb => {
            const rets = Object.keys(this.options).map(field => {
                return this.validateField(field);
            })
            const ret = rets.every(v => v === true);
            cb(ret, this.state);
        }

        //焦点处理，错误获取等
        handleFocus=e=>{
            const field=e.target.name;
            this.setState({
                [field+'Focus']:true
            })
        }

        isFieldTouched=field=>{
            return !!this.state[field+'Focus']//双！！是转成bool值
        }

        getFieldError=field=>{
            return this.state[field+'Message']
        }
        //包装函数：接收字段名和校验选项返回一个高阶组件
        getFieldDec = (field, option) => {
            this.options[field] = option;//传进来要校验的项
            return InputComp => (
                <div>
                    {
                        React.cloneElement(InputComp, {
                            name: field,
                            value: this.state[field] || '',
                            onChange: this.handleChange,//执行校验设置状态等
                            onFocus:this.handleFocus//input获取焦点
                        })
                    }
                </div>
            )
        }

        render() {
            return (
                <Comp
                    getFieldDec={this.getFieldDec}
                    validateFields={this.validateFields}
                    isFieldTouched={this.isFieldTouched}
                    getFieldError={this.getFieldError}
                />
            )
        }

    }
}

//FormItem组件
class FormItem extends Component {
    render() {
        return (
            <div>
                {/*默认插槽*/}
                {this.props.children}
                {this.props.help && (
                    <p style={{color: this.props.validateStatus == 'error' ? 'red' : 'green'}}>
                        {this.props.help}
                    </p>
                )}
            </div>
        )
    }
}

//KInput组件
class KInput extends Component{
    render(){
        console.log(this.props);
        const {prefix,...rest}=this.props;
        return(
            <div>
                {prefix}
                <input {...rest}/>
            </div>
        )
    }
}

@kFormCreate
class KFormTest extends Component {
    onSubmit = () => {
        this.props.validateFields((isValid, values) => {
            if (isValid) {
                console.log(values);
                alert('登录成功！')
            } else {
                console.log(values);
                alert('校验失败！')
            }
        })
    }

    render() {
        const {getFieldDec,isFieldTouched,getFieldError} = this.props;
        const usernameError=isFieldTouched('username') && getFieldError('username');
        const passwordError=isFieldTouched('password') && getFieldError('password');
        return (
            <div>
                <FormItem validateStatus='error' help={usernameError}>
                    {getFieldDec('username', {
                        rules: [{required: true, message: "Please input your username!"}]
                    })(<KInput type='text' prefix={<Icon type='user'/>}/>)}
                </FormItem>
                <FormItem validateStatus='error' help={passwordError}>
                    {getFieldDec('password', {
                        rules: [{required: true, message: "Please input your Password!"}]
                    })(<KInput type='password' prefix={<Icon type='lock'/>}/>)}
                </FormItem>

                <button onClick={this.onSubmit}>登录</button>
            </div>
        );
    }
}

export default KFormTest;
```
# 三、react全家桶
### 1.资源
[redux](https://redux.js.org)

[react-redux](https://github.com/reduxjs/react-redux)

[react-router](https://reacttraining.com/react-router/web/guides/quick-start)

### 2.Redux

- **安装**
```
npm install redux react-redux --save
```
> **redux与vuex的区别**  
>   1.在redux中，变更状态的是Reducers  
>   2.在redux中，没有所谓的getters、actions，仅专注于状态的变更与维护  
>   3.在redux中，想要做异步的事情，需要通过中间件来体系来实现  
>   4.在redux中，提交和变更只有dispatch，在vuex中有dispatch和commit，在redux中，dispatch是同步的    
>   5.redux是一个非常包容的库，是通用的，可以用在vue、angular中

![redux流程图](/Users/qiaoxu/Desktop/pic/redux.jpg)

- **创建store实例**
```
//store/index.js
import {createStore} from 'redux';

export const init=payload=>({
   type:'init',
   payload
});

export const add=payload=>({
    type:'add',
    payload
});


export const loadingStart=()=>({
    type:'loading_start'
});

export const loadingEnd=()=>({
    type:'loading_end'
});


function fruitReducer(state={
    list:[],
    loading:false
}, action) {
    switch (action.type) {
        case 'init':
            return {...state, list: action.payload};
        case'add':
            return {...state, list: [...state, action.payload]};
        case'loading_start':
            return {...state, loading: true};
        case'loading_end':
            return {...state, loading: false};
        default:
            return state;
    }
}

const store=createStore(fruitReducer);

export default store;
```
- **注册该实例provider**
```
//App.js
import store from './store'
import {Provider} from 'react-redux';

{/*Hooks*/}
<Provider store={store}>
    <HookTest/>
</Provider>
```
- **组件中使用状态connect**
```
//HookTest.js
import {connect} from 'react-redux';

const mapStateToProps=state => ({
    fruits: state.list,
    loading: state.loading
});

export default connect(mapStateToProps)(function HookTest({fruits, loading, dispatch}) {
    //useState参数是状态初始值
    //返回一个数组，第一个元素是状态变量，第二个元素是状态变更函数
    const [fruit, setFruit] = useState('草莓');

    //使用useEffect操作副作用，第一个参是回调函数，第二个参是数组
    //任何的状态变更都会执行useEffect
    //请务必设置依赖选项，如果没有则设置空数组表示仅执行一次
    useEffect(() => {
        console.log('get Fruits');
        dispatch({type:'loading_start'})
        setTimeout(() => {
            dispatch({type:'loading_end'})
            dispatch({type:'init',payload:['草莓', '香蕉']})
        }, 2000)
    }, []);

    //设置依赖选项
    useEffect(() => {
        document.title = fruit;
    }, [fruit]);

    //清除工作
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('应用启动了');
        }, 1000)

        //返回清除函数
        return function () {
            clearInterval(timer)
        }
    }, []);


    return (
        <div>
            <p>{fruit === '' ? "请选择喜爱的水果" : `您选择的是${fruit}`}</p>

            {/*<FruitAdd onAddFruit={pname => dispatch({type: 'add', payload: pname})}/>*/}
            {/* 这里不再需要给FruitAdd传递变更函数，实现了解耦 */}
            <FruitAdd/>

            {/*加载状态处理*/}
            {
                loading ? (<div>数据加载中...</div>) : (<FruitList fruits={fruits} setFruit={setFruit}/>)
            }
        </div>
    )
})
```
- **解耦dispatch**
```
//HookTest.js
import {connect} from 'react-redux';
import {init,add,loadingStart,loadingEnd} from './store'
const mapStateToProps=state => ({
    fruits: state.list,
    loading: state.loading
});

const mapDispatchToProps={
    init,add,loadingStart,loadingEnd
}

export default connect(mapStateToProps,mapDispatchToProps)(function HookTest({fruits, loading, init,loadingStart,loadingEnd}) {
    //useState参数是状态初始值
    //返回一个数组，第一个元素是状态变量，第二个元素是状态变更函数
    const [fruit, setFruit] = useState('草莓');

    //使用useEffect操作副作用，第一个参是回调函数，第二个参是数组
    //任何的状态变更都会执行useEffect
    //请务必设置依赖选项，如果没有则设置空数组表示仅执行一次
    useEffect(() => {
        console.log('get Fruits');
        loadingStart();
        setTimeout(() => {
            loadingEnd();
            init(['草莓', '香蕉'])
        }, 2000)
    }, []);

    //设置依赖选项
    useEffect(() => {
        document.title = fruit;
    }, [fruit]);

    //清除工作
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('应用启动了');
        }, 1000)

        //返回清除函数
        return function () {
            clearInterval(timer)
        }
    }, []);


    return (
        <div>
            <p>{fruit === '' ? "请选择喜爱的水果" : `您选择的是${fruit}`}</p>

            {/*<FruitAdd onAddFruit={pname => dispatch({type: 'add', payload: pname})}/>*/}
            {/* 这里不再需要给FruitAdd传递变更函数，实现了解耦 */}
            <FruitAdd/>

            {/*加载状态处理*/}
            {
                loading ? (<div>数据加载中...</div>) : (<FruitList fruits={fruits} setFruit={setFruit}/>)
            }
        </div>
    )
})

```
- **异步——使用中间件**

react默认只支持同步，实现异步任务比如：延迟、网络请求，需要中间件的支持，比如我们试用最简单的redux-thunk和redux-logger

![redux-thunk](/Users/qiaoxu/Desktop/pic/redux-thunk.jpg)
![redux-thunk](/Users/qiaoxu/Desktop/pic/react-middleware.png)

   - 安装redux-thunk

    ```
     npm i redux-thunk redux-logger -S
    ```
   - 应用中间件，store.js

    ```
    //store/index.js
    import {createStore,applyMiddleware} from 'redux';
    import logger from 'redux-logger';//日志记录
    import thunk from 'redux-thunk';
    
    export const asyncFetch=payload=> {
    return dispatch=>{
        dispatch({type:'loading_start'});
        setTimeout(()=>{
            dispatch({type:'loading_end'});
            dispatch({type:'init',payload})
        },1000)
        }
    }
    
    //参数2是中间件
    const store=createStore(fruitReducer,applyMiddleware(logger,thunk));
    
    export default store;
    
    //HookTest.js
    import {init,add,loadingStart,loadingEnd,asyncFetch} from './store'
    
    const mapStateToProps=state => ({
    fruits: state.list,
    loading: state.loading
    });
    
    const mapDispatchToProps={
        //init,
        add,
        //loadingStart,
        //loadingEnd,
        asyncFetch
    }
    
    export default connect(mapStateToProps,mapDispatchToProps)(function HookTest({fruits, loading, asyncFetch}) {
    //useState参数是状态初始值
    //返回一个数组，第一个元素是状态变量，第二个元素是状态变更函数
    const [fruit, setFruit] = useState('草莓');
    
    //使用useEffect操作副作用，第一个参是回调函数，第二个参是数组
    //任何的状态变更都会执行useEffect
    //请务必设置依赖选项，如果没有则设置空数组表示仅执行一次
    useEffect(() => {
        console.log('get Fruits');
        asyncFetch(['草莓', '香蕉'])
    }, []);
    
    //设置依赖选项
    useEffect(() => {
        document.title = fruit;
    }, [fruit]);
    
    //清除工作
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('应用启动了');
        }, 1000)
    
        //返回清除函数
        return function () {
            clearInterval(timer)
        }
    }, []);


    return (
        <div>
            <p>{fruit === '' ? "请选择喜爱的水果" : `您选择的是${fruit}`}</p>
    
            {/*<FruitAdd onAddFruit={pname => dispatch({type: 'add', payload: pname})}/>*/}
            {/* 这里不再需要给FruitAdd传递变更函数，实现了解耦 */}
            <FruitAdd/>
    
            {/*加载状态处理*/}
            {
                loading ? (<div>数据加载中...</div>) : (<FruitList fruits={fruits} setFruit={setFruit}/>)
            }
        </div>
        )
    })
    ```
### 3.react-router

一切皆组件

- **安装**
```
npm install --save react-router-dom
```
- **设定路由**
```
import {BrowserRouter,Link,Route} from 'react-router-dom'

<BrowserRouter>...content</BrowserRouter>
```

- **导航**
```
<BrowserRouter>
        <nav>
            <Link to='/'>水果列表</Link>|
            <Link to='/add'>添加水果</Link>
        </nav>
</BrowserRouter>           
```
- **路由**
```
<BrowserRouter>
    <div>
        <Route exact path='/' render={()=>(
            loading ? (<div>数据加载中...</div>) : (<FruitList fruits={fruits} setFruit={setFruit}/>)
        )}></Route>
        <Route path='/add' component={FruitAdd}></Route>
        <Route path='/detail/:fruit' component={Detail}></Route>
    </div>
</BrowserRouter>
```
- **传参**
```
<li key={f} onClick={() => setFruit(f)}>
    <Link to={`/detail/${f}`}>{f}</Link>
</li>

<Route path='/detail/:fruit' component={Detail}></Route>


//组件中取参
function Detail({match,history}){
    return(
        <div>
            <h3>{match.params.fruit}</h3>
            <p>.....</p>
            <div>
                <button onClick={history.goBack}>返回</button>
            </div>
        </div>
    )
}
```
- **嵌套**

Route组件嵌套在其他页面组件中就产生了嵌套关系
```
function FruitList({fruits, setFruit}) {
    return (
        <div>
            <ul>
                {fruits.map(f => (
                    <li key={f} onClick={() => setFruit(f)}>
                        <Link to={`/list/detail/${f}`}>{f}</Link>
                    </li>
                ))}
            </ul>
            <Route path='/list/detail/:fruit' component={Detail}></Route>
        </div>
    )
}
```
- **404**
```
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom'
//添加Switch表示仅匹配一个，是页面独占式的
<div>
    <Switch>
        <Route path='/list' render={()=>(
            loading ? (<div>数据加载中...</div>) : (<FruitList fruits={fruits} setFruit={setFruit}/>)
        )}></Route>
        <Route path='/add' component={FruitAdd}></Route>
        <Route component={()=><h3>页面不存在</h3>}></Route>
    </Switch>
</div>
```
- **路由守卫**

思路：创建高阶组件包装Route使其具有权限判断功能

将store模块化

store/index.js
```
//store/index.js
import {createStore,applyMiddleware,combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import fruitReducer from './fruit.redux';
import user from './user.redux'


//参数2是中间件
const store=createStore(combineReducers({fruit:fruitReducer,user}),applyMiddleware(logger,thunk));

export default store;
```

fruit.redux.js
```
export const init=payload=>({
    type:'init',
    payload
});

export const add=payload=>({
    type:'add',
    payload
});


export const loadingStart=()=>({
    type:'loading_start'
});

export const loadingEnd=()=>({
    type:'loading_end'
});

export const asyncFetch=payload=> {
    return dispatch=>{
        dispatch({type:'loading_start'});
        setTimeout(()=>{
            dispatch({type:'loading_end'});
            dispatch({type:'init',payload})
        },1000)
    }
}

export default function fruitReducer(state={
    list:[],
    loading:false
}, action) {
    switch (action.type) {
        case 'init':
            return {...state, list: action.payload};
        case'add':
            return {...state, list: [...state.list, action.payload]};
        case'loading_start':
            return {...state, loading: true};
        case'loading_end':
            return {...state, loading: false};
        default:
            return state;
    }
}
```
user.redux.js
```
const initialState = {isLogin: false, loading: false};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'requestLogin':
            return {isLogin: false, loading: true};
        case 'loginSuccess':
            return {isLogin: true, loading: false};
        case"loginFailure":
            return {isLogin: false, loading: false};
        default:
            return state;
    }
}

export function login(user){
    return(dispatch,getState)=>{
        dispatch({type:'requestLogin'});
        setTimeout(()=>{
            dispatch({type:'loginSuccess'});
        },1000)
    }
}
```
HookTest.js——路由守卫
```
import React, {useState, useEffect, useReducer, useContext} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Link, Route, Switch, Redirect} from 'react-router-dom';
import {asyncFetch} from './store/fruit.redux';
import {login} from './store/user.redux'

//创建高阶组件包装Route组件使其可以验证用户登录
const PrivateRoute = connect(state => ({
    isLogin: state.user.isLogin
}))(function ({component: Component, isLogin, ...rest}) {
    return (
        <Route
            {...rest}
            render={
                props => isLogin ? (
                    <Component {...props}></Component>
                ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: {redirect: props.location.pathname}
                    }}
                    />
                )
            }

        >

        </Route>
    )
})


//login组件
const Login = connect(state => ({
    isLogin: state.user.isLogin
}), {login})(function ({location, isLogin, login}) {
    const redirect = location.state.redirect || '/';//重定向地址
    if (isLogin) return <Redirect to={redirect}></Redirect>

    return (
        <div>
            <p>用户登录</p>
            <hr/>
            <button onClick={login}>登录</button>
        </div>
    )
});

const mapStateToProps = state => ({
    fruits: state.fruit.list,
    loading: state.fruit.loading
});

const mapDispatchToProps = {
    asyncFetch
}


return (
    <BrowserRouter>
        <nav>
            <Link to='/list'>水果列表</Link>|
            <Link to='/add'>添加水果</Link>
        </nav>

        <div>
            <Switch>
                <Route path='/list' render={() => (
                    loading ? (<div>数据加载中...</div>) : (<FruitList fruits={fruits} setFruit={setFruit}/>)
                )}></Route>

                <PrivateRoute path='/add' component={FruitAdd}></PrivateRoute>
                <Route path='/login' component={Login}></Route>
                <Route component={() => <h3>页面不存在</h3>}></Route>
            </Switch>
        </div>
    </BrowserRouter>
)
```
### 4.Redux原理

- **redux原理**
```
export function createStore(reducer, enhancer) {
    if (enhancer) {
        return enhancer(createStore)(reducer)
    }
    let currentState = {}
    let currentListeners = []

    function getState() {
        return currentState
    }

    function subscribe(listener) {
        currentListeners.push(listener)
    }

    function dispatch(action) {
        currentState = reducer(currentState, action)
        currentListeners.forEach(v => v())
        return action
    }

    dispatch({type: '@IMOOC/KKB-REDUX'})
    return {getState, subscribe, dispatch}
}

export function applyMiddleware(...middlewares) {
    return createStore => (...args) => {
        const store = createStore(...args)
        let dispatch = store.dispatch
        const midApi = {
            getState: store.getState,
            dispatch: (...args) => dispatch(...args)
        }
        const middlewareChain = middlewares.map(middleware => middleware(midApi))
        dispatch = compose(...middlewareChain)(store.dispatch)
        return {
            ...store,
            dispatch
        }
    }
}

export function compose(...funcs) {
    if (funcs.length == 0) {
        return arg => arg
    }
    if (funcs.length == 1) {
        return funcs[0]
    }
    return funcs.reduce((left, right) => (...args) => right(left(...args)))
}

function bindActionCreator(creator, dispatch) {
    return (...args) => dispatch(creator(...args))
}

export function bindActionCreators(creators, dispatch) {
    return Object.keys(creators).reduce((ret, item) => {
        ret[item] = bindActionCreator(creators[item], dispatch)
        return ret
    }, {})
}
```
- **react-redux原理**
```
import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from './kkb-redux'

export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) =>
    (WrapComponent) => {
        return class ConnectComponent extends React.Component {
            static contextTypes = {
                store: PropTypes.object
            }

            constructor(props, context) {
                super(props, context)
                this.state = {
                    props: {}
                }
            }

            componentDidMount() {
                const {store} = this.context
                store.subscribe(() => this.update())
                this.update()
            }

            update() {
                const {store} = this.context
                const stateProps = mapStateToProps(store.getState())
                const dispatchProps = bindActionCreators(mapDispatchToProps,
                    store.dispatch)
                this.setState({
                    props: {
                        ...this.state.props,
                        ...stateProps,
                        ...dispatchProps
                    }
                })
            }

            render() {
                return <WrapComponent {...this.state.props}></WrapComponent>
            }
        }
    }

export class Provider extends React.Component {
    static childContextTypes = {
        store: PropTypes.object
    }

    getChildContext() {
        return {store: this.store}
    }

    constructor(props, context) {
        super(props, context)
        this.store = props.store
    }

    render() {
        return this.props.children
    }
}
```

- **redux-thunk原理**
```
const thunk = ({dispatch, getState}) => next => action => {
    if (typeof action == 'function') {
        return action(dispatch, getState)
    }
    return next(action)
}
export default thunk
```
### 5.react-router原理
- **BrowserRouter：history初始化及向下传递，location变更监听**
```
import React, {Component} from "react";
import {createBrowserHistory as createHistory} from "history";

export const RouterContext = React.createContext();
export default class BrowserRouter extends Component {
    static computeRootMatch(pathname) {
        return {path: "/", url: "/", params: {}, isExact: pathname === "/"};
    }

    constructor(props) {
        super(props);
        this.history = createHistory(this.props);
        this.state = {
            location: this.history.location
        };
        this._isMounted = false;
        this._pendingLocation = null;
        this.unlisten = this.history.listen(location => {
            if (this._isMounted) {
                this.setState({location});
            } else {
                this._pendingLocation = location;
            }
        });
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._pendingLocation) {
            this.setState({location: this._pendingLocation});
        }
    }

    componentWillUnmount() {
        if (this.unlisten) this.unlisten();
    }

    render() {
        return (
            <RouterContext.Provider
                children={this.props.children || null}
                value={{
                    history: this.props.history,
                    location: this.state.location,
                    match: BrowserRouter.computeRootMatch(this.state.location.pathname)
                }}
            />
        );
    }
}
```
- **Route：路由配置，匹配检测，内容渲染**
```
import React, {Component} from "react";
import {RouterContext} from "./BrowserRouter";
import matchPath from "./matchPath";

export default class Route extends Component {
    render() {
        return (
            <RouterContext.Consumer>
                {context => {
                    const location = this.props.location || context.location;
                    const match = this.props.computedMatch
                        ? this.props.computedMatch // <Switch> already computed the match  for us
                        : this.props.path
                            ? matchPath(location.pathname, this.props)
                            : context.match;
                    const props = {...context, location, match};
                    let {children, component, render} = this.props;
                    // 若未传递children属性，则默认为null
                    if (Array.isArray(children) && children.length === 0) {
                        children = null;
                    }
                    if (typeof children === "function") {
                        children = children(props);
                    }
                    return (
                        <RouterContext.Provider value={props}>
                            {children && React.Children.count(children) > 0
                                ? children
                                : props.match
                                    ? component
                                        ? React.createElement(component, props)
                                        : render
                                            ? render(props)
                                            : null
                                    : null}
                        </RouterContext.Provider>
                    );
                }}
            </RouterContext.Consumer>
        );
    }
}
```
> 依赖：matchPath.js  

```
import pathToRegexp from "path-to-regexp";

const cache = {};
const cacheLimit = 10000;
let cacheCount = 0;

function compilePath(path, options) {
    const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
    const pathCache = cache[cacheKey] || (cache[cacheKey] = {});
    if (pathCache[path]) return pathCache[path];
    const keys = [];
    const regexp = pathToRegexp(path, keys, options);
    const result = {regexp, keys};
    if (cacheCount < cacheLimit) {
        pathCache[path] = result;
        cacheCount++;
    }
    return result;
}

/*** Public API for matching a URL pathname to a path.
 */
function matchPath(pathname, options = {}) {
    if (typeof options === "string") options = {path: options};
    const {path, exact = false, strict = false, sensitive = false} = options;
    const paths = [].concat(path);
    return paths.reduce((matched, path) => {
        if (!path) return null;
        if (matched) return matched;
        const {regexp, keys} = compilePath(path, {
            end: exact,
            strict,
            sensitive
        });
        const match = regexp.exec(pathname);
        if (!match) return null;
        const [url, ...values] = match;
        const isExact = pathname === url;
        if (exact && !isExact) return null;
        return {
            path, // the path used to match
            url: path === "/" && url === "" ? "/" : url, // the matched portion of the URL
            isExact, // whether or not we matched exactly
            params: keys.reduce((memo, key, index) => {
                memo[key.name] = values[index];
                return memo;
            }, {})
        };
    }, null);
}

export default matchPath;
```
- **Link：跳转链接，处理点击事件**
```
import React from "react";
import {RouterContext} from "./BrowserRouter";
import {createLocation} from "history";

class Link extends React.Component {
    handleClick(event, history) {
        event.preventDefault();
        history.push(this.props.to);
    }

    render() {
        const {to, ...rest} = this.props; // eslint-disable-line no-unused-vars
        return (
            <RouterContext.Consumer>
                {context => {
                    const location =
                        typeof to === "string"
                            ? createLocation(to, null, null, context.location)
                            : to;
                    const href = location ? context.history.createHref(location) : "";
                    return (
                        <a
                            {...rest}
                            onClick={event => this.handleClick(event, context.history)}
                            href={href}
                        >
                            {this.props.children}
                        </a>
                    );
                }}
            </RouterContext.Consumer>
        );
    }
}

export default Link;
```
### 6.总结
- **redux**
   - store创建
   - 注册Provider
   - connect(state=>({aa,bb}),{login})(Comp)
- **react-router**
   - BrowserRouter
   - Route

### 7.redux-saga使用

![redux-saga](/Users/qiaoxu/Desktop/pic/redux-saga.png)
- **安装**
    ```
    npm install --save redux-saga
    ```
- **redux-saga**
   - 是redux-thunk的可选方案 
   
   - 概述：redux-saga使副作用（数据获取、浏览器缓存获取）易于管理、执行、测试和失败处理
   
   - 优点：saga强大，利用了generator，处理复杂逻辑的时候及其强大，很多异步操作需要并发，谁最快回来，用谁的值，做一些请求的防抖  
   
   - saga派发的action依然是对象  
   
   - 易管理、易执行、易测试、失败处理  
   
- **使用：用户登录**   

[redux-saga](https://github.com/redux-saga/redux-saga)

store/saga.js
```
//任务清单
import {call,put,takeEvery} from 'redux-saga/effects'

//模拟登录
const UserService={
    login(uname){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                if(uname==='sofiya') {
                    resolve({id:1,name:'sofiya',age:19})
                }else {
                    reject('用户名或密码错误')
                }
            },1000)
        })
    }
}


//worker saga
function* login(action){
    try{
        yield put({type:'requestLogin'});
        const result=yield call(UserService.login,action.uname);
        yield put({type:'loginSuccess',result});
    }catch(message){
        yield put({type:'loginFailure',message})
    }
}

function* mySaga(){
    yield takeEvery('login',login)
}

export default mySaga;
```
store/user.redux.js——做调整
```
const initialState = {isLogin: false, loading: false};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'requestLogin':
            return {isLogin: false, loading: true};
        case 'loginSuccess':
            return {isLogin: true, loading: false};
        case"loginFailure":
            return {isLogin: false, loading: false};
        default:
            return state;
    }
}

export function login(uname) {
    return {type:'login',uname}
}
```
store/index.js
```
import {createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import fruitReducer from './fruit.redux';
import user from './user.redux'

import createSagaMiddleware from 'redux-saga';
import mySaga from './saga'

//创建saga中间件并注册
const sagaMiddleware = createSagaMiddleware();

//参数2是中间件
const store = createStore(
    combineReducers({fruit: fruitReducer, user}),
    applyMiddleware(logger, thunk, sagaMiddleware)
);
//需要run一下
sagaMiddleware.run(mySaga);
export default store;
```
### 8.generator
[generator](https://github.com/57code/frontend/blob/master/doc/Generator.md)

- **生成器函数在执行时能暂停，后面又能从暂停处继续执行：**
```
//生成器函数在执行时能暂停，后面又能从暂停处继续执行：
function* g() {
    yield 'a';
    yield 'b';
    yield 'c';
    return 'ending';
}

var gen = g()
console.log(gen.next()) // {value: "a", done: false}
console.log(gen.next()) // {value: "b", done: false}
console.log(gen.next()) // {value: "c", done: false}
console.log(gen.next()) // {value: "ending", done: true}
```
- **利用递归执行生成器中所有步骤**
```
//利用递归执行生成器中所有步骤
function* g() {
    yield 'a';
    yield 'b';
    yield 'c';
    return 'ending';
}

var gen = g()
function next(){
    let { value, done } = gen.next()
    console.log(value) // 依次打印输出 a b c end
    if(!done) next() // 直到全部完成
}
next()
```
- **通过next()传值**
```
//通过next()传值
function* say() {
    let a = yield '1'
    console.log(a)
    let b = yield '2'
    console.log(b)
}

let it = say() // 返回迭代器

// 输出 { value: '1', done: false }
// a的值并非该返回值，而是下次next参数
console.log(it.next())
// 输出'我是被传进来的1'
// 输出{ value: '2', done: false }
console.log(it.next('我是被传进来的1'))

// 输出'我是被传进来的2'
// 输出{ value: undefined, done: true }
console.log(it.next('我是被传进来的2'))
```
- **结合Promise使用**
```
//结合Promise使用
// 使用Generator顺序执行两次异步操作
function* r(num) {
    const r1 = yield compute(num);
    yield compute(r1);
}

// compute为异步操作，结合Promise使用可以轻松实现异步操作队列
function compute(num) {
    return new Promise(resolve => {
        setTimeout(() => {
            const ret = num * num;
            console.log(ret); // 输出处理结果
            resolve(ret); // 操作成功
        }, 1000);
    });
}

// 不使用递归函数调用
let it = r(2);
it.next().value.then(num => it.next(num));

// 修改为可处理Promise的next
function next(data) {
    let { value, done } = it.next(data); // 启动
    if (!done) {
        value.then(num => {
            next(num);
        });
    }
}

next();
```
> redux-saga基于generator实现，使用钱搞清楚generator相当重要

### 9.umi+dva
- **umi**

   - 开箱即用，内置react、react-router等
   
   - 类next.js且功能完备的路约定，同时值配置的路由方式
   
   - 完善的插件体系，覆盖从源码到构建产物的每个生命周期
   
   - 高性能，通过插件支持PWA、以路由为单元的code splitting等

   - 支持静态页面导出，适配各种环境，比如：中台业务、无线业务、[egg](https://github.com/eggjs/egg)、支付宝钱包、云风蝶等

   - 开发启动快，支持一键开启dll和hard-source-webpack-plugin等

   - 一键兼容到IE9，基于umi-plugin-polyfills

   - 完善的TypeScript支持，包括d.ts定义和umi test

   - 与[dva数](https://dvajs.com/)据流的深入融合，支持duck directory、model的自动加载、code splitting等等

![dva](/Users/qiaoxu/Desktop/pic/dva.png)

![umi](/Users/qiaoxu/Desktop/pic/umi.png)

- **安装**
```
//全局安装
npm i umi -g
//开发依赖
npm install umi -D
```
- **自动生成路由**

   - 手动创建src文件，src文件下创建pages文件
   - umi g page index
- **起服务**
```
umi dev
```
- **动态路由**
```
//创建users/$id.js，内容和其他页面相同，显示一下传参

export default function({match}) {
    return (
        <div>
            <h1>users/{match.params.id}</h1>
        </div>
    );
}
```
- **嵌套路由**
目录下创建_layout.js
```
//users/_layout.js

export default function({match,children}) {
    return (
        <div>
            <h1>users layout</h1>
            {children}
        </div>
    );
}
```
- **页面跳转**

users/index.js
```
import styles from './index.css';
import Link from 'umi/link';
import router from 'umi/router';

export default function ({history}) {
    const users = [{id: 1, name: 'tom'}, {id: 2, name: 'sofiya'}]
    return (
        <div className={styles.normal}>
            <h1>Page index</h1>
            <ul>
                {users.map(u=>(
                    <li key={u.id}>
                        <Link to={`users/${u.id}`}>{u.name}</Link>
                    </li>
                    // {<li key={u.id} onClick={()=>history.push(`users/${u.id}`)}>{u.name}</li>}
                    // <li key={u.id} onClick={()=>router.push(`users/${u.id}`)}>{u.name}</li>
                ))}

            </ul>
        </div>
    );
}
```

- **配置路由**
业务复杂后仍需要配置路由
```
//在根目录下创建config/config.js——需要重启服务
//./是相对pages的
export default {
    routes:[
        {path:'/',component:'./index'},
        {
            path:'/users',
            component:'./users/_layout',
            routes:[
                {path:'/users/',component:'./users/index'},
                {path:'/users/:id',component:'./users/$id'},
            ]
        }
    ]
}

```
- **404页面**
添加不带path的路由配置项：
```
config/config.js——需要重启服务
//./是相对pages的
export default {
    routes:[
        {path:'/',component:'./index'},
        {
            path:'/users',
            component:'./users/_layout',
            routes:[
                {path:'/users/',component:'./users/index'},
                {path:'/users/:id',component:'./users/$id'},
            ]
        },
        {component:'./NotFound'}
    ]
}
```
umi g page NotFound页面

- **权限路由**
```
//config/config.js
export default {
    routes: [
        {
            path: '/about', component: './about', Routes: [
                './routes/PrivateRoute.js'//相对于根目录
            ]
        }
    ]
}
//根目录上创建routes/PrivateRoute.js
import Redirect from 'umi/redirect';

export default props=>{
    //50%概率需要去登录页面
    if(Math.random()>0.5) {
        return <Redirect to='/login'></Redirect>
    }
    return(
        <div>
            <div>PrivateRoute(routes/PrivateRoute.js)</div>
            {props.children}
        </div>
    )
}
```
- **引入antd**

   - 添加antd：npm i antd -S
   - 添加umi-plugin-react:npm i umi-plugin-react -D
   - 修改config/config.js
> window10需要管理员权限去安装
- **数据流管理dva**

引入dva，软件分层，回顾react，为了让数据流更易于维护，我们分成了store、reducer、action等模块，各司其职，软件开发也是一样

前端代码分层：
![dva](/Users/qiaoxu/Desktop/pic/dva-data.png)

1. page负责与用户直接打交道：渲染页面、接受用户的操作输入，侧重于展示型交互性逻辑。
2. Model负责处理业务逻辑，为page做数据、状态的读写、变换、暂存等。
3. Service负责与HTTP接口对接，进行纯粹的数据读写。

dva是基于redux、redux-saga和redux-router的轻量级前端框架及最佳实践沉淀，核心api如下：
1. model
   - state状态
   - action
   - dispatch
   - reducer
   - effect副作用，处理异步
2. subscriptions订阅
3. router路由

> 配置dva   

```
//config/config.js
export default {
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva:true
        }],
    ],
}
```
> 数据mock：模拟数据接口   

mock目录与src平级，新建mock/goods.js
```
let data=[
    {title:'web全栈'},
    {title:'java架构师'},
    {title:'百万年薪'},
];

export default {
    "get /api/goods":function(req,res,next) {
        setTimeout(()=>{
            res.json({
                result:data
            })
        },1000)
    }
}
```
> 创建models:在src下创建models，models下创建需要的goods.js   

```
//src/models/goods.js
//首先安装axios  cnpm i axios --save
import axios from 'axios';

//api
function getGoods(){
    return axios.get('/api/goods')
}
export default {
    namespace:'goods',//model的命名空间，区分多个model
    state:[],//初始状态
    effects:{
        //异步状态
        *getList(action,{call,put}){
            const res=yield call(getGoods);
            yield put({type:'initGoods',payload:res.data.result})
        }
    },
    reducers:{
        //更新状态
        addGood(state,action){
            return [...state,{title:action.payload.title}]
        },
        initGoods(state,action) {
            return action.payload
        }
    }
}
```
> 1.namespace：model的命名空间，只能用字符串。一个大型应用可能包含多个model，通过namespace区分   
> 2.reducer：用于修改state，由于action触发。reducer是一个纯函数，它接受当前的state及一个action对象。action对象里面可以包含数据体（payload）作为入参，需要返回一个新的state。   
> 3.effects：用于处理异步操作（例如：与服务端交互）和业务逻辑，也是由action触发。但是，它不可以修改state，要通过触发action调用reducer实现对state间接操作。   
> 4.action：是reducers及effects的触发器，一般一个对象，形如：{type：'add',payload:todo}，通过type属性可以匹配到具体某个reducer或者effect，payload属性则是数据体，用于传送给reducer或effect。   

> 使用状态   

```
import React, { Component } from "react";
import { Button, Card } from "antd";
import { connect } from "dva";

@connect(
    state => ({
        loading:state.loading,//通过loading命名空间获取加载状态
        goodsList: state.goods // 获取指定命名空间的模型状态
    }),
    {
        addGood: title => ({
            type: "goods/addGood", // action的type需要以命名空间为前缀+reducer名称
            payload: { title }
        }),
        getList:()=>({
            type:'goods/getList'
        })
    }
)
class Goods extends Component {
    //初始化数据
    componentDidMount() {
        this.props.getList();
    }

    render() {
        return (
            <div>
                {/* 商品列表 */}
                <div>
                    {/*加载状态*/}
                    {this.props.loading.models.goods && <p>loading...</p> }
                    {this.props.goodsList.map(good => {
                        return (
                            <Card key={good.title}>
                                <div>{good.title}</div>
                            </Card>
                        );
                    })}
                    <div>
                        <Button
                            onClick={() =>
                                this.props.addGood("商品s" + new Date().getTime())
                            }
                        >
                            添加商品
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Goods;
```
> 加载状态：利用内置的dva-loading实现   

```
import { connect } from "dva";

@connect(
    state => ({
        loading:state.loading,//通过loading命名空间获取加载状态
        goodsList: state.goods // 获取指定命名空间的模型状态
    }),
}
class Goods extends Component {
    render() {
        return (
            <div>
                {/* 商品列表 */}
                <div>
                    {/*加载状态*/}
                    {this.props.loading.models.goods && <p>loading...</p> }
                </div>
            </div>
        )
    }
}
```
# 四、react项目实战

**1. Antd-pro应用**

- antd

[antd布局组件使用](https://ant.design/components/layout-cn/)

- ant-design-pro安装

[ant-design-pro](https://preview.pro.ant.design/dashboard/analysis)
```
npm install ant-design-pro --save
```

- Ant Design React 和 Ant Design Pro 有什么区别？

可以理解为 Ant Design React 是一套 React 组件库，而 Pro 是使用了这套组件库的完整前端脚手架。

- 创建布局

layouts/index.js
```
import {Layout, Menu} from 'antd';
import Link from 'umi/link';
import styles from './index.css'

const {Header, Footer, Content} = Layout;
export default function (props) {
    const pathname = props.location.pathname;

    console.log(pathname);
    const menu = [
        {path: '/', name: '商品'},
        {path: '/users', name: '用户'},
        {path: '/about', name: '关于'},
    ];

    const selectedKeys = menu.filter(menu => {
        if (menu.path === '/') {
            return pathname === '/'
        }
        return pathname.indexOf(menu.path) !== -1;
    }).map(menu => menu.path);

    return (
        <Layout>
            {/*页头*/}
            <Header className={styles.header}>
                <img src="https://img.kaikeba.com/logo-new.png" className={styles.logo}/>
                <Menu theme='dark' selectedKeys={selectedKeys} style={{lineHeight: '64px', float: 'left'}}
                      mode="horizontal">
                    {menu.map(menu =>
                        <Menu.Item key={menu.path}>
                            <Link to={menu.path}>{menu.name}</Link>
                        </Menu.Item>
                    )}
                </Menu>
            </Header>
            {/*内容*/}
            <Content className={styles.content}>
                <div className={styles.box}>{props.children}</div>
            </Content>
            {/*页脚*/}
            <Footer className={styles.footer}>开课吧</Footer>
        </Layout>
    )
}
```

- 配置路由

config/config.js
```
export default {
    plugins: [
        [
            "umi-plugin-react",
            {
                antd: true,
                dva: true
            }
        ]
    ],
    routes: [
        {path: "/login", component: "./login"},
        {
            path: '/',
            component: '../layouts',
            routes: [
                {path: "/", component: "./goods/index"},
                {
                    path: "/about",
                    component: "./about",
                    Routes: ["./routes/PrivateRoute.js"]
                },
                {
                    path: "/users",
                    component: "./users/_layout",
                    routes: [
                        {path: "/users/", component: "./users/index"},
                        {path: "/users/:id", component: "./users/$id"}
                    ]
                },
                {
                    component: "./404"
                }
            ]
        }

    ]
};
```
**2. 用户登录认证**

- 404页面
```
import {Exception} from 'ant-design-pro'
export default function() {
  return (
      <Exception type='404' backText='返回首页'></Exception>
  );
}
```
- 登录接口mock

mock下创建login.js
```
export default {
    'post /api/login'(req,res){
        const {username,password}=req.body;
        if(username=='kaikeba'&&password=='123') {
            return res.json({
               code:0,
               data:{
                   token:'kaikebasgood',
                   role:'admin',
                   balance:1000,
                   username:'kaikeba'
               }
            })
        }
        if(username=='sofiya'&&password=='123') {
            return res.json({
                code:0,
                data:{
                    token:'kaikebasgood',
                    role:'user',
                    balance:1000,
                    username:'sofiya'
                }
            })
        }
        return res.status(401).json({
            code:-1,
            msg:'密码错误'
        })
    }
}`

```
- 登录请求接口：用户信息保存和登录动作编写

src/models/user.js
```
import axios from 'axios';
import router from 'umi/router'

const userinfo = JSON.parse(localStorage.getItem('userinfo')) || {
    token: '',
    role: '',
    username: '',
    balance: 0
}

function login(payload) {
    console.log(payload);
    return axios.post('/api/login', payload).then(({data}) => ({

        code: data.code,
        userinfo: data.data
    }))
}

export default {
    namespaces: 'user',
    state: userinfo,
    effects: {
        * login({payload}, {call, put}) {
            try {
                const {code, userinfo} = yield call(login, payload);
                //成功
                localStorage.setItem('userinfo', JSON.stringify(userinfo));
                yield put({type: 'init', payload: userinfo});
                //重定向
                router.push('/');
            } catch (err) {
                console.log(err);
            }

        }
    },
    reducers: {
        init(state, action) {
            return action.payload
        }
    }
}
```
- 登录页login.js
```
import styles from './login.css';
import router from 'umi/router';
import {Login} from 'ant-design-pro';
import {connect} from 'dva';
const {UserName, Password, Submit} = Login;

export default connect()(function (props) {
    let from = props.location.state.from || "/"; // 重定向地址

    const onSubmit=(err,values)=>{
        if(!err) {
            props.dispatch({type:'user/login',payload:values})
        }
    }

    return (
        <div className={styles.loginForm}>
            <img className={styles.logo} src="https://img.kaikeba.com/logo-new.png"/>
            {/* 登录表单 */}
            <Login onSubmit={onSubmit}>
                <UserName
                    name="username"
                    placeholder="kaikeba"
                    rules={[{required: true, message: "请输入用户名"}]}
                />
                <Password
                    name="password"
                    placeholder="123"
                    rules={[{required: true, message: "请输入密码"}]}
                />
                <Submit>登录</Submit>
            </Login>
        </div>
    );
})

```
- 响应拦截

src/interceptors.js
```
import axios from "axios";
import { notification } from "antd";

const codeMessage = {
    202: "一个请求已经进入后台排队（异步任务）。",
    401: "用户没有权限（令牌、用户名、密码错误）。",
    404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
    500: "服务器发生错误，请检查服务器。"
};

// 仅拦截异常状态响应
axios.interceptors.response.use(null, ({ response }) => {
    if (codeMessage[response.status]) {
        notification.error({
            message: `请求错误 ${response.status}: ${response.config.url}`,
            description: codeMessage[response.status]
        });
    }
    return Promise.reject(err);
});
```

interceptors.js不会自动执行，所以需要在src创建global.js，引入interceptors.js，global.js会自动执行
```
import interceptors from './interceptors'
```
**3. 创建商品页面**

- 数据mock：mock/goods.js
```
// 课程列表
const course = {
  data:{
    'Javascript':[
      {
        id:1,
        name:'ES6语法实战',
        img:'LearnES6_Final.png',
        price:'100',
        solded:'561',
      },
      {
        id:2,

        name:'Typescript实战',
        img:'Typescript_Plumbing_image.png',
        price:'100',
        solded:'156',
      },
      {
        id:3,

        name:'Javascript算法实战',
        img:'JSBasic-Algorithms_Final.png',
        price:'100',
        solded:'526',
      },

    ],

    'React':[
      {
        id:4,

        name:'React入门',
        img:'ReactBeginners.png',
        price:'100',
        solded:'536',
      },
      {
        id:5,

        name:'ReactNative开发自己的APP',
        img:'ReactNative.png',
        price:'100',
        solded:'456',
      },
      {
        id:6,

        name:'React服务端渲染实战',
        img:'ReactNextServer_Final.png',
        price:'100',
        solded:'556',
      },
      {
        id:7,

        name:'Redux Sage中间件实战',
        img:'ReduxSaga.png',
        price:'100',
        solded:'2256',
      },
      {
        id:8,

        name:'试用react开发PWA应用',
        img:'PWAReact_Final.png',
        price:'100',
        solded:'1156',
      },
      {
        id:9,

        name:'React Hooks实战',
        img:'SimplifyHooks_Final.png',
        price:'100',
        solded:'5361',
      },
      {
        id:10,

        name:'React Mobx状态管理实战',
        img:'React_Mobx_TS.png',
        price:'100',
        solded:'956',
      },
    ],
    'Vuejs':[
      {
        id:11,

        name:'Vue进阶实战',
        img:'VueJS_Final.png',
        price:'180',
        solded:'586',
      },

      {
        id:12,

        name:'Vuejs开发pwa应用',
        img:'VuePwa.png',
        price:'100',
        solded:'596',
      },
      {
        id:13,

        name:'试用TS开发Vuejs应用',
        img:'TSVue_Final.png',
        price:'100',
        solded:'526',
      },

    ],
    'Git':[
      {
        id:14,

        name:'Github从入门到精通',
        img:'github.png',
        price:'99',
        solded:'10',
      },
      {
        id:15,

        name:'Git版本控制实战',
        img:'LearnGit.png',
        price:'49',
        solded:'180',
      },

    ],
    'Test':[
      {
        id:16,

        name:'Puppetee测试入门',
        img:'TestGooglePuppeteer_Final.png',
        price:'10',
        solded:'56',
      },
      {
        id:17,

        name:'使用jest测试你的React项目',
        img:'TestReactJest.png',
        price:'30',
        solded:'10',
      },
    ],
    'Python':[
      {
        id:18,

        name:'Python从入门到精通',
        img:'IntroPython.png',
        price:'100',
        solded:'56',
      },
    ],
    'Node.js':[

      {
        id:19,

        name:'使用Docker部署你的nodejs',
        img:'NodeDocker_1000.png',
        price:'100',
        solded:'56',
      },
      {
        id:20,

        name:'在AWS环境部署nodejs',
        img:'NodeAWSServerless_Final.png',
        price:'100',
        solded:'56',
      },

    ],
    'GraphQL':[
      {
        id:21,

        name:'GraphQL从入门到精通',
        img:'GraphQL_Final.png',
        price:'100',
        solded:'56',
      },
    ]
  },
  tags:['Javascript','React','Vuejs','Git','Test','Python','Node.js','GraphQL']
}
// 课程分类
course.tags.forEach(tag=>{
  course.data[tag].forEach(v=>{
    v.tag = tag
  })
})
export default {
  // "method url": Object 或 Array
  // "get /api/goods": {
  //   result: data
  // },
  // "method url": (req, res) => {}
  "get /api/goods": function(req, res, next) {
    setTimeout(() => {
      res.json({
        result: course
      });
    }, 2500);
  }
};
```
- 准备图片素材：根目录下public/course/图片
- 修改商品数据模型：src/pages/goods/models/goods.js
```
import axios from 'axios';

// api
function getGoods(){
  return axios.get('/api/goods').then(({data})=>{
    const courseData=data.result;
    return {
      courses:courseData.data,
      tags:courseData.tags
    }
  })
}

export default {
  namespace: "goods",
  state: {
    courses:{},//课程
    tags:[]//分类
  },
  effects: {
    *getList(action, {call, put}){           
      const payload = yield call(getGoods)
      yield put({ type: 'initGoods', payload: payload})
    }
  },
  reducers: {
    initGoods(state,{payload}){
      return payload
    }
  }
};
```
- 商品页：src/pages/goods.js
```
import React, {Component} from "react";
import {Button, Card, Row, Col, Skeleton, Icon} from "antd";
import {connect} from "dva";
import {TagSelect} from 'ant-design-pro';

@connect(
    state => ({
        courses: state.goods.courses,
        tags: state.goods.tags,
        loading: state.loading
    }),
    {
        addGood: title => ({
            type: "goods/addGood",
            payload: {title}
        }),
        getList: () => ({
            type: 'goods/getList'
        })
    }
)
class Goods extends Component {
    constructor(props){
        super(props);

        //displayCourses是过滤后的数据，用于显示在屏幕上
        this.state={
            displayCourses:new Array(8).fill({})//填充数组用于骨架屏
        }
    }
    componentDidMount() {
        this.props.getList({foo: 'bar'});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.tags.length>0) {
            this.tagSelectChange(nextProps.tags,nextProps.courses);
        }
    }

    tagSelectChange = (tags,courses=this.props.courses) => {
        const displayCourses=tags.flatMap(tag=>courses[tag])
        this.setState({displayCourses});
    }

    render() {
        // console.log(this.props.loading);
        if (this.props.loading.models.goods) {
            return <div>加载中...</div>
        }
        return (
            <div>
                {/*分类页签*/}
                <TagSelect onChange={this.tagSelectChange}>
                    {this.props.tags.map(tag => {
                        return (
                            <TagSelect.Option key={tag} value={tag}>
                                {tag}
                            </TagSelect.Option>
                        );
                    })}
                </TagSelect>
                {/*商品列表*/}
                <Row type="flex" justify="start">
                    {this.state.displayCourses.map((item, index) => {
                        return (
                            <Col key={index} style={{padding: 10}} span={6}>
                                {item.name ? (
                                    <Card
                                        hoverable
                                        title={item.name}
                                        cover={<img src={"/course/" + item.img}/>}
                                        extra={
                                            <Icon
                                                onClick={e => this.addCart(e, item)}
                                                type="shopping-cart"
                                                style={{fontSize: 18}}
                                            />
                                        }
                                    >
                                        <Card.Meta
                                            description={
                                                <div>
                                                    <span>￥{item.price}</span>
                                                    <span style={{float: "right"}}>
                            <Icon type="user"/> {item.solded}
                          </span>
                                                </div>
                                            }
                                        />
                                        <div/>
                                    </Card>
                                ) : (
                                    <Skeleton active={true}/>
                                )}
                            </Col>
                        );
                    })}
                </Row>
            </div>
        );
    }
}

export default Goods;
```
**4. 添加购物车**

src/models/cart.js
```
export default {
    namespace:'cart',
    state:JSON.parse(localStorage.getItem('cart'))||[],//初始状态：缓存或空数组
    effects:{
        *addCart({payload},{put,select}){
            //1、派发动作
            yield put({type:'add',payload});

            //2、缓存
            const cart=yield select(state=>state.cart);
            localStorage.setItem('cart',JSON.stringify(cart));
        }
    },
    reducers:{
        add(cart,action){
            const good=action.payload;
            const idx=cart.findIndex(v=>v.id==good.id);
            console.log(idx);
            if(idx>-1) {
                //更新数量
                const cartCopy=[...cart];
                const itemCopy={...cartCopy[idx]};
                itemCopy.count+=1;
                cartCopy.splice(idx,1,itemCopy);
                return cartCopy;
            }else {
                //新增
                return [...cart,{...good,count:1}]
            }
        }
    }
}
```

layouts/index.js
```
import {Layout, Menu, Badge, Icon, Dropdown} from 'antd';
import Link from 'umi/link';
import styles from './index.css'
import {connect} from 'dva';

const {Header, Footer, Content} = Layout;
export default connect(state => ({
    cart: state.cart,
    count: state.cart.length
}))(function (props) {
    const pathname = props.location.pathname;

    console.log(props.cart);
    const dropmenu = (
        <Menu>
            {
                props.cart.map((item, index) => (
                    <Menu.Item key={index}>
                        {item.name} x {item.count}
                        <span>￥{item.count * item.price}</span>
                    </Menu.Item>
                ))
            }
        </Menu>
    )

    const menu = [
        {path: '/', name: '商品'},
        {path: '/users', name: '用户'},
        {path: '/about', name: '关于'},
    ];

    const selectedKeys = menu.filter(menu => {
        if (menu.path === '/') {
            return pathname === '/'
        }
        return pathname.indexOf(menu.path) !== -1;
    }).map(menu => menu.path);

    return (
        <Layout>
            {/*页头*/}
            <Header className={styles.header}>
                <img src="https://img.kaikeba.com/logo-new.png" className={styles.logo}/>
                <Menu theme='dark' selectedKeys={selectedKeys} style={{lineHeight: '64px', float: 'left'}}
                      mode="horizontal">
                    {menu.map(menu =>
                        <Menu.Item key={menu.path}>
                            <Link to={menu.path}>{menu.name}</Link>
                        </Menu.Item>
                    )}
                </Menu>
                <Dropdown overlay={dropmenu} placement={'bottomRight'}>
                    <div style={{float: "right"}}>
                        <Icon type='shopping-cart' style={{fontSize: 18}}></Icon>
                        <span>我的购物车</span>
                        <Badge count={props.count} offset={[-4, -18]}></Badge>
                    </div>
                </Dropdown>
            </Header>
            {/*内容*/}
            <Content className={styles.content}>
                <div className={styles.box}>{props.children}</div>
            </Content>
            {/*页脚*/}
            <Footer className={styles.footer}>开课吧</Footer>
        </Layout>
    )
})
```
src/pages/goods/index.js——加购物车
```
@connect(
    state => ({
        courses: state.goods.courses,
        tags: state.goods.tags,
        loading: state.loading
    }),
    {
        getList: () => ({
            type: 'goods/getList'
        }),
        addCart: payload => ({
            type: "cart/addCart",
            payload
        }),
    }
)
class Goods extends Component {
    addCart=(e,item)=>{
        e.stopPropagation();
        this.props.addCart(item)
    }
    render() {
    // console.log(this.props.loading);
    if (this.props.loading.models.goods) {
        return <div>加载中...</div>
    }
    return (
        <div>
            
            {/*商品列表*/}
            <Row type="flex" justify="start">
                {this.state.displayCourses.map((item, index) => {
                    return (
                        <Col key={index} style={{padding: 10}} span={6}>
                            {item.name ? (
                                <Card
                                    hoverable
                                    title={item.name}
                                    cover={<img src={"/course/" + item.img}/>}
                                    extra={
                                        <Icon
                                            onClick={e => this.addCart(e, item)}
                                            type="shopping-cart"
                                            style={{fontSize: 18}}
                                        />
                                    }
                                >
                                    <Card.Meta
                                        description={
                                            <div>
                                                <span>￥{item.price}</span>
                                                <span style={{float: "right"}}>
                        <Icon type="user"/> {item.solded}
                      </span>
                                            </div>
                                        }
                                    />
                                    <div/>
                                </Card>
                            ) : (
                                <Skeleton active={true}/>
                            )}
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}
```

# 五、react原理剖析

[react](https://github.com/facebook/react/blob/master/packages/react/src/React.js)
### 1.手写createElement、Component、render三个api
jsx -> React.createElement -> vdom

jsx就是js对象，就是vdom

- **最核心的api：**

React.createElement：创建虚拟DOM

React.Component：实现自定义组件

ReactDOM.render：渲染真实DOM

- **jsx**

```
//jsx
class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hello {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  document.getElementById('hello-example')
);

//
class HelloMessage extends React.Component {
  render() {
    return React.createElement(
      "div",//类型type
      null,//标签属性
      "Hello ",
      this.props.name
    );
  }
}

ReactDOM.render(React.createElement(HelloMessage, { name: "Taylor" }), document.getElementById('hello-example'));
```
> 什么是jsx   
>     1.语法糖   
>     3.React使用JSX来替代常规的JavaScript   
>     4.JSX是一个看起来很像XML的JavaScript语法扩展

> 为什么需要jsx   
>     1.JSX执行更快，因为它在编译为JavaScript代码进行了优化   
>     2.它是类型安全的，在编译过程中就能发现错误   
>     3.使用JSX编写模板更加简单快速。   
> 怎么样   
> 原理   
>     1.babel-loader会预编译JSX为React.createElement()

#### 1)创建kcreate：实现createElement，并返回vdom
```
function createElement(type, props, ...children) {
    //返回虚拟dom
    props.children = children;
    delete props.__self;
    delete props.__source;

    //能区分组件类型：
    //vtype：1-原生标签；2-函数组件；3-类组件
    let vtype;
    if (typeof type === 'string') {
        //原生标签
        vtype=1;
    } else {
        if(type.isReactComponent) {
            //类组件
            vtype=3;
        }else {
            //函数组件
            vtype=2;
        }
    }

    return {vtype,type, props};
}


export class Component {
    static isReactComponent=true;
    constructor(props) {
        this.props = props;
        this.state = {};
    }

    setState() {
    }

    forceUpdate() {
    }
}

export default {createElement}
```
#### 2)创建kreate-dom：实现render，能够将kvdom返回的dom追加至container
```
function createElement(type, props, ...children) {
    //返回虚拟dom
    props.children = children;
    delete props.__self;
    delete props.__source;

    //能区分组件类型：
    //vtype：1-原生标签；2-函数组件；3-类组件
    let vtype;
    if (typeof type === 'string') {
        //原生标签
        vtype=1;
    } else {
        if(type.isReactComponent) {
            //类组件
            vtype=3;
        }else {
            //函数组件
            vtype=2;
        }
    }

    return {vtype,type, props};
}


export class Component {
    static isReactComponent=true;
    constructor(props) {
        this.props = props;
        this.state = {};
    }

    setState() {
    }

    forceUpdate() {
    }
}

export default {createElement}
```
#### 3)创建kvdom：实现initNode，能够将vdom转换为dom
```
//执行和vdom相关的操作
export function initNode(vnode){
    let {vtype}=vnode;
    if(!vtype) {
        //文本节点
        return document.createTextNode(vnode);
    }

    if(vtype===1) {
        //原生标签：div
        return createNativeElement(vnode);
    }else if(vtype==2) {
        //函数组件
        return createFuncComp(vnode);
    }else {
        return createClassComp(vnode);
    }
}

function createNativeElement(vnode){
    const {type,props}=vnode;
    //创建dom
    const node=document.createElement(type);
    //过滤特殊属性
    const {key,children,...rest}=props;
    Object.keys(rest).forEach(k=>{
        //需要特殊处理的htmlFor，className
        if(k==='className') {
            node.setAttribute('class',rest[k]);
        }else if(k==='htmlFor') {
            node.setAttribute('for',rest[k]);
        }else {
            node.setAttribute(k,rest[k]);
        }
    })
    //递归
    children.forEach(c=>{
        if(Array.isArray(c)) {
           c.forEach(n=>node.appendChild(initNode(n)));
        }else {
            node.appendChild(initNode(c));
        }
    })

    return node;
}
function createFuncComp(vnode){
    //此处的type是一个函数
    const {type,props}=vnode;
    const vdom=type(props);
    return initNode(vdom);
}
function createClassComp(vnode){
    //此处的type是一个class
    const {type,props}=vnode;
    const component=new type(props);
    const vdom=component.render();
    return initNode(vdom);
}
```
> 总结   
>     1.webpack+babel编译时，替换JSX为React.createElement(type,props,...children)   
>     2.所有React。createElement()执行结束后得到一个JS对象，它能够完整描述dom结构，称之为vdom   
>     3.ReactDOM.render(vdom,container)可以将vdom转为dom并追加到container中，通过递归遍历vdom树，根据不同vtype，执行不同的逻辑：vtype为1生成原生元素，为2则需要将类组件实例化并执行其render将返回

### 2.setState原理剖析
class组件的特点，就是拥有特殊状态并且可以通过setState更新状态，从而重新渲染视图，是学习React中最重要的api。
```
//批量
setState({foo});
setState({bar});
setState({foo,bar});

//异步
setState({foo:'bar'});
console.log(foo)//'foo'
```
setState并没有直接操作去渲染，而是执行了一个异步的updater队列，我们使用一个类来专门管理

![setState工作原理1](/Users/qiaoxu/Desktop/pic/setState1.png)

![setState工作原理2](/Users/qiaoxu/Desktop/pic/setState2.png)

关键代码：

```
// Component
setState(nextState,callback){
// 添加异步队列 不是每次都更新
    this.$updater.addCallback(callback);
    this.$updater.addState(nextState);
}
// updater
addState(nextState){
    if (nextState) {
// 放入更新队列
        this.pendingStates.push(nextState)
// 如果当前队列没有工作则直接更新
        if (!this.isPending) {
            this.emitUpdate()
        }
    }
}
emitUpdate(nextProps, nextContext){
    this.nextProps = nextProps
    this.nextContext = nextContext
    // receive nextProps!! should update immediately
    nextProps || !updateQueue.isPending
        ? this.updateComponent()
        : updateQueue.add(this)
}
// updateQueue
add(updater){
    this.updaters.push(updater)
}
batchUpdate(){
    if (this.isPending) {
        return;
    }
    this.isPending = true
    let {updaters} = this
    let updater
    while (updater = updaters.pop()) {
        updater.updateComponent()
    }
    this.isPending = false
}
//updater
updateComponent(){
    let {instance, pendingStates, nextProps, nextContext} = this
    if (nextProps || pendingStates.length > 0) {
// ...
// getState 合并所有的state的数据，一次更新
        shouldUpdate(instance, nextProps, this.getState(), nextContext,
            this.clearCallbacks)
    }
}

function shouldUpdate(component, nextProps, nextState, nextContext, callback) {

// 是否应该更新 判断shouldComponentUpdate生命周期
// ...
    component.forceUpdate(callback)
}

// // Component
// // 跳过所有生命周期执行强制更新
forceUpdate(callback){
// 实际更新组件的函数
    let {$updater, $cache, props, state, context} = this
//...
// 下面才是重点 diff
    let newVnode = renderComponent(this)
    let newNode = compareTwoVnodes(vnode, newVnode, node, getChildContext(this, parentContext))
// ...
}
```



### 3.虚拟dom原理剖析

[虚拟dom](https://github.com/facebook/react/blob/master/packages/react-dom/src/client/ReactDOM.js)

react virtual dom是什么？说一下diff算法？

**what**：用JavaScript对象表示DOM信息和结构，当状态变更的时候，重新渲染这个JavaScript的对象结构。这个JavaScript对象称为virtual dom；

**why**：DOM操作很慢，轻微的操作都可能导致页面重新排版，非常耗性能。相对于DOM对象，js对象处理起来更快，而且更简单。通过diff算法对比新旧vdom之间的差异，可以批量的、最小化的执行dom操作，从而提高性能。

**where**：react中用JSX语法描述视图，通过babel-loader转译后它们变为React.createElement(...)形式，该函数将生成vdom来描述真实dom。将来如果状态变化，vdom将作出相应的变化，再通过diff算法对比新老vdom区别从而做出最终dom操作。

传统dom渲染过程：
![传统dom渲染](/Users/qiaoxu/Desktop/pic/dom.png)

**how**：

- **diff算法：**


- **diff策略：**

1. 只同级比较，Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计。

2. 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。

例如：div->p, CompA->CompB

3. 对于同一层级的一组子节点，通过唯一的key进行区分。

4. tree diff、component diff、element diff


- **element diff：**

> 差异类型：   

1. **替换原来的节点**，例如把div换成了p，Comp1换成Comp2

2. **移动、删除、新增子节点**， 例如ul中的多个子节点li中出现了顺序互换。

3. 修改了节点的**属性**，例如节点类名发生了变化。

4. 对于**文本节点**，文本内容可能会改变。

重排（reorder）操作：INSERT_MARKUP（插入）、MOVE_EXISTING（移动）和 REMOVE_NODE（删除）。
1)INSERT_MARKUP，新的 component 类型不在老集合里， 即是全新的节点，需要对新节点执行插入操作。

2)MOVE_EXISTING，在老集合有新 component 类型，且 element 是可更新的类型，
generateComponentChildren 已调用 receiveComponent，这种情况下 prevChild=nextChild，就需要做移动操作，可以复用以前的 DOM 节点。

3)REMOVE_NODE，老 component 类型，在新集合里也有，但对应的 element 不同则不能直接复用和更新，
需要执行删除操作，或者老 component 不在新集合里的，也需要执行删除操作。

### 4.Hooks原理
将函数组件状态保存在外部作用域，类似链表的实现原理，由于有严格的顺序关系，所以函数组件中useState这些api不能出现条件、循环语句中

```
function FunctionalComponent () {
const [state1, setState1] = useState(1)
const [state2, setState2] = useState(2)
const [state3, setState3] = useState(3)
}
hook1 => Fiber.memoizedState
state1 === hook1.memoizedState
hook1.next => hook2
state2 === hook2.memoizedState
hook2.next => hook3
state3 === hook2.memoizedState
```
![Hooks](/Users/qiaoxu/Desktop/pic/Hooks.png)
### 4.Fibter

1. 为什么需要fiber

2. 任务分解的意义

3. 增量渲染（把渲染任务拆分成块，匀到多帧）

4. 更新时能够暂停，终止，复用渲染任务

5. 给不同类型的更新赋予优先级

6. 并发方面新的基础能力

7. 更流畅

![Fibter](/Users/qiaoxu/Desktop/pic/fibter.png)