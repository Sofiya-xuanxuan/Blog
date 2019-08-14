# 微信小程序

## 一、微信小程序基础

### 1. 小程序开发模式 VS 传统web开发模式

- **小程序生命周期**
  - onload——监听页面加载
  - onReady——监听页面初次渲染完成
  - onshow——监听页面显示
  - onHide——监听页面隐藏
  - onUnload——监听页面卸载

- **其余事件**

  - onPullDownRefresh——监听用户下拉动作

  - onReachBottom——页面上拉触底事件的处理函数

  - onShareAppMessage——用户点击右上角分享

- **airServer**

  投屏软件

- **小程序不能做什么**

  1. 便于传播，用完就走（小工具）而且有内容和包大小的限制，所以不能做太重或者复杂的应用

  2. 聊天 很容易被微信干掉，区块链

  3. 小程序不能主动给用户发消息或通知

     只能用户提交表单或者用户支付后，一周内可以发一个消息

  4. 腾讯不让做的，就不能做

- **云数据库**

  相当于mongodb

- **云开发**

  一个完整的node项目，可以安装依赖，云开发必须配合小程序

### 2. flex布局

### 3. 扫码

### 4. 下拉刷新

### 5. 轮播图

### 6. 图片

### 7. 支付API

### 8. 开发自己的第一个小程序

## 二、小程序云开发

### 1.云函数引入

```basic
# cloundfunctions/kkb/index.js
// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = (event, context) => {
  console.log(event)
  console.log(context)

  // 可执行其他自定义逻辑
  // console.log 的内容可以在云开发云函数调用日志查看

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
```

### 2.获取豆瓣图书信息

```basic
# cloundfunctions/kkb/index.js
// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')
const doubanbook = require('doubanbook')
const cheerio = require('cheerio')
cloud.init()
async function searchDouban(isbn) {
  const url = 'https://book.douban.com/subject_search?search_text=' + isbn
  let res = await axios.get(url)
  //1.将数据拿出来
  let reg = /window\.__DATA__ = "(.*)"/

  if (reg.test(res.data)) {
    let searchData = doubanbook(RegExp.$1)[0]
    return searchData
  }
}
searchDouban('9787559627230')
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let isbn = event.isbn
  let info = await searchDouban(isbn)
  const detailPage = await axios.get(info.url)
  let $ = cheerio.load(detailPage.data)
  let summary = $('#link-report .intro').text()
  let authorInfo = $('#info').text().split('\n').map(v => v.trim()).filter(v => v)
  let author = authorInfo[1]
  return {
    // info,
    create_time: new Date().getTime(),
    author,
    summary,
    image: info.cover_url,
    rate: info.rating.value,
    alt: info.url,
    title: info.title,
    // event,
    openid: wxContext.OPENID,
    // appid: wxContext.APPID,
    // unionid: wxContext.UNIONID,
  }
}
```

```basic
# miniprogram/me/index.js
callLogin() {
    wx.scanCode({
      success: res => {
        this.addBook(res.result)
      },
    })
}

addBook(isbn) {
    console.log(isbn)
    wx.cloud.callFunction({
      name: 'kkb',
      data: {
        isbn
      }
    }).then(res => {
      
      wx.showModal({
        title: '搜索成功',
        content: `图书《${info.title}》 评分是${info.rating.value}`
      })
    })
},
```

### 3.信息入库

```basic
# miniprogram/me/index.js
callLogin() {
    wx.scanCode({
      success: res => {
        this.addBook(res.result)
      },
    })
}
addBook(isbn) {
    console.log(isbn)
    wx.cloud.callFunction({
      name: 'kkb',
      data: {
        isbn
      }
    }).then(res => {
      let info = res.result
      info.count = 1
      console.log(info)
      //信息入库
      collection.add({
        data: info,
        success: res => {
          console.log(res);
          if (res._id) {
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 2000
            })
          }
        }
      })
    })
},
```

### 4.查询数据库/读取数据库

```basic
const db = wx.cloud.database()
const collection = db.collection('kkb')
Page({
  data: {
    books: [],
    page: 1
  },
  onLoad() {
    this.getList(true) //首次加载
  },
  getList(isInit) {
    wx.showLoading()
    let SIZE = 2
    collection.skip(this.data.page * SIZE).limit(SIZE).get({
      success: res => {
        if (isInit) {
          this.setData({
            books: res.data
          })
        } else {
          this.setData({
            books: this.data.books.concat(res.data)
          })
        }
        wx.hideLoading()

      }
    })
  },
  //触底
  onReachBottom() {
    this.setData({
      page: this.data.page + 1
    })
    this.getList()
    console.log('触底')
  },
  //下拉刷新
  onPullDownRefresh() {
    this.getList(true) //首次加载
  }
}          
```

### 5.上传文件

```basic
callLogin() {
    var _this = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        let filePath = res.tempFilePaths[0]
        let cloudPath = 'kkb-quanzhan-10-' + (new Date().getTime())
        console.log(filePath)
        wx.cloud.uploadFile({
          filePath,
          cloudPath
        }).then(res => {
          _this.setData({
            imgurl: res.fileID
          })
          console.log(_this.data.imgurl)
        })
      },
    })
}
```

## 三、React开发小程序

### 1.为什么要有跨端的框架

- **代码组织**

  每个页面都是.js  .wxss .wxml .json四个部分构成

  ![code](/Users/qiaoxu/Desktop/myBlog/pic/wechat_code.png)

- **开发方式**

  不够现代化，虽然现在能用npm了，但是对ES6语法的支持，以及sass等css预处理支持的不是很好

- **端太多了**

  1. 微信小程序
  2. 网页H5
  3. 头条小程序
  4. 百度小程序
  5. 支付宝小程序
  6. 快应用
  7. 原生App

- **跨端**

  其实由于微信原生小程序开发自己玩了一套自己的语法，所以早早就有用vuejs来开发小程序的框架，比如webpy和mpvue，但是基本都是单纯的开发微信小程序，现在基本对多端支持足够好的，就是`taro`和`uni-app`了，分别是使用react和Vue的语法来开发小程序生态了

  > #### 开发方式上
  >
  > **原生开发：**
  > 我们需要全新学习小程序的抒写格式，目前版本模板中支持 slot，但是不支持 npm 包。原生不支持 css 预处理器，但是 vsCode 中 Easy WXLESS 插件可以将 less 文件自动转换为 wxss 文件；
  >
  > **wepy：**
  > 我们需要熟悉 vue 和 wepy 两种语法，支持 slot 组件内容分发插槽，支持 npm 包，支持 css 预处理器；
  >
  > **mpvue：**
  > 我们需要熟悉 vue ，目前版本（v1.0.13）不支持 slot ，支持 npm 包，支持 css 预处理器；
  >
  > **taro:**
  > 采用React语法标准，支持 JSX 书写，让代码更具表现性，Taro暂不支持直接渲染children。
  >
  > 对于mpvue和taro开发方式上，对vue和react语法的支持程度和差异上具体可以看各自的官方文档。
  >
  > #### 应用状态管理上
  >
  > **原生开发：**
  > 没有提供原生的应用状态管理方式，但是可以将 redux or mobx 引入到项目中。
  > 小程序原生提供了一种声明使用全局变量，具体写法可查看官网[文件作用域](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/module.html)。
  >
  > **wepy：**
  > 可以将 redux or mobx 引入到项目中。
  >
  > **mpvue：**
  > 可以直接使用 vuex 做应用状态管理，在用mpvue初始化时可以选择是否需要vuex.
  >
  > **taro：**
  > 支持redux，对于不那么大的应用也提供了全局变量的解决方式，redux引入和全局变量解决方式，具体可以查看[官网-使用redux](https://nervjs.github.io/taro/redux.html)，[官网-最佳实践](https://nervjs.github.io/taro/best-practice.html)。
  >
  > #### 社区活跃程度上
  >
  > **原生开发：**
  > 微信提供了一个专门的社区供小程序开发者学习交流[开发者社区](https://developers.weixin.qq.com/)。对UI库来说，原生小程序UI库还是蛮多的，例如官方的[weui](https://github.com/Tencent/weui), 有赞的[zanui-weapp](https://github.com/youzan/zanui-weapp)，高颜值、好用、易扩展的微信小程序 UI 库。
  >
  > **其它3个框架：**
  > 对于[wepy](https://github.com/Tencent/wepy)，[mpvue](https://github.com/Meituan-Dianping/mpvue)，[taro](https://github.com/NervJS/taro)这种开源项目来说，想学习交流那肯定是在github的issue上啊，github上的star数和项目出现时间成正比，wepy : 12k多star, mpvue: 11k多star, taro: 6k多star，从趋势看，mpvue大有赶超wepy的趋势。
  >
  > 对于wepy，mpvue它们的github上都有些开源的UI库，而taro由于最近推出，UI需要自己去撸。

### 2.taro框架

- **安装**

  ```basic
  npm install -g @tarojs/cli 
  ```

- **taro官网**
  1. 官网 https://taro.aotu.io/
  2. UI组件 https://taro-ui.aotu.io/#/

- **初始化**

  ```basic
  taro init 项目名称
  ```

  ![taro](/Users/qiaoxu/Desktop/myBlog/pic/taro.png)

- **启动项目**

  ```basic
  npm run dev:h5
  npm run dev:weapp
  
  "dev:weapp": "npm run build:weapp -- --watch",
  "dev:swan": "npm run build:swan -- --watch",
  "dev:alipay": "npm run build:alipay -- --watch",
  "dev:tt": "npm run build:tt -- --watch",
  "dev:h5": "npm run build:h5 -- --watch",
  "dev:rn": "npm run build:rn -- --watch",
  "dev:qq": "npm run build:qq -- --watch",
  "dev:quickapp": "npm run build:quickapp -- --watch"
  ```

  



### 3.taro-ui跨端的UI框架

- **安装**

  ```basic
  #taro
  npm i taro-ui -S
  
  #nervjs——是taro依赖的库
  cnpm i nervjs -S
  ```

- **配置**

  ```basic
  #config/index.js
  h5:{
    esnextModules: ['taro-ui'],
  }
  ```

### 4.使用mobx——管理小程序的数据流

- **安装**

  ```basic
  npm install --save mobx@4.8.0 @tarojs/mobx @tarojs/mobx-h5 @tarojs/mobx-rn
  ```

- **创建store——管理数据**

  ```basic
  #src/store/counter.js
  
  import {
    observable
  } from 'mobx'
  let todoStore = observable({
    todoList: ['吃饭', '睡觉', '打豆豆'],
    addTodo(item) {
      this.todoList.push(item)
    }
  })
  export default todoStore
  ```

  

- **引入使用**

  ```basic
  #app.js
  import { Provider } from '@tarojs/mobx'
  import todoStore from './store/counter'
  
  
  Taro.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  )
  
  #pages/index/index
  import { observer, inject } from '@tarojs/mobx'
  
  @inject('todoStore')
  @observer
  export default class Index extends Component {
      constructor(props) {
      super(props)
      this.state = {
        title: '开课吧！',
        val: ''
      }
    }
    handleInput = val => {
      this.setState({
        val: val
      })
    }
    handleClick = () => {
      this.props.todoStore.addTodo(this.state.val)
      this.setState({
        val: ''
      })
    }
    render() {
      const { todoStore } = this.props
      return (
        <View className="index">
          <View>{this.state.title}</View>
          <AtInput value={this.state.val} onChange={this.handleInput} />
          <AtList>
            {todoStore.todoList.map(v => {
              return <AtListItem title={v} />
            })}
          </AtList>
          <AtButton type="primary" onClick={this.handleClick}>
            添加
          </AtButton>
        </View>
      )
    }           
  }       
  ```

### 5.获取云数据库上的数据

- **app.js**

  ```basic
  wx.cloud.init()
  ```

- **book.js**

  ```basic
  import Taro, { Component } from '@tarojs/taro'
  import {
    View,
    Text,
    Input,
    Button,
    Swiper,
    SwiperItem
  } from '@tarojs/components'
  import { AtButton, AtInput, AtList, AtListItem, AtCard } from 'taro-ui'
  import { observer, inject } from '@tarojs/mobx'
  import './book.styl'
  let db = wx.cloud.database()
  export default class Book extends Component {
    constructor(props) {
      super(props)
      this.page = 0
      this.state = {
        goods: [],
        tops: []
      }
    }
    onReachBottom() {
      this.page += 1
      this.getList()
    }
    getTops() {
      db.collection('kkb')
        .orderBy('rate', 'desc')
        .limit(2)
        .get({
          success: res => {
            this.setState({
              tops: res.data
            })
          }
        })
    }
    getList() {
      wx.showLoading()
      let init = this.page === 0
      let PAGE = 2
      let item = db.collection('kkb')
      if (!init) {
        item = item.skip(this.page * PAGE)
      }
      item.get({
        success: res => {
          if (init) {
            this.setState({
              goods: res.data
            })
          } else {
            this.setState({
              goods: [...this.state.goods, res.data]
            })
          }
          wx.hideLoading()
        }
      })
    }
    componentDidMount() {
      this.getTops()
      this.getList()
    }
    render() {
      return (
        <View>
          <Swiper autoplay>
            {this.state.tops.map(top => {
              return (
                <SwiperItem>
                  <View class="swiper-container">
                    <image class="swiper-img" src={top.image} mode="aspectFit" />
                  </View>
                </SwiperItem>
              )
            })}
          </Swiper>
          {this.state.goods.map(good => {
            return (
              <AtCard title={good.title} thumb={good.image}>
                {good.summary}
              </AtCard>
            )
          })}
        </View>
      )
    }
  }
  ```

### 6.配置tabBar

- **app.js**

  ```basic
  class App extends Component {
    config = {
      pages: ['pages/book/book', 'pages/index/index'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      },
      tabBar: {
        list: [
          { pagePath: 'pages/book/book', text: '图书' },
          { pagePath: 'pages/index/index', text: '首页' }
        ]
      }
    }
  ```

### 7.总结

![总结](/Users/qiaoxu/Desktop/myBlog/pic/wechat_summary.png)

## 四、小程序实战

### 1.支付

### 2.登录

# Node.js微信公众号开发

## 一、微信开发实战

1. 服务器如何介入微信后台
2. Nodejs后端接入实战
3. 微信消息管理

## 二、微信网页开发

1. 依赖微信jssdk开发业务
2. 录音、地理位置、扫一扫功能展示

## 三、实战项目

1. 公众号客服机器人 项目实战
