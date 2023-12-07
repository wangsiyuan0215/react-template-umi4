import { Layout } from 'antd';
import React, { useState, useEffect } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Outlet, useDispatch, FormattedMessage } from '@umijs/max';

import routes from '@/routes';
import LogoImage from '@/assets/images/logo.png';

import Menus from './components/Menus';
import styles from './style.scss';

const { Header, Sider, Content } = Layout;

const DefaultLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'menu/getMenuData', payload: { routes } });
    }, []);

    return (
        <Layout className="h-full">
            <Sider trigger={null} collapsible collapsed={collapsed} width={250} collapsedWidth={68}>
                <div
                    className={`relative flex items-center gap-x-4 p-6 h-16 text-[24px] leading-8 text-center text-white truncate ${
                        collapsed ? 'justify-center !p-4' : ''
                    }`}
                >
                    <img src={LogoImage} alt="" className="w-8 h-8" />
                    {collapsed ? null : <FormattedMessage id="app.document.title" />}
                </div>
                <Menus className={`mt-4 ${styles.menus}`} />
            </Sider>
            <Layout className="site-layout">
                <Header className="!bg-white text-[18px] !px-6">
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger hover:text-blue-500',
                        onClick: () => setCollapsed(!collapsed)
                    })}
                </Header>
                <Content className="bg-gray-100 p-4">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;
