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

- **1**

### 6.React Native布局与样式

### 7.React Native核心组件与API

## 二、React Navigation3.x

## 三、React Native项目实战

## 四、React Native部署

## 五、Flutter认知与入门