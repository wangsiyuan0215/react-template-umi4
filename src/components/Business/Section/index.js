/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-31 10:40:27
 * @Description: Section
 */

import React from 'react';
import classNames from 'classnames';

import styles from './index.less';

const Section = ({
    id,
    title,
    children,
    titleClassName,
    innerClassName,
    headerClassName,
    wrapperClassName
}) => {
    const renderTitle = () =>
        title ? (
            <header className={classNames(styles.header, headerClassName)}>
                <h2 className={classNames(styles.title, titleClassName)}>{title}</h2>
            </header>
        ) : null;

    const renderContent = () => (
        <div className={classNames(styles.inner, innerClassName)}>{children}</div>
    );

    return (
        <section id={id} className={classNames(styles.container, wrapperClassName)}>
            {renderTitle()}
            {renderContent()}
        </section>
    );
};

export default Section;
