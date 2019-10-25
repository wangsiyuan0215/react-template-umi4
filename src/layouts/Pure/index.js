/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 14:01:08
 * @Description: pure layout without authority
 */

import React from 'react';
import Media from 'react-media';
import DocumentTitle from 'react-document-title';

import Footer from './Footer';

import styles from './index.less';

const PureLayout = props => {
    const getPageTitle = () => 'Login -  NtMY';
    const { children } = props;
    return (
        <DocumentTitle title={getPageTitle()}>
            <div className={styles.container}>
                {children}
                <section className={styles.footerContainer}>
                    <Footer />
                </section>
            </div>
        </DocumentTitle>
    );
};

export default props => (
    <Media query="(max-width: 599px)">
        {isMobile => <PureLayout {...props} isMobile={isMobile} />}
    </Media>
);
