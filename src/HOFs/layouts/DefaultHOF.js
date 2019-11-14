/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-29 17:26:09
 * @Description: DefaultHOF
 */
import { connect } from 'dva';

const mapStateToProps = ({ global, menu }) => ({
    menuData: menu.menuData,
    collapsed: global.collapsed,
    allMenuData: menu.allMenuData,
    breadcrumbNameMap: menu.breadcrumbNameMap
});

const mapDispatchToProps = dispatch => ({
    init: location => dispatch({ type: 'global/authentication', payload: location }),
    fetchMenuData: (routes, authority) =>
        dispatch({ type: 'menu/getMenuData', payload: { routes, authority } }),
    changeLayoutCollapsed: collapsed =>
        dispatch({
            type: 'global/changeLayoutCollapsed',
            payload: collapsed
        }),
    logout: () => dispatch({ type: 'user/logout' })
});

export default Component =>
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Component);
