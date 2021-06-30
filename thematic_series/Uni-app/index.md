# uni-app搭建全流程

## 1.为什么要多端开发

- **代码组织**

  每个页面都是.js  .wxss .wxml .json四个部分构成

  ![code](https://i.loli.net/2019/12/23/rFGh8LsSOKzZxmv.png)

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

## 2.为什么选择uni-app

1. 采用vue语法+微信小程序api，无额外学习成本。
2. 支持多端——一次性到位，万一之后要支持别的平台，不需要二次开发
3. 开发者/案例数量更多（数百万应用、uni统计月活12亿、70+微信/qq群、更高的百度指数）——我们老东家就是用uni-app做的一款电商平台，现在运行良好，也咨询过一部分人，uni-app需要解决的坑是否可接受，得到的答复是uni-app中的坑基本也是原生小程序的坑，所以是可接受的。
4. 周边生态丰富
5. 私心上，使用uni-app项目的搭建，基本与后台管理系统一致，希望开发方式还是不跳脱出目前已验证完善的这套流程，这样在目前的这套架构上技术会越来越精，可以随手搭建出一套完善的系统。
6. 多端开发框架做比对
   - webpy和mpvue，但是基本都是单纯的开发微信小程序，没有H5和移动端的支持
   - Taro是基于react语法的，上手成本比较高
   - chameleon 的规划比较宏大，但是起步比较晚，未来可能会大有作为，但是目前咱们不敢冒险选择。

![多端开发框架比对](https://i.loli.net/2020/01/02/XMPbV7rdixAoJcq.jpg)

>  https://blog.csdn.net/z4909801/article/details/88943851

## 3.项目

### 1.搭建

```js
vue create -p dcloudio/uni-preset-vue 项目名称
```

### 2.eslint配置

- 安装依赖

  ```js
  npm i eslint babel-eslint eslint-plugin-vue @vue/eslint-config-prettier eslint-plugin-prettier eslint-plugin-html -D
  // or
  yarn add eslint babel-eslint eslint-plugin-vue @vue/eslint-config-prettier eslint-plugin-prettier eslint-plugin-html -D
  ```

- .eslintrc.js

  ```js
  module.exports = {
    root: true,
    parserOptions: {
      parser: "babel-eslint",
      sourceType: "module"
    },
    env: {
      browser: true,
      node: true,
      es6: true
    },
    extends: ["plugin:vue/recommended", "eslint:recommended"],
  
    // add your custom rules here
    //it is base on https://github.com/vuejs/eslint-config-vue
    rules: {
      "no-console": "off",
      "no-debugger": "off",
      semi: ["error", "never"], // 强制分号
      indent: ["error", 2], // 2个空格
      camelcase: 0, // 不强制_形式，或者驼峰
      "vue/html-indent": ["error", 2], // vue中2个空格
      "vue/require-default-prop": "off", // prop的值设置默认值（后期关闭该规则）
      "vue/require-prop-type-constructor": "off", // 关闭prop强制类型设置（后期关闭该规则）
      "vue/require-prop-types": "off", // 关闭prop强制类型设置（后期关闭该规则）
      "vue/prop-name-casing": "off", // prop的属性名可以为驼峰，也可以_表示
      "vue/max-attributes-per-line": "off"
    }
  };
  
  ```

- .eslintignore

  ```js
  build/*.js
  src/assets
  public
  dist
  ```

- editorconfig

  ```js
  {
  	// 保存后自动修复格式
  	"editor.codeActionsOnSave": {
  		"source.fixAll.eslint": true
  	},
  	//eslint
  	"editor.formatOnType": true,
  	"eslint.options": {
  		//指定eslint配置文件位置
  		"extensions": [".js", ".vue"],
  		"configFile": ".eslintrc.js" //指定项目根目录中的eslint配置文件
  	},
  	// vscode默认启用了根据文件类型自动设置tabsize的选项
  	"editor.detectIndentation": false,
  	// 重新设定tabsize
  	"editor.tabSize": 2,
  	// #值设置为true时，每次保存的时候自动格式化；值设置为false时，代码格式化请按shift+alt+F
  	"editor.formatOnSave": true,
  	// 添加 vue 支持
  	"eslint.validate": [
  		//开启对.vue文件中错误的检查
  		"javascript",
  		"javascriptreact",
  		"vue",
  		"html"
  	],
  	"prettier.semi": false, //去掉代码结尾的分号
  	"prettier.singleQuote": true, //使用带引号替代双引号
  	//  #让prettier使用eslint的代码格式进行校验
  	"prettier.eslintIntegration": true,
  	"prettier.tabWidth": 2,
  	//  #让函数(名)和后面的括号之间加个空格
  	"javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  	// #这个按用户自身习惯选择
  	// 选择 vue 文件中 template 的格式化工具
  	"vetur.format.defaultFormatter.html": "js-beautify-html",
  	// vetur 的自定义设置
  	"vetur.format.defaultFormatterOptions": {
  		"js-beautify-html": {
  			// #vue组件中html代码格式化样式
  			"wrap_attributes": "auto", //也可以设置为“force-aligned”，效果会不一样
  			"wrap_line_length": 160,
  			"end_with_newline": false,
  			"semi": false,
  			"singleQuote": true
  		},
  		"prettier": {
  			"semi": false, // 格式化不加分号
  			"singleQuote": true // 格式化以单引号为主
  		}
  	},
  	"vetur.format.defaultFormatter.js": "vscode-typescript",
  	"[jsonc]": {
  		"editor.defaultFormatter": "esbenp.prettier-vscode"
  	},
  	"prettier.useTabs": true,
  	"files.autoSave": "off",
  	"explorer.confirmDelete": false,
  	"[json]": {
  		"editor.defaultFormatter": "esbenp.prettier-vscode"
  	},
  	"diffEditor.ignoreTrimWhitespace": false,
  	"[vue]": {
  		"editor.defaultFormatter": "octref.vetur"
    },
    "[javascript]": {
      "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
    },
    "[scss]": {
      "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
    },
    "liveServer.settings.donotShowInfoMsg": true,
    "[html]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "security.workspace.trust.untrustedFiles": "newWindow",
    "[css]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "eslint.codeAction.showDocumentation": {
    
      "enable": true
    } // 两个选择器中是否换行
  }
  ```



> http://weixisheng.github.io/uni/eslint.html#%E9%85%8D%E7%BD%AE

### 3.svg组件封装

与后台管理系统一致，目前支持2种方式，可以将svg放到本地`icons/svg`下，也可以将svg上传到阿里巴巴图标库平台上，下载`symbol`格式，将iconfont.js放到icons文件下即可，使用方式如下：

```js
<svg-icon icon-class="example" />
```

### 4.css单位翻算

**设计稿 1px / 设计稿基准宽度 = 框架样式 1upx / 750upx**

> `uni-app` 使用 upx 作为默认尺寸单位， upx 是相对于基准宽度的单位，可以根据屏幕宽度进行自适应。`uni-app` 规定屏幕基准宽度**750upx。**

- 设计稿750px，设计稿上1px尺寸，直接写1upx即可，1px=1upx
- 设计稿是375px，设计稿上1px尺寸，翻算是2upx，1px=2upx

### 5.登录

1. 手机号、验证码登录

   > uni.login用于拿code
   >
   > uni.getUserProfile：用于拿encryptedData、iv等数据
   >
   > 最终调取登录接口，将以上信息传给接口

2. 微信授权登录

   > uni.login用于拿code，checkLogin接口用于确认用户是否授权过，未授权则走此流程
   >
   > open-type="getPhoneNumber"   拿到encryptedData、iv等数据
   >
   > 最终调取getPhone接口，将以上信息传给接口

3. 一键登录

   > uni.login用于拿code，checkLogin接口用于确认用户是否授权过，授权过则走此流程-一键登录
   >
   > 直接跳到相关页面



### 6.条件编译

| 值                      | 平台                                                         |
| ----------------------- | ------------------------------------------------------------ |
| APP-PLUS                | App                                                          |
| APP-PLUS-NVUE或APP-NVUE | App nvue                                                     |
| H5                      | H5                                                           |
| MP-WEIXIN               | 微信小程序                                                   |
| MP-ALIPAY               | 支付宝小程序                                                 |
| MP-BAIDU                | 百度小程序                                                   |
| MP-TOUTIAO              | 字节跳动小程序                                               |
| MP-QQ                   | QQ小程序                                                     |
| MP-360                  | 360小程序                                                    |
| MP                      | 微信小程序/支付宝小程序/百度小程序/字节跳动小程序/QQ小程序/360小程序 |
| QUICKAPP-WEBVIEW        | 快应用通用(包含联盟、华为)                                   |
| QUICKAPP-WEBVIEW-UNION  | 快应用联盟                                                   |
| QUICKAPP-WEBVIEW-HUAWEI | 快应用华为                                                   |

```js
// 仅出现在 App 平台下的代码
#ifdef APP-PLUS
需条件编译的代码
#endif

// 除了 H5 平台，其它平台均存在的代码
#ifndef H5
需条件编译的代码
#endif

// 在 H5 平台或微信小程序平台存在的代码（这里只有||，不可能出现&&，因为没有交集）
#ifdef H5 || MP-WEIXIN
需条件编译的代码
#endif
```

### 7.其他

- uniApp 不支持 v-on="$listeners"

- uniApp 不支持 v-bind="$attrs"

- "node-sass": "^4.14.1",

- "sass-loader": "^7.3.1",

- 微信小程序不支持svg：svg-sprite-loader不可以，直接引入iconfont.js也不可以。解决方式如下：

  ```
  <image src="/static/svg/coupon-empty.svg" class="coupon-empty" mode="widthFix"></image>
  ```

  > 注意：图片只能放到static下，不然会不显示

- 以unicode或者font-class形式引入字体图标，引入相应的css文件即可
- 不支持操作dom，this.$ref这种形式拿到dom元素是可以的







