/*
 * @Author: SiYuan Wang
 * @Date: 2019-05-06 09:25:31
 * @Description: index
 */

import React from 'react';
import PropTypes from 'prop-types';

const AsyncIcon = ({ iconName, ...restProps }) => {
    if (!iconName || typeof iconName !== 'string') return null;

    const [Component, setComponent] = React.useState(false);

    const fetchIconComponent = async name => {
        const result = await import(`@/components/Business/Icons/${name}`);

        try {
            // eslint-disable-next-line no-unused-expressions
            setComponent(() => result.default);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(`AsyncIcon [${name}] in SideMenu:`, error);
            throw error;
        }
    };

    React.useEffect(
        () => {
            // eslint-disable-next-line no-unused-expressions
            iconName && fetchIconComponent(iconName);
        },
        [iconName]
    );

    // console.log(Component);
    // console.log(restProps);

    return Component ? <Component {...restProps} /> : null;
};

AsyncIcon.propTypes = {
    // eslint-disable-next-line react/require-default-props
    iconName: PropTypes.string
};

export default AsyncIcon;
