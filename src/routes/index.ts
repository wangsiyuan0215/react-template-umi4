import paths from './paths';

import welcome from './modules/welcome';
import user from './modules/user';

import { defineRouteItems } from './utils';

export const ROOT_ROUTE_NAME = 'Root';

export default defineRouteItems([
    {
        path: paths.root,
        redirect: paths.welcome
    },
    // 根路由，所有的子路由必须挂载在跟路由下
    // 如果需要跳过权限验证，
    //   - 可以在根路由下挂载一个 access: 'canAccessSystem' 的路由
    //   - 或者与根路由统计挂载，但是此中方法会导致新增的路由不会出现在菜单中
    {
        name: ROOT_ROUTE_NAME,
        path: paths.root,
        access: 'canAccessSystem',
        wrappers: ['@/Accesses/default'],
        component: '@/layouts/default',
        routes: [
            welcome,
            user,
            {
                path: '*',
                component: '@/pages/Exceptions/404'
            }
        ]
    }
]);
