/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 16:41:22
 * @Description: index
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import HeaderComponent from '@/components/Common/Header';

const { Header: HeaderWrapper } = Layout;

const Header = props => (
    <HeaderWrapper
        style={{
            position: 'fixed',
            top: 0,
            zIndex: 100,
            width: 'calc(100% - 226px)',
            padding: 0
        }}
    >
        <HeaderComponent {...props} />
    </HeaderWrapper>
);

Header.propTypes = {
    user: PropTypes.object
};
Header.defaultProps = {
    user: {}
};

export default Header;
