# @capgemini-daimler/react-stage

主要基于 react v18 和 umijs@v4 创建的脚手架，基础组件库使用 `antd@^4.0.0` 版本。

`react v18`:
* 官方地址：https://zh-hans.reactjs.org/docs/getting-started.html
* 较 v17 版本的变化：https://zh-hans.reactjs.org/blog/2022/03/29/react-v18.html#whats-new-in-react-18

`umijs@v4`:
* 官方地址：https://umijs.org/docs/tutorials/getting-started
* Umi Max 介绍：https://umijs.org/docs/max/introduce

`antd@^4.0.0`:
*  官方地址：https://4x.ant.design/docs/react/introduce-cn

状态管理使用了 umi 内置的 dva 以及 zustand，如果对 valtio 比较熟悉还可以在配置中将 valtio 开启（本脚手架默认关闭）：
```typescript
export default defineConfig({
    // ...
    valtio: {},
})
```
* dva 官方地址：https://github.com/dvajs/dva
* dva-loading 插件文档地址：https://github.com/dvajs/dva/tree/master/packages/dva-loading
* zustand 文档地址：https://github.com/pmndrs/zustand

## 🤝 开发约定：

* [布局与菜单](./docs/layout_and_menu.md)
* [状态管理](./docs/state_mangement.md)

---
*To be continue...*
