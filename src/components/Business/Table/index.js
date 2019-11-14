/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-31 11:39:40
 * @Description: Table
 */

import React from 'react';
import { Table } from 'antd';
import classNames from 'classnames';

import styles from './index.less';

export default ({ className, ...restProps }) => (
    <div className={styles.table}>
        <Table className={classNames('ma-table', className)} {...restProps} />
    </div>
);
