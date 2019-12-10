/*
 * @Author: siyuan.wang
 * @Date: 2019-03-10 22:28:31
 * @Last Modified by: siyuan.wang
 * @Last Modified time: 2019-03-10 22:37:13
 */

const userModel = {
    namespace: 'user',
    state: {
        list: [],
        user: {},
        token: null,
        admins: []
    },
    effects: {},
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
