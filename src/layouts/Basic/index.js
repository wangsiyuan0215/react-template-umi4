/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 14:05:15
 * @Description: index
 */

import equals from 'ramda/src/equals';
import SiderMenu from '@/components/SiderMenu';
import memoizeOne from 'memoize-one';
import { Layout } from 'antd';
import classNames from 'classnames';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import DocumentTitle from 'react-document-title';
import { formatMessage } from 'umi-plugin-react/locale';
import React, { createContext } from 'react';

import Bread from './Breadcrumb';
import Header from './Header';
import Footer from '../Pure/Footer';
import styles from './index.less';

const { Content } = Layout;
const Context = createContext();

class BasicLayout extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getPageTitle = memoizeOne(this.getPageTitle);
        this.matchParamsPath = memoizeOne(this.matchParamsPath, equals);
    }

    componentDidMount() {
        const {
            location,
            route: { routes, authority },
            init,
            fetchMenuData
        } = this.props;
        init(location);
        fetchMenuData(routes, authority);
    }

    getContext() {
        const { location, breadcrumbNameMap } = this.props;
        return {
            location,
            breadcrumbNameMap
        };
    }

    matchParamsPath = (pathname, breadcrumbNameMap) => {
        const pathKey = Object.keys(breadcrumbNameMap).find(key =>
            pathToRegexp(key).test(pathname)
        );
        return breadcrumbNameMap[pathKey];
    };

    getPageTitle = (pathname, breadcrumbNameMap) => {
        const currRouterData = this.matchParamsPath(pathname, breadcrumbNameMap);

        if (!currRouterData) {
            return 'Nice to Meet You';
        }
        const pageName = formatMessage({
            id: currRouterData.locale || currRouterData.name,
            defaultMessage: currRouterData.name
        });

        return `${pageName} - NtMY`;
    };

    getLayoutStyle = () => {
        const { isMobile, collapsed } = this.props;
        if (!isMobile) return { paddingLeft: collapsed ? '80px' : '220px' };
        return null;
    };

    render() {
        const {
            children,
            location: { pathname },
            menuData,
            // collapsed,
            allMenuData,
            breadcrumbNameMap,
            changeLayoutCollapsed
        } = this.props;

        const layout = (
            <Layout>
                <SiderMenu
                    // logo={collapsed ? logoSmall : logo}
                    theme="dark"
                    onCollapse={changeLayoutCollapsed}
                    menuData={menuData}
                    {...this.props}
                />
                <Layout style={{ ...this.getLayoutStyle(), minHeight: '100vh' }}>
                    <Header
                        menuData={menuData}
                        handleMenuCollapse={changeLayoutCollapsed}
                        // logo={isMobile ? logoSmall : logo}
                        {...this.props}
                    />
                    <Content className={styles.content}>
                        <Bread routes={allMenuData} />
                        {children}
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        );
        return (
            <React.Fragment>
                <DocumentTitle title={this.getPageTitle(pathname, breadcrumbNameMap)}>
                    {params => (
                        <Context.Provider value={this.getContext()}>
                            <div className={classNames(params)}>{layout}</div>
                        </Context.Provider>
                    )}
                </DocumentTitle>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ global, menu }) => ({
    menuData: menu.menuData,
    collapsed: global.collapsed,
    allMenuData: menu.allMenuData,
    breadcrumbNameMap: menu.breadcrumbNameMap
});

const mapDispatchToProps = dispatch => ({
    init: location => dispatch({ type: 'global/authentication', payload: location }),
    fetchMenuData: (routes, authority) =>
        dispatch({ type: 'menu/getMenuData', payload: { routes, authority } }),
    changeLayoutCollapsed: collapsed =>
        dispatch({
            type: 'global/changeLayoutCollapsed',
            payload: collapsed
        }),
    logout: () => dispatch({ type: 'user/logout' })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BasicLayout);
