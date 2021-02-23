/*
 * @Author: SiYuan Wang
 * @Date: 2019-12-13 14:37:42
 * @Description: base.success
 */


const userLocale = {
    'login': '恭喜你，「登录操作」成功！',
    'logout': '恭喜你，「登出操作」成功！'
};

export default Object.keys(userLocale).reduce(
    (acc, item) => ({ ...acc, [`success.${item}`]: userLocale[item] }),
    {}
);
