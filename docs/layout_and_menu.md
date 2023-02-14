# 布局与菜单
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
