import { Layout } from 'antd';
import React, { useState, useEffect } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Outlet, useDispatch, FormattedMessage } from '@umijs/max';

import routes from '@/routes';

import Menus from './components/Menus';

const { Header, Sider, Content } = Layout;

const DefaultLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'menu/getMenuData', payload: { routes } });
    }, []);

    return (
        <Layout className="h-full">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="relative p-4 h-16 text-[30px] leading-8 text-center text-white uppercase">
                    <FormattedMessage id="app.document.title" />
                </div>
                <Menus className="mt-4" />
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
