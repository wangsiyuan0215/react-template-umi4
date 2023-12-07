import { message } from 'antd';
import createLoading from 'dva-loading';

import userApis from '@/services/common/user';
import accessHelper from '@/utils/helpers/accessHelper';
import dvaEffectHelper from '@/utils/helpers/dvaEffectHelper';
import { _ as onError, errorCreator } from '@/utils/helpers/errorHelper';

import 'antd/lib/style/themes/default.less';
import './global.scss';
import '@/utils/version';
import '@/assets/sprite';

// eslint-disable-next-line import/prefer-default-export
export const dva = {
    config: {
        onError: onError(message, undefined),
        onEffect: dvaEffectHelper({ errorCreator }, createLoading({ effects: true }))
    }
};

export async function getInitialState() {
    try {
        const [user] = await Promise.all([userApis.getUserInfo()]);
        return [accessHelper(user)];
    } catch (e) {
        return undefined;
    }
}
