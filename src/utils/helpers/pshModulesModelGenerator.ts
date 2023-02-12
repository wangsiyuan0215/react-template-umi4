import { History } from 'umi';

import { paths } from 'root/config/routes.config';
import { transfer2ids } from '@/utils';
import { fetchingViews } from '@/services/psh/psh-modules';
import injectQueriesIntoUrlNoRefresh from '@/utils/queries';
import { fetchingTicket, fetchingCompetitors, fetchingTherapeuticAreas } from '@/services/common/dashboard';
import {
    PARAMETERS_DASHBOARD,
    AVERAGES,
    DATA_TYPES,
    METRICS_TYPES,
    SYSTEM_KEYS,
    TA_OVERALL_ALL
} from '@/resources/constant';

import type { IState } from '@/types/dashboards';

type PHSModuleGenerator = (
    namespace: string,
    systemKey: SYSTEM_KEYS,
    exportConfig: any[],
    withOverall?: boolean
) => IBasicModel<IState>;

const PSHModuleGenerator: PHSModuleGenerator = (namespace, systemKey, exportConfig = [], withOverall = true) => ({
    namespace,
    state: {
        views: {
            byId: {},
            allIds: []
        },
        id: '',
        orgs: [],
        name: '',
        server: '',
        ticket: '',
        siteName: '',
        competitors: '',
        competitorsAll: [],
        therapeuticArea: null,
        therapeuticAreas: [],
        subCategory: 'All'
    },
    subscriptions: {
        setup: ({ dispatch, history: h }: { history: History } & any) => {
            const actions = {
                [paths.root.psh.pshModules[namespace]]: exportConfig
            };
            dispatch({ type: 'exports/setActions', payload: { actions } });
            h.listen(({ pathname, query }) => {
                if (pathname === paths.root.psh.pshModules[namespace]) {
                    const { id = null, ta = null } = query || {};
                    dispatch({ type: 'reset' });
                    dispatch({ type: 'init', payload: { id, ta } });
                }
            });
        }
    },
    effects: {
        *init(_, { payload }, { put, take }) {
            const { id = null, ta = null } = payload || {};
            yield put({ type: 'fetchingTherapeuticAreas', payload: { ta } });
            yield take('fetchingTherapeuticAreas/@@end');
            yield put({ type: 'fetchingViews', payload: { id } });
        },
        *fetchingViews({ errorCreator }, { payload }, { call, put }) {
            try {
                const { id = null } = payload || {};
                const result = yield call(fetchingViews, systemKey);

                if (result) {
                    const { data = {} } = result;
                    const focusAreas = Object.keys(data);
                    if (!focusAreas.length) return false;
                    const views = transfer2ids(
                        focusAreas.reduce((acc, key) => [...acc, ...data[key]], []).sort((a, b) => a.id - b.id)
                    );
                    yield put({
                        type: 'receive',
                        payload: { views, viewsByFA: data }
                    });
                    // eslint-disable-next-line no-bitwise
                    if (views.allIds.length >>> 0) {
                        yield put({
                            type: 'fetchingTicket',
                            payload: { id: views.allIds.includes(Number(id)) ? Number(id) : views.allIds[0] }
                        });
                    }
                }
            } catch (error) {
                throw errorCreator(undefined, error.message, error.from);
            }
        },
        *fetchingTicket({ errorCreator }, { payload }, { call, put, select }) {
            try {
                const { views } = yield select((state) => state[namespace]);
                const { id, ...rest } = payload || {};

                // id for loading and ticket is reset for preventing Tableau re-render with connect in it.
                yield put({ type: 'receive', payload: { id, name: views.byId[id]?.title ?? '', ticket: '' } });

                const view = views.byId[id];
                const result = yield call(fetchingTicket, {
                    name: view.title,
                    module: view.module,
                    focusArea: view.focusArea
                });
                // eslint-disable-next-line no-console
                if (result) {
                    const { data = {} } = result || {};
                    const { serverUrl, siteName, ticket } = data || {};
                    injectQueriesIntoUrlNoRefresh({ id, ...rest }, [paths.root.psh.pshModules[namespace]]);
                    yield put({
                        type: 'receive',
                        payload: { id, server: serverUrl, siteName, ticket }
                    });
                    yield put({
                        type: 'receiveFilter',
                        payload: {
                            ...(!view.parameterOptions?.Competitor ? { competitors: undefined } : {}),
                            ...(view.parameterOptions?.Average
                                ? { average: AVERAGES.INDUSTRY }
                                : { average: undefined }),
                            ...(view.parameterOptions?.DataType
                                ? { dataType: DATA_TYPES.HIGH }
                                : { dataType: undefined }),
                            ...(view.parameterOptions?.MetricsType
                                ? { metricsType: METRICS_TYPES.TENURE }
                                : { metricsType: undefined })
                        }
                    });
                }
            } catch (error) {
                throw errorCreator(undefined, error.message, error.from);
            }
        },
        *fetchingTherapeuticAreas({ errorCreator }, { payload }, { call, put }) {
            try {
                const { ta = null } = payload || {};
                const result = yield call(fetchingTherapeuticAreas);
                if (result) {
                    const { data = {} } = result;
                    const { [PARAMETERS_DASHBOARD.THERAPEUTIC_AREA]: therapeuticAreas } = data || {};
                    // injectQueriesIntoUrlNoRefresh({ ta: ta || therapeuticAreas[0] }, dashboardPaths);
                    yield put({
                        type: 'receive',
                        payload: {
                            therapeuticAreas,
                            therapeuticArea:
                                ta ||
                                (therapeuticAreas.length >= 2 && withOverall ? TA_OVERALL_ALL : therapeuticAreas[0])
                        }
                    });
                }
            } catch (error) {
                throw errorCreator(undefined, error.message, error.from);
            }
        },
        *fetchingCompetitors({ errorCreator }, { payload }, { call, put, select }) {
            try {
                let organization = 'ALL';
                const { all = false } = payload || {};
                if (!all) ({ organization } = yield select(({ user }) => user.user));

                const result = yield call(fetchingCompetitors, organization);
                if (result) {
                    const { data = [] } = result || {};
                    yield put({
                        type: 'receive',
                        payload: { ...(all ? { competitorsAll: data } : { competitors: data || [] }) }
                    });
                }
            } catch (error) {
                throw errorCreator(undefined, error.message, error.from);
            }
        },
        *handler4changingTherapeuticArea({ errorCreator }, { payload }, { put, select }) {
            try {
                if (payload) {
                    const { id } = yield select((state) => state[namespace]);
                    yield put({ type: 'receive', payload: { therapeuticArea: payload } });
                    yield put({ type: 'fetchingTicket', payload: { id, ta: payload } });
                    yield put({ type: 'setSubCategory', payload: 'All' });
                }
            } catch (error) {
                throw errorCreator(undefined, error.message, error.from);
            }
        }
    },
    reducers: {
        reset(state) {
            state.views = {
                byId: {},
                allIds: []
            };
            state.id = '';
            state.name = '';
            state.server = '';
            state.ticket = '';
            state.siteName = '';
            state.competitors = '';
            state.competitorsAll = [];
            state.therapeuticArea = null;
        },
        receive(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
        setSubCategory(state, { payload }) {
            state.subCategory = payload;
        }
    }
});

export default PSHModuleGenerator;
