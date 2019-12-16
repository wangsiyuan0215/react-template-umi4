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
                redirect: '/welcome'
            },
            {
                icon: 'welcome',
                name: 'welcome',
                path: '/welcome',
                component: './welcome'
            },
            {
                path: '/exception/404',
                name: '404',
                hideInMenu: true,
                component: './exceptions/404'
            },
            {
                path: '/exception/403',
                name: '403',
                hideInMenu: true,
                component: './exceptions/403'
            }
        ]
    }
];
