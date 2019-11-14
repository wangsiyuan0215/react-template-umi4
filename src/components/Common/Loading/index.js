/*
 * @Editor: SiYuan Wang
 * @Date: 2019-09-02 16:32:50
 * @Description: index
 */

import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

import styles from './index.less';

export const LoadingWrapper = props => {
    const { children, spinning, wrapperClassName = null } = props;
    return (
        <Spin wrapperClassName={wrapperClassName} spinning={spinning}>
            {children}
        </Spin>
    );
};
LoadingWrapper.propTypes = {
    spinning: PropTypes.bool,
    wrapperClassName: PropTypes.string
};
LoadingWrapper.defaultProps = {
    spinning: true,
    wrapperClassName: null
};

export default () => (
    <div className={styles.container}>
        <Spin size="large" />
    </div>
);
