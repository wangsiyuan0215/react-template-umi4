import paths from './paths';

export default [
    {
        path: paths.root,
        redirect: paths.welcome
    },
    {
        icon: 'DashboardOutlined',
        name: 'Welcome',
        path: paths.welcome,
        access: 'canAccessSystem',
        wrappers: ['@/Accesses/Welcome', '@/Layouts/Welcome'],
        component: '@/pages/Welcome'
    }
];

export { paths };
