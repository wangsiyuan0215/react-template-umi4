# 基于 React 体系的项目架构说明 by rs-cli@1.0.9

## 1. 环境

- 运行环境：依赖于 node.js 和 npm or yarn；
- 开发语言：JavaScript 最新标砖 ES6 或更高、如果有能力，也可使用 TypeScript、 Less 样式预编译语言
- 主体框架：基于 umi[@2.12.0 ]() 和 react@16.9.0；

## 2. 结构

结构以及相关功能说明如下：

```javascript
/*
    
    ROOT 根目录
      |--- config 配置文件目录
      |     |--- config.js 项目配置文件（umi、webpack and routes）
      |     |--- config.local.js 本地项目配置文件
      |     |--- router.config.js 路由配置文件
      |     |--- svgo.config.js svgo 插件配置文件（如无必要，请不要修改）
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
      |     |--- connects 业务逻辑级的连接高阶函数目录
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
      |     |--- types 仅针对 typescript，类型声明目录
      |     |      |--- index.d.ts 
      |     |
      |     |--- utils 工具目录
      |     |      |--- helpers 帮助类工具
      |     |      |--- ... 
      |
      |
      |--- .editorconfig 统一不同 IDE 之间差异
      |--- .eslintrc.js eslint 的检验规则和配置
      |--- .prettierrc prettier 美化规则
      |--- .stylelintrc.json stylelint 的检验规则和配置
      |--- tsconfig.js typescript 的配置文件
		  |--- jsconfig.js javascript 的配置文件
      |--- webpack.config.js 用于配置 webStorm 的 webpack 相关配置 
      
*/
```

## 3. 使用

在开发之前，需要安装项目的依赖包，执行以下命令即可，**需要注意的是，当团队开发人员更新依赖时，请重新执行以下命令**

```bash
npm install
```

安装依赖之后，执行下面的命令选择启动开发环境或打包编译测试、正式环境的项目；

根据目标环境不同，执行的命令也会有区别：

#### 3.1. 开发
如果仅是开发阶段，那么直接执行：

```bash
npm run start:dev
```

如果需要在开发阶段中模拟测试环境、预发布或线上正式环境，需要执行：

```bash
# for test
npm run start:test

# for pre
npm run start:pre

# for prod
npm run start:prod
```

#### 3.2. 部署

根据部署目标环境执行相应的下列命令即可：

```bash
# for dev 构建打包开发环境
npm run build:dev

# for test 构建打包测试环境
npm run build:test

# for pre 构建打包预发布环境
npm run build:pre

# for prod 构建打包正式环境
npm run build:prod
```

## 4. 代码风格管理

代码风格管理是基于 eslint、stylelint 和 prettier 工具的强约束，整体风格基于 eslint/recommand 与 airbnb 的规则。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/268827/1577944886926-798f7bb6-5c1a-4d65-a612-93748257e93e.png#align=left&display=inline&height=389&name=image.png&originHeight=779&originWidth=609&size=292402&status=done&style=none&width=304)

上面是 eslint 的配置的一部分，需要注意的是，globals 字段对应的是项目中的全局变量，因为 eslint 会检测没有定义而直接使用的全局变量而抛出异常，因此使用全局变量需要以 `[GLOBAL_VARIABLE]: true` 的形式将其添加到 globals 中。

## 5. 环境变量
项目中预设了些基础全局变量

#### `5.1 IS_DEV: boolean`

当 `IS_DEV` 为 `true` 时，表示当前环境是开发环境；

#### `5.2 IS_TEST: boolean`

当 `IS_TEST` 为 `true` 时，表示当前环境是测试环境；

#### `5.3 IS_PROD: boolean`

当 `IS_PROD` 为 `true` 时，表示当前环境是开发环境；

#### `5.4 APP_ENV: string`

返回当前 runtime 环境

#### 5.5 `ICONFONT_JS_URL: string`
返回 iconfont 的字体文件的地址

## 6. Icon 管理
我们推荐将 icon 以 svg 类型在项目中使用，其优势在于其具有矢量性、独立性和体积小等特性，但是**请注意其兼容性，IE 9+** 。

Icon 管理有两种方式：

#### 6.1 Iconfont 网站管理 - [Iconfont](https://www.iconfont.cn/)
使用该方式管理图标需要注意的是，我们需要基于 symbol 模式，并且将全局变量 `ICONFONT_JS_URL` 设置为 Symbol 对应的在线地址（该地址是基于 cdn，因此并不需要担心其加载速度）。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/268827/1577946117315-748909c5-b17f-45cf-92aa-042a220159f0.png#align=left&display=inline&height=205&name=image.png&originHeight=750&originWidth=1046&size=210933&status=done&style=shadow&width=286)  ![image.png](https://cdn.nlark.com/yuque/0/2020/png/268827/1577946939467-9d97015a-5978-49cd-8249-8a85f78d00f7.png#align=left&display=inline&height=205&name=image.png&originHeight=316&originWidth=676&size=181638&status=done&style=shadow&width=439)

完成上述步骤后，还需要在 `src/app.js` 文件中，将下图注释取消掉，之后可以在页面中使用 `<CustomIcon.IconFont type="[icon-symbol]">` 来渲染相应 symbol 的 icon。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/268827/1577946369589-14486894-6f20-4141-8484-51c208268d54.png#align=left&display=inline&height=205&name=image.png&originHeight=479&originWidth=786&size=196588&status=done&style=shadow&width=336) ![image.png](https://cdn.nlark.com/yuque/0/2020/png/268827/1577946600799-2366ae1b-67fa-4a7a-8395-ea439748ea67.png#align=left&display=inline&height=205&name=image.png&originHeight=385&originWidth=559&size=141799&status=done&style=shadow&width=297)


#### 6.2 自行管理
将 svg 图标放到项目中 `assets/icons` ，使用时只需要 `<CustomIcon type="[IconName]">` 即可。

![image.png](https://cdn.nlark.com/yuque/0/2020/png/268827/1577946831864-116afb95-95c4-4f3c-9e05-3ad3490e4dd2.png#align=left&display=inline&height=205&name=image.png&originHeight=181&originWidth=287&size=32363&status=done&style=shadow&width=325)![image.png](https://cdn.nlark.com/yuque/0/2020/png/268827/1577946816087-c2f7f9d3-9b45-4cd3-b98d-ccbf43c9d3fb.png#align=left&display=inline&height=205&name=image.png&originHeight=381&originWidth=551&size=130888&status=done&style=shadow&width=296)

## 7. 配置
请参考 umiJs 的配置。

这里仅说明 `config.local.js` 的合并规则。

首先，`config.local.js` 不会被提交到 Git 上，这仅仅是表示开发者本地配置文件，只有在本地启动开发环境时候才会被读取，与 `config.js` 配置合并；
其次，该文件不会影响各个环境的构建打包流程；
最后，其具体的配置方式与 `config.js` 相同。

## 8. IDE 和 Path Alias
我们推荐的 IDE 是 webstorm，如果使用其他 IDE，我们不保证项目开发阶段的愉悦的用户体验。

项目根目录下的 `webpack.config.js` 并非是真正的 webpack 的配置文件，该文件仅针对 webstorm 的 webpack 配置而存在的。

我们配置了一些 path alias 和模块依赖，如下图：

![image.png](https://cdn.nlark.com/yuque/0/2020/png/268827/1577947652625-bd978f2a-3890-40e2-86bd-ce7ed7e7bd50.png#align=left&display=inline&height=312&name=image.png&originHeight=486&originWidth=778&size=430888&status=done&style=none&width=500)


因此在代码中会经常遇到类似如下的引入模块的方式：


![image.png](https://cdn.nlark.com/yuque/0/2020/png/268827/1577947784485-97b2710e-ad24-408b-b0e4-0be4d7fba42b.png#align=left&display=inline&height=87&name=image.png&originHeight=98&originWidth=565&size=41026&status=done&style=none&width=500)


![image.png](https://cdn.nlark.com/yuque/0/2020/png/268827/1577947863370-234156a2-476d-42db-b125-8ec9e826841a.png#align=left&display=inline&height=170&name=image.png&originHeight=127&originWidth=373&size=36504&status=done&style=none&width=500)


这么做的目的在于，我们通过 path alias 避免了直接写绝对路径和相对路径，因此当移动文件的时候，IDE 和解析器、构建程序会自动地将这些对应关系更新，避免不必要的错误和操作。
