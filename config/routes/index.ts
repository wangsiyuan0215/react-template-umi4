import paths from './paths';

export default [
    {
        path: paths.root,
        redirect: paths.welcome
    },
    {
        name: 'root',
        path: paths.root,
        access: 'canAccessSystem',
        wrappers: ['@/Accesses/default'],
        component: '@/layouts/default',
        routes: [
            {
                icon: 'DashboardOutlined',
                name: 'Welcome',
                path: paths.welcome,
                access: 'canAccessSystem',
                component: '@/pages/Welcome'
            }
        ]
    }
];

export { paths };
