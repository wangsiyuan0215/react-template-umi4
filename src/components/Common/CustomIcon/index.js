/*
 * @Author: SiYuan Wang
 * @Date: 2019-05-06 09:25:31
 * @Description: index
 */

import React from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';

import styles from './index.less';

let MyIcon = Icon;

const CustomIcon = ({ type = null, style = {}, className }) => {
    const { fontSize, color, ...restStyles } = style || {};

    return (
        <i
            style={{ fontSize, color, ...restStyles }}
            className={classNames(styles.icon, className)}
        >
            <svg
                fill="currentColor"
                width="1em"
                height="1em"
                focusable={false}
                viewBox="0 0 1024 1024"
            >
                <use xlinkHref={`#icon-${type}`} />
            </svg>
        </i>
    );
};

CustomIcon.IconFont = MyIcon;

CustomIcon.setScriptUrl = url => {
    MyIcon = Icon.createFromIconfontCN({
        scriptUrl: url
    });
};

export default CustomIcon;
