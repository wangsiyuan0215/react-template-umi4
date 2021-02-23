/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-29 17:07:27
 * @Description: menu
 */
const menus = {
    welcome: '欢迎',

    '403': '权限受限「403」',
    '404': '资源丢失「404」',
    others: '其他错误「OTHERS」'
};

export default Object.keys(menus).reduce(
    (acc, item) => ({
        ...acc,
        [`menu.${item}`]: menus[item]
    }),
    {}
);
