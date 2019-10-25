/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 15:10:28
 * @Description: SiderMenu
 */

import Link from 'umi/link';
import { Layout } from 'antd';
import classNames from 'classnames';
import React, { PureComponent, Suspense } from 'react';

import Loading from '@/components/Loading';
import { getDefaultCollapsedSubMenus } from './SiderMenuUtils';

import styles from './index.less';

const BaseMenu = React.lazy(() => import('./BaseMenu'));
const { Sider } = Layout;

export default class SiderMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: getDefaultCollapsedSubMenus(props)
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { pathname } = state;
        if (props.location.pathname !== pathname) {
            return {
                pathname: props.location.pathname,
                openKeys: getDefaultCollapsedSubMenus(props)
            };
        }
        return null;
    }

    isMainMenu = key => {
        const { menuData } = this.props;
        return menuData.some(item => {
            if (key) {
                return item.key === key || item.path === key;
            }
            return false;
        });
    };

    handleOpenChange = openKeys => {
        const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
        this.setState({
            openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys]
        });
    };

    render() {
        const { logo, collapsed, onCollapse, theme } = this.props;
        const { openKeys } = this.state;
        const defaultProps = collapsed ? {} : { openKeys };

        const siderClassName = classNames(styles.sider, styles.fixSiderbar, {
            [styles.light]: theme === 'light'
        });
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                onCollapse={onCollapse}
                width={220}
                theme="dark"
                className={siderClassName}
            >
                <div className={styles.logo} id="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <Suspense fallback={<Loading />}>
                    <BaseMenu
                        {...this.props}
                        mode="inline"
                        handleOpenChange={this.handleOpenChange}
                        onOpenChange={this.handleOpenChange}
                        style={{ padding: '16px 0', width: '100%' }}
                        {...defaultProps}
                    />
                </Suspense>
            </Sider>
        );
    }
}
