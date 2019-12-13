/*
 * @Author: SiYuan Wang
 * @Date: 2019-12-11 17:02:26
 * @Description: user
 */

const userLocale = {
    'login.title': '登录',

    'login.header': '豫事办・管理平台',
    'login.input.username.placeholder': '请输入账号',
    'login.input.password.placeholder': '请输入密码',
    'login.input.username.empty': '很抱歉，账号不能为空',
    'login.input.password.empty': '很抱歉，密码不能为空',
    'login.btn': '登录',
    'login.already': '您已登录，即将跳转到首页'
};

export default Object.keys(userLocale).reduce(
    (acc, item) => ({ ...acc, [`user.${item}`]: userLocale[item] }),
    {}
);
