/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-26 16:53:44
 * @Description: section wrapper component
 */

import React from 'react';

import styles from './index.less';

const Section = props => {
    const { children, className = null } = props;
    return (
        <section className={`${styles.container} ${className || ''}`}>
            {children}
        </section>
    );
};

const Header = props => {
    const { title, className = null } = props;
    return (
        <header className={`${styles.header} ${className || ''}`}>
            <h1>{title}</h1>
        </header>
    );
};

Section.Header = Header;

export default Section;
