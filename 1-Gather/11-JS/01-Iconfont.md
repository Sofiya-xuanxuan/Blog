# Iconfont

> 顾名思义，IconFont 就是字体图标。严格地说，就是一种字体，但是，它们不包含字母或数字，而是包含符号和字形。您可以使用 CSS 设置样式，就像设置常规文本一样，这使得 IconFont 成为 Web 开发时图标的热门选择。

## 1. 字体格式介绍**

目前最主要的几种网络字体(web font)格式包括WOFF，SVG，EOT，OTF/TTF。

- **WOFF**

WOFF是Web Open Font Format几个词的首字母简写。这种字体格式专门用于网上，由Mozilla联合其它几大组织共同开发。WOFF字体通常比其它字体加载的要快些，因为使用了OpenType (OTF)和TrueType (TTF)字体里的存储结构和压缩算法。这种字体格式还可以加入元信息和授权信息。这种字体格式有君临天下的趋势，因为所有的现代浏览器都开始支持这种字体格式。【支持的浏览器：IE9+,Firefox3.5+,Chrome6+,Safari3.6+,Opera11.1+】

- **SVG / SVGZ**

Scalable Vector Graphics (Font). SVG是一种用矢量图格式改进的字体格式，体积上比矢量图更小，适合在手机设备上使用。【支持的浏览器：Chrome4+,Safari3.1+,Opera10.0+,iOS Mobile Safari3.2+】

- **EOT**

Embedded Open Type。这是微软创造的字体格式。这种格式只在IE6-IE8里使用。【支持的浏览器：IE4+】

- **OTF / TTF**

OpenType Font 和 TrueType Font。部分的因为这种格式容易被复制(非法的)，这才催生了WOFF字体格式。然而，OpenType有很多独特的地方，受到很多设计者的喜爱。【支持的浏览器：IE9+,Firefox3.5+,Chrome4+,Safari3+,Opera10+,iOS Mobile Safari4.2+】

## 2.使用 @font-face 引入字体格式

因为各个浏览器对字体格式的不兼容，作为前端开发人员，我们需要考虑的全面性，将各个格式的字体都引入进来，这样就不怕刁钻的用户使用哪种浏览器了。

常见兼容性写法：

```
@font-face {
  font-family: 'yourfontname';
  src: url('../fonts/singlemalta-webfont.eot');
  src: url('../fonts/singlemalta-webfont.eot?#iefix') format('embedded-opentype'),
       url('../fonts/singlemalta-webfont.woff') format('woff'),
       url('../fonts/singlemalta-webfont.ttf') format('truetype'),
       url('../fonts/singlemalta-webfont.svg#defineName') format('svg');
  font-weight: normal;
  font-style: normal;
}
12345678910
```

如果你是使用 Iconfont 下载字体到本地，那么恭喜你，打开 iconfont.css 文件，可以看到 Iconfont 已经帮助你配好了这些内容，你只需要在页面中引入 iconfont.css 即可直接使用。

## **3.我们谈谈这三种方式的优缺点吧**

**unicode：**

**优点：**

- 兼容性最好，支持ie6+
- 支持按字体的方式去动态调整图标大小，颜色等等

**缺点：**

- 不支持多色图标
- 在不同的设备浏览器字体的渲染会略有差别，在不同的浏览器或系统中对文字的渲染不同，其显示的位置和大小可能会受到font-size、line-height、word-spacing等CSS属性的影响，而且这种影响调整起来较为困难
- 不直观，看unicode码很难分辨什么图标

**fontclass：**

- 兼容性良好，支持ie8+
- 相比于unicode语意明确，书写更直观。可以很容易分辨这个icon是什么。

**symbol：**

- 支持多色图标了，不再受单色限制。
- 支持像字体那样通过font-size,color来调整样式。
- 支持 ie9+
- 可利用CSS实现动画。
- 减少HTTP请求。
- 矢量，缩放不失真
- 可以很精细的控制SVG图标的每一部分

综上所述的一些特点，个人比较推荐使用symbol或者fontclass的方式