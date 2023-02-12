import paths from './routes/paths';

export { paths };

export default [
    {
        path: paths.root.root,
        wrappers: ['@/components/Access/index'],
        access: 'canAccessSystem',
        component: '@/pages/Index'
    }
];
