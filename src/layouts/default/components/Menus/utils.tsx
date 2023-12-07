import Icon from '@ant-design/icons';
import CustomIcon from '@/components/CustomIcon';

import type { IntlShape } from 'react-intl';
import type { RouteItem } from '@/routes/typings';
import type { AccessType } from '@/access';
import type { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number] & {
    icon?: React.ForwardRefExoticComponent<any>;
    locale: string;
    access?: string;
    children: MenuItem[];
};

export const flatRoutes = (routes: RouteItem[], parent: RouteItem) => {
    return routes.reduce((acc, route) => {
        if (route.name) acc.push({ ...route, parent });
        if (route.routes) acc.push(...flatRoutes(route.routes, route));
        return acc;
    }, [] as RouteItem[]);
};

const generateIcon = (icon: string | React.ForwardRefExoticComponent<any>) => {
    if (typeof icon === 'string')
        return (
            <span className="flex items-center h-full">
                <CustomIcon name={icon} className={`!text-[20px] ico-${icon}`} />
            </span>
        );
    return <Icon component={icon} />;
};

export const generateMenuItems = (items: MenuItem[], accesses: AccessType, intl: IntlShape) => {
    return items
        .filter((item) => {
            if (item.access) return accesses[item.access];
            return true;
        })
        .map((item) => {
            return {
                ...item,
                label: intl.formatMessage({ id: item.locale }),
                ...(item.icon ? { icon: generateIcon(item.icon) } : {}),
                ...(item.children ? { children: generateMenuItems(item.children, accesses, intl) } : {})
            };
        });
};
