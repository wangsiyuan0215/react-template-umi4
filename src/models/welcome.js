/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-31 10:51:52
 * @Description: task list
 */

export default {
    namespace: 'welcome',
    state: {
        $link: null,
        themes: ['default', 'village'],
        current: 'default'
    },
    subscriptions: {
        setup: ({ dispatch, history }) => {
            const actions = {
                [`/welcome`]: [
                    {
                        // key is required
                        key: 'themes-change',
                        props: { type: 'primary', icon: 'bg-colors' },
                        localeId: 'theme.changing',
                        onClick: () => dispatch({ type: 'changingTheme' })
                        // payload: { a: 1 }
                    },
                    {
                        // key is required
                        key: 'themes-reset',
                        props: { type: 'default', icon: 'bg-colors' },
                        localeId: 'theme.resetting',
                        onClick: () => dispatch({ type: 'resettingTheme' })
                        // payload: { a: 1 }
                    }
                ]
            };

            dispatch({ type: 'breadcrumb/setActions', payload: { actions } });

            /* eslint consistent-return: ["off"] */
            history.listen((/* { pathname, query } */) => {});
        }
    },
    effects: {
        *changingTheme(_, __, { put, select }) {
            const { current } = yield select(({ welcome }) => welcome);

            if (current === 'rose') return false;

            const $link = document.createElement('link');
            $link.href = `${PUBLIC_PATH}themes/${'village'}.css`;
            $link.rel = 'stylesheet';
            $link.type = 'text/css';
            document.querySelector('head').appendChild($link);

            yield put({ type: 'receive', payload: { current: 'rose', $link } });
        },
        *resettingTheme(_, __, { put, select }) {
            const { $link } = yield select(({ welcome }) => welcome);

            if (!$link) return false;

            document.querySelector('head').removeChild($link);

            yield put({ type: 'receive', payload: { current: 'default', $link: null } });
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
