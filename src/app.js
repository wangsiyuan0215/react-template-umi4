/*
 * @Date: 2019-05-06 09:22:20
 * @Description: app
 */

import { message } from 'antd';
import createLoading from 'dva-loading';

import dvaEffectHelper from '@/utils/helpers/dvaEffectHelper';
import { requireAllFile } from '@/utils/utils';
import { ErrorFromTypes } from '@/resources/constant';
import { _ as onError, errorCreator } from '@/utils/helpers/errorHelper';

/** @typedef ICONFONT_JS_URL */
/* eslint no-unused-expressions: ["off"] */
// ICONFONT_JS_URL && CustomIcon.setScriptUrl(ICONFONT_JS_URL);

requireAllFile(require.context('@/assets/icons', false, /\.svg$/));

const interceptors = (error, dispatch) => {
    const { actionType = '', from } = error;

    switch (actionType) {
        case 'user/login':
            if (from === ErrorFromTypes.REQUEST) {
                dispatch({ type: 'user/fetchingAuthCode' });
            }
            return true;
        default:
            return true;
    }
};

// eslint-disable-next-line import/prefer-default-export
export const dva = {
    config: {
        onError: onError(message, interceptors),
        onEffect: dvaEffectHelper({ errorCreator }, createLoading({ effects: true }))
    }
};
