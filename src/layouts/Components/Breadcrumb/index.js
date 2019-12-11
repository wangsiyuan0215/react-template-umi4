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
import { formatMessage } from 'umi-plugin-react/locale';
import { Button, Breadcrumb } from 'antd';

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
        return (
            <Breadcrumb.Item key={path.path}>
                {!isLast ? <Link to={path.path || '#'}>{path.name}</Link> : path.name}
            </Breadcrumb.Item>
        );
    });

const Bread = props => {
    const { routes, location, actions = [] } = props;
    const { pathname } = location;

    const renderButtons = acts => {
        if (!(pathname in acts)) return null;

        return (
            <div className={styles.actions}>
                {acts[pathname].map(item => {
                    const onClick = () => item.onClick && item.onClick(item.payload);

                    return (
                        <Button
                            key={`btn_item_${item.key}`}
                            loading={props[`loading4${item.key}`]}
                            className={styles.button}
                            {...item.props}
                            onClick={onClick}
                        >
                            {(item.localeId && formatMessage({ id: item.localeId })) ||
                                item.name ||
                                ''}
                        </Button>
                    );
                })}
            </div>
        );
    };

    return (
        <div className={styles.bread}>
            <Breadcrumb>
                {compose(
                    generateBreadcrumbs,
                    getAncestor(location.pathname)
                )(routes)}
            </Breadcrumb>
            {renderButtons(actions)}
        </div>
    );
};

Bread.propTypes = {
    routes: PropTypes.array
};

Bread.defaultProps = {
    routes: []
};

export default withRouter(Bread);
