/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-30 14:04:55
 * @Description: Avatar
 */

import React from 'react';
import classNames from 'classnames';

import styles from './index.less';

const noop = () => {};

const Avatar = ({ name, size = 32, className, onClick = noop }) => {
    const firstName = name.slice(-2).codePointAt(0);
    const secondName = name.slice(-2).codePointAt(1);

    return (
        <div
            style={{ width: `${size}px`, height: `${size}px` }}
            onClick={onClick}
            className={classNames(styles.avatar__container, className)}
        >
            <span>{String.fromCodePoint(firstName)}</span>
            <span>{String.fromCodePoint(secondName)}</span>
        </div>
    );
};

export default Avatar;
