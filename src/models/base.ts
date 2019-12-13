/*
 * @Author: SiYuan Wang
 * @Date: 2019-12-11 16:39:40
 * @Description: user
 */
import router from 'umi/router';
import { notification } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

import { delay } from '@/utils/utils';
import { Keys4storage } from '@/resources/constant';
import { setStorageForSomething, getStorageForSomething } from '@/utils/storage';

import { IBasicModel } from '@/types/index.d';

const paths4ignoringToken = ['/login', '/exception/403', '/exception/404'];

const userModel: IBasicModel<any> = {
    namespace: 'base',
    state: {
    },
    subscriptions: {
        setup: ({ dispatch, history }) => {
            history.listen(({ pathname }) => {
                dispatch({ type: 'checkingToken', payload: { path: pathname } });
            });
        }
    },
    effects: {
        /**
         * 当进入到系统是，优先检查是否存在 token，若不存在则跳回到 login 页面
         * @param errorCreator
         * @param payload
         * @param put
         * @param call
         * @param select
         */
        *checkingToken({ errorCreator }, { payload }, { put, call, select }) {
            const { path } = payload || {};
            try {
                const { token: tokenInCache } = yield select(({ user }) => user);
                const tokenInStorage = getStorageForSomething(Keys4storage.token);

                if (tokenInCache || tokenInStorage) {
                    return yield put({ type: 'receive', payload: { token: tokenInStorage } });
                }

                if (paths4ignoringToken.includes(path)) return false;

                yield call(delay, 200);
                notification.error({ message: formatMessage({ id: 'error.no.token' }) });
                return router.replace('/login');
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
