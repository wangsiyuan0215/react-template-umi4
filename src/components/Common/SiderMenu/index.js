/*
 * @Editor: SiYuan Wang
 * @Date: 2019-08-29 17:06:01
 * @Description: index
 */
import React from 'react';
import SiderMenu from './SiderMenu';
import { getFlatMenuKeys } from './SiderMenuUtils';

const SiderMenuWrapper = React.memo(props => {
    const { menuData } = props;
    const flatMenuKeys = getFlatMenuKeys(menuData);
    return <SiderMenu {...props} flatMenuKeys={flatMenuKeys} />;
});

export default SiderMenuWrapper;
