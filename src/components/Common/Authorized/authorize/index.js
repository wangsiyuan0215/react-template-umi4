/*
 * @Author: siyuan.wang
 * @Date: 2021/3/2 4:12 PM
 * @Description: index_
 */

import CheckPermissions from '../checkPermissions';
import renderAuthorize from '../renderAuthorize';

const Authorized = ({ children, authority, noMatch = null }) => {
    const childrenRender = typeof children === 'undefined' ? null : children;
    return CheckPermissions(authority, childrenRender, noMatch);
};

// Authorized.Secured = Secured;
// Authorized.AuthorizedRoute = AuthorizedRoute;
Authorized.check = CheckPermissions;

export default renderAuthorize(Authorized);
