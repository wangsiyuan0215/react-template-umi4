import React from 'react';
import classNames from 'classnames';

import styles from './index.less';

const toCamelCase = (s) => {
    if (typeof s !== 'string') return s;

    return s.replace(/(?:_|-)+(\w)/g, function _replace(_, b) {
        return b.toLocaleUpperCase();
    });
};

export const CustomIcon = ({ name, html, ...restProps }) => {
    if (html) {
        const $inner = document.querySelector(`#ico-${name}`);
        const attrs = $inner.getAttributeNames();
        const props = {
            ...restProps,
            ...attrs.reduce((acc, attr) => ({ ...acc, [toCamelCase(attr)]: $inner.getAttribute(attr) }), {})
        };
        if ($inner)
            return (
                <svg
                    {...props}
                    className={classNames(restProps.className, styles['host-icon'])}
                    dangerouslySetInnerHTML={{ __html: $inner.innerHTML }}
                />
            );
        return null;
    }
    return (
        <svg {...restProps} className={classNames(styles['host-icon'], restProps.className)}>
            <use xlinkHref={`#ico-${name}`} />
        </svg>
    );
};

export default CustomIcon;
