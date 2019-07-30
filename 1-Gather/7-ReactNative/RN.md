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
>    #### `标题`
>
>    可用作 `headerTitle` 的回退的字符串。 此外, 将用作 `tabBarLabel` 的回退 (如果嵌套在 TabNavigator 中) 或 `drawerLabel` (如果嵌套在DrawerNavigator)。
>
>    #### `header`
>
>    React 元素或一个给定 `HeaderProps` 然后返回一个 React 元素的函数，将作为一个标题来显示。 设为 `null` ，则隐藏标题。
>
>    #### `headerTitle`
>
>    Header 使用的字符串，React 元素或React组件。 默认是页面的 `title` 当一个组件被使用时，它会接受 `allowFontScaling`、 `style` 和 `children` 这几个 props。 标题字符串在`children`中传递。
>
>    #### `headerTitleAllowFontScaling`
>
>    AllowFontScaling -无论标签字体是否应缩放以尊重文字大小可访问性设置， 默认值都是 true。
>
>    #### `headerBackAllowFontScaling`
>
>    Whether back button title font should scale to respect Text Size accessibility settings. Defaults to false.
>
>    #### `headerBackImage`
>
>    React 元素或组件在标题的后退按钮中显示自定义图片。 当组件被调用时，它会在渲染时收到许多 props 如：（`tintColor`，`title`）。 默认为带有 `react-navigation/views/assets/back-icon.png` 这张图片的组件，后者是平台的默认后图标图像（iOS上为向左的符号，Android上为箭头）。
>
>    #### `headerBackTitle`
>
>    Ios 上的后退按钮使用的标题字符串, 或 `null` 禁用标签。 默认为上一个场景的 `headerTitle`。 `headerBackTitle` 必须在源屏幕 (而不是目标屏幕) 中定义。 例如, 当您将 A 转换为 B, 并且要禁用 `B` 上的 `headerBackTitle`:
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
>
>   \- 具有以下属性的对象:
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
>
>   \- 具有以下属性的对象:
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

#### 5.开关导航



#### 6.导航框架设计



#### 7.离线缓存框架



## 三、redux集成

## 四、网络请求

## 五、React Native项目实战

## 六、React Native部署

## 七、Flutter认知与入门