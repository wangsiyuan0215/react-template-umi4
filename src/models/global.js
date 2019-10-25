/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 14:14:16
 * @Description: global model for common effects
 */
import config from '@/resources/constance';
import umiRouter from 'umi/router';
import { getAuthority, getStorageForSomething } from '@/utils/storage';

export default {
    namespace: 'global',
    state: {
        collapsed: false
    },
    effects: {
        /**
         * 验证用户是否登录以及其权限
         *
         * 需要注意的是：此 effect 执行于在用户手动 refresh 后由于没有做数据持久化导致的用户数据丢失的场景下
         * 通过判断 token 是否存在于 localStorage 或 sessionStorage（rememberMe）决定用户是否需要登录；
         *
         * 若不需要重新登录，同样的也会对用户信息进行验证，判断其权限是否符合（防止用户恶意修改role）
         *
         * TODO... 将权限通过 md5 加密后进行验证
         *
         * @param payload
         * @param select
         * @param put
         * @param take
         * @returns {IterableIterator<*>}
         */
        /* eslint consistent-return: ["off"] */
        *authentication({ payload }, { select, put, take }) {
            const { pathname: currentPath } = payload;
            const currentRole = getAuthority()[0];
            let { token } = yield select(state => state.user);

            // 判断用户是否已经登录
            if (!token) {
                token = getStorageForSomething(config.storage.token);
                if (!token) return currentPath === '/login' ? false : umiRouter.replace('/login');
                yield put({ type: 'user/fetchUserAccountAndAuthorities', payload: { token } });
                const {
                    payload: { error, data }
                } = yield take('user/savingUserAccount');
                if (error) return false;
                if (currentRole && currentRole !== data.role) window.location.href = '/';
            }
        }
    },
    reducers: {
        changeLayoutCollapsed(state, { payload }) {
            return { ...state, collapsed: payload };
        }
    }
};
