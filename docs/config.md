# 配置
文档地址：https://umijs.org/docs/api/config

整体脚手架配置基于 UmiJS 的配置，需要注意的是，UmiJS 有两种配置方式：

- `.umirc.ts`;
- `config/config.ts`;

当前脚手架采用的是第二种 `config/config.ts` 的方式。

根据环境，已经预设好了四个文件：

- `config.develop.ts`：开发环境加载；
- `config.prod.ts`：生产环境加载；
- `config.qa.ts`：QA 环境加载；
- `config.ts`：任何环境环境都会加载；

以上配置文件的合并原则是根据当前构建环境参数，将 `config.[env].ts` 与 `config.ts` 合并，且相同配置项 `config.[env].ts` 会覆盖 `config.ts`。

本脚手架还将路由配置信息放到了 `config` 文件夹中，使用的是**配置式路由**。

### 最佳实践

推荐将路由的路径字符串在 `src/routes/paths.ts` 中按照树形结果声明，然后在路由配置中通过 `import` 关键字引入。

这么做的好处是：

- 减少路由地址的硬编码，同时增加了代码的可读性（变量名称就是最好的注释）；
- 如果需要修改路由地址时，只需要修改它声明的文件，方便维护；

### Request

本脚手架基于 Axios 做了进一步的封装，实现了接口请求的简易 DSL。

主要需要注意的是，我们需要在 `src/utils/request/index.ts` 中 7 ~ 9 行进行 Axios 实例的基础配置，比如拦截器等；

在对接接口时：

- 需要在 `src/services/` 创建相应的模块（类似于 `src/services/common/user.ts`），`key: value` 结构；
- 在 store 或者组件中，通过 `import` 引入对应的 services 模块，执行相对应的 key 即可。

具体参数和调用方式请参照[这里](https://itsc-confluence.mercedes-benz.com.cn/confluence/pages/viewpage.action?pageId=169093225)。


