/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 15:10:28
 * @Description: SiderMenu
 */

import Link from 'umi/link';
import classNames from 'classnames';
import { formatMessage } from 'umi-plugin-react/locale';
import { Button, Drawer, Icon } from 'antd';
import React, { PureComponent, Suspense } from 'react';

import Avatar from '@/components/Common/Avatar';
import Loading, { LoadingWrapper } from '@/components/Common/Loading';
import { getDefaultCollapsedSubMenus } from './MenuUtils';

import styles from './index.less';

const BaseMenu = React.lazy(() => import('./BaseMenu'));

export default class SiderMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
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

    onClose4drawer = () => this.setState({ visible: false });

    renderMenus4mobile = () => {
        const { visible, openKeys } = this.state;
        const { title, isMobile, isLarge, loading } = this.props;

        return isMobile ? (
            <Drawer
                className={styles['menu__drawer--mobile']}
                placement="left"
                closable={false}
                onClose={this.onClose4drawer}
                visible={visible}
            >
                <div className={styles.close__container}>
                    {title ? <h1 className={styles.title}>{title}</h1> : null}
                    <Button onClick={this.onClose4drawer} className={styles.btn__close}>
                        <Icon className={styles.icon__close} type="close" />
                    </Button>
                </div>
                <BaseMenu
                    {...this.props}
                    mode="inline"
                    style={{ width: '100%' }}
                    openKeys={openKeys}
                    onOpenChange={this.handleOpenChange}
                    handleOpenChange={this.handleOpenChange}
                />
            </Drawer>
        ) : (
            <>
                <LoadingWrapper spinning={loading}>
                    <BaseMenu
                        {...this.props}
                        mode={isLarge ? 'horizontal' : 'inline'}
                        style={{ padding: '16px 0', width: '100%' }}
                        openKeys={openKeys}
                        onOpenChange={this.handleOpenChange}
                        handleOpenChange={this.handleOpenChange}
                    />
                </LoadingWrapper>
                {isLarge ? (
                    <div className={styles.avatar__container}>
                        <span>{formatMessage({ id: 'header.account.welcome' })}</span>
                        <Avatar className={styles.avatar} size={44} name="王思远" />
                    </div>
                ) : null}
            </>
        );
    };

    render() {
        const { logo, title, isMobile } = this.props;

        return (
            <div
                className={classNames(
                    styles.menu__container,
                    isMobile ? styles['menu__container--mobile'] : null
                )}
            >
                {isMobile ? (
                    <Button
                        className={styles['btn__menu--mobile']}
                        onClick={() => this.setState({ visible: true })}
                    >
                        <Icon type="menu" />
                    </Button>
                ) : null}
                <div className={styles.logo__container} id="logo">
                    {logo ? (
                        <Link className={styles.logo} to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    ) : null}
                    {!isMobile && title ? <h1 className={styles.title}>{title}</h1> : null}
                </div>
                {isMobile ? <Avatar className={styles.avatar} size={36} name="王思远" /> : null}
                <Suspense fallback={<Loading />}>{this.renderMenus4mobile()}</Suspense>
            </div>
        );
    }
}
