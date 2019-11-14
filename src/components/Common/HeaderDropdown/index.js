/*
 * @Author: SiYuan Wang
 * @Date: 2019-04-03 09:54:49
 * @Description: index
 */

import classNames from 'classnames';
import { Dropdown } from 'antd';
import React, { PureComponent } from 'react';

import styles from './index.less';

export default class HeaderDropdown extends PureComponent {
    render() {
        const { overlayClassName, ...props } = this.props;
        return (
            <Dropdown
                overlayClassName={classNames(styles.container, overlayClassName)}
                {...props}
            />
        );
    }
}
