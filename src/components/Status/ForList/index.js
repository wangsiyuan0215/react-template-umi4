/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-18 13:43:49
 * @Description: Status for list
 */
import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import styles from './index.less';

const defaultBgColor = 'rgba(184, 233, 134, 0.7)';

const Status4List = props => {
    const { wrapperClassName, textClassName, color, text } = props;

    return (
        <span className={ClassNames(styles.status, wrapperClassName)}>
            <span
                className={styles.statusIndicator}
                style={{ backgroundColor: color || defaultBgColor }}
            />
            <span className={ClassNames(styles.statusText, textClassName)}>{text}</span>
        </span>
    );
};

Status4List.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    textClassName: PropTypes.string,
    wrapperClassName: PropTypes.string
};

Status4List.defaultProps = {
    text: 'active',
    color: defaultBgColor,
    textClassName: null,
    wrapperClassName: null
};

export default Status4List;
