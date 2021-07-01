

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



### 13.存储数据

- **同步**

  - uni.setStorage

  - uni.getStorage
  - uni.removeStorage
  - uni.getStorageInfo——获取所有

- **异步**

  - uni.setStorageSync
  - uni.getStorageSync
  - uni.removeStorageSync
  - uni.getStorageInfoSync——获取所有

### 14.上传图片与预览图片

- **上传图片**

  ```js
  uni.chooseImage({
      count: 6, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: function (res) {
          console.log(JSON.stringify(res.tempFilePaths));
      }
  });
  ```

- **预览图片**

  ```js
  uni.previewImage({
    current:current,
    urls: res.tempFilePaths,
    longPressActions: {
      itemList: ['发送给朋友', '保存图片', '收藏'],
      success: function(data) {
        console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
      },
      fail: function(err) {
        console.log(err.errMsg);
      }
    }
  });
  ```

### 15.跨端编译

- **条件编译**

  ```js
  // html注释
  <!-- #ifdef H5 -->
  <button @click="pullDown">下拉刷新</button>
  <!-- #endif -->
  
  // js注释
  // #ifdef H5
  console.log('h5')
  // #endif
  
  // css注释
  /* #ifdef H5 */
  .item {
    height: 100px;
  }
  /* #endif */
  
  ```

### 16.导航跳转

- **声明式导航**

```js
<view class="btn-area">
  <navigator url="navigate/navigate?title=navigate" hover-class="navigator-hover">
    <button type="default">跳转到新页面</button>
  </navigator>
  <navigator url="redirect/redirect?title=redirect" open-type="redirect" hover-class="other-navigator-hover">
    <button type="default">在当前页打开</button>
  </navigator>
  <navigator url="/pages/tabBar/extUI/extUI" open-type="switchTab" hover-class="other-navigator-hover">
    <button type="default">跳转tab页面</button>
  </navigator>
</view>
```

> redirect：设置redirect后，会将当前页面关闭，跳转到新的页面，没有返回按钮

- **编程式导航**

```js
// 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
uni.navigateTo({
    url: 'test?id=1&name=uniapp'
})
// 关闭当前页面，跳转到应用内的某个页面。——无法返回上一页
uni.redirectTo({
    url: 'test?id=1'
});
// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
uni.switchTab({
    url: '/pages/index/index'
});
```

### 17.组件生命周期

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate——仅h5支持
- updated——仅h5支持
- beforeDestory
- Destoryed——组件销毁时，记得将定时器清除掉

### 18.组件之间的通讯方式

- 父子组件传参：props  $emit
- 兄弟组件传参：`uni.$emit()`   `uni.$on()`

### 19.打包发布

- **小程序打包发布**

  在manifest.json文件中，配置appid，微信开发工具中上传功能就可以用了。

  需要配置合法域名

  字体图标没有上传成功，则换成线上字体图标(需要配域名)，将本地的删除。

  上传成功后，去后台点击提交审核。

- **h5打包**

  在manifest.json文件中，h5配置，填写完相关信息后，点击发行——网站H5手机版，网站域名先可不填，打包成功后，可点击跳转到打包好的项目中，`live-server--port=9898`

- **安卓打包**

  基础配置：uni-app应用标识(AppID)：点击重新获取即可

  App图标配置：

  App启动图配置：

  App模块权限配置：Maps等

  发行——原生App云打包——使用自有证书(生成证书)——测试时可以使用公共测试证书——打包——生成一个链接——可以将链接生成二维码——扫描即可

  

  
