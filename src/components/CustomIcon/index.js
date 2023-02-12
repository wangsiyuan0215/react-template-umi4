import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import classNames from 'classnames';

import styles from './index.less';

const CustomIcon = ({ type = null, style = {}, className }) => {
    const { fontSize, color, ...restStyles } = style || {};

    return (
        <i style={{ fontSize, color, ...restStyles }} className={classNames(styles.icon, className)}>
            <svg fill="currentColor" width="1em" height="1em" focusable={false} viewBox="0 0 1024 1024">
                <use xlinkHref={`#icon-${type}`} />
            </svg>
        </i>
    );
};

const toCamelCase = (s) => {
    if (typeof s !== 'string') return s;

    return s.replace(/(?:_|-)+(\w)/g, function _replace(_, b) {
        return b.toLocaleUpperCase();
    });
};

export const HostSvg = ({ name, html, ...restProps }) => {
    if (html) {
        const $inner = document.querySelector(`#ico-${name}`);
        const attrs = $inner.getAttributeNames();
        const props = {
            ...restProps,
            ...attrs.reduce((acc, attr) => ({ ...acc, [toCamelCase(attr)]: $inner.getAttribute(attr) }), {})
        };
        if ($inner) return <svg {...props} dangerouslySetInnerHTML={{ __html: $inner.innerHTML }} />;
        return null;
    }
    return (
        <svg {...restProps}>
            <use xlinkHref={`#ico-${name}`} />
        </svg>
    );
};

export default CustomIcon;
