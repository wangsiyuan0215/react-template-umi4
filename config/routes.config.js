/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 13:23:55
 * @Description: routes config
 */

export default [
    {
        path: '/login',
        component: '../layouts/pure/index',
        // routes: [{ path: '/login', component: './login' }]
    },
    {
        path: '/',
        component: '../layouts/basic/index',
        Routes: ['src/components/Authorized/index'],
        routes: [
            {
                path: '/exception/403',
                hideInMenu: true,
                component: './exceptions/403'
            }, {
                path: '/exception/404',
                hideInMenu: true,
                component: './exceptions/404'
            }
        ]
    }
];
