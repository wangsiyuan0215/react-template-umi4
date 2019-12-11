/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-30 17:05:55
 * @Description: BreadcrumbHOF
 */

import { connect } from 'dva';

const mapStateToProps = ({ user }) => ({
    user: user.user
});

export default Component =>
    connect(
        mapStateToProps,
        undefined
    )(Component);
