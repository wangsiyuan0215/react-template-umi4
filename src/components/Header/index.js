/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 17:08:32
 * @Description: Header
 */

import Link from 'umi/link';
import React from 'react';
import { Icon } from 'antd';
import RightContent from './RightContent';

import styles from './index.less';

export default class HeaderComponent extends React.PureComponent {
    toggle = () => {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
    };

    render() {
        const { collapsed, isMobile, logo, logout, onCompanyChange } = this.props;
        return (
            <div className={styles.header}>
                {isMobile && (
                    <Link to="/" className={styles.logo} key="logo">
                        <img src={logo} alt="logo" width="32" />
                    </Link>
                )}
                <span className={styles.trigger} onClick={this.toggle}>
                    <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                </span>
                <RightContent
                    {...this.props}
                    onMenuClick={logout}
                    onCompanyChange={onCompanyChange}
                />
            </div>
        );
    }
}
