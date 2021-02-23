/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-13 09:35:10
 * @Description: useVisible
 */

import React from 'react';
import invariant from '@/utils/invariant';

const useVisible = (value, callBack, deps) => {
    invariant(
        typeof value === 'boolean',
        'useVisible: value is just supported boolean type and current type is %s.',
        Object.prototype.toString.call(value)
    );

    const [originalClassName] = React.useState(document.body.className);
    const [visible, setVisible] = React.useState(value);

    React.useEffect(
        () => {
            let result = null;
            if (visible || value) {
                result = (callBack && callBack()) || null;
                document.body.className = originalClassName.includes('body__overflow--hidden')
                    ? originalClassName
                    : `${originalClassName} body__overflow--hidden`;
            }

            return () => {
                /* eslint no-unused-expressions: 0 */
                typeof result === 'function' ? result() : null;
                document.body.className = originalClassName.replace(/ body__overflow--hidden/g, '');
            };
        },
        [visible, value, ...deps]
    );

    return [visible, setVisible];
};

export default useVisible;
