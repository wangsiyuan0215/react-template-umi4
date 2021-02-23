/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-30 17:05:55
 * @Description: BreadcrumbHOF
 */

import { connect } from 'dva';

const mapStateToProps = ({ user, loading }) => ({
    user: user.user,
    loading: !!loading.effects['user/logout'],
    keys4dropdown: user.keys4dropdown
});

const mapDispatchToProps = dispatch => ({
    onClick4dropdown: ({ key }) =>
        dispatch({ type: 'user/handler4dropdownInHeader', payload: { key } })
});

export default Component =>
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Component);
