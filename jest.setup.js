/*
 * @Author: siyuan.wang
 * @Date: 2020/12/8 9:34 AM
 * @Description: jest.setup
 */
/* eslint-disable import/no-extraneous-dependencies */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });
