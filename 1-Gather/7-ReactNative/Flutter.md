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
- 性能优越
- 富有表现力的精美UI
- Everything is Widget

### 4.Flutter框架

### 5.Flutter开发环境搭建

### 6.Flutter创建应用

### 7.Widget