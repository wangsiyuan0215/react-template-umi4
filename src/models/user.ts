/*
 * @Author: SiYuan Wang
 * @Date: 2019-12-11 16:39:40
 * @Description: user
 */
import MD5 from 'md5.js';
import router from 'umi/router';
import { message } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

import { delay } from '@/utils/utils';
import { postAuth } from '@/services/user';
import {
    setStorageForSomething,
    getStorageForSomething,
    removeStorageForSomething
} from '@/utils/storage';
import { ErrorTypes, Keys4storage } from '@/resources/constant';

import { IBasicModel } from '@/types/index.d';

export interface IState4model {
    token: string;
    keys4dropdown: Keys4dropdown[];
}

export enum Keys4dropdown {
    LOGOUT = 'logout'
}

const userModel: IBasicModel<IState4model> = {
    namespace: 'user',
    state: {
        token: null,
        keys4dropdown: [Keys4dropdown.LOGOUT]
    },
    subscriptions: {
        setup: ({ dispatch, history }) => {
            history.listen(({ pathname }) => {
                if (pathname === '/login') {
                    dispatch({ type: 'checkingToken' });
                }
            });
        }
    },
    effects: {
        /**
         * 进入到 登录 页面后检查是否存在 token，如果存在则跳回到首页
         * @param errorCreator
         * @param payload
         * @param put
         * @param call
         * @param select
         */
        *checkingToken({ errorCreator }, { payload }, { put, call, select }) {
            try {
                const { token: tokenInCache } = yield select(({ user }) => user);
                const tokenInStorage = getStorageForSomething(Keys4storage.token);

                if (tokenInCache || tokenInStorage) {
                    yield put({ type: 'receive', payload: { token: tokenInStorage } });
                    yield call(delay, 100);
                    return router.replace('/home');
                }
            } catch (error) {
                throw errorCreator(undefined, error.message);
            }
        },
        *login({ errorCreator }, { payload }, { put, call }) {
            const { username, password } = payload;
            try {
                const result = yield call(postAuth, {
                    username,
                    password: new MD5()
                        .update(`Neu_${password}`)
                        .digest('hex')
                        .toUpperCase()
                });

                if (result !== undefined) {
                    const { authInfo } = result || {};
                    const { access_token: token } = authInfo || {};

                    yield put({ type: 'receive', payload: { token } });
                    setStorageForSomething(Keys4storage.token, token);

                    message.success(formatMessage({ id: 'success.login' }));
                    yield call(delay, 2000);
                    router.replace('/home');
                }
            } catch (error) {
                throw errorCreator(ErrorTypes.ERROR, error.message);
            }
        },
        *logout({ errorCreator }, { payload }, { put, call }) {
            try {
                yield put({ type: 'receive', payload: { token: null } });
                removeStorageForSomething(Keys4storage.token);

                message.success(formatMessage({ id: 'success.logout' }));
                yield call(delay, 2000);
                router.replace('/login');
            } catch (error) {
                throw errorCreator(ErrorTypes.ERROR, error.message);
            }
        },
        *handler4dropdownInHeader({ errorCreator }, { payload }, { put }) {
            try {
                const { key } = payload || {};

                if (key === Keys4dropdown.LOGOUT) return yield put({ type: 'logout' });
            } catch (error) {
                throw errorCreator(ErrorTypes.ERROR, error.message);
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
