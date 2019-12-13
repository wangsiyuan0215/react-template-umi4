/*
 * @Editor: SiYuan Wang
 * @Date: 2019-08-29 17:06:01
 * @Description: index
 */
import React from 'react';

import Menu from './Menu';
import { getFlatMenuKeys } from './MenuUtils';

const MenuWrapper = React.memo(props => {
    const { menuData } = props;
    const flatMenuKeys = getFlatMenuKeys(menuData);
    return <Menu {...props} flatMenuKeys={flatMenuKeys} />;
});

export default MenuWrapper;
