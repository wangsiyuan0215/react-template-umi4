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
import Menu from '@/components/Common/Menu';
import constant from '@/resources/constant';
import HeaderHOF from '@/HOFs/layouts/HeaderHOF';
import BreadcrumbHOF from '@/HOFs/layouts/BreadcrumbHOF';
import DefaultLayoutHOF from '@/HOFs/layouts/DefaultHOF';

import Footer from '../Components/Footer';
import Breadcrumb from '../Components/Breadcrumb';
import HeaderComponent from '../Components/Header';

import styles from './index.less';

const { Content } = Layout;

const Bread = BreadcrumbHOF(Breadcrumb);
const Header = HeaderHOF(HeaderComponent);
const Context = createContext();

const { containerQueries } = constant;

class DefaultLayout extends React.PureComponent {
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

        return formatMessage({
            id:
                (currRouterData && (currRouterData.locale || currRouterData.name)) ||
                'title.default',
            defaultMessage: (currRouterData && currRouterData.name) || ''
        });
    };

    renderLayout = ({ isSmall, isLarge }) => {
        const { children, location, menuData, loading4menu, allMenuData } = this.props;

        return (
            <Layout
                className={classNames(styles.container, isSmall && styles['container--mobile'])}
            >
                <Menu
                    logo={Logo}
                    title={formatMessage({ id: 'title.default' })}
                    isLarge={isLarge}
                    loading={loading4menu}
                    isMobile={isSmall}
                    menuData={menuData}
                    inlineIndent={24}
                    {...this.props}
                />
                <Layout className={styles.container__inner}>
                    {!isSmall ? <Header {...this.props} /> : null}
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
                <ContainerQuery query={containerQueries}>
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
