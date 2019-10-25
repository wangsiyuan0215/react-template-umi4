/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 17:12:16
 * @Description: RightContent of Header Component
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import HeaderDropdown from '@/components/HeaderDropdown';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Select, Spin, Menu, Icon, Avatar } from 'antd';

import styles from './index.less';

const RightContent = props => {
    const { user, onMenuClick, onCompanyChange } = props;
    const menu = (
        <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
            <Menu.Item key="logout">
                <Icon type="logout" />
                <FormattedMessage id="menu.Common.Logout" defaultMessage="logout" />
            </Menu.Item>
        </Menu>
    );
    return (
        <div className={classNames(styles.right, styles.dark)}>
            {user.companies && user.authorities.length === 1 ? (
                <div className={styles.companyId}>
                    Current Company:
                    <Select value={user.primaryCompanyId} onChange={onCompanyChange}>
                        {user.companies.map(item => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
            ) : null}
            {user.displayName ? (
                <HeaderDropdown overlay={menu} placement="bottomCenter">
                    <span className={`${styles.action} ${styles.account}`}>
                        <span>Hi, </span>
                        <span>{user.displayName}</span>
                        <Avatar
                            size="large"
                            className={styles.avatar}
                            src={user.imageUrl}
                            alt="avatar"
                        />
                    </span>
                </HeaderDropdown>
            ) : (
                <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
            )}
        </div>
    );
};

RightContent.propTypes = {
    user: PropTypes.object
};

RightContent.defaultProps = {
    user: {}
};

export default RightContent;
