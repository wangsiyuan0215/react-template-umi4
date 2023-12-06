import React from 'react';
import { Menu } from 'antd';
import classNames from 'classnames';
import { useSelector, useAccess, useIntl, matchRoutes, useLocation, history } from '@umijs/max';

import routes, { ROOT_ROUTE_NAME } from '@/routes';
import { MenuItem, generateMenuItems, flatRoutes } from './utils';

import type { MenuProps } from 'antd';
import type { RouteItem } from '@/routes/typing';

type Props = {
    className: React.HTMLAttributes<InstanceType<typeof Menu>>['className'];
};

const Menus: React.FC<Props> = ({ className }) => {
    const intl = useIntl();
    const location = useLocation();
    const accesses = useAccess();
    const [menuData]: [MenuItem[], RouteItem[]] = useSelector(({ menu }) => [menu.menuData]);

    const [menus, setMenus] = React.useState([]);
    const [openKeys, setOpenKeys] = React.useState<string[]>([]);
    const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (menuData) setMenus(generateMenuItems(menuData, accesses, intl));
    }, [menuData, accesses]);

    React.useEffect(() => {
        const { routes: children = [] } =
            routes.find((route) => route.name === ROOT_ROUTE_NAME) || ({ routes: [] } as RouteItem);
        const matched = matchRoutes(flatRoutes(children.slice(0, -1), null), location.pathname);

        if (matched?.length) {
            setOpenKeys(() => {
                const ok = [];
                let currentMatchedRoute = matched[matched.length - 1].route as RouteItem;
                while (currentMatchedRoute.parent) {
                    ok.push(currentMatchedRoute.parent.path);
                    currentMatchedRoute = currentMatchedRoute.parent;
                }
                return ok;
            });
            setSelectedKeys([matched[matched.length - 1].route.path]);
        }
    }, [location.pathname]);

    const onClick: MenuProps['onClick'] = (e) => {
        history.push(e.key);
    };

    const onOpenChange = (keys: string[]) => {
        setOpenKeys(keys);
    };

    return (
        <Menu
            className={classNames(className)}
            mode="inline"
            theme="dark"
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            items={menus}
            onClick={onClick}
            onOpenChange={onOpenChange}
        />
    );
};

export default Menus;
