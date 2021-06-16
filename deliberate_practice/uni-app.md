

### 1.uni-app环境搭建及项目运行



### 2.项目目录介绍



### 3.基础配置





## 4.condition启动模式配置

启动模式配置，仅开发期间生效。用于模拟直达页面的场景。



### 5.基本组件使用

- button
- view
- text
- Image

### 6.样式

- rpx

- @import导入css文件

  ```js
  @import url('./a.css')
  ```

  > 在pages下面配置的样式是局部的，App.vue中写的样式是全局的



- 字体图标

  - 字体文件小于40kb，uni-app会自动将其转化为base64格式

  - 字体文件大于40kb，需要开发者自己转换，否则使用将不生效

  - 字体文件的引用路径

    ```js
    @font-face{
      font-family:test1-icon;
      src:url('~@/static/iconfont.ttf')
    }
    ```

### 7.一些指令

- v-bind——：
- v-on——@
- v-for

### 8.注册事件和传递参数及获取到事件对象

$event

### 9.生命周期

- **应用的生命周期**
  - onLaunch：当uni-app初始化完成时触发（全局只触发一次）
  - onShow：当uni-app启动，或从后台进入前台显示
  - onHide：当uni-app从前台进入后台
  - onError：当uni-app报错时触发
- **页面的生命周期**
  - onLoad：监听页面加载，其参数为上个页面传递的数据。参数类型为Object（用于页面传参）
  - onShow：监听页面显示，页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
  - onReady：监听页面初次渲染完成
  - onHide：监听页面隐藏
  - onUnload：监听页面卸载

生命周期的概念：一个对象从创建、运行、销毁的整个过程被称为生命周期。

生命周期函数：在声明周期中每个阶段会伴随着每一个函数的触发，这些函数被称为生命周期函数。



### 10.下拉刷新

```js
 // 监听下拉刷新
onPullDownRefresh () {
  setTimeout(() => {
    this.list.push('新数据啊')
    // 关闭下拉刷新
    uni.stopPullDownRefresh()
  }, 2000)
},
```

```js
methods: {
  pullDown () {
    // 启动下拉刷新
    uni.startPullDownRefresh()
  }
}
```



### 11.上拉加载

```js
// pages.json
"style": {
  "navigationStyle": "custom",
    "navigationBarTitleText": "Naraya曼谷包",
      "enablePullDownRefresh": true, // 开启下拉刷新
        "onReachBottomDistance": 60 // 页面距底部多少距离开始刷新
}
```

```js
// 上拉刷新
onReachBottom () {
  setTimeout(() => {
    this.list = [...this.list, ...['java', 'ui', 'javascript', '测试', '大数据']]
  }, 1000)
}
```



### 12.请求





