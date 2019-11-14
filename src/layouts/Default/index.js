/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 14:05:15
 * @Description: index
 */

import equals from 'ramda/src/equals';
import memoizeOne from 'memoize-one';
import { Layout } from 'antd';
import pathToRegexp from 'path-to-regexp';
import DocumentTitle from 'react-document-title';
import { formatMessage } from 'umi-plugin-react/locale';
import React, { createContext } from 'react';

// import Logo from '@/assets/logo@2x.png';
import SiderMenu from '@/components/Common/SiderMenu';
import BreadcrumbHOF from '@/HOFs/layouts/BreadcrumbHOF';
import DefaultLayoutHOF from '@/HOFs/layouts/DefaultHOF';

import Header from './Header';
import Footer from '../Pure/Footer';
import styles from './index.less';
import Breadcrumb from './Breadcrumb';

const { Content } = Layout;

const Bread = BreadcrumbHOF(Breadcrumb);
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

        return formatMessage({
            id:
                (currRouterData && (currRouterData.locale || currRouterData.name)) ||
                'title.default',
            defaultMessage: (currRouterData && currRouterData.name) || ''
        });
    };

    render() {
        const {
            children,
            location,
            menuData,
            // collapsed,
            allMenuData,
            breadcrumbNameMap
        } = this.props;
        const { pathname } = location;

        const layout = (
            <Layout className={styles.container}>
                <SiderMenu
                    logo=""
                    title={formatMessage({ id: 'title.default' })}
                    inlineIndent={24}
                    menuData={menuData}
                    {...this.props}
                />
                <Layout className={styles.container__inner}>
                    <Header
                        menuData={menuData}
                        // logo={isMobile ? logoSmall : logo}
                        {...this.props}
                    />
                    <Bread routes={allMenuData} location={location} />
                    <Content className={styles.content}>
                        <div className={styles.content__inner}>{children}</div>
                        <Footer />
                    </Content>
                </Layout>
            </Layout>
        );

        return (
            <React.Fragment>
                <DocumentTitle title={this.getPageTitle(pathname, breadcrumbNameMap)}>
                    <Context.Provider value={this.getContext()}>{layout}</Context.Provider>
                </DocumentTitle>
            </React.Fragment>
        );
    }
}

export default DefaultLayoutHOF(BasicLayout);
