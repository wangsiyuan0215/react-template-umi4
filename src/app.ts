import { message } from 'antd';
import createLoading from 'dva-loading';

import userApis from '@/services/common/user';
import accessHelper from '@/utils/helpers/accessHelper';
import dvaEffectHelper from '@/utils/helpers/dvaEffectHelper';
import { _ as onError, errorCreator } from '@/utils/helpers/errorHelper';

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
    // welcome.render(document.querySelector('#root'));
    try {
        const [user] = await Promise.all([userApis.getUserInfo()]);
        return [accessHelper(user), /* true for update quick setting and access */ true];
    } catch (e) {
        // welcome.unmount();
        return undefined;
    }
}
