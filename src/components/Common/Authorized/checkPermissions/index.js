/*
 * @Author: siyuan.wang
 * @Date: 2021/3/2 3:55 PM
 * @Description: extracted from ant-design-pro checkPermissions
 */
import React from 'react';

import { CURRENT } from '../renderAuthorize';
import PromiseRender from '../PromiseRender';

function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param authority 权限判定 Permission judgment type string |array | Promise | Function
 * @param currentAuthority 你的权限 Your permission description  type:string
 * @param target 通过的组件 Passing components
 * @param Exception 未通过的组件 no pass components
 */
const checkPermissions = (authority, currentAuthority, target, Exception) => {
    // 没有判定权限.默认查看所有
    // Retirement authority, return target;
    if (!authority) {
        return target;
    }
    // 数组处理
    if (Array.isArray(authority)) {
        if (authority.indexOf(currentAuthority) >= 0) {
            return target;
        }
        if (Array.isArray(currentAuthority)) {
            for (let i = 0; i < currentAuthority.length; i += 1) {
                const element = currentAuthority[i];
                if (authority.indexOf(element) >= 0) {
                    return target;
                }
            }
        }
        return Exception;
    }

    // string 处理
    if (typeof authority === 'string') {
        if (authority === currentAuthority) {
            return target;
        }
        if (Array.isArray(currentAuthority)) {
            for (let i = 0; i < currentAuthority.length; i += 1) {
                const element = currentAuthority[i];
                if (authority.indexOf(element) >= 0) {
                    return target;
                }
            }
        }
        return Exception;
    }

    // Promise 处理
    if (isPromise(authority)) {
        return <PromiseRender ok={target} error={Exception} promise={authority} />;
    }

    // Function 处理
    if (typeof authority === 'function') {
        try {
            const bool = authority(currentAuthority);
            // 函数执行后返回值是 Promise
            if (isPromise(bool)) {
                return <PromiseRender ok={target} error={Exception} promise={bool} />;
            }
            if (bool) {
                return target;
            }
            return Exception;
        } catch (error) {
            throw error;
        }
    }
    throw new Error('unsupported parameters');
};

export { checkPermissions };

const check = (authority, target, Exception) => checkPermissions(authority, CURRENT, target, Exception);

export default check;
