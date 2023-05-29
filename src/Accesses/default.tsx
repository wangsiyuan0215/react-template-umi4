import { Access, useAccess, Outlet } from '@umijs/max';

import useDvaApp2global from '@/hooks/useDvaApp2global';

export default () => {
    const access = useAccess();

    // inject dva app instance into global or window
    useDvaApp2global();

    return (
        <Access accessible={access.canAccessSystem}>
            <Outlet />
        </Access>
    );
};
