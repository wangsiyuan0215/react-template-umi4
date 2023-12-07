import paths from '../paths';
import { defineRouteItem } from '../utils';

export default defineRouteItem({
    name: 'User',
    icon: 'tips',
    path: paths.user.root,
    access: 'canAccessSystem',
    routes: [
        {
            name: 'UserHome',
            path: paths.user.home,
            access: 'canAccessSystem',
            component: '@/pages/Welcome'
        },
        {
            name: 'UserDetail',
            path: paths.user.detail,
            access: 'canAccessSystem',
            component: '@/pages/Welcome'
        }
    ]
});
