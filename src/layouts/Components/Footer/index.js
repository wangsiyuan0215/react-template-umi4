/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 13:57:35
 * @Description: Footer for layout
 */
import { Layout, Icon } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import packageObjFromJson from 'root/package';
import React, { Fragment } from 'react';

const { Footer: FooterWrapper } = Layout;

const copyright = (
    <Fragment>
        Copyright <Icon type="copyright" /> {formatMessage({ id: 'footer.company.copyright' })}
        <br />
        {formatMessage({ id: 'footer.version' })}V{packageObjFromJson.version}
    </Fragment>
);

const Footer = () => (
    <FooterWrapper
        style={{
            fontSize: 12,
            textAlign: 'center',
            padding: 0,
            margin: '20px auto',
            color: 'rgba(0, 0, 0, .3)'
        }}
    >
        {copyright}
    </FooterWrapper>
);
export default Footer;
