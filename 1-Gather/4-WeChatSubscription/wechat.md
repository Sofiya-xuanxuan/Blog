# 微信公众号

## 一、服务器端接口开发

### 1. 课前准备

> 提示：本小结是提前需要让学生做的课前准备，比如环境安装部署、工具安装、插件安装等需要学生提前做的都放这。

- 注册微信订阅号

- 注册小程序测试号

- sunny-ngrok工具安装及注册账号

  内网穿透

- 模拟公网IP端口

  - 申请一台阿里云ECS
  - 公司网络有一个公网IP路由器端口映射3000——>22212  NAT
  - ngrok内网穿透  tunnel（把内网的某个网址映射到公网上去）

### 2. 开发环境搭建

- 注册微信订阅号

- 开发者工具——公众平台测试账号

  ![wechat](/Users/qiaoxu/Desktop/pic/wechat.png)

- 安装sunny-ngrok实现外网映射

  https://www.ngrok.cc/user.html

  - 开通隧道

    ![wechat](/Users/qiaoxu/Desktop/pic/ngrok.png)

  - 下载ngrok

  - 启动映射服务

    ```bash
    ./sunny clientid 5723cea337da323d
    ```

  - 映射成功后

    ![ngrok-success](/Users/qiaoxu/Desktop/pic/ngrok-success.png)

### 3.客服消息-你问我答

- conf.js

  ```bash
  module.exports={
      appid:'wx48d1feb0c7dda3f4',
      appsecret:'6c69042c06e43568b9c742a9b499e44f',
      token:'sofiya'
  }
  ```

- Index.js

  ```bash
  const Koa=require('koa')
  const Router=require('koa-router')
  const static=require('koa-static')
  const bodyparser=require('koa-bodyparser')
  const app=new Koa()
  app.use(bodyparser())
  const router=new Router()
  app.use(static(__dirname+'/'))
  
  const conf=require('./conf')
  const wechat=require('co-wechat')
  router.all('/wechat',wechat(conf).middleware(
      async message=>{
          console.log('wechat',message)
          return 'hello wechat'+message.Content
      }
  ))
  
  // 启动路由
  app.use(router.routes())
  app.use(router.allowedMethods)
  app.listen(3000)
  ```

### 4. 消息接口源码讲解

- source.js——我们验证微信

  ```bash
  const Koa = require('koa')
  const Router = require('koa-router')
  const static = require('koa-static')
  const xml2js = require('xml2js')
  const app = new Koa()
  const url = require('url')
  const conf = require('./conf')
  
  
  //用于加密
  const crypto = require('crypto')
  const xmlParser = require('koa-xml-body')
  app.use(xmlParser())
  
  const router = new Router()
  app.use(static(__dirname + '/'))
  
  //验证微信
  router.get('/wechat', ctx => {
      console.log('微信认证', ctx.url);
      const { query } = url.parse(ctx.url, true)
      const {
          signature,//微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数
          timestamp,//时间戳
          nonce,//随机数
          echostr//随机字符串
      } = query
  
      console.log('wechat', query);
      //将token、timestamp、nonce那个参数进行字典排序并用sha1加密
      let str = [conf.token, timestamp, nonce].sort().join('')
  
      let strSha1 = crypto.createHash('sha1').update(str).digest('hex')
  
  
      console.log(`自己加密后的字符串为：${strSha1}`);
      console.log(`微信传入的加密字符串为：${signature}`);
      console.log(`两者比较结果为：${signature == strSha1}`);
  
      //签名对比，相同则按照微信要求返回echostr
      if (signature === strSha1) {
          ctx.body = echostr
      } else {
          ctx.body = '你不是微信'
      }
  })
  
  //接受消息
  router.post('/wechat', ctx => {
      const { xml: msg } = ctx.request.body
      console.log('receive', msg)
      const builder = new xml2js.Builder()
      const result = builder.buildObject({
          xml: {
              ToUserName: msg.FromUserName,
              FromUserName: msg.ToUserName,
              CreateTime: Date.now(),
              MsgType: msg.MsgType,
              Content: 'hello' + msg.Content
          }
      })
      ctx.body = result
  })
  
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.listen(3000)
  ```

  > 验证部分：
  >
  > crypto类：https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/ 
  >
  > 001434501504929883d11d84a1541c6907eefd792c0da51000 
  >
  > crypto模块的目的是为了提供通用的加密和哈希算法。用纯JavaScript代码实现这些功能不是不可能，
  > 但速度会非常慢。Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，这样用
  > 起来方便，运行速度也快。
  >
  > 
  >
  > 验证过程：
  >
  > ![signature](/Users/qiaoxu/Desktop/pic/signature.png)
  >
  > SHA1算法——类似MD5 SHA256
  >
  > 安全哈希算法(Secure Hash Algorithm)主要适用于数字签名标准 (Digital Signature Standard DSS)里面定义的数字签名算法(Digital Signature Algorithm DSA)。对于长度小于2^64位的消息， SHA1会产生一个160位的消息摘要。当接收到消息的时候，这个消息摘要可以用来验证数据的完整性。 在传输的过程中，数据很可能会发生变化，那么这时候就会产生不同的消息摘要。 SHA1有如下特性: 不可以从消息摘要中复原信息;两个不同的消息不会产生同样的消息摘要,(但会有1x10 ^ 48分之一的机 率出现相同的消息摘要,一般使用时忽略)。 
  >
  > 哈希: 不可变长 -> 摘要固定长度 

### 5. 调用服务器接口

- **获取Access_token**

  https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140183

  ```bash
  # index.html
  // 获取关注着列表
  getTokens: async function () {
      let res = await axios.get(`/getTokens`)
      console.log('res',res)
  }
  
  # index.js
  const axios = require('axios')
  //获取Access_token
  const tokencache = {
      access_token: '',
      updateTime: Date.now(),
      expires_in: 7200
  }
  
  router.get('/getTokens', async ctx => {
      const wxDomain = `https://api.weixin.qq.com`
      const paths = `/cgi-bin/token`
      const param = `?grant_type=client_credential&appid=${conf.appid}&secret=${conf.appsecret}`
  
      const url = wxDomain + paths + param
      const res = await axios.get(url)
      Object.assign(tokencache, res.data, {
          updateTime: Date.now()
      })
      ctx.body = res.data
  })
  ```

- **获取用户列表**

  ```bash
  # html
  async getFollowers(){
    const res = await axios.get('/getFollowers')
    console.log('res',res)
  }
  # index.js
  router.get('/getFollowers',async ctx=>{
      console.log(9999);
      
      console.log(tokencache.access_token);
      
      const url=`https://api.weixin.qq.com/cgi-bin/user/get?access_token=${tokencache.access_token}`
      console.log(url);
      
      const res=await axios.get(url)
      console.log('getFollowers',res);
      ctx.body=res.data
  })
  ```

- **co-wechat-api实现获取关注者列表**

  ```bash
  # 实际工作中通过库来实现,不需要手动去获取Access_token了
  const wechatAPI=require('co-wechat-api')
  const api=new wechatAPI(conf.appid,conf.appsecret)
  
  # 获取关注者列表
  router.get('/getFollowers',async ctx=>{
      const res=await api.getFollowers()
      res=await api.batchGetUsers(res.data.openid,'zh_CN')
      ctx.body=res
  })
  ```

### 7. 全局票据的管理

多进程下保存token全局票据

```bash
# mongoose.js
const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect('mongodb://localhost:27017/weixin', {
    useNewUrlParser: true
}, () => {
    console.log('Mongodb connected');
})

exports.ServerToken = mongoose.model('ServerToken', {
    accessToken: String
})
# index.js
const { ServerToken } = require('./mongoose')
//实际工作中通过库来实现,不需要手动去获取Access_token了
const wechatAPI = require('co-wechat-api')
const api = new wechatAPI(
    conf.appid,
    conf.appsecret,
    //取token
    async () => await ServerToken.findOne(),
    //存token
    async token => await ServerToken.updateOne({}, token, { upsert: true })
)
```

## 二、网页端接口开发

### 1. 网页授权接口

> 官方资料 https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842
> npm库 https://github.com/node-webot/wechat-oauth
> 阮一峰的OAuth2 http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html

- **网页授权2个地方需要配置**

![oauth1](/Users/qiaoxu/Desktop/pic/oauth1.png)

![oauth2](/Users/qiaoxu/Desktop/pic/oauth2.jpeg)

> 注意：只填写域名，不要加http或者https

- **网页授权过程**

![wechat-oauth-process](/Users/qiaoxu/Desktop/pic/wechat-oauth.png)

- **认证请求——生成用户URL**

```bash
# index.html
<cube-button @click='auth'>微信登录</cube-button>

methods: {
	 async auth(){
   		window.location.href='/wxAuthorize'
   }              
}

# index.js
//初始化Oauth
const OAuth = require('co-wechat-oauth')
const oauth = new OAuth(conf.appid, conf.appsecret)
//用户认证请求
router.get('/wxAuthorize', async (ctx, next) => {
    const state = ctx.query.id
    console.log('ctx....' + ctx.href);
    //重定向到微信认证页面

    //目标地址
    redirectUrl = ctx.href
    redirectUrl = redirectUrl.replace('wxAuthorize', 'wxCallback')
    const scope = 'snsapi_userinfo'

    console.log('redirectUrl.....',redirectUrl);
    
    const url = oauth.getAuthorizeURL(redirectUrl, state, scope)
    console.log('url....',url);

    ctx.redirect(url)

})
```

- **第三方认证——获取用户回调AccessToken与openid**

```bash
# index.js
//获取用户回调AccessToken与openid
router.get('/wxCallback', async (ctx, next) => {
    console.log(99999);
    
    //授权码
    const code = ctx.query.code
    console.log('callback...', code);
    const token = await oauth.getAccessToken(code)
    const accessToken = token.data.access_token
    const openid = token.data.openid
    console.log('accessToken', accessToken);
    console.log('openid', openid);

    //刷新页面
    ctx.redirect('/?openid=' + openid)
})
```

- **获取用户信息**

```bash
# index.html
<cube-button @click='getUser'>获取用户信息</cube-button>
methods: {
  async getUser(){
    const qs=Qs.parse(window.location.search.substr(1))
    const openid=qs.openid
    const res=await axios.get('/getUser',{
    	params:{openid}
    })
    console.log(res.data); 
  }
},

# index.js
//获取用户信息
router.get('/getUser',async (ctx,next)=>{
    const openid=ctx.query.openid
    const userinfo=await oauth.getUser(openid)
    ctx.body=userinfo
})
```

- **AccessToken缓存问题——设置到全局**

```bash
# mongoose.js
const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect('mongodb://localhost:27017/weixin', {
    useNewUrlParser: true
}, () => {
    console.log('Mongodb connected');
})

exports.ServerToken = mongoose.model('ServerToken', {
    accessToken: String
})

//ClientAccessToken

schema=new Schema({
    access_token:String,
    expires_in:Number,
    refresh_token:String,
    openid:String,
    scope:String,
    create_at:String
})

//自定义getToken方法 
schema.statics.getToken=async function(openid) {
    return await this.findOne({
        openid:openid
    })
}
//自定义setToken方法 
schema.statics.setToken=async function(openid,token){
    //有则更新，无则添加
    const query={
        openid:openid
    }
    const options={
        upsert:true
    }

    return await this.updateOne(query,token,options)
}

exports.ClientToken=mongoose.model('ClientToken',schema)

# index.js
const { ServerToken, ClientToken } = require('./mongoose')

const OAuth = require('co-wechat-oauth')
const oauth = new OAuth(
    conf.appid,
    conf.appsecret,
    // 取token
    async function(openid) {return await ClientToken.getToken(openid)},
    // 存token
    async function(openid, token) {return await ClientToken.setToken(openid, token)} 
)
```

### 2. 微信JSSDK

> 官方资料:https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
> npm库: https://github.com/node-webot/co-wechat-api
>
> 是开发者在网页上通过JavaScript代码使用微信原生功能的工具包，开发者可以使用它在网页上录制和播放微信语音、监听微信分享、上传手机本地图片、拍照等许多功能
>
> - 运行于微信内置浏览器的网页
> - 调用微信原生应用如：拍照、语音、扫一扫
> - 分享功能 查到的数据不同
> - 图像接口
> - 音频接口

```bash
# index.html
<cube-button @click='getJsConfig'>getJSConfig</cube-button>
async getJsConfig(){
  console.log('wx',wx);

  const res=await axios.get('/getJsConfig',{
    params:{
    	url:window.location.href
    }
  })
  //按需加载
  res.data.jsApiList=[]
  wx.config(res.data)

  //网络连接
  wx.getNetworkType({
    success:function(res){
    	//返回网络类型：2g、3g、4g、WiFi
      const networkType=res.networkType
      console.log('getNetworkType....',networkType);
    }
  })
}

# index.js
const wechatAPI = require('co-wechat-api')
const api = new wechatAPI(
    conf.appid,
    conf.appsecret,
    //取token
    async () => await ServerToken.findOne(),
    //存token
    async token => await ServerToken.updateOne({}, token, { upsert: true })
)
router.get('/getJsConfig',async ctx=>{
    const res=await api.getJsConfig(ctx.query)
    ctx.body=res
})
```

- **案例**

**1.快速进行调试**

因为直接npm run dev的话，网页的内容比较大，那ngrok穿透是不支持这么大的，所以重新执行了watch命令，直接去读取打包后的dist中的文件，这样会小很多

**2.认证怎么做**

**3.鉴权怎么做**

unless

**4.分享功能**

**5.ngrok加私服**







vi：https://www.jianshu.com/p/9f8f3b343aec



node调用动态链接库