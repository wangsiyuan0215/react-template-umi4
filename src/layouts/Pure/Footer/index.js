/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 13:57:35
 * @Description: Footer for layout
 */
import { Layout, Icon } from 'antd';
import { GlobalFooter } from 'ant-design-pro';
import packageObjFromJson from 'root/package';
import React, { Fragment } from 'react';

const { Footer: FooterWrapper } = Layout;

const copyright = (
    <Fragment>
        copyright <Icon type="copyright" /> nice to meet you.
        <br />
        current version is v{packageObjFromJson.version}.
    </Fragment>
);

const Footer = () => (
    <FooterWrapper style={{ padding: 0, margin: '20px auto' }}>
        <GlobalFooter copyright={copyright} />
    </FooterWrapper>
);
export default Footer;
