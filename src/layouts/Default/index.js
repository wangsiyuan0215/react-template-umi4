/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 14:05:15
 * @Description: index
 */

import equals from 'ramda/src/equals';
import classNames from 'classnames';
import memoizeOne from 'memoize-one';
import { Layout } from 'antd';
import pathToRegexp from 'path-to-regexp';
import DocumentTitle from 'react-document-title';
import { formatMessage } from 'umi-plugin-react/locale';
import { ContainerQuery } from 'react-container-query';
import React, { createContext } from 'react';

import Logo from '@/assets/logo@2x.png';
import Footer from '@/components/Common/Footer';
import HeaderHOF from '@/HOFs/layouts/HeaderHOF';
import BreadcrumbHOF from '@/HOFs/layouts/BreadcrumbHOF';
import DefaultLayoutHOF from '@/HOFs/layouts/DefaultHOF';
import { IsLarge, IsSmall } from '@/resources/constant';

import Menu from '../Components/Menu';
import Breadcrumb from '../Components/Breadcrumb';
import HeaderComponent from '../Components/Header';

import styles from './index.less';

const { Content } = Layout;

const Bread = BreadcrumbHOF(Breadcrumb);
const Header = HeaderHOF(HeaderComponent);
const Context = createContext();

class DefaultLayout extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getPageTitle = memoizeOne(this.getPageTitle);
        this.matchParamsPath = memoizeOne(this.matchParamsPath, equals);
    }

    componentDidMount() {
        const {
            route: { routes, authority },
            location,
            fetchMenuData,
            authentication
        } = this.props;
        authentication(location);
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

        return formatMessage({
            id:
                (currRouterData && (currRouterData.locale || currRouterData.name)) ||
                'title.default',
            defaultMessage: (currRouterData && currRouterData.name) || ''
        });
    };

    renderLayout = ({ isSmall, isLarge }) => {
        const {
            user,
            children,
            location,
            menuData,
            allMenuData,
            loading4menu,
            loading4right,
            keys4dropdown,
            onClick4dropdownInHeader
        } = this.props;

        return (
            <Layout
                className={classNames(styles.container, isSmall && styles['container--mobile'])}
            >
                <Menu
                    user={user}
                    logo={Logo}
                    title={formatMessage({ id: 'title.default' })}
                    isLarge={isLarge}
                    loading={loading4menu}
                    location={location}
                    isMobile={isSmall}
                    menuData={menuData}
                    inlineIndent={24}
                    loading4right={loading4right}
                    keys4dropdown={keys4dropdown}
                    onclick4dropdown={onClick4dropdownInHeader}
                />
                <Layout className={styles.container__inner}>
                    {!isSmall ? <Header /> : null}
                    <Bread routes={allMenuData} location={location} />
                    <Content className={styles.content}>
                        <div className={styles.content__inner}>{children}</div>
                        <Footer />
                    </Content>
                </Layout>
            </Layout>
        );
    };

    render() {
        const { location, breadcrumbNameMap } = this.props;
        const { pathname } = location;

        return (
            <React.Fragment>
                <ContainerQuery
                    query={{
                        isSmall: { ...IsSmall },
                        isLarge: { ...IsLarge }
                    }}
                >
                    {({ isSmall = false, isLarge = false }) => (
                        <DocumentTitle title={this.getPageTitle(pathname, breadcrumbNameMap)}>
                            <Context.Provider value={this.getContext()}>
                                {this.renderLayout({ isSmall, isLarge })}
                            </Context.Provider>
                        </DocumentTitle>
                    )}
                </ContainerQuery>
            </React.Fragment>
        );
    }
}

export default DefaultLayoutHOF(DefaultLayout);
