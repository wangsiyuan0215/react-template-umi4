/*
 * @Author: SiYuan Wang
 * @Date: 2019-12-13 14:37:42
 * @Description: base.success
 */


const userLocale = {
    'no.token': '很抱歉，你还未「登录」...'
};

export default Object.keys(userLocale).reduce(
    (acc, item) => ({ ...acc, [`error.${item}`]: userLocale[item] }),
    {}
);
