/*
 * @Date: 2019-05-06 09:22:20
 * @Description: app
 */
import { message } from 'antd';
import createLoading from 'dva-loading';

import pack from '@root/package.json';
import accessHelper from '@/utils/helpers/accessHelper';
import dvaEffectHelper from '@/utils/helpers/dvaEffectHelper';
import { requireAllFile } from '@/utils';
import { authGetUserInfo } from '@/services/common/user';
import { _ as onError, errorCreator } from '@/utils/helpers/errorHelper';

import '@/assets/sprite';
// Tailwindcss styles
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css';

const { version, 'test-version': test } = pack;

/* eslint no-console: 0 */
console.log(`%c!${APP_NAME}!', 'color: #fff; font-size: 60px; font-weight: 700; background-color: #1a37ab;`);
console.log(
    // eslint-disable-next-line no-undef
    `%cenv: %c ${UMI_ENV.toUpperCase()} \n%cver: %c ${version}${!IS_PROD ? `-${test}` : ''} `,
    'color: #4d5661; font-size: 12px;',
    'color: #fff; font-weight: 700; font-size: 12px; line-height: 1.6; background-color: #14c670;',
    'color: #4d5661; font-size: 12px;',
    'color: #fff; font-weight: 700; font-size: 12px; line-height: 1.6; background-color: #fc800e;'
);

/** @typedef ICONFONT_JS_URL */
/* eslint no-unused-expressions: ["off"] */
// ICONFONT_JS_URL && CustomIcon.setScriptUrl(ICONFONT_JS_URL);
requireAllFile(require.context('@/assets/icons', false, /\.svg$/));

// eslint-disable-next-line import/prefer-default-export
export const dva = {
    config: {
        onError: onError(message, undefined),
        onEffect: dvaEffectHelper({ errorCreator }, createLoading({ effects: true }))
    }
};

// get user info as initial state
export async function getInitialState() {
    // welcome.render(document.querySelector('#root'));
    try {
        const [user] = await Promise.all([authGetUserInfo()]);
        return [accessHelper(user), /* true for update quick setting and access */ true];
    } catch (e) {
        // welcome.unmount();
        return undefined;
    }
}
