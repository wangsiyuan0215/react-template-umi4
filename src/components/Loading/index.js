import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

import styles from './index.less';
import loadingIndicator from './loading-indicator.png';

const indicatorElement = () => (
    <div className={styles.indicator}>
        <img alt="spinner" src={loadingIndicator} />
    </div>
);

Spin.setDefaultIndicator(indicatorElement());

export const LoadingWrapper = props => {
    const { children, spinning, wrapperClassName = null} = props;
    return (
        <Spin
            wrapperClassName={wrapperClassName}
            spinning={spinning}
            indicator={indicatorElement()}
        >
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
        <Spin size="large" indicator={indicatorElement()} />
    </div>
);
