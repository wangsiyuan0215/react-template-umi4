/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-30 17:02:24
 * @Description: breadcrumb
 * @Note: 该 model 的命名中的下划线是必须的，为了确保 breadcrumb model 中的 subscription 优先执行
 */

export default {
    namespace: 'breadcrumb',
    state: {
        actions: {}
    },
    effects: {
        *setActions(_, { payload }, { put }) {
            const { actions } = payload;

            yield put({
                type: 'receiveActions',
                payload: actions
            });
        },
        *runActions(_, { payload }, { select }) {
            const { actionName } = payload;
            const { actions } = yield select(({ breadcrumb }) => breadcrumb);

            const currentAction = actions.find(item => item.name === actionName);

            if (currentAction) {
                // eslint-disable-next-line no-unused-expressions
                currentAction.onClick && currentAction.onClick(currentAction.payload);
            }
        }
    },
    reducers: {
        receive(state, action) {
            return {
                ...state,
                ...action.payload
            };
        },
        receiveActions(state, { payload }) {
            return {
                ...state,
                actions: {
                    ...state.actions,
                    ...payload
                }
            };
        }
    }
};
