<p align="center">
  <a href="https://tdesign.tencent.com/" target="_blank">
    <img alt="TDesign Logo" width="200" src="https://tdesign.gtimg.com/site/TDesign.png">
  </a>
</p>

<p align="center">
  <a href="https://img.shields.io/github/stars/Tencent/tdesign-miniprogram-starter-retail">
    <img src="https://img.shields.io/github/stars/Tencent/tdesign-miniprogram-starter-retail" alt="License">
  </a>  
  <a href="https://github.com/Tencent/tdesign-miniprogram-starter-retail/issues">
    <img src="https://img.shields.io/github/issues/Tencent/tdesign-miniprogram-starter-retail" alt="License">
  </a>  
  <a href="https://github.com/Tencent/tdesign-miniprogram-starter-retail/LICENSE">
    <img src="https://img.shields.io/github/license/Tencent/tdesign-miniprogram-starter-retail" alt="License">
  </a>
  <a href="https://www.npmjs.com/package/tdesign-miniprogram">
    <img src="https://img.shields.io/npm/v/tdesign-miniprogram.svg?sanitize=true" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/tdesign-miniprogram">
    <img src="https://img.shields.io/npm/dw/tdesign-miniprogram" alt="Downloads">
  </a>
</p>




### 2. 项目构成

零售行业模版小程序采用基础的 JavaScript + WXSS + ESLint 进行构建，降低了使用门槛。

项目目录结构如下：

```
|-- tdesign-miniprogram-starter
    |-- README.md
    |-- app.js
    |-- app.json
    |-- app.wxss
    |-- components	//	公共组件库
    |-- config	//	基础配置
    |-- custom-tab-bar	//	自定义 tabbar
    |-- model	//	mock 数据
  |-- pages
    |   |-- cart  //  购物车相关页面x
    |   |-- coupon  //  优惠券相关页面x
    |   |-- goods //  任务卡界面√ 
    |   |-- home  //  首页√
    |   |-- foor //  发卡界面---√
    |   |-- usercenter //  个人中心---√
    |   |-- shenhe //  审核界面---√
    |   |-- drafts  //  草稿箱界面 ---通用
    |   |-- order //  订单售后相关页面x
    |   |-- promotion-detail  //  营销活动页面x
    |-- services	//	请求接口
    |-- style	//	公共样式与iconfont
    |-- utils	//	工具库
```

### 3. 数据模拟



### 4. 添加新页面

1. 在 `pages `目录下创建对应的页面文件夹
2. 在 `app.json` 文件中的 ` "pages"` 数组中加上页面路径
3. [可选] 在 `project.config.json` 文件的 `"miniprogram-list"` 下添加页面配置

## :hammer: 构建运行

1. `npm install`
2. 小程序开发工具中引入工程
3. 构建 npm

## :art: 代码风格控制

`eslint` `prettier`

## :iphone: 基础库版本

最低基础库版本`^2.6.5`

## :dart: 反馈&合作

本开源项目是由[腾讯云Mall团队](https://ym.qq.com/)核心贡献。项目也在[github](https://github.com/Tencent/tdesign-miniprogram-starter-retail)上做了开源，有任何问题或者建议都欢迎在issue上留言反馈, 或者加入TD小程序开发者群进行反馈:star2::star2::star2:

<img src="https://cdn.qa.ym.qq.com/officical-site/assets/logo.png?auto=format&fit=max&w=384" width = "100" height = "30" alt="模版小程序页面详情" align=center />

[云Mall](https://ym.qq.com/)是基于微信小程序的电商SaaS产品，致力于提供全面、可靠的小程序商城经营服务，助力商家成功。支持标准化和定开类型商家入驻。

企业微信群
TDesign 团队会及时在企业微信大群中同步发布版本、问题修复信息，也会有一些关于组件库建设的讨论，欢迎微信或企业微信扫码入群交流：

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/TDesign%20IM.png" width = "200" height = "200" alt="模版小程序页面详情" align=center />


邮件联系：tdesign@tencent.com

## :link: TDesign 其他技术栈实现

- 移动端 小程序 实现：[mobile-miniprogram](https://github.com/Tencent/tdesign-miniprogram)
- 桌面端 Vue 2 实现：[web-vue](https://github.com/Tencent/tdesign-vue)
- 桌面端 Vue 3 实现：[web-vue-next](https://github.com/Tencent/tdesign-vue-next)
- 桌面端 React 实现：[web-react](https://github.com/Tencent/tdesign-react)

## :page_with_curl: 开源协议

TDesign 遵循 [MIT 协议](https://github.com/Tencent/tdesign-miniprogram-starter-retail/LICENSE)。
