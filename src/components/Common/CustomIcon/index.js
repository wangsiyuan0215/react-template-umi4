/*
 * @Author: SiYuan Wang
 * @Date: 2019-05-06 09:25:31
 * @Description: index
 */

import React from 'react';
import { Icon } from 'antd';

let MyIcon = Icon;

const CustomIcon = props => <MyIcon {...props} />;

CustomIcon.setScriptUrl = url => {
    MyIcon = Icon.createFromIconfontCN({
        scriptUrl: url
    });
};

export default CustomIcon;
