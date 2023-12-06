import { DashboardOutlined } from '@ant-design/icons';

import paths from '../paths';

import { defineRouteItem } from '../typing';

export default defineRouteItem({
    icon: DashboardOutlined,
    name: 'Welcome',
    path: paths.welcome,
    access: 'canAccessSystem',
    component: '@/pages/Welcome'
});
