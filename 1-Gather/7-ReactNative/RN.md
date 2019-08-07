# 移动端React Native

## 一、React Native准备

### 1.React Native介绍

React Naitve的简介:Facebook在React.js Conf2015大会上推出的一个用于开发Android和iOS App的一个框架，主要编程语言是JavaScript。它的出现使用**即拥有Native的用户体验，又保留React的开发效率**。



> 在 React Native 出现前，我们通常会选择这三种移动技术(Native App、HTML5、Hybrid)之一进行开发。 
>
> Native App :开发原生应用自然性能最好，功能强大。但多平台版本的开发、维护要花费⼤量的 ⼈力物力(iOS版本迭代审核需要时间)。 
>
> HTML5 :虽然有 Web 的优势，即灵活的布局能⼒、免发版的敏捷迭代潜力、优秀的跨平台特性。 在新闻资讯等一些强排版、弱交互的展示类 App 上大展拳脚。但由于 WebView 在移动设备上的 性能制约，始终难成⼤大器。 
>
> Hybrid App :JS+Native两者相互调⽤为主，从开发层面实现“一次开发，多处运行”的机制，成为 真正适合跨平台的开发。Hybrid App兼具了Native App良好用户体验的优势，也兼具了Web App 使用HTML5跨平台开发低成本的优势，但是这个方法存在诸多问题:无法访问离线数据、无法访问设备、无法远程更新。 
>
> React Native :底层引擎是 JavaScript Core，但调用的是原生的组件⽽非 HTML5 组件。这样运行时可以做到与 Navive App 相媲美的性能体验，同时因为 JavaScript 代码可以使用后端强大的 Web 方式管理，既可以做到⾼效开发，也可以实现快速部署和问题热修复。

- React Native优缺点

  - 优点

    1. 跨平台开发:运用React Native，我们可以使用同一份业务逻辑核心代码来创建原生应用运行在 Web端，Android端和iOS端; 

    2. 热更新，App可以快速迭代:实时热部署;
    3. learn once,write everywhere:React Native不强求一份原生代码支持多个平台，所以不是write 

    once,run anywhere; 

  - 缺点

    1. reactnative在iOS上仅支持iOS7以上，Android仅支持Android4.1以上;
    2. 开发成本较高，对新手不友好，调试不友好;
    3. 部分复杂的界面和操作，RN无法实现(可以考虑原生+React Native混合开发);
    4. 版本更新较快，建议开发固定版本

- React Native、Flutter、Weex比较

  

### 2.React Native环境搭建

> IOS：必须安装的依赖有：Node、Watchman和React Native命令行工具以及Xcode
>
> 注意：Xcode 来获得编译 iOS 应用所需的工具和环境。 

- **Node，Watchman**

  ```bash
  brew install node
  brew install watchman
  ```

  Watchman则是由 Facebook 提供的监视文件系统变更的工具。安装此工具可以提高开发时的性能
  (packager 可以快速捕捉文件的变化从而实现实时刷新)。

- **Yarn、React Native的命令行工具（react-native-cli）**

  Yarn是 Facebook 提供的替代 npm 的工具，可以加速 node 模块的下载。React Native 的命令行⼯具用于执⾏创建、初始化、更新项目、运⾏打包服务(packager)等任务。 

  ```bash
  npm install -g yarn react-native-cli
  ```

  给yarn设置镜像源

  ```bash
  yarn config set registry https://registry.npm.taobao.org --global
  yarn config set disturl https://npm.taobao.org/dist --global
  ```

  

- **Xcode&&Xcode命令行工具**

  appstore中可以直接安装Xcode（这一步骤会同时安装 Xcode IDE、Xcode 的命令行工具和 iOS 模拟器）

  

> Android：必须安装的依赖有：Node、Watchman和React Native命令行工具以及JDK和Android Studio
>
> 注意：Android Studio 来获得编译 Android 应⽤所需的工具和环境。

- **JDK：Java Development Kit**

  去[官网](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)下载

- **Android开发环境**

  - 安装Android Studio

    [首先下载和安装Android Studio](https://developer.android.google.cn/studio)安装过程中选择**Custom**选项，并确保选中以下几项

    ```bash
     Android SDK`
    `Android SDK Platform`
    `Performance (Intel ® HAXM)` ([AMD 处理理器器 看这⾥里里](https://android-developers.googleblog.com/2018/07/android-emulator- amd-processor-hyper-v.html))
    `Android Virtual Device
    ```

    Next

  - 安装Android SDK

    Android Studio 默认会安装最新版本的 Android SDK。

    需要去安装目录bin下面执行`sdkmanager --licenses`，一路y，接受所有licenses

  - 配置ANDROID_HOME环境变量

    React Native 需要通过环境变量来了解你的 Android SDK 装在什么路径，从而正常进行编译。具体的做法是把下面的命令入到 `~/.bash_profile` ⽂文件中:
  
    ```bash
    open ~/.bash_profile
    
    # 将下面内容配置到环境变量中 
    # 如果你不不是通过Android Studio安装的sdk，则其路路径可能不不同，请⾃自⾏行行确定清楚。 
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/tools
    export PATH=$PATH:$ANDROID_HOME/tools/bin
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    export PATH=$PATH:$ANDROID_HOME/emulator
   
    ```

    使用 source $HOME/.bash_profile 命令来使环境变量设置立即生效(否则重启后才生效)。可以 
  
    使用 echo $ANDROID_HOME 检查此变量是否已正确设置。 

### 3.真机调试

- **开启USB调试**

  在默认情况下 Android 设备只能从应用市场来安装应用。你需要开启 USB 调试才能⾃由安装开发版本的 APP。
   首先，确定[你已经打开设备的 USB 调试开关]([https://www.baidu.com/s?wd=%E6%89%93%E5%BC%80usb%E8%B0%83%E8%AF%95](https://www.baidu.com/s?wd=打开usb调试))。 

- **通过USB数据线连接设备**

  下面检查你的设备是否能正确连接到 ADB(Android Debug Bridge)，使用 adb devices 命令:

  ```bash
  $ adb devices
  List of devices attached
  emulator-5554 offline   # Google emulator
  14ed2fcc device         # Physical device
  ```

  在右边那列看到**device**说明你的设备已经被正确连接了。注意，你每次只应当连接一个设备。

  > 译注:如果你连接了多个设备(包含模拟器在内)，后续的一些操作可能会失败。拔掉不需要 
  >
  > 的设备，或者关掉模拟器，确保 adb devices 的输出只有一个是连接状态。 

  在真机调试中其实也没啥难度，就记录一下几个要点:

  - 把手机摇一摇，能调出开发者界面
  - 拖着USB线摇晃太麻烦了了，直接输入命令就可以调出开发者界面: `adb shell input keyevent 82` ，这个比较实用。
  - 点击进入Dev Settings 点击Debug server host for device。 输入你电脑的IP地址和端口号(譬
    如10.0.1.1:8081)
  - 在电脑上打开chrome输入:http://localhost:8081/debugger-ui 能够在电脑上看到调试信息的
    输出。

- **运行应用**

  现在你可以运行 `react-native run-android` 来在设备上安装并启动应用了。 

  在输入此命令前，要先打开模拟器，或连接真机，第一次启动非常慢，需要下载gradle，也可以手动下载gradle安装。 

### 4.构建项目

- **初始化项目**

```bash
#先初始化一个稳定版本，等后续react native稳定以后再安装最新版本
react-native init 项目名称 --version 0.59.9
```

- **跳转到对应路径下执行相应的移动端项目**<font color='red'>开启模拟器</font>

```bash
cd 项目名
react-native run-ios
```

正常运行后，效果如下：

![ios启动成功](/Users/qiaoxu/Desktop/myBlog/pic/iosRun.png)

- **将安卓模拟器启动**

  打开Android Studio，打开对应的项目，点击右上角的手机样式的按钮，如下图

  ![安卓启动按钮](/Users/qiaoxu/Desktop/myBlog/pic/Android_start.png)

  ```bash
  cd 项目名
  react-native run-android
  ```

  

### 5.React Native调试技巧

- **Developer Menu**

  Developer Menu是React Native给开发者定制的一个开发者菜单，来帮助开发者调试React Native应用。

- **在模拟器上开启Developer Menu**

  - 安卓模拟器

    可以通过`Command⌘ + M`快捷键来快速打开Developer Menu。也可以通过模拟器上的菜单键来打开。

    > 心得：高版本的模拟器通常没有菜单键的，不过Nexus S上是有菜单键的，如果想使用菜单键，可以创建一个Nexus S的模拟器

  - ios模拟器

    可以通过 `Command⌘ + D` 快捷键来快速打开Developer Menu。

- **Reload**

  Reload 选项，刷新页面，单击 Reload 让React Native重新加载js。对于iOS模拟器你也可以通过 Command⌘ + R
  快捷键来加载js，对于Android模拟器可以通过双击 r 键来加载js。

  > 提示:如果 Command⌘ + R 无法使你的iOS模拟器加载js，则可以通过选中Hardware menu中
  > Keyboard选项下的 “Connect Hardware Keyboard” 。

- **Debug JS Remotely**

  该功能允许开发人员在`Chrome`中调试应用，其调试方式和调试`web`应用一样

  - 点击后自动打开浏览器

  ![浏览器debugger](/Users/qiaoxu/Desktop/myBlog/pic/debugger.png)

  - 打开浏览器检查

  用浏览器来做调试：Source——debuggerWorker.js——找对应的项目，对应的源文件

  - 断点调试

- **Enable Live Reload**

  该功能主要用来实现自动刷新。当我们将实时加载启动后，如果应用中的JavaScript代码有任何修改，它会自动帮我们更新，不需要人为去操作刷新功能。

- **Start Systrace**

  该功能主要用来监控应用在一段时间内的指标信息。

  1）我们点击**Start Systrace**开始监控

  2）然后在操作后选择**Stop Systrace**结束监控。这时会弹出一个提示框，告诉我们数据已经生成。打开生成的**JSON**文件，就可以看到应用在这段时间内的详细指标信息了

- **Enable Hot Reloading**

  启动热加载，同样是实现页面的自动刷新

  热加载的思想是运行时动态注入修改后的文件内容，同时不中断`App`的正常运行。这样，我们就不会丢失`App`的任何状态信息，尤其是`UI`页面栈相关的。

  > 热加载(Hot Reloading)与上面提到的实时加载(Live Reload)最关键的区别:
  > (1)实时加载应用更新时需要刷新当前⻚面，可以看到明显的全局刷新效果。
  > (2)而热加载基本上看不出刷新的效果，类似于局部刷新。

- **Show Inspector**

  1）我们可以很方便的查看到当前选中元素的位置、样式、层级关系、盒子模型信息等等。方便我们快递定位问题。

  2）同时还提供了监控应用性能的功能。

- **Show Perf Monitor**

  该功能启用后会显示一个监控窗口，显示出实时的内存占用、`UI`和`JavaScript`的`FPS`等信息。帮助我们调试性能问题。

- **Errors and Warnings**

  在development模式下，js部分的Errors 和 Warnings会直接打印在手机或模拟器屏幕上，以红屏和黄
  屏展示。

- **Errors**

  React Native程序运行时出现的Errors会被直接显示在屏幕上，以红色的背景显示，并会打印出错误信
  息。 你也可以通过 console.error() 来手动触发Errors。

- **Warnings**

  React Native程序运行时出现的Warnings也会被直接显示在屏幕上，以⻩色的背景显示，并会打印出警 告信息。 你也可以通过 console.warn() 来手动触发Warnings。 你也可以通过 

  `console.disableYellowBox = true` 来手动禁用Warnings的显示，或者通过 `console.ignoredYellowBox = ['Warning: ...'];` 来忽略相应的Warning 

### 6.当发生一些“莫名其妙”的问题时，常用解决方案

1）刷新刷新

2）重新使用react-native run-xxx命令启动App

3）删掉App程序，关掉本地服务器，清楚本地缓存

```bash
#yarn:清空缓存
yarn cache clean 
#npm:清空缓存
npm cache clean -f
```

### 7.React Native布局与样式

一款好的App离不开漂亮的布局，RN中的布局方式采用的是FlexBox(弹性布局) 

FlexBox提供了在不通尺寸设备上都能保持一致的布局⽅式 

- **宽和高**

  在学习FlexBox之前首先要清楚一个概念"宽和高"。一个组件的高度和宽度决定了他在屏幕上的尺寸，也就是⼤小

- **像素无关**

  在RN中尺寸是没有单位的，它代表的是设备独立像素

  ```bash
  <View style={{width:100,height:100,margin:10,backgroundColor:'gray'}}> <Text style={{fontSize:16,margin:20}}>尺⼨寸</Text>
  </View>
  ```

  上述代码，运行在Android上时，View的长宽被解释成：100dp 100dp，字体被解释成16sp，运行在ios上时的尺寸单位被解释成pt，这些单位确保了布局在不同的DPI的手机屏幕上，显示效果一致

- **和而不同**

  RN中FlexBox和Web Css上FlexBox⼯作方式是一样的，但有些地方还是有出入的
  flexDirection:

  ​	RN中默认是flexDirection:'column',Web Css中默认是 flex-direction:'row'

  alignItems:

  ​	RN中默认alignItems: 'stretch',在Web Css中默认 align-items:'flex-start'

  flex:

  ​	RN中只接受一个属性，Web css 可以接受多个属性:flex: 2 2 10%

  不支持的属性: align-content flex-basis order flex-flow flex-grow flex-shrink

- **Flex in RN**

  以下属性是RN所支持的Flex属性

  - 容器属性
    flexDirection: row | column| row-reverse | column-reverse
    flexWrap: wrap | noWrap //换行
    justifyContent: flex-start | flex-end | center | space-between | space-around
    alignItems: flex-start | flex-end | center | stretch
  - 项目属性
    alignSelf
    auto(default) 元素继承了父容器的align-item属性，如果没有则为'stretch'
    stretch
    center
    flex-start
    flex-end
    flex:定义了一个元素可伸缩的能⼒，默认是0

- **样式**

  - 写法1：

    ```bash
    <View style={styles.container}></View>
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
      }
    })
    ```

  - 写法2：组件内写法

    ```bash
  <Text style={{ color: '#000000' }}>Welcome1 </Text>
    <View
       style={[
        styles.div1,
        { justifyContent: 'center', fontSize: 20, color: 'red' }
       ]}
    >
    </View>        
    ```

### 8.属性与状态

RN中使用两种数据来控制一个组件：`props`和`state`。`props`是在父组件中指定，而且一经指定，在被指定的组件的生命周期中则不再改变。对于需要改变的数据，我们需要使用`state`

```bash
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: "kkb"
    };
  }
  componentDidMount() {
    const timer = setTimeout(() => {
      this.setState({
      	showText: "开课吧" });
      }, 3000); 
  }
  render() {
    return (
          <View style={styles.container}>
            <Text style={styles.text}>{this.state.showText}</Text>
            <Test nameTest={"dio"} />
          </View>
    ); 
  }
}
  
class Test extends Component {
  constructor(props) {
    super(props);
	}
  render() {
      return (
        <View>
          <Text style={styles.text}>{this.props.nameTest}</Text>
        </View>
      ); 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue"
	}, 
	text: {
    color: "#fff"
  }
});
```



### 9.组件的生命周期

组件的生命周期一般分为4个阶段：创建阶段、实例化阶段、运行（更新）阶段、销毁阶段。下面对各个阶段分别进行介绍。

- **创建阶段**

  该阶段主要发生在创建组件类的时候，在这个阶段中会初始化组件的属性类型和默认属性。

- **实例化阶段**

  该阶段主要发生在实例化组件类的时候，也就是该组件类被调用的时候触发。这个阶段会触发一系列的流程，按执行顺序如下:

  - **constructor**:构造函数，这⾥主要对组件的一些状态进行初始化。
  - **componentWillMount**:准备加载组件，可以在这里做一些业务初始化操作，或者设置组件状态。
  - **render**:生成⻚面需要的 **DOM** 结构，并返回该结构。
  - **componentDidMount**:组件加载成功并被成功渲染出来后执行。一般会将网络请求等加载数据的操作放在这里进行，保证不会出现 **UI** 上的错误。

- **更新阶段**

  该阶段主要发生在用户操作之后或者父组件有更新的时候，此时会根据用户的操作行为进行相应的⻚面结构的调整。这个阶段也会触发一系列列的流程，按执⾏顺序如下:

  - **componentWillReceiveProps**:当组件接收到新的 **props** 时，会触发该函数。在该函数 中，通常可以调用 **this.setState** 方法来完成对 **state** 的修改。 
  - **shouldComponentUpdate**:该方法用来拦截新的 **props** 或 **state**，然后根据事先设定好的判断逻辑，做出最后要不要更新组件的决定。
  -  **componentWillUpdate**:当上面的方法拦截返回 **true** 的时候，就可以在该方法中做一些更新之前的操作。 
  - **render**:根据一系列的 **diff** 算法，生成需要更新的虚拟 **DOM** 数据。(注意:在 **render** 中 最好只做数据和模板的组合，不应进行 **state** 等逻辑的修改，这样组件结构会更加清晰) 
  - **componentDidUpdate**:该方法在组件的更新已经同步到 **DOM** 中去后触发，我们常在该方法中做 **DOM** 操作。 

- **销毁阶段**

  该阶段主要在组件消亡的时候触发

  - **componentWillUnmount**:当组件要被从界面上移除时就会调用。可以在这个函数中做一些相关的清理理工作，例如取消计时器、网络请求等。

### 10.React Native核心组件与API

在RN中使⽤原生组件，是依赖React的，所以在使用过程中需要导入react

```bash
import React, { Component } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
```

#### 常用组件介绍

- **View：**根容器，只有一个，不然会报错，如果要多个并列使用，则使用数组形式，逗号分隔；类似于html中的div，容器器组件，可以使⽤用[,]的形式返回多个兄弟组件

- **Button：**一个简单的跨平台的按钮组件。可以进行一些简单的定制。

  ```bash
  <Button
    onPress={onPressLearnMore} //用户点击此按钮时所调用的处理函数
    title="Learn More" //按钮内显示的文本
    color="#841584" //⽂本的颜色(iOS)，或是按钮的背景色(Android)
    disabled={false} //按钮是否可以点击
    accessibilityLabel="Learn more about this purple button" //用于给残障⼈士显示的
    文本(比如读屏应用可能会读取这一内容
  />
  ```

- **ActivityIndicator：**显示⼀一个圆形的 loading 提示符号。

  ```bash
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator
      size="large" //指示器的⼤小，默认为'small'[enum('small', 'large'), number]。⽬前只能在 Android 上设定具体的数值
      animating={true} //是否要显示指示器动画，默认为 true 表示显示，false 则隐藏。
      hidesWhenStopped={false} //在animating为 false 的时候，是否要隐藏指示器(默认为 true)。如果animating和hidesWhenStopped都为 false，则显示一个静止的指示器。
      color="#0000ff" //滚轮的前景颜色(默认为灰色)。/>
  </View>
  ```

- **Image：**用于显示多种不同类型图片的 React 组件，包括网络图片、静态资源、临时的本地图片、以及本地磁盘上的图片(如相册)等。 

  下面的例子分别演示了如何显示从本地缓存、网络甚至是以 'data:' 的 base64 uri 形式提供的图片。

  ```bash
  <Image
    source={require('/react-native/img/favicon.png')}
  />
  
  <Image
    style={{width: 50, height: 50}}//网络和 base64 数据的图片需要手动指定尺寸 
    source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
  />
  
  <Image
  style={{width: 66, height: 58}} //网络和 base64 数据的图片需要⼿动指定尺寸 
  source={{uri:
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHR
  Tb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudD
  QYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAAB
  JRU5ErkJggg=='}}
  />
  ```
  
  > 在Android上支持GIF和WebP格式图片，需要额外配置
  >
  > 默认情况下Android不支持GIF和WebP格式的（经过测试默认是支持WebP的）。需要在android——app——build.gradle文件中需要手动添加以下模块：
  >
  > ```bash
  > dependencies {
  >   // 如果你需要⽀支持Android4.0(API level 14)之前的版本
  >   compile 'com.facebook.fresco:animated-base-support:1.10.0'
  >   // 如果你需要⽀支持GIF动图
  >   compile 'com.facebook.fresco:animated-gif:1.10.0'
  >   // 如果你需要⽀支持WebP格式，包括WebP动图
  >   compile 'com.facebook.fresco:animated-webp:1.10.0' 
  >   compile 'com.facebook.fresco:webpsupport:1.10.0'
  >   // 如果只需要⽀支持WebP格式⽽而不不需要动图
  >   compile 'com.facebook.fresco:webpsupport:1.10.0'
  > }
  > ```

- **ImageBackground**

  背景图

  ```bash
  <ImageBackground
     source={{
       uri:           'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'
     }}
     style={{
       width: '100%',
       height: '50%',
       justifyContent: 'center',
       alignContent: 'center'
     }}
  >
      <Text>inside</Text>
  </ImageBackground>
  ```

- **Switch**

  ```bash
  constructor(props) {
      super(props)
      //去掉黄色警告
      console.disableYellowBox = true
      this.state = {
        one: '',
        two: true,
        three: '',
        modalVisible: false,
        text: ''
  		}
  }
  <Switch
    value={this.state.one}
    trackColor={{ true: 'red', false: '#000' }}
    disabled={true}
    onValueChange={value => {
      this.setState({
      	one: value
      })
    }}
  />
  <Switch
    value={this.state.two}
    trackColor={{ true: 'green', false: '#000' }}
    onValueChange={value => {
      this.setState({
      	two: value
      })
    }}
  />
  <Switch
    value={this.state.three}
    trackColor={{ true: 'yellow', false: '#000' }}
    onValueChange={value => {
      this.setState({
      	three: value
      })
    }}
  />
  ```

- **Modal**

  组件是一种简单的覆盖在其他视图之上显示内容的方式

  ```bash
  constructor(props) {
      super(props)
      //去掉黄色警告
      console.disableYellowBox = true
      this.state = {
        modalVisible: false
      }
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }
  <Modal
    animationType="slide"
    transparent={false}
    visible={this.state.modalVisible}
    onRequestClose={() => {
    	alert('Modal has been closed')
    }}
  >
  <View>
    <View>
      <Text>Hello World!</Text>
      <TouchableHighlight
        onPress={() => {
          this.setModalVisible(false)
        }}
      >
        <Text>Hide Modal</Text>
      </TouchableHighlight>
    </View>
  </View>
  </Modal>
  <TouchableHighlight
    onPress={() => {
    	this.setModalVisible(true)
    }}
  >
  	<Text>show Modal</Text>
  </TouchableHighlight>
  ```

- **TouchableHighlight**

  本组件用于封装视图，使其可以正确响应触摸操作。当按下的时候，封装的视图的不透明度会降低，同时会有一个底层的颜色透过而被用户看到，使得视图变暗或变亮。

  在底层实现上，实际会创建一个新的视图到视图层级中，如果使用的方法不正确，有时候会导致一些不希望出现的视觉效果。譬如没有给视图的backgroundColor显式声明一个不透明的颜色。

  注意`TouchableHighlight`只支持一个子节点（不能没有子节点也不能多于一个）。如果你希望包含多个子组件，可以用一个View来包装它们。

- **SafeAreaView**

  表示安全区域，`SafeAreaView`的目的是在一个**安全**的可视区域内渲染内容。具体来说就是因为目前有iPhone X这样带有刘海的全面屏设备，所以需要避免内容渲染到不可见的刘海范围内。本组件目前仅支持IOS设备以及IOS11或更高版本

  

  `SafeAreaView`会自动根据系统的各种导航栏、工具栏等预留出空间来渲染内部内容。更重要的是，它还会考虑到设备屏幕的局限，比如屏幕四周的圆角或者顶部中间不可显示的刘海区域。

  

  只需简单地把你原有的视图用`SafeAreaView`包起来，同时设置一个`flex: 1`的样式。当然可能还需要一些和你的设计相匹配的背景色。

  ```basic
  <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
    <View style={{ flex: 1 }}>
      <Text>Hello World!</Text>
    </View>
  </SafeAreaView>
  ```

- **Text**

  一个用于显示文本的React组件，并且它也支持嵌套、样式、以及触摸处理，在Text内部的元素不再使用flexbox布局，而是采用文本布局。这意味的`<Text>`内部的元素不再是一个个矩形，而可能会在行末进行折叠

  ```bash
  <Text
  ellipsizeMode={"tail"} 
  //这个属性通常和下面的 numberOfLines 属性配合使用,文本超出 numberOfLines设定的行数时，
  截取⽅方式:head- 从⽂本内容头部截取显示省略号。例如: "...efg"，
  middle - 在文本内容中间截取显示省略号。例如: "ab...yz"，
  tail - 从⽂本内容尾部截取显示省略号。例如: "abcd..."，
  clip - 不显示省略略号，直接从尾部截断。 
  numberOfLines={1} //配合ellipsizeMode设置行数
  onPress={} //点击事件 
  selectable={true}//决定用户是否可以长按选择文本，以便复制和粘贴。 >
  </Text>
  ```

- **TextInput**

  TextInput是一个允许用户在应用中通过键盘输入文本的基本组件。本组件的属性提供了多种特性的配置，譬如自动完成、自动大小写、占位文字，以及多种不同的键盘类型（如纯数字键盘）等等。

  

  最简单的用法就是丢一个`TextInput`到应用里，然后订阅它的`onChangeText`事件来读取用户的输入。注意，从TextInput里取值这就是目前唯一的做法！也就是使用在`onChangeText`中用`setState`把用户的输入写入到state中，然后在需要取值的地方从this.state中取出值。它还有一些其它的事件，譬如`onSubmitEditing`和`onFocus`。一个简单的例子如下：

  

  TextInput 在安卓上默认有一个底边框，同时会有一些padding。如果要想使其看起来和iOS上尽量一致，则需要设置 `padding: 0`

  ```bash
  <TextInput
    style={{
      width: 100,
      height: 40,
      borderWidth: 3,
      borderColor: "blue"
  }}
  keyboardType={"default"} //决定弹出何种软键盘类型，譬如numeric(纯数字键 盘),default,number-pad,decimal-pad,numeric,email-address,phone-pad
  maxLength={20} //限制文本框中最多的字符数。使用这个属性而不用JS逻辑去实现，可以避免闪烁的现象。
  editable={true} //如果为false，文本框是不可编辑的。默认值为true。 
  defaultValue={"xxxx"} //提供一个文本框中的初始值
  caretHidden={true} //如果为true，则隐藏光标。默认值为false。 
  autoCapitalize={"none"} //控制TextInput是否要自动将特定字符切换为大写:characters:
  所有的字符,words: 每个单词的第一个字符,sentences: 每句话的第一个字符(默认),none: 不切换。
   
  //当文本框内容变化时调用此回调函数。改变后的文字内容会作为参数传递。从TextInput里取值这就是目前唯一的做法!
    onChangeText={text => {
      this.setState({
        text: text
      });
  }}
  //唯一的⽅方法，拿到textinput里的值 />
  ```

- **WebView**

  创建一个原生的 WebView，可以用于访问一个网页。

  ```bash
  #安装
  yarn add react-native-webview 
  #link
  react-native link react-native-webview
  
  import { WebView } from 'react-native-webview'
  export default class WebViewPage extends Component {
    render() {
      return <WebView source={{ uri: 'https://www.baidu.com' }} />
    }
  }
  ```

  WebView与H5的数据交互方式：

  

- **ListView：**已经被移除了

  列表组件。经常使用ListView的同学都知道，这个组件的性能比较差，尤其是当有大量
  的数据需要展示的时候，ListView对内存的占用较多，常出现丢帧卡顿现象

  ListView底层实现，渲染组件Item是全量渲染，而且没有复用机制，这就不可避免的当渲染较⼤数据量时，会发现以下情况: 

  - 第一次打开与切换Tab时会出现卡顿或白屏的情况，比如ListView中有100个Item，只能等这 100条Item都渲染完成，ListView中的内容才会展示 
  - 滑动列表时会出现卡顿不跟手，listVIew渲染⼤量数据，需要占用较多的内存用于计算 

- **VirtualzedList**

   `FlatList` 和 `SectionList` 的底层实现，`VirtualizedLis`t通过维护一个有限的渲染窗⼝口(其中包含可⻅见的元素)，并将渲染窗口之外的元素全部用合适的定长空白空间代替的方式，极大的改善了内存使用，提⾼高了大量数据情况下的渲染性能。这个渲染窗口能响应滚动⾏为，元素离可视区越远优先级越低，越近优先级越高，当用户滑动速度过快时，会出现短暂空白的情况。

  - **FlatList**

    在RN0.43版本中引入了`FlatList`，`SectionList`与`VirtualizedList`，其中`VirtualizedList`是 `FlatList`和`SectionList`的底层实现。 

    缺点:(1)为了优化内存占用同时保持滑动的流畅，列表内容会在屏幕外异步绘制。这意味着如果用户滑动的速度超过渲染的速度，则会先看到空白的内容。(2)不支持分组列表 

    ```bash
    <FlatList
      data={[{key: 'a'}, {key: 'b'}]}
      renderItem={({item}) => <Text>{item.key}</Text>}
    />
    ```

    可以看出跟之前的`ListView`很像，但是其中少了dataSource，这里，我们只需要传递数据，其它的
    都交给FlatList处理好了。

    > >  属性说明：
    >
    > **ItemSeparatorComponent **行与行之间的分隔线组件。不会出现在第一行之前和最后一行之后。 在这里可以根据需要插入一个view 
    >
    > **ListEmptyComponent** 列表为空时渲染该组件。可以是React Component, 也可以是一个render 函数， 或者渲染好的element。 
    >
    > **ListFooterComponent** 尾部组件 
    >
    > **ListHeaderComponent** 头部组件 
    >
    > **columnWrapperStyle** 如果设置了多列布局(即将numColumns 值设为大于1的整数)，则可以 额外指定此样式作用在每行容器上。 
    >
    > **data** 为了简化起见，data属性目前只支持普通数组。如果需要使用其他特殊数据结构，例如 immutable数组，请直接使用更底层的`VirtualizedList` 组件。 
    >
    > **extraData** 如果有除data以外的数据用在列表中(不论是用在renderItem 还是Header或者Footer 中)，请在此属性中指定。同时此数据在修改时也需要先修改其引用地址(比如先复制到一个新的 Object或者数组中)，然后再修改其值，否则界面很可能不会刷新。 
    >
    > **getItem** 获取每个Item getItemCount 获取Item属相 
    >
    > **getItemLayout** 是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知 道内容的高度。如果你的行高是固定的getItemLayout 用起来就既高效又简单，类似下⾯面这样: 
    >
    > getItemLayout={(data, index) => ( {length: 行高, offset: ⾏高 * index, index} )} 注意如果你指定了了SeparatorComponent，请把分隔线的尺寸也考虑到offset的计算之中。 
    >
    > **horizontal** 设置为true则变为水平布局模式。 
    >
    > **initialNumToRender** 指定一开始渲染的元素数量，最好刚刚够填满一个屏幕，这样保证了用最短 的时间给用户呈现可见的内容。注意这第一批次渲染的元素不会在滑动过程中被卸载，这样是为了 保证用户执行返回顶部的操作时，不需要重新渲染首批元素。 
    >
    > **initialScrollIndex** 指定渲染开始的item index 
    >
    > **keyExtractor** 此函数用于为给定的item生成一个不重复的key。Key的作用是使React能够区分同类 元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。若不指定此函数， 则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标。 
    >
    > **legacyImplementation** 设置为true则使用旧的`ListView`的实现。 
    >
    > **numColumns**多列布局只能在非水平模式下使用，即必须是horizontal={false} 。此时组件内元素 会从左到右从上到下按Z字形排列，类似启用了了flexWrap的布局。组件内元素必须是等高的—暂 时还无法⽀持瀑布流布局。 
    >
    > **onEndReached** 当列表被滚动到距离内容最底部不足onEndReachedThreshold 的距离时调用。 https://github.com/facebook/react-native/issues/14015
    >  两次触发 
    >
    > **onEndReachedThreshold** 决定当距离内容最底部还有多远时触发onEndReached 回调。注意此 参数是一个比值⽽非像素单位。比如，0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发。 
    >
    > **onRefresh** 如果设置了此选项，则会在列表头部添加一个标准的RefreshControl 控件，以便实 现“下拉刷新”的功能。同时你需要正确设置refreshing 属性。 
    >
    > **refreshing** 在等待加载新数据时将此属性设为true，列表就会显示出一个正在加载的符号。 **onViewableItemsChanged** 在可⻅行元素变化时调用。可见范围和变化频率等参数的配置请设 
    >
    > 置 viewabilityconfig 属性
    >  **renderItem** 根据行数据data，渲染每一行的组件。这个参照下面的demo 
    >
    > > 注意点：
    >
    > **scrollToEnd** 滚动到底部。如果不设置getItemLayout 属性的话，可能会比较卡。
    > **scrollToIndex** 滚动到指定index的item 如果不设置getItemLayout 属性的话，无法跳转到当前可
    > 视区域以外的位置。
    > **scrollToItem** 滚动到指定item，如果不设置getItemLayout 属性的话，可能会比较卡。
    > **scrollToOffset** 滚动指定距离

  - **SwipeableFlatList**
  
    侧滑列表
  
    ```basic
    import React, { Component, PureComponent } from 'react'
    import {
      View,
      Text,
      StyleSheet,
      Button,
      FlatList,
      TouchableHighlight,
      SwipeableFlatList,
      RefreshControl,
      ActivityIndicator
    } from 'react-native'
    
    const CITY_NAMES = [
      '北京',
      '上海',
      '广州',
      '深圳',
      '杭州',
      '苏州',
      '成都',
      '武汉',
      '郑州',
      '洛阳',
      '厦门',
      '青岛',
      '拉萨'
    ]
    export default class SwipeableFlatListPage extends PureComponent {
      constructor(options) {
        super(options)
        this.state = {
          dataArray: CITY_NAMES,
          isLoading: false
        }
      }
      _renderItem(data) {
        return (
          <View style={styles.item}>
            <Text style={styles.text}> {data.item} </Text>
          </View>
        )
      }
      loadData(refresh) {
        if (refresh) {
          this.setState({
            isLoading: true
          })
        }
        setTimeout(() => {
          let dataArray = []
          if (refresh) {
            for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
              dataArray.push(this.state.dataArray[i])
            }
          } else {
            dataArray = this.state.dataArray.concat(CITY_NAMES)
          }
          this.setState({
            dataArray: dataArray,
            isLoading: false
          })
        }, 2000)
      }
      genIndicator() {
        return (
          <View style={styles.indicatorContainer}>
            <ActivityIndicator
              style={styles.indicator}
              size="large"
              animating={true}
            />
            <Text> 正在加载更多 </Text>
          </View>
        )
      }
      genQuickActions(rowData, sectionID, rowID) {
        return (
          <View style={styles.quickContainer}>
            <TouchableHighlight
              onPress={() => {
                alert('确认删除')
              }}
            >
              <View style={styles.quick}>
                <Text style={styles.text}>删除</Text>
              </View>
            </TouchableHighlight>
          </View>
        )
      }
      render() {
        return (
          <View style={styles.container}>
            <SwipeableFlatList
              data={this.state.dataArray}
              renderItem={data => this._renderItem(data)}
              ItemSeparatorComponent={() => {
                return (
                  <View
                    style={{
                      height: 2,
                      backgroundColor: 'gold'
                    }}
                  />
                )
              }}
              refreshControl={
                <RefreshControl
                  title="Loading..."
                  colors={['red']}
                  refreshing={this.state.isLoading}
                  onRefresh={() => this.loadData(true)}
                  tintColor={'orange'}
                />
              }
              ListEmptyComponent={() => {}}
              ListFooterComponent={() => this.genIndicator()}
              onEndReachedThreshold={0.4}
              onEndReached={() => {
                this.loadData()
              }}
              bounceFirstRowOnMount={true}
              maxSwipeDistance={60}
              renderQuickAction={() => this.genQuickActions()}
            />
          </View>
        )
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
      },
      item: {
        height: 100,
        backgroundColor: '#169',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
      },
      text: {
        fontSize: 26
      },
      indicator: {
        color: 'red',
        margin: 10
      },
      quickContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 15,
        marginBottom: 15
      },
      quick: {
        backgroundColor: 'red',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 10,
        paddingHorizontal: 10,
        width: 200
      }
    })
    ```
  
  - **SectionList**
  
    分组列表
  
    ```basic
    import React, { Component, PureComponent } from 'react'
    import {
      View,
      Text,
      StyleSheet,
      Button,
      FlatList,
      SectionList,
      RefreshControl,
      ActivityIndicator
    } from 'react-native'
    
    const CITY_NAMES = [
      { data: ['北京', '上海', '广州', '深圳'], title: '一线' },
      {
        data: ['杭州', '苏州', '成都', '武汉'],
        title: '二三线1'
      },
      { data: ['郑州', '洛阳', '厦门', '青岛', '拉萨'], title: '二三线2' }
    ]
    export default class SectionListPage extends PureComponent {
      constructor(options) {
        super(options)
        this.state = {
          dataArray: CITY_NAMES,
          isLoading: false
        }
      }
      _renderItem(data) {
        return (
          <View style={styles.item}>
            <Text style={styles.text}> {data.item} </Text>
          </View>
        )
      }
      loadData(refresh) {
        if (refresh) {
          this.setState({
            isLoading: true
          })
        }
        setTimeout(() => {
          let dataArray = []
          if (refresh) {
            for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
              dataArray.push(this.state.dataArray[i])
            }
          } else {
            dataArray = this.state.dataArray.concat(CITY_NAMES)
          }
          this.setState({
            dataArray: dataArray,
            isLoading: false
          })
        }, 2000)
      }
      genIndicator() {
        return (
          <View style={styles.indicatorContainer}>
            <ActivityIndicator
              style={styles.indicator}
              size="large"
              animating={true}
            />
            <Text> 正在加载更多 </Text>
          </View>
        )
      }
      _renderSectionHeader({ section }) {
        return (
          <View style={styles.sectionHeader}>
            <Text style={styles.text}>{section.title}</Text>
          </View>
        )
      }
      render() {
        return (
          <View style={styles.container}>
            <SectionList
              sections={this.state.dataArray}
              renderItem={data => this._renderItem(data)}
              renderSectionHeader={data => this._renderSectionHeader(data)}
              ItemSeparatorComponent={() => {
                return (
                  <View
                    style={{
                      height: 2,
                      backgroundColor: 'gold'
                    }}
                  />
                )
              }}
              refreshControl={
                <RefreshControl
                  title="Loading..."
                  colors={['red']}
                  refreshing={this.state.isLoading}
                  onRefresh={() => this.loadData(true)}
                  tintColor={'orange'}
                />
              }
              ListEmptyComponent={() => {}}
              ListFooterComponent={() => this.genIndicator()}
              onEndReachedThreshold={0.4}
              onEndReached={() => {
                this.loadData()
              }}
            />
          </View>
        )
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
      },
      item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'red'
      },
      text: {
        fontSize: 26
      },
      sectionHeader: {
        height: 50,
        backgroundColor: '#93ebbe',
        alignItems: 'center',
        justifyContent: 'center'
      }
    })
    ```

#### 常用API介绍





## 二、React Navigation3.x

#### 1.普通导航

- **安装**

```bash
#安装react-navigation这个包
yarn add react-navigation
#安装 react-native-gesture-handler
yarn add react-native-gesture-handler
```

- **关联**

```bash
react-native link react-native-gesture-handler
```

- **安卓需要做额外的配置**

```bash
#android——app——src——main——Java——MainActivity.java

#将带+的部分放入自己的MainActivity.java文件中
package com.reactnavigation.example;

import com.facebook.react.ReactActivity;
+ import com.facebook.react.ReactActivityDelegate;
+ import com.facebook.react.ReactRootView;
+ import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "Example";
  }

+  @Override
+  protected ReactActivityDelegate createReactActivityDelegate() {
+    return new ReactActivityDelegate(this, getMainComponentName()) {
+      @Override
+      protected ReactRootView createRootView() {
+       return new RNGestureHandlerEnabledRootView(MainActivity.this);
+      }
+    };
+  }
}
```

- **导航器**

#### 2.底部导航

- **配置项**
- **图标库**

```bash
yarn add react-native-vector-icons
react-native link react-native-vector-icons
```

图标库地址:https://oblador.github.io/react-native-vector-icons/

- **createBottomTabNavigator**

> ```
> createBottomTabNavigator(RouteConfigs, BottomTabNavigatorConfig)
> ```

> **RouteConfigs：**RouteConfigs⽀持三个参数 screen 、 path 以及 navigationOptions ; 
>
> `screen` (必选):指定一个 React 组件作为屏幕的主要显示内容，当这个组件被TabNavigator加载时，它会被分配一个navigation prop。 
>
> `path` (可选):用来设置支持schema跳转时使用，具体使用会在下文的有关 Schema 章节中讲到; 
>
> `navigationOptions` (可选):用以配置全局的屏幕导航选项如:title、headerRight、headerLeft 等; 
>
>  - 具体配置
>
> #### `标题`
>
> 可用作 `headerTitle` 的回退的字符串。 此外, 将用作 `tabBarLabel` 的回退 (如果嵌套在 TabNavigator 中) 或 `drawerLabel` (如果嵌套在DrawerNavigator)。
>
> #### `header`
>
> React 元素或一个给定 `HeaderProps` 然后返回一个 React 元素的函数，将作为一个标题来显示。 设为 `null` ，则隐藏标题。
>
> #### `headerTitle`
>
> Header 使用的字符串，React 元素或React组件。 默认是页面的 `title` 当一个组件被使用时，它会接受 `allowFontScaling`、 `style` 和 `children` 这几个 props。 标题字符串在`children`中传递。
>
> #### `headerTitleAllowFontScaling`
>
> AllowFontScaling -无论标签字体是否应缩放以尊重文字大小可访问性设置， 默认值都是 true。
>
> #### `headerBackAllowFontScaling`
>
> Whether back button title font should scale to respect Text Size accessibility settings. Defaults to false.
>
> #### `headerBackImage`
>
> React 元素或组件在标题的后退按钮中显示自定义图片。 当组件被调用时，它会在渲染时收到许多 props 如：（`tintColor`，`title`）。 默认为带有 `react-navigation/views/assets/back-icon.png` 这张图片的组件，后者是平台的默认后图标图像（iOS上为向左的符号，Android上为箭头）。
>
> #### `headerBackTitle`
>
> Ios 上的后退按钮使用的标题字符串, 或 `null` 禁用标签。 默认为上一个场景的 `headerTitle`。 `headerBackTitle` 必须在源屏幕 (而不是目标屏幕) 中定义。 例如, 当您将 A 转换为 B, 并且要禁用 `B` 上的 `headerBackTitle`:
>
> **BottomTabNavigatorConfig**
>
> - `initialRouteName` -第一次加载时初始选项卡路由的 routeName。
>
> - `navigationOptions` - Navigation options for the navigator itself, to configure a parent navigator
>
> - `defaultNavigationOptions` - 用于屏幕的默认导航选项
>
> - `resetOnBlur` - 切换离开屏幕时，重置所有嵌套导航器的状态， 默认值： `false`。
>
> - `order` -定义选项卡顺序的 routeNames 数组。
>
> - `paths` - 提供 routeName 到 path 配置的映射, 它重写 routeConfigs 中设置的路径。
>
> - `backBehavior` - `initialRoute` to return to initial tab, `order` to return to previous tab, `history` to return to last visited tab, or `none`.
>
> - `lazy` - Defaults to `true`. If `false`, all tabs are rendered immediately. When `true`, tabs are rendered only when they are made active for the first time. Note: tabs are **not** re-rendered upon subsequent visits.
>
> - `tabBarComponent` -可选，覆盖用作标签栏的组件.
>
> - ```
>   tabBarOptions
>   ```
> ```
> 
> ```
>
> ```
> 
> ```
>
> \- 具有以下属性的对象:
>
>   - `activeTintColor` -活动选项卡的标签和图标颜色。
>   - `activeBackgroundColor` -活动选项卡的背景色。
>   - `inactiveTintColor` -"非活动" 选项卡的标签和图标颜色。
>   - `inactiveBackgroundColor` -非活动选项卡的背景色。
>   - `showLabel` -是否显示选项卡的标签, 默认值为 true。
>   - `showIcon` - 是否显示 Tab 的图标，默认为false。
>   - `style` -选项卡栏的样式对象。
>   - `labelStyle` -选项卡标签的样式对象。
>   - `tabStyle` -选项卡的样式对象。
>   - `allowFontScaling` -无论标签字体是否应缩放以尊重文字大小可访问性设置，默认值都是 true。
>   - `adaptive` - Should the tab icons and labels alignment change based on screen size? Defaults to `true` for iOS 11. If `false`, tab icons and labels align vertically all the time. When `true`, tab icons and labels align horizontally on tablet.
>   - `safeAreaInset` - 为 `<SafeAreaView>` 组件重写 `forceInset` prop， 默认值：`{ bottom: 'always', top: 'never' }`； `top | bottom | left | right` 的可选值有： `'always' | 'never'`。
>   - `keyboardHidesTabBar` - Defaults to `false`. If `true` hide the tab bar when keyboard opens.
> ```
> 
> ```
>
> ```
> 
> ```

- **案例**

```bash
import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { createAppContainer, createBottomTabNavigator } from 'react-navigation'

import HomePage from '../Pages/HomePage'
import HotPage from '../Pages/HotPage'
import MyPage from '../Pages/MyPage'
import SwipeableFlatListPage from '../Pages/SwipeableFlatListPage'
import SectionListPage from '../Pages/SectionListPage'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
const AppBottomNavigator = createBottomTabNavigator(
  {
    HomePage: {
      screen: HomePage,
      navigationOptions: {
        tabBarLabel: '首页',
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <FontAwesome name={'home'} size={26} style={{ color: tintColor }} />
          )
        }
      }
    },
    HotPage: {
      screen: HotPage,
      navigationOptions: {
        tabBarLabel: '热门',
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <FontAwesome name={'fire'} size={26} style={{ color: tintColor }} />
          )
        }
      }
    },
    MyPage: {
      screen: MyPage,
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <Image
              style={{ width: 26, height: 26 }}
              source={
                focused
                  ? require('../pics/logo.png')
                  : require('../pics/timg.jpeg')
              }
            />
          )
        }
      }
    },
    SwipeableFlatListPage: {
      screen: SwipeableFlatListPage,
      navigationOptions: {
        tabBarLabel: '侧滑'
      }
    },
    SectionListPage: {
      screen: SectionListPage,
      navigationOptions: {
        tabBarLabel: '分组'
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: '#000',
      style: { borderBottomWidth: 1, borderTopColor: 'red' }
    }
  }
)

export default createAppContainer(AppBottomNavigator)
```

#### 3.顶部导航

- **createMaterialTopTabNavigator**

> ```
> createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig):
> ```

> ## TabNavigatorConfig
>
> - `initialRouteName` -第一次加载时初始选项卡路由的 routeName。
>
> - `navigationOptions` - Navigation options for the navigator itself, to configure a parent navigator
>
> - `defaultNavigationOptions` - 用于屏幕的默认导航选项
>
> - `order` -定义选项卡顺序的 routeNames 数组。
>
> - `paths` - 提供 routeName 到 path 配置的映射, 它重写 routeConfigs 中设置的路径。
>
> - `backBehavior` - `initialRoute` to return to initial tab, `order` to return to previous tab, `history` to return to last visited tab, or `none`.
>
> - `tabBarPosition` - 标签栏的位置, 可以是 `'top'` 或 `'bottom'`。默认值是`top`。
>
> - `swipeEnabled` -是否允许在标签页之间进行滑动。
>
> - `animationEnabled` -是否在更改标签页时进行动画处理。
>
> - `lazy` - Defaults to `false`. If `true`, tabs are rendered only when they are made active or on peek swipe. When `false`, all tabs are rendered immediately.
>
> - `optimizationsEnabled` -是否将 Tab 页嵌套在到 [``](https://github.com/react-navigation/react-navigation-tabs/blob/master/src/views/ResourceSavingScene.js) 中。如果是，一旦该 Tab 页失去焦点，将被移出当前页面, 从而提高内存使用率。
>
> - `initialLayout` -可选对象, 其中包含初始的 `height` 和 `width`，可以通过传递该对象，来防止 [react-native-tab-view ](https://github.com/react-native-community/react-native-tab-view#avoid-one-frame-delay)渲染时一个帧的延迟。
>
> - `tabBarComponent` -可选，覆盖用作标签栏的组件.
>
> - ```
>   tabBarOptions 
>   ```
> ```
> 
> ```
>
> ```
> 
> ```
>
> \- 具有以下属性的对象:
>
>   - `activeTintColor` -活动选项卡的标签和图标颜色。
>   - `inactiveTintColor` -"非活动" 选项卡的标签和图标颜色。
>   - `showLabel` -是否显示选项卡的图标，默认值为 false。
>   - `showLabel` -是否显示选项卡的标签, 默认值为 true。
>   - `upperCaseLabel` -是否使标签大写，默认为 true。
>   - `pressColor` -Color for material ripple（仅支持 Android >= 5.0）
>   - `pressOpacity` - Opacity for pressed tab (iOS and Android < 5.0 only).
>   - `scrollEnabled` -是否支持 选项卡滚动
>   - `tabStyle` -选项卡的样式对象。
>   - `indicatorStyle` -选项卡指示器的样式对象（选项卡底部的行）。
>   - `labelStyle` -选项卡标签的样式对象。
>   - `iconStyle` -选项卡图标的样式对象。
>   - `style` -选项卡栏的样式对象。
>   - `allowFontScaling` -无论标签字体是否应缩放以尊重文字大小可访问性设置，默认值都是 true。
>   - `renderIndicator` - Function which takes an object with the current route and returns a custom React Element to be used as a tab indicator.
> ```
> 
> ```
>
> ```
> 
> ```

- **案例**

```bash
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import {
  createAppContainer,
  createMaterialTopTabNavigator
} from 'react-navigation'

import HomePage from '../Pages/HomePage'
import MyPage from '../Pages/MyPage'
import HotPage from '../Pages/HotPage'
import SectionListPage from '../Pages/SectionListPage'
import SwipeableFlatListPage from '../Pages/SwipeableFlatListPage'

const AppTopNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: HomePage
    },
    My: {
      screen: MyPage
    },
    Hot: {
      screen: HotPage
    },
    SwipeableFlatList: {
      screen: SwipeableFlatListPage
    },
    SectionList: {
      screen: SectionListPage
    }
  },
  {
    lazy: true,
    swipeEnabled: true,
    tabBarOptions: {
      upperCaseLabel: false,
      scrollEnabled: true
    },
    initialRouteName: 'Hot'
  }
)

class TopNavigator extends Component {
  render() {
    const AppTNavigator = createAppContainer(AppTopNavigator)
    return (
      <View style={{ flex: 1, paddingTop: 40 }}>
        <AppTNavigator />
      </View>
    )
  }
}
//AppNavigator不能直接暴露给根组件，所以需要使用createAppContainer包裹一下
export default TopNavigator
```

- **动态配置导航**

#### 4.抽屉导航

- **createDrawerNavigator**

> **createDrawerNavigator**(RouteConfigs, DrawerNavigatorConfig);

> ### DrawerNavigatorConfig
>
> - `drawerWidth` -抽屉的宽度或返回它的函数。
> - `drawerPosition` - 可选值： `left` 或 `right`， 默认值： `left`。
> - `contentComponent` -用于呈现抽屉内容 (例如, 导航项) 的组件。 接收用于抽屉的 `navigation` 支柱。 默认为 `DrawerItems`。 有关详细信息, 请参阅下文。
> - `contentOptions` -配置抽屉内容, 请参阅下面。
> - `useNativeAnimations` - 使用原生动画， 默认值： `true`。
> - `drawerBackgroundColor` - 使用抽屉背景色， 默认值：`white`。
> - `navigationOptions` - Navigation options for the navigator itself, to configure a parent navigator
> - `defaultNavigationOptions` - 用于屏幕的默认导航选项
>
> The DrawerNavigator uses [`DrawerLayout`](https://kmagiera.github.io/react-native-gesture-handler/docs/component-drawer-layout.html) under the hood, therefore it inherits the following props:
>
> - `drawerType` - One of front | back | slide
> - `edgeWidth` - Allows for defining how far from the edge of the content view the swipe gesture should activate
> - `hideStatusBar` - when set to true Drawer component will hide the OS status bar whenever the drawer is pulled or when its in an "open" state.
> - `overlayColor` - Color overlay to be displayed on top of the content view when drawer gets open. A solid color should be used as the opacity is added by the Drawer itself and the opacity of the overlay is animated (from 0% to 70%).
>
> 几个被传递到底层路由以修改导航逻辑的选项：
>
> - `initialRouteName` -第一次加载时初始选项卡路由的 routeName。
> - `order` -定义选项卡顺序的 routeNames 数组。
> - `paths` - 提供 routeName 到 path 配置的映射, 它重写 routeConfigs 中设置的路径。
> - `backBehavior` - 控制 "返回" 按钮是否会导致 Tab 页切换到初始 Tab 页? 如果是, 设置为 `initialRoute`, 否则 `none`。 默认为 `initialRoute`的行为。

- **案例**

```bash
import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { createAppContainer, createDrawerNavigator } from 'react-navigation'

import HomePage from '../Pages/HomePage'
import HotPage from '../Pages/HotPage'
import MyPage from '../Pages/MyPage'
import SwipeableFlatListPage from '../Pages/SwipeableFlatListPage'
import SectionListPage from '../Pages/SectionListPage'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
const AppDrawerNavigator = createDrawerNavigator(
  {
    HomePage: {
      screen: HomePage,
      navigationOptions: {
        drawerLabel: '首页',
        drawerIcon: ({ tintColor, focused }) => {
          return (
            <Ionicons
              name={'ios-home'}
              size={26}
              style={{ color: tintColor }}
            />
          )
        }
      }
    },
    HotPage: {
      screen: HotPage,
      navigationOptions: {
        drawerLabel: '热门',
        drawerIcon: ({ tintColor, focused }) => {
          return (
            <FontAwesome name={'fire'} size={26} style={{ color: tintColor }} />
          )
        }
      }
    },
    MyPage: {
      screen: MyPage,
      navigationOptions: {
        drawerLabel: '我的',
        drawerIcon: ({ tintColor, focused }) => {
          return (
            <Image
              style={{ width: 26, height: 26 }}
              source={
                focused
                  ? require('../pics/logo.png')
                  : require('../pics/timg.jpeg')
              }
            />
          )
        }
      }
    },
    SwipeableFlatListPage: {
      screen: SwipeableFlatListPage,
      navigationOptions: {
        drawerLabel: '侧滑',
        drawerIcon: ({ tintColor, focused }) => {
          return (
            <FontAwesome
              name={'sliders'}
              size={26}
              style={{ color: tintColor }}
            />
          )
        }
      }
    },
    SectionListPage: {
      screen: SectionListPage,
      navigationOptions: {
        drawerLabel: '分组',
        drawerIcon: ({ tintColor, focused }) => {
          return (
            <FontAwesome
              name={'align-justify'}
              size={26}
              style={{ color: tintColor }}
            />
          )
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: '#000',
      style: { borderBottomWidth: 1, borderTopColor: 'red' }
    }
  }
)

export default createAppContainer(AppDrawerNavigator)
```

#### 5.开关导航

- **createSwitchNavigator**

> **createSwitchNavigator**(RouteConfigs, SwitchNavigatorConfig);

> ## SwitchNavigatorConfig
>
> 几个被传递到底层路由以修改导航逻辑的选项：
>
> - `initialRouteName` -第一次加载时初始选项卡路由的 routeName。
> - `navigationOptions` - Navigation options for the navigator itself, to configure a parent navigator
> - `defaultNavigationOptions` - 用于屏幕的默认导航选项
> - `resetOnBlur` - 切换离开屏幕时，重置所有嵌套导航器的状态， Defaults to `true`.
> - `paths` - 提供 routeName 到 path 配置的映射, 它重写 routeConfigs 中设置的路径。
> - `backBehavior` - `initialRoute` to return to initial route, `order` to return to previous route, `history`to return to last visited route, or `none`.

```bash
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation'

import WelcomePage from '../Pages/WelcomePage'
import HomePage from '../Pages/HomePage'
import DetailPage from '../Pages/DetailPage'

const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null
    }
  }
})
const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null
    }
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {
      header: null
    }
  }
})
//AppNavigator不能直接暴露给根组件，所以需要使用createAppContainer包裹一下
export default createAppContainer(
  createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator
  })
)
```

#### 6.导航框架设计

- **开关导航**

- **欢迎页设计**

  <font color='red'>3秒后跳转到App主页</font>

```bash
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class WelcomePage extends Component {
  constructor(props) {
    super(props)
    console.disableYellowBox = true
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      const { navigation } = this.props
      navigation.navigate('Main')
    }, 3000)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> welcomePage </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  text: {
    fontSize: 26
  }
})
```

- **App主页HomePage**

```bash
import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ImageBackground,
  Switch,
  Modal,
  TouchableHighlight,
  SafeAreaView,
  TextInput
} from 'react-native'

import { createAppContainer, createBottomTabNavigator } from 'react-navigation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationUtil from '../Navigator/NavigationUtil'
import IndexPage from './IndexPage'
import MyPage from './MyPage'

const TABS = {
  IndexPage: {
    screen: IndexPage,
    navigationOptions: {
      tabBarLabel: '首页',
      tabBarIcon: ({ tintColor, focused }) => {
        return (
          <FontAwesome name={'home'} size={26} style={{ color: tintColor }} />
        )
      }
    }
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor, focused }) => {
        return (
          <FontAwesome name={'cog'} size={26} style={{ color: tintColor }} />
        )
      }
    }
  }
}
export default class HomePage extends Component {
  constructor(props) {
    super(props)
    //去掉黄色警告
    console.disableYellowBox = true
  }
  TabNavigator() {
    return createAppContainer(createBottomTabNavigator(TABS))
  }

  render() {
    NavigationUtil.navigation = this.props.navigation
    const Tabs = this.TabNavigator()
    return <Tabs />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingBottom: 40,
    paddingTop: 40
  },
  text: {
    fontSize: 26
  }
})
```

- **App详情页DetailPage**

```bash
import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native'
import {
  createAppContainer,
  createMaterialTopTabNavigator
} from 'react-navigation'
import NavigationUtil from '../Navigator/NavigationUtil'
// 动态顶部导航
export default class IndexPage extends Component {
  constructor(props) {
    super(props)
    console.disableYellowBox = true
    this.tabsName = ['html', 'css', 'js', 'vue', 'react', 'nodejs']
  }
  genTabs() {
    const obj = {}
    this.tabsName.forEach((item, index) => {
      obj[`${item}`] = {
        screen: props => {
          return <IndexTab {...props} tabName={item} />
        }
      }
    })
    return obj
  }
  render() {
    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(this.genTabs(), {
        // lazy: true,
        tabBarOptions: {
          upperCaseLabel: false,
          scrollEnabled: true
        }
      })
    )
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TabNavigator />
      </SafeAreaView>
    )
  }
}
class IndexTab extends Component {
  render() {
    const { tabName } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{tabName}</Text>
        <Button
          title="进入详情页"
          onPress={() => {
            NavigationUtil.navigation.navigate('DetailPage')
          }}
        />
        <Button title="进入离线缓存框架测试" onPress={() => {}} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  text: {
    fontSize: 26
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
})
```

> App主页HomePage跳转到App详情页DetailPage，需要一个中转工具**NavigationUtil.js**

#### 



## 三、redux集成

> 第三方库的使用
>
> Redux + React Navigation有点复杂 因为Redux是自顶向下管理一套状态，React Navigation也是自顶 向下管理一套状态甚⾄⻚面，这俩融合起来就有点困难了

### 1.安装redux、react-redux、react-navigation-redux-helpers

```bash
yarn add redux
yarn add react-redux #因为redux其实是可以独立运行的js项⽬目，但使用在react项目中，还需要使用react-redux
yarn add react-navigation-redux-helpers#在使⽤React Navigation 的项⽬中，想要集成 redux 就必须要引入 react-navigation-redux-helpers 这个库
```

### 2.配置Navigation

- **引入redux和react-navigation-redux-helpers**

  ```bash
  import { connect } from 'react-redux'
  import {
    createReactNavigationReduxMiddleware,
    createReduxContainer
  } from 'react-navigation-redux-helpers'
  ```

- **使用`createReduxContainer`方法，将`RootNavigator`封装成高阶组件
  `AppWithNavigationState`，这个高阶组件完成了`navigation prop`的替换，改成了使用`redux`
  里的`navigation`**

  ```bash
  export const RootNavigator = createAppContainer(
    createSwitchNavigator({
      Init: InitNavigator,
      Main: MainNavigator
    })
  )
  
  const AppWithNavigationState = createReduxContainer(RootNavigator, 'root')
  ```

- **创建导航中间件:**`createReduxContainer`**把导航状态放到`props`里只是能被各个组件访问到，但
  是`React Navigation`还不能识别，所以还需要最后一步——创建一个中间件，把需要导航的组件
  与导航`reducer`连接起来**

  ```bash
  export const middleweare = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root'
  )
  ```

- **然后使用`Redux`的`connect`函数再封装一个高阶组件，默认导出**

  ```bash
  #将state到Props的映射关系
  const mapStateToProps = state => {
    return {
      state: state.nav
    }
  }
  #使用redux的connect函数再封装一个高阶组件，连接react组件与redux store
  export default connect(mapStateToProps)(AppWithNavigationState)
  ```

### 3.配置reducer

```bash
import { combineReducers } from 'redux'
import { rootCom, RootNavigator } from '../Navigator/AppNavigator'

#1.指定默认state
const navState = RootNavigator.router.getStateForAction(
  RootNavigator.router.getActionForPathAndParams(rootCom)
)

/**上面的代码创建了一个导航action(表示我想打开rootCom)，那么我们就可以通过action创建导航state，通过方*法getStateForAction(action, oldNavigationState)
 *俩参数，一个是新的action，一个是当前的导航state，返回新的状态，当没有办法执行这个action的时候，就返回*null。
 **/


#2.创建自己的 navigation reducer，

const navReducer = (state = navState, action) => {
  const nextState = RootNavigator.router.getStateForAction(action, state)
  // 如果`nextState`为null或未定义，只需返回原始`state`
  return nextState || state
}

/**
#3.合并reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const index = combineReducers({
  nav: navReducer
})

export default index

```

### 4.配置store

```bash
import { applyMiddleware, createStore } from 'redux'
import reducers from '../Reducer'
import { middleweare } from '../Navigator/AppNavigator'

const middlewares = [middleweare]
/**
 * 创建store
 */
export default createStore(reducers, applyMiddleware(...middlewares))

```

### 5.在组件中应用

```bash
#App.js
React, { Component } from 'react'
import { Provider } from 'react-redux'
import AppNavigator from './Navigator/AppNavigator'
import store from './Store'

export default class App extends Component {
  render() {
    /**
     * 将store传递给App框架
     */
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}
```

## 四、RN网络请求

React native提供了和web标准一致的[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)，用于满足开发者访问网络需求

- **发起请求**

要从任意地址获取内容的话，只需简单的将网址作为参数传递给fetch方法即可（fetch这个词本身也就是获取的意思）

```bash
fetch('https://mywebsite.com/mydata.json');
```

fetch还有可选的第二个参数，可以用来制定HTTP请求一些参数。可以指定header参数，或者指定使用post方法，又或是提交数据等等

```bash
fetch('https://mywebsite.com/endpoint/', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: 'yourValue',
    secondParam: 'yourOtherValue',
}), });
```

提交数据的格式取决于headers中`Content-Type`。`Content-Type`有很多种，对应body的格式也有区别。到底应该采用什么样的`Content-Type`取决于服务器端，所以请和服务器端的开发人员沟通确定清楚。常用`Content-Type`除了上面的`application/json`，还有传统的网页表单形式，如：

```bash
fetch('https://mywebsite.com/endpoint/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: 'key1=value1&key2=value2',
});
```

Fetch方法会返回一个Promise，这种模式可以简化异步风格的代码

```bash
function getMoviesFromApiAsync() {
  return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.movies;
    })
    .catch((error) => {
      console.error(error);
}); }
```

使用async/await

```bash
async function getMoviesFromApi() {
try {
// 注意这⾥里里的await语句句，其所在的函数必须有async关键字声明 let response = await fetch(
      'https://facebook.github.io/react-native/movies.json',
    );
    let responseJson = await response.json();
    return responseJson.movies;
  } catch (error) {
    console.error(error);
  }
}
```

错误处理

> 当接收到一个代表错误的HTTP状态码时，从fetch()返回的promise不会被标记为reject，即使该HTTP
> 响应的状态码是404或500。相反，它会将Promise状态标记为resolve(但是会将resolve的返回值的ok属
> 性设置为false)，仅当网络故障时或请求被阻止时，才会被标记为reject。一次请求没有调用reject并不
> 代表请求一定成功了，通常需要在resolve情况下，再判断response.ok属性为true.

```bash
let url = `https://api.github.com/search/repositories?q=NodeJS`;
fetch(url)
  .then(response => {
    if (response.ok) {
     return response.text();
    }
    throw new Error("Network response wat not ok");
  })
  .then(responseText => {
    console.log(responseText);
  })
  .catch(e => {
    console.log(e.toString());
  });
```

## 五、数据存储																					

> AsyncStorage
>
> AsyncStorage 是一个简单的、异步的、持久化的 Key-Value 存储系统，它对于 App 来说是全局性 
>
> 的。可用来代替 LocalStorage。
> 我们推荐您在 AsyncStorage 的基础上做一层抽象封装，⽽不是直接使用 AsyncStorage。 
>
> 在 iOS 上， AsyncStorage 在原生端的实现是把较小值存放在序列化的字典中，而把较大值写入单独的文件。在 Android 上， AsyncStorage 会尝试使用RocksDB，或退而选择 SQLite。 

- **如何使用AsyncStorage**

在新版本的RN中AS已经从RN框架中移除了，使用第三⽅库 [react-native-community/react-native- 

async-storage](https://github.com/react-native-community/async-storage) 来替代。 

 - **安装**

```bash
# Install
$ yarn add @react-native-community/async-storage
# Link
$ react-native link @react-native-community/async-storage
```

 - **使用**

   ```bash
   import AsyncStorage from '@react-native-community/async-storage';
   ```

   - 存储数据

   ```basic
   async doSave(){ 
   	//用法1
     AsyncStorage.setItem(Key,Value,err=>{
       err && console.log(err.toString())
   	})
   	//用法2 
   	AsyncStorage.setItem(Key,Value) .catch(e=>{
       err && console.log(err.toString())
     })
   	//用法3 
   	try{
       await AsyncStorage.setItem(Key,value)
     }catch(err){ 
     	err && console.log(err.toString())
   	}
   }
   ```

   - 读取数据

   ```basic
    
   async getData(){ 
   	//用法1
     AsyncStorage.getItem(Key,(err,value)=>{
       console.log(value)
       err && console.log(err.toString())
   	})
   	//用法2 
   	AsyncStorage.getItem(Key) .then(value=>{
       console.log(value)
     })
     .catch(e=>{
       err && console.log(err.toString())
   	})
   	//用法3 
   	try{
       const value = await AsyncStorage.getItem(Key)
       console.log(value)
     }catch(err){
       err && console.log(err.toString())
     }
   }
   ```

   - 删除数据

   ```basic
    
   async doRemove(){ 
     //用法1
     AsyncStorage.removeItem(Key,(err)=>{
       err && console.log(err.toString())
   })
   	//用法2 
     AsyncStorage.removeItem(Key) .catch(e=>{
       err && console.log(err.toString())
     })
   	//用法3 
     try{
       await AsyncStorage.removeItem(Key)
     }catch(err){
       err && console.log(err.toString())
     }
   }
   ```

## 六、离线缓存框架设计

### 1.离线缓存有什么好处 

提升用户体验，用户的网络情况我们不能控制，但是我们可以离线存储提升体验。
节省流量:节省服务器流量，节省用户手机的流量

### 2.离线缓存有么限制 

数据的实时性要求不高，推荐使用

### 3.离线缓存的策略

![离线缓存流程](/Users/qiaoxu/Desktop/myBlog/pic/rn_asyncStorage.png)

- 优先从本地获取数据，如果数据过时或者不存在，则从服务器获取数据，数据返回后同时将数据同步到本地数据库

- 优先从服务器获取数据，数据返回后同步到本地数据库，如果发生网络故障，才从本地获取数据

### 4.离线缓存框架的设计

按照第一个策略:如果数据过时或者不存在，则从服务器获取数据，数据返回后同时将数据同步到本地数据库。

- 优先从本地获取数据
- 如果数据存在且在有效期内，我们将数据返回
- 否则获取网络数据

```basic
//Http/AsDemo.js
import AsyncStorage from '@react-native-community/async-storage'

export default class DataStore {
  //校验时间
  static checkTimestampValid(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setTime(timestamp);
    if (currentDate.getMonth() !== targetDate.getMonth()) return false;
    if (currentDate.getDate() !== targetDate.getDate()) return false;
    if (currentDate.getHours() - targetDate.getHours() > 4) return false; //有效期4 个⼩ 小时
    // if (currentDate.getMinutes() - targetDate.getMinutes() > 1)return false; return true;
  }
  //入口
  fetchData(url) {
    return new Promise((resolve, reject) => {
      //获取本地数据 
      this.fetchLocalData(url)
        .then((wrapdata) => {
          //检查有效期
          if (wrapdata && DataStore.checkTimestampValid(wrapdata.timestamp)) {
            resolve(wrapdata)
          } else {
            //获取⽹网络数据 
            this.fetchNetData(url)
              .then((data) => { //给数据打个时间戳
                resolve(this._wrapData(data))
              })
              .catch((e) => {
                reject(e)
              })
          }
        })
        .catch(error => {
          this.fetchNetData(url)
            .then(data => {
              resolve(this._wrapData(data));
            })
            .catch(error => {
              reject(error);
            });
        });
    })
  }
  //存储数据
  saveData(key, value, cb) {
    if (!key || !value) return
    AsyncStorage.setItem(key, JSON.stringify(this._wrapData(value)), cb)
  }
  //打时间戳——给离线数据，便于后期计算
  _wrapData(data) {
    return {
      data: data,
      timestamp: new Date().getTime()
    }
  }

  //获取本地数据
  fetchLocalData(key) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key, (err, result) => {
        if (!err) {
          resolve(JSON.parse(result)) // getItem获取到的是string，我们需要将其反序列化 为object
        } else {
          reject(err)
        }
      })
    })
  }
  //获取网络请求
  fetchNetData(url) {
    return new Promise((resolve, reject) => {
      fetch(url).then((response) => {
        return response.json()
      }).then((responsData) => {
        this.saveData(url, responsData)
        resolve(responsData)
      }).catch(e => {
        reject(e)
      })
    })
  }
}
```

## 七、React Native部署

### 1.热更新

免费的热更新工具：微软的CodePush和RN中文网的Pushy

本节课我们使用RN官方推荐的Pushy热更新服务

#### 1）react-native-update

本组件是面向React Native提供热更新功能的组件，根据RN版本安装对应的版本，如果你的RN版本是0.46以上，就需要安装react-native-update 5.x版本

#### 2）准备工作

- **安装**

在项目根目录下运行以下命令：

```bash
### npm 版本 推荐6.7
npm i -g react-native-update-cli
yarn add react-native-update@5.x 
react-native link react-native-update
```

- 相应配置

  > **iOS**的**ATS**例外配置**()** 版本更更新，⽂档未更新
  >
  > 从iOS9开始，苹果要求以白名单的形式在Info.plist中列出外部的非https接口，以督促开发者部署https协议。在我们的服务部署https协议之前，请在Info.plist中添加如下例外(右键点击Info.plist，选择open as - source code):
  >
  > ```basic
  > <key>NSAppTransportSecurity</key>
  > <dict>
  >     <key>NSExceptionDomains</key>
  >     <dict>
  >         <key>reactnative.cn</key>
  >         <dict>
  >             <key>NSIncludesSubdomains</key>
  >             <true/>
  >             <key>NSExceptionAllowsInsecureHTTPLoads</key>
  >             <true/>
  >         </dict>
  >    </dict>
  > </dict>
  > ```
  >
  > **Android**
  >
  > 在你的MainApplication中增加如下代码:
  >
  > ```basic
  >  
  > // ... 其它代码
  > // 请注意不要少了这句import
  > import cn.reactnative.modules.update.UpdateContext;
  > public class MainApplication extends Application implements ReactApplication {
  >     private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) { 
  >     //添加代码
  >     @Override
  >     protected String getJSBundleFile() {
  >             return UpdateContext.getBundleUrl(MainApplication.this);
  >         }
  >     // ... 其它代码 }
  > }
  > ```

- **登录与创建应用**

  首先请在https://update.reactnative.cn注册帐号，然后在你的项目根目录下运行以下命令:

  ```basic
  $ pushy login
  email: <输入你的注册邮箱> 
  password: <输入你的密码>
  ```

  这会在项目文件夹下创建一个 .update 文件，注意不要把这个文件上传到Git等CVS系统上。你可以 在 .gitignore 末尾增加一行 .update 来忽略这个文件。

  登录之后可以创建应用。注意iOS平台和安卓平台需要分别创建:

  ```basic
  $ pushy createApp --platform ios
  App Name: <输入应用名字>
  $ pushy createApp --platform android 
  App Name: <输入应用名字>
  ```

  两次输入的名字可以相同，这没有关系。
  如果你已经在⽹页端或者其它地方创建过应用，也可以直接选择应用:

  ```basic
  $ pushy selectApp --platform ios 
  1) ⻥鱼多多(ios)
  3) 招财旺(ios)
  Total 2 ios apps
  Enter appId: <输⼊入应⽤前面的编号>
  ```

  选择或者创建过应用后，你将可以在文件夹下看到 update.json 文件，其内容类似如下形式:

  ```basic
  {
    "ios": {
    "appId": 1,
    "appKey": "<一串随机字符串>" },
        "android": {
            "appId": 2,
    "appKey": "<一串随机字符串>" }
  }
  ```

- **App添加热更新功能**

  - 获取appKey

    检查更新时必须提供你的 appKey ，这个值保存在 update.json 中，并且根据平台不同⽽不同。你可以 用如下的代码获取:

    ```basic
    import {
      Platform,
    } from 'react-native';
    import _updateConfig from './update.json';
    const {appKey} = _updateConfig[Platform.OS];
    ```

  - 检查更新、下载更新

    异步函数checkUpdate可以检查当前版本是否需要更新

    ```basic
     
    import {
      isFirstTime,
      isRolledBack,
      packageVersion,
      currentVersion,
      checkUpdate,
      downloadUpdate,
      switchVersion,
      switchVersionLater,
      markSuccess
    } from "react-native-update";
    checkUpdate(appKey)
     .then(info => {})
    ```

    > 返回的info有三种情况:
  >
    > {expired: true} :该应用包(原生部分)已过期，需要前往应用市场下载新的版本。
  >
    > {upToDate: true} :当前已经更新到最新，无需进行更新。
  >
    > {update: true} :当前有新版本可以更新。info的 name 、 description 字段可以用于提示用户， 而 metaInfo 字段则可以根据你的需求自定义其它属性(如是否静默更新、 是否强制更新等等)。另外还 有几个字段，包含了完整更新包或补丁包的下载地址， react-native-update会首先尝试耗费流量更更少的更新方式。将info对象传递给downloadUpdate作为参数即可
  
  - 切换版本
  
    downloadUpdate的返回值是一个hash字符串，它是当前版本的唯一标识。
    你可以使用 switchVersion 函数立即切换版本(此时应用会立即重新加载)，或者选择调用
    switchVersionLater ，让应用在下一次启动的时候再加载新的版本。
  
  - 首次启动、回滚
  
    在每次更新完毕后的首次启动时， `isFirstTime` 常量会为 true 。 你必须在应用退出前合适的任何时机，调用 `markSuccess` ，否则应用下一次启动的时候将会进行回滚操作。 这一机制称作“反触发”，这样当你应用启动初期即遭遇问题的时候，也能在下一次启动时恢复运作。
  
    你可以通过 `isFirstTime` 来获知这是当前版本的首次启动，也可以通过 `isRolledBack` 来获知应用刚 刚经历了了一次回滚操作。 你可以在此时给予用户合理的提示。
  
  - 完整案例
  
    ```basic
    //App.js
    import React, { Component } from "react";
    
    import {
      AppRegistry,
      StyleSheet,
      Platform,
      Text,
      View,
      Alert,
      TouchableOpacity,
      Linking
    } from "react-native";
    
    import {
      isFirstTime,
      isRolledBack,
      packageVersion,
      currentVersion,
      checkUpdate,
      downloadUpdate,
      switchVersion,
      switchVersionLater,
      markSuccess
    } from "react-native-update";
    
    import _updateConfig from "./update.json";
    const { appKey } = _updateConfig[Platform.OS];
    
    export default class App extends Component {
      componentWillMount() {
        if (isFirstTime) {
          Alert.alert(
            "提示",
            "这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本",
            [
              {
                text: "是",
                onPress: () => {
                  throw new Error("模拟启动失败,请重启应用");
                }
              },
              {
                text: "否",
                onPress: () => {
                  markSuccess();
                }
              }
            ]
          );
        } else if (isRolledBack) {
          Alert.alert("提示", "刚刚更新失败了,版本被回滚.");
        }
      }
      doUpdate = info => {
        downloadUpdate(info)
          .then(hash => {
            Alert.alert("提示", "下载完毕,是否重启应用?", [
              {
                text: "是",
                onPress: () => {
                  switchVersion(hash);
                }
              },
              { text: "否" },
              {
                text: "下次启动时",
                onPress: () => {
                  switchVersionLater(hash);
                }
              }
            ]);
          })
          .catch(err => {
            Alert.alert("提示", "更新失败.");
          });
      };
      checkUpdate = () => {
        checkUpdate(appKey)
          .then(info => {
            if (info.expired) {
              Alert.alert("提示", "您的应用版本已更新,请前往应用商店下载新的版本", [
                {
                  text: "确定",
                  onPress: () => {
                    info.downloadUrl && Linking.openURL(info.downloadUrl);
                  }
                }
              ]);
            } else if (info.upToDate) {
              Alert.alert("提示", "您的应用版本已是最新.");
            } else {
              Alert.alert(
                "提示",
                "检查到新的版本" + info.name + ",是否下载?\n" + info.description,
                [
                  {
                    text: "是",
                    onPress: () => {
                      this.doUpdate(info);
                    }
                  },
                  { text: "否" }
                ]
              );
            }
          })
          .catch(err => {
            Alert.alert(err);
            Alert.alert("提示", "更新失败.");
          });
      };
      render() {
        return (
          <View style={styles.container}>
            <Text style={styles.welcome}>欢迎使用热更新服务</Text>
            <Text style={styles.instructions}>
              这是版本是2.0 {"\n"}
              当前包版本号: {packageVersion}
              {"\n"}
              当前版本Hash: {currentVersion || "(空)"}
              {"\n"}
            </Text>
            <TouchableOpacity onPress={this.checkUpdate}>
              <Text style={styles.instructions}>点击这里检查更新</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
      },
      welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
      },
      instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5
      }
    });
    ```

### 2.打包

#### 1）Android打包APK

Android 要求所有应用都有一个数字签名才会被允许安装在用户手机上，所以在把应用发布到类似Google Play store这样的应用市场之前，你需要先生成一个签名的 **APK** 包。

- **生成一个签名秘钥**

  你可以用 `keytool` 命令生成一个私有密钥。在Windows上 keytool 命令放在JDK的bin目录中(比如C:\Program Files\Java\jdkx.x.x_x\bin )，你可能需要在命令⾏中先进入那个目录才能执行此命令。

  ```basic
  $ keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
  ```

​		这条命令会要求你输入密钥库(keystore)和对应密钥的密码，然后设置一些发行相关的信息。最后它会生成一		个叫做 my-release-key.keystore 的密钥库⽂件。

​		在运行上面这条语句之后，密钥库里应该已经⽣成了一个单独的密钥，有效期为10000天。--alias参数后面的		别名是你将来为应用签名时所需要用到的，所以记得记录这个别名。

		> 把 my-release-key.keystore 文件放到你工程中的 android/app ⽂件夹下
		>
		> 注意:请记得妥善地保管好你的密钥库文件，不要上传到版本库或者其它的地方。

- **设置gradle变量**

  一种全局设置:编辑 ~/.gradle/gradle.properties (没有这个文件你就创建一个)，添加如下的代码(注意把其中的 **** 替换为相应密码)
  **~**符号表示用户目录，比如 **windows 上可能是C:\Users\用户名，而 mac 上可能是/Users/用户名**

  

  一种局部设置:项⽬里设置:项目/android/gradle.properties

  ```basic
  MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
  MYAPP_RELEASE_KEY_ALIAS=my-key-alias
  MYAPP_RELEASE_STORE_PASSWORD=******
  MYAPP_RELEASE_KEY_PASSWORD=******
  ```

  ***\******换为你刚才输入的口令
  上面的这些会作为 gradle 的变量，在后面的步骤中可以用来给应用签名

  一旦你在 Play Store 发布了你的应用，如果想修改签名，就必须用一个不同的包名来重新发布你的应用 (这样也会丢失所有的下载数和评分)。所以请务必备份好你的密钥库和密码。

- **把签名加入到项目的gradle配置中**

  编辑你项目录下的 android/app/build.gradle ，添加如下的签名配置:

  ```basic
  android {
    
    //添加——秘钥签名
    signingConfigs {
          release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
              storeFile file(MYAPP_RELEASE_STORE_FILE)
              storePassword MYAPP_RELEASE_STORE_PASSWORD
              keyAlias MYAPP_RELEASE_KEY_ALIAS
              keyPassword MYAPP_RELEASE_KEY_PASSWORD
            } 
          }
      }
      buildTypes {
        release {
          signingConfig signingConfigs.release//添加——秘钥签名
          minifyEnabled enableProguardInReleaseBuilds
          proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
          }
      }
  }
  ```

- **生成发行APK包**

  只需在终端中运行以下命令:

  ```basic
  $ cd android
  $ ./gradlew assembleRelease
  ```

  `./gradlew assembleRelease` 在 macOS、Linux 或是 windows 的 PowerShell 环境中表示执行当前目录下的名为 `gradlew` 的脚本文件，且其运行参数为 `assembleRelease`，注意这个 ./ 不可省略；而在windows 的传统 CMD 命令⾏下则需要去掉 ./ 。

  Gradle 的 `assembleRelease` 参数会把所有用到的 JavaScript 代码都打包到一起，然后内置到 APK 包 中

  请确保 `gradle.properties` 中 没有 包含 `org.gradle.configureondemand=true `，否则会跳过 js 打包的步骤，导致最终生成的 apk 是一个无法运行的空壳。

  > ⽣成的 APK 文件位于 android/app/build/outputs/apk/release/app-release.apk ，它已经可以用来发布了。

- **测试应用的发行版本**

  在把发行版本提交到 Play Store 之前，你应该做一次最终测试。输入以下命令可以在设备上安装发行版本:

  ```basic
  react-native run-android --variant=release
  ```

  `--variant=release` 参数只能在你完成了上面的签名配置之后才可以使用。你现在可以关掉运行中的	packager了，因为你所有的代码和框架依赖已经都被打包到 apk 包中，可以离线运⾏了

  > 记得卸载之前的应用
  >
  > ```basic
  > cd android
  > ./gradlew clean
  > ```

#### 2）IOS打包ipa

### 3.发布应用

现在你的应用已经具备了了检测更新的功能，下面我们来尝试发布并更新它

注意，从update上传发布版本到发布版本正式上线期间，不要修改任何脚本和资源，这会影响update获取本地代码，从而导致版本不能更新。如果在发布之前修改了脚本或资源，请在⽹页端删除之前上传的版本并重新上传

#### 1）发布安卓应用

```basic
//pushy uploadIpa <路径> 发布ios版本的ipa⽂件
pushy uploadApk android/app/build/outputs/apk/release/app-release.apk
```

即可上传apk以供后续版本比对之用 随后你可以选择往应用市场发布这个版本，也可以先往设备上直接安装这个apk文件以进行测试

#### 2）发布新的热更新版本

你可以尝试修改一行代码(譬如将版本⼀一修改为版本二)，然后生成新的热更新版本

```basic
$ pushy bundle --platform <ios|android>
Bundling with React Native version: 0.22.2
<各种进度输出>
Bundled saved to: build/output/android.1459850548545.ppk 
Would you like to publish it?(Y/N)
```

如果想要立即发布，此时输入Y。当然，你也可以在将来使用` pushy publish --platform <ios|android> <ppkFile>` 来发布版本。

```basic
Uploading [========================================================] 100%
0.0s
Enter version name: <输⼊入版本名字，如1.0.0-rc> 
Enter description: <输⼊入版本描述>
Enter meta info: {"ok":1}
Ok.
Would you like to bind packages to this version?(Y/N)
 
```

元信息**(Meta Info)**的使⽤

在发布热更新版本时，或者在⽹页端，你可以编辑版本的元信息。 这是一段在检查更新时可以获得的字符串，你可以在其中按你所想的格式保存一些信息。

举例来说，可能某个版本包含一些重要的更新内容，所以用户会得到一个不同样式的通知。如何使用元信息，完全取决于您的想象力!



此时版本已经提交到update服务，但用户暂时看不到此更新，你需要先将特定的包版本绑定到此热更新版本上。

此时输入Y立即绑定，你也可以在将来使用 `pushy update --platform <ios|android>` 来使得对应包版本的用户更新。 除此以外，你还可以在⽹页端操作，简单的将对应的包版本拖到此版本下即可。

![热更新绑定](/Users/qiaoxu/Desktop/myBlog/pic/update.png)

版本绑定完毕后，客户端就应当可以检查到更新并进行更新了。 就理论⽽言，热更新操作到此结束，但是实际使用过程中，5000个⽤户⼤概会有100个丢掉的可能性。

不是特别的准，也存在少量⽤户回滚版本的行为。听说公司其他部门的团队做的app用的是codePush目前Pushy热更新服务完全免费，但限制每个账号不超过3个应用;每个应⽤不超过10个活跃的包和100个活跃的热更新版本;每个应用每个月不超过10000次下载。iOS和Android版本记做不同的应用



















