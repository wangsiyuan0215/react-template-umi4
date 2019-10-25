/*
 * @Author: siyuan.wang
 * @Date: 2019-03-10 22:28:31
 * @Last Modified by: siyuan.wang
 * @Last Modified time: 2019-03-10 22:37:13
 */
/* eslint import/no-extraneous-dependencies: ["off"] */
import { effects as sagaEffect } from 'redux-saga';

const userModel = {
    namespace: 'user',
    state: {
        list: [],
        user: {},
        token: null,
        admins: []
    },
    subscriptions: {
        setup: ({ dispatch, history }) => {
            /* eslint consistent-return: ["off"] */
            history.listen(() => {
                dispatch({ type: 'waitingForToken' });
            });
        }
    },
    effects: {
        /**
         * 更新 path 时若执行必要 effect 调用需要 token 验证的接口时
         * call 此 effect，会首先检查 token 是否存在内存中，如果不存在会监听
         * global/authentication effect 中的 user/savingToken 获取 token
         *
         * @returns {IterableIterator<*>}
         */
        *waitingForToken(_, __) {
            console.log(_);
            console.log(__);

            let token = yield sagaEffect.select(({ user }) => user.token);
            if (!token) {
                const { payload: userPayload } = yield sagaEffect.take('user/savingToken');
                /* eslint prefer-destructuring: ["off"] */
                token = userPayload.token;
            }
            return token;
        }
    },
    reducers: {
        savingToken(state, { payload }) {
            return {
                ...state,
                token: payload.token
            };
        }
    }
};

export default userModel;
