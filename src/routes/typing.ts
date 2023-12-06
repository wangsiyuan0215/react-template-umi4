import React from 'react';

export type RouteItem = {
    path: string;
    name?: string;
    icon?: string | React.ForwardRefExoticComponent<any>;
    access?: string;
    wrappers?: string[];
    component?: string;
    routes?: RouteItem[];
    redirect?: string;
    // 与路由配置无关的属性
    parent?: RouteItem;
};

export const defineRouteItem = (routeItem: RouteItem) => routeItem;

export const defineRouteItems = (routeItems: RouteItem[]) => routeItems;
