/*
 * @Author: siyuan.wang
 * @Date: 2020/12/8 10:00 AM
 * @Description: login.test
 */
import React from 'react';
import { shallow } from 'enzyme';

import Login from '@/pages/user/login/index';

describe('Testing Login Page', () => {
    it('render', () => {
        const login = shallow(<Login />);

    });
});
