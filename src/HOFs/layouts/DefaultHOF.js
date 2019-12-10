/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-29 17:26:09
 * @Description: DefaultHOF
 */
import { connect } from 'dva';

const mapStateToProps = ({ menu, loading }) => ({
    menuData: menu.menuData,
    allMenuData: menu.allMenuData,
    loading4menu: !!loading.effects['menu/getMenuData'],
    breadcrumbNameMap: menu.breadcrumbNameMap
});

const mapDispatchToProps = dispatch => ({
    init: location => dispatch({ type: 'global/authentication', payload: location }),
    // logout: () => dispatch({ type: 'user/logout' }),
    fetchMenuData: (routes, authority) =>
        dispatch({ type: 'menu/getMenuData', payload: { routes, authority } })
});

export default Component =>
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Component);
