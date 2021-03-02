/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-19 22:16:45
 * @Description: Authorized
 */

import React from 'react';
import Redirect from 'umi/redirect';
import { connect } from 'dva';
import { getAuthority as getCurrentAuthority } from '@/utils/storage';

import authorize from './authorize';

const AuthorizedWrapper = props => {
    const {
        location,
        route: { routes },
        children
    } = props;

    const getRouterAuthority = (pathname, routeData) => {
        let routeAuthority = ['noAuthority'];
        const getAuthority = (key, routesParam) => {
            routesParam.map(route => {
                if (route.path === key) {
                    routeAuthority = route.authority;
                } else if (route.routes) {
                    routeAuthority = getAuthority(key, route.routes);
                }
                return route;
            });
            return routeAuthority;
        };
        return getAuthority(pathname, routeData);
    };
    const routerConfig = getRouterAuthority(location.pathname, routes);
    const Authorized = authorize(getCurrentAuthority());

    return (
        <Authorized authority={routerConfig} noMatch={<Redirect to="/exception/403" />}>
            {children}
        </Authorized>
    );
};

export default connect(({ menu: menuModel }) => ({
    routerData: menuModel.routerData
}))(AuthorizedWrapper);
