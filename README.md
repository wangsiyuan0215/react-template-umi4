# @capgemini-daimler/react-stage

主要基于 react v18 和 umijs@v4 创建的脚手架，基础组件库使用 `antd@^4.0.0` 版本。

`react v18`:
* 官方地址：https://zh-hans.reactjs.org/docs/getting-started.html
* 较 v17 版本的变化：https://zh-hans.reactjs.org/blog/2022/03/29/react-v18.html#whats-new-in-react-18

`umijs@v4`:
* 官方地址：https://umijs.org/docs/tutorials/getting-started
* Umi Max 介绍：https://umijs.org/docs/max/introduce

`antd@^4.0.0`:
官方地址：https://4x.ant.design/docs/react/introduce-cn

## 布局与菜单
文档地址：https://umijs.org/docs/max/layout-menu

如果需要需要进行相关定制，比如多个模块的布局差异比较大，那么就需要将定制 Layout 组件配置到模块路由的根路由配置中。
```typescript
// routes config
const routes = [
    {
        icon: 'DashboardOutlined',
        name: 'Welcome',
        path: paths.welcome,
        access: 'canAccessSystem',
        // 依托于 wrappers 来定制化 layout
        wrappers: ['@/Accesses/Welcome', '@/Layouts/Welcome'],
        component: '@/pages/Welcome'
    }
]
```
并需要在 `@/layouts/default` 组件中使用 react-router@6 的 children 组件 `<Outlet />`:
```diff
import React from 'react';
+ import { Outlet } from 'umi';
 
export default function DefaultLayout(props) {
  return (
    <div>
-      { props.children }
+      <Outlet />
    </div>
  );
}
```
具体改变请参考文档：https://umijs.org/docs/introduce/upgrade-to-umi-4#children
