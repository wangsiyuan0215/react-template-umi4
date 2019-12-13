/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 16:41:22
 * @Description: index
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import RightContent from '@/components/Common/RightContent/index';

import styles from './index.less';

const { Header: HeaderWrapper } = Layout;

const Header = ({ user, keys4dropdown = [], onClick4dropdown, ...restProps }) => {
    return (
        <HeaderWrapper
            style={{
                position: 'fixed',
                top: 0,
                zIndex: 100,
                width: 'calc(100% - 226px)',
                padding: 0
            }}
        >
            <div className={styles.header}>
                <RightContent
                    {...restProps}
                    user={user}
                    menus={keys4dropdown}
                    onClick4dropdown={onClick4dropdown}
                />
            </div>
        </HeaderWrapper>
    );
};

Header.propTypes = {
    user: PropTypes.object,
    keys4dropdown: PropTypes.array
};

Header.defaultProps = {
    user: {},
    keys4dropdown: []
};

export default Header;
