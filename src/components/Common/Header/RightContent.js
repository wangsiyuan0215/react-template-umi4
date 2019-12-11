/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 17:12:16
 * @Description: RightContent of Header Component
 */

import React from 'react';
import classNames from 'classnames';
import { Menu, Icon } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

import Avatar from '@/components/Common/Avatar';
import HeaderDropdown from '@/components/Common/HeaderDropdown';

import styles from './index.less';

const RightContent = ({ className, textClassName, onMenuClick }) => {
    const menu = (
        <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
            <Menu.Item key="logout">
                <Icon type="logout" />
                <FormattedMessage id="header.dropdown.logout" defaultMessage="logout" />
            </Menu.Item>
        </Menu>
    );
    return (
        <div className={classNames(styles.right, className)}>
            <HeaderDropdown overlay={menu} placement="bottomRight">
                <span className={styles.account}>
                    <span className={textClassName}>
                        {formatMessage({ id: 'header.account.welcome' })}
                    </span>
                    <Avatar className={styles.avatar} size={44} name="王思远" />
                </span>
            </HeaderDropdown>
        </div>
    );
};

export default RightContent;
