/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 17:12:16
 * @Description: RightContent of Header Component
 */

import React from 'react';
import classNames from 'classnames';
import { Menu, Icon, Dropdown } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

import Avatar from '@/components/Common/Avatar';
import { LoadingWrapper } from '@/components/Common/Loading';

import { ClickParam } from 'root/node_modules/antd/es/menu';
import { Keys4dropdown } from '@/models/user';

const styles = require('./index.less');

interface IProps {
    user: any;
    menus: Keys4dropdown[];
    loading?: boolean;
    className?: string
    textClassName?: string,
    onClick4dropdown: (param: Partial<ClickParam>) => void
}

const RightContent: React.FC<IProps> = ({
    user = {},
    menus = [],
    loading = false,
    className,
    textClassName,
    onClick4dropdown
}) => {
    const menu = (
        <Menu className={styles.menu} selectedKeys={[]} onClick={onClick4dropdown}>
            {menus.map(key => (
                <Menu.Item key={key}>
                    <Icon type={key} />
                    <FormattedMessage id={`header.dropdown.${key}`} defaultMessage={key} />
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div className={classNames(styles.right, className)}>
            <LoadingWrapper spinning={loading}>
                <Dropdown
                    overlay={menu}
                    placement="bottomRight"
                    overlayClassName={styles.dropdown__container}
                >
                    <span className={styles.account}>
                        <span className={textClassName}>
                            {formatMessage({ id: 'header.account.welcome' })}
                        </span>
                        <Avatar className={styles.avatar} size={44} name={user.name || '王思远'} />
                    </span>
                </Dropdown>
            </LoadingWrapper>
        </div>
    );
};

export default RightContent;
