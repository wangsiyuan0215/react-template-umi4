import memoizeOne from 'memoize-one';
import { equals } from 'ramda';
import { getIntl } from 'umi';

// Conversion router to menu.
function formatter(data, parentName) {
    return data
        .map((item) => {
            if (!item.name || !item.path) {
                return null;
            }

            let locale = '';
            if (parentName) {
                locale = `${parentName}.${item.name}`;
            } else {
                locale = `menu.${item.name}`;
            }

            const result = {
                ...item,
                name: getIntl().formatMessage({ id: locale, defaultMessage: item.name }),
                locale
            };
            if (item.routes) {
                result.children = formatter(item.routes, item.authority, locale);
            }
            delete result.routes;
            return result;
        })
        .filter((item) => item);
}

const memoizeOneFormatter = memoizeOne(formatter, equals);

const getSubMenu = (item, access) => {
    if (item.children && item.children.some((child) => child.name)) {
        return {
            ...item,
            children: filterMenuData(item.children, access) // eslint-disable-line
        };
    }
    return item;
};

const filterMenuData = (menuData, access) => {
    if (!menuData) {
        return [];
    }
    return menuData
        .filter((item) => item.name && !item.hideInMenu)
        .map((item) => {
            if (access[item.access]) return getSubMenu(item, access);
            return null;
        })
        .filter((item) => item);
};

export default {
    namespace: 'menu',
    state: {
        routes: [],
        menuData: [],
        allMenuData: []
    },
    effects: {
        *getMenuData(_, { payload }, { put, select }) {
            const { access } = yield select(({ base }) => base);
            const { routes } = payload;
            const allMenuData = memoizeOneFormatter(routes);
            const menuData = filterMenuData(allMenuData, access);

            yield put({ type: 'receive', payload: { menuData, allMenuData } });
        }
    },
    reducers: {
        receive(state, action) {
            return {
                ...state,
                ...action.payload
            };
        },
        insertItemAt(state, { payload }) {
            const { item, name } = payload;
            const index = state.menuData.findIndex((i) => i.name === name);
            if (index !== -1) state.menuData.splice(index + 1, 0, item);
        },
        removeItemByPath(state, { payload }) {
            const { path } = payload;
            const index = state.menuData.findIndex((i) => i.path === path);
            if (index !== -1) state.menuData.splice(index, 1);
        }
    }
};
