/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 14:01:08
 * @Description: pure layout without authority
 */

import React from 'react';
import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';

import constant from '@/resources/constant';

import Footer from '../Components/Footer';

import styles from './index.less';

const { containerQueries } = constant;

/* eslint no-unused-vars: 0 */
const PureLayout = props => {
    const getPageTitle = () => 'Login -  NtMY';
    const { children } = props;
    return (
        <ContainerQuery query={containerQueries}>
            {({ isMobile = false }) => (
                <DocumentTitle title={getPageTitle()}>
                    <div className={styles.container}>
                        {children}
                        <section className={styles.footerContainer}>
                            <Footer />
                        </section>
                    </div>
                </DocumentTitle>
            )}
        </ContainerQuery>
    );
};

export default PureLayout;
