/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-30 17:05:55
 * @Description: BreadcrumbHOF
 */

import { connect } from 'dva';

const mapStateToProps = ({ breadcrumb, loading }, ownProps) => {
    const { location } = ownProps;
    const { pathname } = location;
    const currentActions = breadcrumb.actions[pathname] || [];
    return {
        actions: breadcrumb.actions,
        ...currentActions.reduce(
            (acc, item) => ({
                ...acc,
                ...(item.loadingEffectName && {
                    [`loading4${item.key}`]: loading.effects[item.loadingEffectName]
                })
            }),
            {}
        )
    };
};

export default Component =>
    connect(
        mapStateToProps,
        null
    )(Component);
