/*
 * @Editor: SiYuan Wang
 * @Date: 2019-09-02 17:27:01
 * @Description: index
 */

import React from 'react';
import img from './index.png';

export default function Icon(props = {}) {
    const { className = '', style = {} } = props;
    return <img src={img} alt="icon" className={className} style={style} />;
}
