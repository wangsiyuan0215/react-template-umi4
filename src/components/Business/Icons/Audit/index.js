/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-27 16:35:29
 * @Description: index
 */
import React from 'react';
import logoImg from './logo_audit.png';

export default ({ className = '', style = {} }) => (
    <img src={logoImg} alt="icon" className={className} style={style} />
);
