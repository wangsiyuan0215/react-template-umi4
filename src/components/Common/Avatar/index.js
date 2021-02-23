/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-30 14:04:55
 * @Description: Avatar
 */

import React from 'react';
import classNames from 'classnames';

import styles from './index.less';

const noop = () => {};

const isAllChinese = string => {
    return /^[\u4E00-\u9FA5]+$/.test(string);
};

const Avatar = ({ name, size = 32, className, onClick = noop }) => {
    const isChinese = isAllChinese(name);

    const firstName = name.slice(isChinese ? -2 : 0).codePointAt(0);
    const secondName = name.slice(isChinese ? -2 : 0).codePointAt(1);

    return (
        <div
            style={{ width: `${size}px`, height: `${size}px` }}
            onClick={onClick}
            className={classNames(styles.avatar__container, className)}
        >
            <span>{String.fromCodePoint(firstName).toUpperCase()}</span>
            <span>{String.fromCodePoint(secondName).toUpperCase()}</span>
        </div>
    );
};

export default Avatar;
