/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-31 10:51:52
 * @Description: task list
 */

export default {
    namespace: 'home',
    state: {},
    subscriptions: {
        setup: ({ dispatch, history }) => {
            const actions = {
                [`/`]: [
                    {
                        // key is required
                        key: 'creating',
                        props: { type: 'primary', icon: 'plus' },
                        localeId: 'creating',
                        loadingEffectName: 'namespace/action',
                        onClick: () =>
                            dispatch({
                                type: 'namespace/action'
                            })
                        // payload: { a: 1 }
                    },
                    {
                        key: 'delete',
                        props: { type: 'primary', icon: 'minus' },
                        localeId: 'delete',
                        loadingEffectName: 'namespace/action',
                        onClick: () =>
                            dispatch({
                                type: 'namespace/action'
                            })
                        // payload: { a: 1 }
                    }
                ]
            };

            dispatch({ type: 'breadcrumb/setActions', payload: { actions } });

            /* eslint consistent-return: ["off"] */
            history.listen((/* { pathname, query } */) => {});
        }
    },
    effects: {},
    reducers: {
        receive(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        }
    }
};
