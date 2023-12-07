import React from 'react';
import classNames from 'classnames';

import styles from './index.scss';

export const CustomIcon = ({ name, ...restProps }) => {
    return (
        <svg {...restProps} className={classNames(styles['host-icon'], restProps.className)}>
            <use xlinkHref={`#ico-${name}`} />
        </svg>
    );
};

export default CustomIcon;
