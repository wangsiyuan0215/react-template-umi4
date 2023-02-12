/*
 * @Editor: SiYuan Wang
 * @Date: 2019-09-02 16:32:50
 * @Description: index
 */

import React from 'react';
import { Spin } from 'antd';

import styles from './index.less';

export const LoadingWrapper = (props) => {
    const { id, children, spinning = false, wrapperClassName = null } = props;
    return (
        <Spin id={id} wrapperClassName={wrapperClassName} spinning={spinning}>
            {children}
        </Spin>
    );
};

export default () => (
    <div className={styles.container}>
        <Spin size="large" />
    </div>
);
