/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 13:23:55
 * @Description: routes config
 */

export default [
    {
        path: '/',
        component: '../layouts/Default/index',
        Routes: ['src/components/Common/Authorized/index'],
        routes: [
            {
                path: '/',
                redirect: '/home'
            },
            {
                path: '/home',
                name: 'home',
                icon: 'welcome',
                component: './home'
            },
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
