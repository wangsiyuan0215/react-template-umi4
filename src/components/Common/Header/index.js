/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 17:08:32
 * @Description: Header
 */

import React from 'react';
import RightContent from './RightContent';

import styles from './index.less';

export default class HeaderComponent extends React.PureComponent {
    render() {
        const { logout } = this.props;
        return (
            <div className={styles.header}>
                <RightContent {...this.props} onMenuClick={logout} />
            </div>
        );
    }
}
