import { getDvaApp } from '@umijs/max';

import type { User } from '@/typings';

export interface AccessType {
    canAccessSystem: boolean;
}

const defaultAccess: AccessType = {
    canAccessSystem: false
};

// extracted access's transfer out of this function, because Provider of @umi/plugin-access always calls this
// function after initialState as dependency has been changed. And the moment initialState changed is always when
// user logs in successfully, so put effort of transferring behind this, successful message is showing.
export default function (initialState: [User & { $$access: AccessType }]): AccessType {
    if (initialState) {
        const dva = getDvaApp();
        const [authorities] = initialState;
        const { $$access: access, ...user } = authorities;

        // 同步 user 数据
        dva._store.dispatch({ type: 'user/receive', payload: user });

        return access;
    }
    return defaultAccess;
}
