import { message } from 'antd';
import createLoading from 'dva-loading';

import userApis from '@/services/common/user';
import accessHelper from '@/utils/helpers/accessHelper';
import dvaEffectHelper from '@/utils/helpers/dvaEffectHelper';
import { requireAllFile } from '@/utils';
import { _ as onError, errorCreator } from '@/utils/helpers/errorHelper';

import '@/utils/version';
import '@/assets/sprite';
// Tailwindcss styles
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css';

/** @typedef ICONFONT_JS_URL */
// ICONFONT_JS_URL && CustomIcon.setScriptUrl(ICONFONT_JS_URL);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
requireAllFile(require.context('@/assets/icons', false, /\.svg$/));

// eslint-disable-next-line import/prefer-default-export
export const dva = {
    config: {
        onError: onError(message, undefined),
        onEffect: dvaEffectHelper({ errorCreator }, createLoading({ effects: true }))
    }
};

export async function getInitialState() {
    // welcome.render(document.querySelector('#root'));
    try {
        const [user] = await Promise.all([userApis.getUserInfo()]);
        return [accessHelper(user), /* true for update quick setting and access */ true];
    } catch (e) {
        // welcome.unmount();
        return undefined;
    }
}
