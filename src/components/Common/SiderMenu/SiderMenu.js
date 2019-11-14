/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 15:10:28
 * @Description: SiderMenu
 */

import Link from 'umi/link';
import { Layout } from 'antd';
import React, { PureComponent, Suspense } from 'react';

import Loading from '@/components/Common/Loading';
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
        const { logo, title } = this.props;
        const { openKeys } = this.state;

        return (
            <Sider width={226} trigger={null} breakpoint="lg" className={styles.sider}>
                <div className={styles.logo__container} id="logo">
                    {logo ? (
                        <Link className={styles.logo} to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    ) : null}
                    {title ? <h1 className={styles.title}>{title}</h1> : null}
                </div>
                <Suspense fallback={<Loading />}>
                    <BaseMenu
                        {...this.props}
                        mode="inline"
                        style={{ padding: '16px 0', width: '100%' }}
                        openKeys={openKeys}
                        onOpenChange={this.handleOpenChange}
                        handleOpenChange={this.handleOpenChange}
                    />
                </Suspense>
            </Sider>
        );
    }
}
