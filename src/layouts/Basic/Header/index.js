/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 16:41:22
 * @Description: index
 */
import React from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import Animate from 'rc-animate';
import PropTypes from 'prop-types';

import HeaderComponent from '@/components/Header';

const { Header: HeaderWrapper } = Layout;

const Header = props => {
    const getHeadWidth = () => {
        const { isMobile, collapsed } = props;
        if (isMobile) return '100%';
        return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 220px)';
    };
    const { onCompanyChange, handleMenuCollapse } = props;
    const width = getHeadWidth();
    return (
        <Animate component="" transitionName="fade">
            <HeaderWrapper style={{ padding: 0, width, position: 'fixed', zIndex: 1040 }}>
                <HeaderComponent
                    onCollapse={handleMenuCollapse}
                    onCompanyChange={onCompanyChange}
                    {...props}
                />
            </HeaderWrapper>
        </Animate>
    );
};

Header.propTypes = {
    user: PropTypes.object,
    isMobile: PropTypes.bool,
    collapsed: PropTypes.bool,
    handleMenuCollapse: PropTypes.func
};
Header.defaultProps = {
    user: {},
    isMobile: false,
    collapsed: false,
    handleMenuCollapse: () => {}
};

const mapStateToProps = ({ user, global }) => ({
    user: user.user,
    collapsed: global.collapsed
});

const mapDispatchToProps = dispatch => ({
    onCompanyChange: value =>
        dispatch({ type: 'user/savingCompanyIdForCompanyRole', payload: { value } })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
