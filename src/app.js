/*
 * @Date: 2019-05-06 09:22:20
 * @Description: app
 */

import createLoading from 'dva-loading';
import dvaEffectHelper from '@/utils/helpers/dvaEffectHelper';
import { _ as onError, errorCreator } from '@/utils/helpers/errorHelper';

/** @typedef ICONFONT_JS_URL */
/* eslint no-unused-expressions: ["off"] */
// ICONFONT_JS_URL && CustomIcon.setScriptUrl(ICONFONT_JS_URL);

const loading = createLoading({ effects: true });

// eslint-disable-next-line import/prefer-default-export
export const dva = {
    config: {
        onError,
        onEffect: dvaEffectHelper({ errorCreator }, loading)
    }
};
