import memoizeOne from 'memoize-one';
import { equals } from 'ramda';

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
                locale,
                key: item.path,
                icon: item.icon,
                name: item.name,
                path: item.path,
                access: item.access,
                routes: item.routes
            };
            if (item.routes) {
                result.children = formatter(item.routes, item.authority, locale);
            }
            delete result.routes;
            return result;
        })
        .filter(Boolean);
}

const memoizeOneFormatter = memoizeOne(formatter, equals);

const getSubMenu = (item) => {
    if (item.children && item.children.some((child) => child.name)) {
        return {
            ...item,
            children: filterMenuData(item.children) // eslint-disable-line
        };
    }
    return item;
};

const filterMenuData = (menuData) => {
    if (!menuData) return [];
    return menuData
        .filter((item) => typeof item.redirect === 'undefined')
        .filter((item) => !item.hideInMenu)
        .map(getSubMenu)
        .filter(Boolean);
};

export default {
    namespace: 'menu',
    state: {
        routes: [],
        menuData: []
    },
    effects: {
        *getMenuData(_, { payload }, { put }) {
            try {
                const { routes } = payload;
                yield put({ type: 'receive', payload: { routes } });

                // 二者分开写，是为了避免在 getInitialProps 时，routes 还未更新
                const [root] = filterMenuData(memoizeOneFormatter(routes));
                yield put({ type: 'receive', payload: { menuData: root.children } });
            } catch (error) {
                console.log(error);
            }
        }
    },
    reducers: {
        receive(state, action) {
            return {
                ...state,
                ...action.payload
            };
        }
    }
};
