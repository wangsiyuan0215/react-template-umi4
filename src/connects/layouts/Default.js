/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-29 17:26:09
 * @Description: DefaultHOF
 */
import { connect } from 'dva';

const mapStateToProps = ({ user, menu, loading }) => ({
    user: user.user,
    menuData: menu.menuData,
    allMenuData: menu.allMenuData,
    loading4menu: !!loading.effects['menu/getMenuData'],
    loading4right: !!loading.effects['user/logout'],
    keys4dropdown: user.keys4dropdown,
    breadcrumbNameMap: menu.breadcrumbNameMap
});

const mapDispatchToProps = dispatch => ({
    authentication: location => dispatch({ type: 'base/authentication', payload: { location } }),
    fetchMenuData: (routes, authority) =>
        dispatch({ type: 'menu/getMenuData', payload: { routes, authority } }),
    onClick4dropdownInHeader: ({ key }) =>
        dispatch({ type: 'user/handler4dropdownInHeader', payload: { key } })
});

export default Component =>
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Component);
