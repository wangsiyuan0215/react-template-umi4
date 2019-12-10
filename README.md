# Template for React

## 环境

* 运行环境：依赖于 node.js 和 npm；
* 开发语言：JavaScript 最新标砖 ES6 或更高、 Less 样式预编译语言
* 主体框架：基于 umi@2.8.20 和 react@16.9.0；

## 结构

结构以及相关功能说明如下：
```JavaScript
/*
    
    ROOT 根目录
      |--- config 配置文件目录
      |     |--- config.js 项目配置文件（umi、webpack and routes）
      |     |--- router.config.js 路由配置文件
      |       
      |--- public 公共资源文件
      |     |--- favicon.png
      |
      |--- src 核心代码目录
      |     |--- assets 项目静态资源目录
      |     |      |--- ...
      |     |      |--- ...
      |     |
      |     |--- components 可复用的组件目录
      |     |      |--- Business 业务逻辑相关的组件（项目级别复用率较低）
      |     |      |--- Common 通用组件（项目级别复用率较高） 
      |     |      |--- Helpers 组件级别的助手组件（高阶函数， renderProps 等等）
      |     |                   同样的项目级别复用率较高
      |     |
      |     |--- HOFs 业务逻辑级的连接高阶函数目录
      |     |      |--- layouts 页面框架级
      |     |      |--- pages 页面级
      |     |
      |     |--- hooks 基于 react 的 hooks 生成的新 hooks 所在的目录
      |     |--- layouts 页面整体框架目录
      |     |      |--- Default 默认框架，适用于具有 Menu, header 和 footer 的结构的页面
      |     |      |--- Pure 纯净框架，适用于登录等非默认型框架
      |     |      |--- ... 其他框架，若有特殊要求或模块，可自行创建
      |     |
      |     |--- locales 国际化文案目录
      |     |      |--- zh-CN 中文文案目录
      |     |      |      |--- menu 菜单对象
      |     |      |      |--- ... 其他模块文案对象
      |     |      |      
      |     |      |--- zh-CN.js 中文文案索引主文件
      |     |
      |     |--- mock 接口、数据 mock 目录
      |     |--- models 业务逻辑主体目录
      |     |      |--- breadcrumb.js 面包屑 model，不允许删除
      |     |      |--- menu.js 菜单 model，不允许删除
      |     |      |--- ... 其他 models，根据业务具体划分
      |     |
      |     |--- pages 页面目录
      |     |      |--- document.ejs 主体 html 文件，不可删除
      |     |      |--- .umi umi 框架在开发、编译阶段自动生成的产物
                                 如果遇到某些缓存的问题，可直接删除再重新编译
      |     |      |--- exceptions 异常页面
      |     |      |      |--- 403.js 403 异常页面
      |     |      |      |--- 404.js 404 异常页面
      |     |      |--- ... 其他页面，自行开发
      |     |
      |     |--- resources 代码资源目录
      |     |      |--- _.less less 样式文件基础库（如要使用，需使用 @import (reference) "~_.less")
      |     |      |--- constant.js 静态变量管理文件
      |     |
      |     |--- service 业务逻辑请求、服务目录
      |     |      |--- ... 根据业务自行开发，主要用于网络请求
      |     |
      |     |--- utils 工具目录
      |     |      |--- helpers
      |     |      |--- ... 
      |     |
      |
      |--- .eslintrc.js eslint 的检验规则和配置
      |--- .prettierrc prettier 美化规则
      |--- .stylelintrc.json stylelint 的检验规则和配置
      |--- webpack.config.js 用于配置 webStorm 的 webpack 相关配置 
      
*/
```

## 使用

在开发之前，需要安装项目的依赖包，执行以下命令即可：

```bash
npm install
```

安装依赖之后，执行下面的命令选择启动开发环境或打包编译测试、正式环境的项目；

* 开发环境：`npm run start`；
* 测试环境：`npm run test`；
* 线上环境：`npm run build`；

## 环境变量

### `IS_DEV`

当 `IS_DEV` 为 `true` 时，表示当前环境是开发环境；

### `IS_TEST`

当 `IS_TEST` 为 `true` 时，表示当前环境是测试环境；

### `IS_PROD`

当 `IS_PROD` 为 `true` 时，表示当前环境是开发环境；

### `ICONFONT_JS_URL`

`ICONFONT_JS_URL` 变量表示 iconfont 在线字体文件地址；
