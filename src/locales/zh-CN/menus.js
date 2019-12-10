/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-29 17:07:27
 * @Description: menu
 */
const menus = {
    home: '首页',

    '403': '403',
    '404': '404',
    others: '暂无'
};

export default Object.keys(menus).reduce(
    (acc, item) => ({
        ...acc,
        [`menu.${item}`]: menus[item]
    }),
    {}
);
