/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-12 05:46:13
 * @Description: bread
 */

import Link from 'umi/navlink';
import React from 'react';
import curry from 'ramda/src/curry';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';
import withRouter from 'umi/withRouter';
import { Breadcrumb, Icon } from 'antd';

import styles from './index.less';

// getAncestor :: Object -> Array -> Array
const getAncestor = curry((pathname, paths) => {
    let result = [];

    /* eslint no-plusplus: ["off"] */
    for (let i = 0; i < paths.length; i++) {
        const item = paths[i];
        if (item.path === pathname) return [...result, item];

        /* eslint no-continue: ["off"] */
        if (item.path !== pathname && !item.children) continue;
        if (item.path !== pathname && item.children) {
            const childrenResult = getAncestor(pathname, item.children);
            result = childrenResult.length
                ? [...result, ...((!item.hideInBreadcrumb && [item]) || []), ...childrenResult]
                : result;
        }
    }

    return result;
});
const generateBreadcrumbs = paths =>
    paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        const content = (
            <React.Fragment>
                {path.icon ? <Icon type={path.icon} style={{ marginRight: 4 }} /> : null}
                {path.name}
            </React.Fragment>
        );

        return (
            <Breadcrumb.Item key={path.path}>
                {!isLast ? <Link to={path.path || '#'}>{content}</Link> : content}
            </Breadcrumb.Item>
        );
    });

const Bread = props => {
    const { routes, location } = props;
    return (
        <Breadcrumb className={styles.bread}>
            {compose(
                generateBreadcrumbs,
                getAncestor(location.pathname)
            )(routes)}
        </Breadcrumb>
    );
};

Bread.propTypes = {
    routes: PropTypes.array
};

Bread.defaultProps = {
    routes: []
};

export default withRouter(Bread);
