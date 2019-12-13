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
    'footer.company.copyright': '2019 生活空间（沈阳）数据服务有限公司',

    'app.exception.description.403': '很抱歉，你所具备的权限无法访问当前页面',
    'app.exception.description.404': '很抱歉，你所访问的页面未找到',
    'app.exception.back': '回到首页',

    creating: '创建',
    deleting: '删除',

    '403': '403',
    '404': '404',
    others: '暂无',

    ...zhCN.reduce(
        (acc, item) => ({
            ...acc,
            ...item.default
        }),
        {}
    )
};
