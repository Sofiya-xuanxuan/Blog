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
    page: 0
  },
  onLoad() {
    this.getList(true) //首次加载
  },
  getList(isInit) {
    wx.showLoading()
    let SIZE = 2
    collection.limit(SIZE).get({
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

## 三、小程序生态

1. 小程序适用场景
2. 快应用、百度小程序、支付宝小程序
3. 一套代码编译各大厂商小程序：Taro、Mpvue

## 四、小程序状态管理

1. 适用mbox管理小程序的数据流

## 五、实战项目

1. 小程序实战项目

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

# 自动化测试

## 一、单元测试

1. 业务驱动开发&测试驱动开发
2. 黑盒测试和白盒测试
3. 测试覆盖率
4. 前端项目的单测集成
5. Node项目的单测集成

## 二、端到端测试

1. 前端e2e测试

# 前端性能优化

## 一、性能指标

1. 业务场景
2. 性能指标
3. 基于项目获取性能报告，和报告背后的分析

## 二、性能优化范畴（客户端）

1. 浏览器重回和回流
2. 节流设计
3. 资源加载与利用
   - 懒加载
   - 高效缓存
   - CDN
4. 浏览器存储
5. 移动端网络性能优化
6. Nginx调优

## 三、更快的代码

1. BOM/DOM交互优化
2. 常见写法优化

## 四、React性能优化

1. React常见性能优化策略
2. PureComponent

## 五、Vue性能优化

1. Vue常见性能优化策略

## 六、浏览器原理

1. webkit内核原理剖析
   - webkit缓存加载机制
   - cookie和session实现原理
   - DOM模型
   - CSS解释器
   - 构建渲染树

# 前端数据结构和算法

## 一、算法入门

1. 算法基础知识
2. 算法核心概念
3. 复杂度

## 二、常见算法

1. 冒泡排序
2. 快速排序
3. 二分查找
4. 递归算法
5. 常见前端算法面试题

## 三、常见数据格式

1. 数据格式
2. 数组
3. 链表
4. 树
5. 二叉树
6. 图

# 前端设计模式

1. 学习设计模式的必要性
2. 面向对象
3. 工程模式
4. 单例模式
5. 装饰器模式
6. 代理模式
7. 观察者模式
8. 设计模式实战