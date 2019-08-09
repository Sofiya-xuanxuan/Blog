# Flutter认知与入门

### 1.Flutter简介

- **什么是Flutter**

  Flutter是谷歌的移动UI框架，可以快速在iOS和Android上构建高质量的原⽣用户界面。 Flutter可以与现有的代码一起工作。在全世界，Flutter正在被越来越多的开发者和组织使用，并且Flutter是完全免费、开源的。

- **里程碑节点**

  -  2014.10 - Flutter的前身Sky在GitHub上开源

  -  2015.10 - 经过一年的开源，Sky正式改名为Flutter

  ​	Flutter第一次亮相于2015年年5⽉月Dart开发者峰会上，初始名字叫做“Sky”，后更名为Flutter，		

  ​	Flutter使用Dart语言开发，Dart是Google于2011年年推出的新的计算机编程语言。

  - 2017.5 - Google I/O正式向外界公布了Flutter，这个时候Flutter才正式进去大家的视􏰀野

  - 2018年2月，Flutter推出了了第一个Beta版本

  - 在2018年12月5日，Flutter1.0版本发布

  - 2018.6.21 - Google发布Flutter首个release预览版

  - 2019.2 - Flutter1.2发布主要增加对web的⽀支持

  - 2019.5.7 - Flutter 也发布了 1.5 版。此版本的最⼤更新是新加入对 Web 端的支持，即 Flutter for Web。(2019.05.10 Hummingbird 项⽬已改名为 Flutter for Web，将 Flutter 的 Dart 代码直接编 译为 JavaScript，在底层使用 HTML/CSS/Canvas 等实现了一个新的引擎，使得 Flutter 项目可以输出为Web 应用，案例:https://flutter.github.io/samples/)

    > Flutter 桌面端也在开发中，虽然还不适用于生产环境，但底层引擎已基本成型，有待进一步整合
    >
    > Flutter 也可以嵌入智能设备，通过构建自定义的 Flutter Engine 4，Flutter 应用可以运行在智能 显示屏等现代智能设备中，Google ⾃己的硬件产品 Google Home Hub 等就是通过这种方式使用Flutter

    

### 2.热门问答

- **Flutter和React-Native有什么不同**

  - 多平台支持

    RN目前支持iOS和Android两个平台flutter早期支持iOS和Android，desktop的支持目前尚不完善。近期的更新支持了web,Embedded

    从多平台支持的角度看，两边差距挺大，但目前都是不怎么可用状态。

  - 工具链

    RN在打包发布⽅面有被前端广泛使用的webpack支持，官方自⼰己提供了基于浏览器的debug⼯具，与前端同学管⽤的调试方式并⽆二致。

    flutter基于iOS和Android已有的打包工具添加了flutter产物打包功能，同样debug工具也由官方⾃己提供，除了刚发布的基于浏览器的调试工具外，flutter团队提供的调试工具可以直接在Android Studio或者VScode这类IDE上直接使用。

  - 热更新

    RN支持且有多套热更新方案
    Flutter目前还没有，不过code push方案正在研发当中，相信不久以后就会出来

  - 调试便利性

    JS的调试方式已经很成熟了了，这里不多做展开。flutter在debug阶段可以使用集成于IDE插件中的hot reload功能做到亚秒级的新代码加载速度，

    十分适合与设计师坐在一起结(ya)对(li)编(tiao)程(shi) :)

  - 第三方库

    在RN上你可以使用JS的大部分库，平台相关的plugin也相对丰富。

    flutter在这⽅面稍显欠缺，库的数量上无法与JS生态相比较。flutter/plugins项目提供了大量的平台相关插件供开发者使用，倒也是满⾜了日常开发的需求，另外dart pubs上的公开库数量也日趋上升。

    在混合开发和大型app业务框架上，闲鱼技术开源的flutter_boost提供了与native混合开发的可能，而fish_redux使得大型app中的复杂⻚面的开发在flutter中变得更加容易。

  - 发展趋势

    RN是个很好的项目，在发布之初给移动开发带来了一阵旋风。但不得不说，Airbnb宣布放弃使用RN技术栈对于整个社区有不⼩小的打击，18年下半年也对外官宣了准备大的改革。

    flutter在1.0发布之后趋于成熟，被钦定为Google Fuchsia系统的应用层框架。从团队2019 roadmap中可以看到，flutter当前􏰁点在于完善一些现有功能上的细节与bugfix，另外对于广受期待的动态化特性，flutter团队也在开发code push功能。从flutter团队目前的方向和笔者在闲鱼开发中实际使用的flutter的感受来看，整体上flutter在框架层面目前已经基本上稳定。

- **Flutter用什么语言开发**

  我们研究了很多语言和运行时，最终采用了Dart作为开发框架和widget的语言。底层图形框架和Dart虚

  拟机在C /C++中实现。

- **学习flutter需要哪些必备知识**

  - Dart语言基础
  - Flutter对熟悉面向对象概念(类、方法、变量等)和命令式编程概念(循环、条件等)的程序员来说是很容易⼊门的。学习和使用Flutter，无需事先具有移动开发经验。 我们已经看到了一些不怎 么有编程经验的人学习并使用Flutter进行原型设计和应用程序开发。
  - Java和android相关开发经验(⾮必须，有的话更好)

- **我在哪里可以获得Flutter学习资源**

  - [Flutter中⽂⽹](https://flutterchina.club/)
  - 掘金社区:https://juejin.im/tag/Flutter
  - stackoverflow:https://stackoverflow.com/questions/tagged/flutter
  - Flutter Codelabs: https://codelabs.flutter-io.cn/codelabs/#codelabs
  - 案例学习:在安卓FlutterSDK的目录里，就有Flutter官方准备的精美案例，可以打开观看源码学习 
  - 云社区:https://cloud.tencent.com/developer/column/6114

- **Dart语言好学吗？**

  如果你有编程经验，尤其是了解Java或Javascript, 那么你会发现Dart学习起来⾮常容易

- **我在哪里可以获得Dart学习资源**

  - Dart官网:https://www.dartlang.org/Dart
  - 中文官网:http://dart.goodev.org/
  - [Flutter中⽂⽹](https://flutterchina.club/)
  - 掘⾦社区Dart专栏:https://juejin.im/search?query=Dart&type=all
  - 优质博客:https://juejin.im/post/5c44727df265da611c274087
  - 新闻资讯:https://www.dart-china.org/

### 3.Flutter特点

- 快速开发

  由于Flutter选用了Dart作为其开发语言，Dart既可以是AOT(Ahead Of Time)编译，也可以是JIT(Just In Time)编译，其JIT编译的特性使Flutter在开发阶段可以达到亚秒级有状态热􏰁载，从⽽⼤大提升了开发效率。

- 性能优越

  使⽤自带的高性能渲染引擎(Skia)进行自绘，渲染速度和用户体验堪比原生。

- 富有表现力的精美UI

  Flutter内置众多精美的**Material Design**和**Cupertino**(iOS风格)小部件，开发者可快速构建精美的用户界面，以提供更好的用户体验。

- Everything is Widget

  在Flutter中用Widget来描述界面，Widget只是View的“配置信息”，编写的时候利用Dart语言一些声明式特性来得到类似结构化标记语言的可读性。Widget根据布局形成一个层次结构。每个widget嵌入其 中，并继承其父项的属性。没有单独的“应用程序”对象，相反，根widget扮演着这个⻆色。在Flutter中，一切皆为Widget，甚至包括css样式。

### 4.Flutter框架

- **Flutter系统架构图**

  ![flutter](/Users/qiaoxu/Desktop/myBlog/pic/flutter.png)

  如上图所示为Flutter官方给出的系统架构图，可以看出Flutter框架分为三层:Framework层、Engine层和Embedder层。

- **Framework层**

  由Dart来实现，包含众多安卓Material风格和iOS Cupertino风格的Widgets小部件，还有渲染、动画、绘图和手势等。Framework包含日常开发所需要的⼤量API，普通应⽤开发熟悉这些API的使⽤基本OK了，不过很多特殊场景的控件需要⾃己根据实际情况进⾏自定义。Framework层的源码地址:https://github.com/flutter/flutter/tree/master/packages/flutter/lib

- **Engine层**

  由C/C++实现，是Flutter的核心引擎，主要包括Skia图形引擎、Dart运行时环境Dart VM、Text⽂本渲染引擎等;如果想深⼊了解Flutter原理，建议阅读该层的源代码。源代码地址:https://github.com/flutter/engine

- **Embedder层**

  主要处理一些平台相关的操作，如渲染Surface设置、本地插件、打包、线程设置等。

### 5.Flutter原理

⽆论是iOS还是安卓都是提供一个平台的View给Flutter层，⻚面内容渲染交由Flutter层自身来完成，所以其相对React Native等框架性能更好。Flutter中图形渲染流程:

![flutter原理](/Users/qiaoxu/Desktop/myBlog/pic/flutter_theory.png)

大致流程如下:

	1. GPU的Vsync信号同步到UI线程
 	2. UI线程使用Dart来构建抽象的视图结构
 	3. 视图结构在GPU线程中进行图层合成

4. 合成后的视图数据提供给Skia图形引擎处理成GPU数据
5. 数据再通过OpenGL或Vulkan提供给GPU进行渲染

### 6.Flutter开发环境搭建

- **修改环境变量**

  ```bash
  #进入
  sudo vi ~/.bash_profile
  
  #添加
  export PUB_HOSTED_URL=https://pub.flutter-io.cn
  export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
  
  #退出
  esc
  
  #保存
  :wq
  
  #让环境变量立即执行
  source ~/.bash_profile
  ```

  

  

### 7.Flutter创建应用

### 8.Widget