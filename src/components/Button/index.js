/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-21 06:19:47
 * @Description: Button
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button as ButtonAntd } from 'antd';

import { LoadingWrapper } from '@/components/Loading';

import styles from './index.less';

const Button = props => {
    const { wrapperClassName, buttonClassName, loading = false, children, ...restProps } = props;
    return (
        <div className={classNames(wrapperClassName || null, styles.container)}>
            <LoadingWrapper wrapperClassName={styles.loadingWrapper} spinning={loading}>
                <ButtonAntd
                  className={classNames(buttonClassName || null)}
                  {...restProps}
                >
                    {children}
                </ButtonAntd>
            </LoadingWrapper>
        </div>
    );
};

Button.propTypes = {
    wrapperClassName: PropTypes.string,
    buttonClassName: PropTypes.string,
    loading: PropTypes.bool
};

Button.defaultProps = {
    wrapperClassName: null,
    buttonClassName: null,
    loading: false
};

export default Button;
