/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 15:14:40
 * @Description: menu model
 */

import check from 'ant-design-pro/lib/Authorized/CheckPermissions';
import equals from 'ramda/src/equals';
import memoizeOne from 'memoize-one';
import { formatMessage } from 'umi-plugin-react/locale';

// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
    return data
        .map(item => {
            if (!item.name || !item.path) {
                return null;
            }

            let locale = 'menu';
            if (parentName) {
                locale = `${parentName}.${item.name}`;
            } else {
                locale = `menu.${item.name}`;
            }

            const result = {
                ...item,
                name: formatMessage({ id: locale, defaultMessage: item.name }),
                locale,
                authority: item.authority || parentAuthority
            };
            if (item.routes) {
                result.children = formatter(item.routes, item.authority, locale);
                // Reduce memory usage
                // result.children = children;
            }
            delete result.routes;
            return result;
        })
        .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, equals);

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
    /** @param item {{hideChildrenInMenu: boolean}} */
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
        return {
            ...item,
            children: filterMenuData(item.children) // eslint-disable-line
        };
    }
    return item;
};

/**
 * filter menuData
 */
const filterMenuData = menuData => {
    if (!menuData) {
        return [];
    }
    return menuData
        /** @param item {{hideInMenu: boolean}} */
        .filter(item => item.name && !item.hideInMenu)
        .map(item => check(item.authority, getSubMenu(item)))
        .filter(item => item);
};
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
    const routerMap = {};

    const flattenMenuData = data => {
        data.forEach(menuItem => {
            if (menuItem.children) {
                flattenMenuData(menuItem.children);
            }
            // Reduce memory usage
            routerMap[menuItem.path] = menuItem;
        });
    };
    flattenMenuData(menuData);
    return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, equals);

export default {
    namespace: 'menu',

    state: {
        menuData: [],
        allMenuData: [],
        breadcrumbNameMap: {}
    },

    effects: {
        /**
         * 根据 authority 获取当前权限下的菜单数据
         *
         * @param payload
         * @param put
         * @returns {IterableIterator<*>}
         */
        *getMenuData({ payload }, { put }) {
            const { routes, authority } = payload;
            const allMenuData = memoizeOneFormatter(routes, authority);
            const menuData = filterMenuData(allMenuData);
            const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(menuData);
            yield put({
                type: 'save',
                payload: { menuData, allMenuData, breadcrumbNameMap }
            });
        }
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload
            };
        }
    }
};
