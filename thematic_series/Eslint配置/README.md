

`eslint --init`

命令即可快速生成默认的`.eslintrc.js`文件

npm i eslint -g





## husky

本地进行`git commit`的时候，如果能在本地执行`git commit`操作时能够触发对代码检查就是最好的一种方式。这里就需要使用的`git hook`。

git的hook可以理解成当执行如git add、git commit等git操作时的回调，可以查看.git文件下的hooks目录，这里存放的是git相关操作的一些脚本例子。通过git hook就可以在本地进行commit的时候触发代码扫描来确保本地代码的质量。
固然直接使用git hooks也是可以的，但是.git文件是上传不到远程仓库中的，完全是靠本地的git hooks。可能拉取代码时就会变出现遗漏等，而使用husky就可以保证在安装依赖时进行git hooks的生成。

1. **安装**

   `npm install husky -D`

2. **配置scripts**

   ```javascript
   npm set-script prepare "husky install"
   npm run prepare // 执行这句的目的是npx husky install——用于生成.husky文件
   
   "scripts": {
     "prepare": "husky install"
   },
   ```

3. **生成pre-commit文件**

   ```javascript
   // 用于生成pre-commit文件
   npx husky add .husky/pre-commit "npx lint-staged"
   git add .husky/pre-commit
   ```

> 参考：
>
> [为什么 husky 放弃了传统的 JS 配置](https://blog.typicode.com/husky-git-hooks-javascript-config/)
>
> [新旧版本配置的不同方式](https://zhuanlan.zhihu.com/p/366786798)



## lint-staged

`git add`把代码提交到暂存区，而`lint-staged`的作用就是获取你暂存区的代码进行eslint检查。

1. **安装**

   ``npm install lint-staged -D``

2. **配置package.json**

```js
// package.json
"lint-staged": {
  "src/**/*.{js,vue}": [
    "eslint --fix",
  ]
}
```

## commitlint

1. **安装相关依赖**

```js
// 安装相关依赖
npm install --save-dev commitlint @commitlint/{cli,config-conventional}

// 用于生成commit-msg文件
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"' 
```

2. **创建commitlint.config.js文件——项目根目录下**

```js
// 校验 angluar commit规范信息的
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

3. **设置提交规则**

```js
<type>(<scope>): <subject> // 这一行是Header
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

 - **Header部分**

   header 分为 type、scope、subject 三部分。

   **<font color="red">type</font>**

   type指本次提交的类型，为必填项，必须为以下之一：

   - feat: 一项新功能
   - fix: 一个错误修复
   - docs: 仅文档更改
   - style: 不影响代码含义的更改（空白，格式，缺少分号等）
   - refactor: 既不修正错误也不增加功能的代码更改（重构）
   - perf: 改进性能的代码更改
   - test: 添加缺失或更正现有测试
   - build: 影响构建系统或外部依赖项的更改（gulp，npm等）
   - ci: 对CI配置文件和脚本的更改
   - chore: 更改构建过程或辅助工具和库，例如文档生成

   **<font color="red">scope</font>**

   scope指本次提交的影响范围，为可选项，可以是指定提交更改位置的任何内容。我一般都写更改部分的模块名或者文件名。

   当更改影响的范围不止一个范围时，可以使用星号(*)。当然也可以不填写。

​	   **<font color="red">subject</font>**

​		subject指本次提交的简要描述，它有如下两个规则。

​		-  第一个字母不要大写

​		-  末尾没有点



- **Footer部分**

  分为2个部分：是否产生了破坏性修改、关闭Issue

  ```js
  BREAKING CHANGE: 变动的描述\理由\迁移方法
  ```

  ```js
  Close #ISSUE_ID
  Closes #ISSUE_ID, #ISSUE_ID
  ```

- **最终提交结果如下：**




![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2bdc22756824da18e5c5f18972bc6a5~tplv-k3u1fbpfcp-watermark.image)



- **自动生成提交模板-commitizen**

  ​	**<font color="red">全局安装</font>**

  ```js
  npm install -g commitizen
  
  commitizen init cz-conventional-changelog --save-dev --save-exact
  
  echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
  
  ```

  使用 `git cz` 或 `cz` 命令来提交commit信息了。

  ​	**<font color="red">项目内安装</font>**

  ```js
  npm install commitizen cz-conventional-changelog -D
  
  // package.json配置
  "scripts": {
    "commit": "cz"
  }
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
  ```

  在当前项目目录下 npm run commit 代替 git commit。









