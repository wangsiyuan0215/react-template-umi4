/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-21 10:09:33
 * @Description: zh-CN
 */
import { requireAllFile } from '@/utils/utils';

/** @typedef require {{ context }} */
const zhCN = requireAllFile(require.context('@/locales/zh-CN/', false, /\.(ts|js)$/));

export default {
    'title.default': '系统名称',

    'header.account.welcome': '你好！',
    'header.dropdown.logout': '登出',

    'footer.version': '当前版本：',
    'footer.company.copyright': '2019 XXXX（沈阳）XXXX有限公司',

    'app.exception.description.403.1': '很抱歉，因「权限受限」你无法访问目标页面……',
    'app.exception.description.403.2': '你可以尝试「重新登录」或「检查当前访问的路径」以解决该问题。',
    'app.exception.description.404.1': '很抱歉，你所访问的页面未找到',
    'app.exception.description.404.2': '你可以尝试「检查当前访问的路径」以解决该问题。',
    'app.exception.back': '回到首页',
    'app.exception.login': '重新登录',

    creating: '创建',
    deleting: '删除',

    'theme.changing': '更改主题',
    'theme.resetting': '重置主题',

    ...zhCN.reduce(
        (acc, item) => ({
            ...acc,
            ...item.default
        }),
        {}
    )
};
