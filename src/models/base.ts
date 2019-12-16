/*
 * @Author: SiYuan Wang
 * @Date: 2019-12-11 16:39:40
 * @Description: user
 */
// import router from 'umi/router';
import { notification } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

import { delay } from '@/utils/utils';
import { Keys4storage } from '@/resources/constant';
import { getStorageForSomething } from '@/utils/storage';

import { IBasicModel } from '@/types/index.d';

const paths4ignoringToken = ['/login', '/exception/403', '/exception/404'];

const userModel: IBasicModel<{}> = {
    namespace: 'base',
    state: {},
    effects: {
        /**
         * 当进入系统之初，优先检查是否存在 token，若不存在则跳回到 login 页面
         * @param errorCreator
         * @param payload
         * @param put
         * @param call
         * @param select
         */
        /* eslint  consistent-return: 0 */
        *authentication({ errorCreator }, { payload }, { put, call, select }) {
            const { location } = payload || {};
            const { pathname } = location || {};
            try {
                if (paths4ignoringToken.includes(pathname)) return false;

                const { token: tokenInCache } = yield select(({ user }) => user);
                const tokenInStorage = getStorageForSomething(Keys4storage.token);

                if (tokenInCache || tokenInStorage) {
                    return tokenInCache
                        ? false
                        : yield put({ type: 'receive', payload: { token: tokenInStorage } });
                }

                yield call(delay, 200);
                notification.error({ message: formatMessage({ id: 'error.no.token' }) });
                // return router.replace('/login');
            } catch (error) {
                throw errorCreator(undefined, error.message);
            }
        }
    },
    reducers: {
        receive(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        }
    }
};

export default userModel;
