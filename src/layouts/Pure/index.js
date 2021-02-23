/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 14:01:08
 * @Description: pure layout without authority
 */

import React from 'react';
import classNames from 'classnames';
import DocumentTitle from 'react-document-title';
import { formatMessage } from 'umi-plugin-react/locale';
import { ContainerQuery } from 'react-container-query';

import { IsLarge, IsSmall } from '@/resources/constant';

import styles from './index.less';

/* eslint no-unused-vars: 0 */
const PureLayout = ({
    title = formatMessage({ id: 'title.default' }),
    children,
    wrapperClassName
}) => {
    return (
        <ContainerQuery
            query={{
                isSmall: { ...IsSmall },
                isLarge: { ...IsLarge }
            }}
        >
            {({ isSmall = false, isLarge = false }) => (
                <DocumentTitle title={title}>
                    <div className={classNames(styles.container, wrapperClassName)}>{children}</div>
                </DocumentTitle>
            )}
        </ContainerQuery>
    );
};

export default PureLayout;
