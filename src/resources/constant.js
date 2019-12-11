/*
 * @Author: siyuan.wang
 * @Date: 2019-03-10 22:13:54
 * @Last Modified by: siyuan.wang
 * @Last Modified time: 2019-03-10 22:14:27
 */

export default {
    roles: { ROLE_USER: 'ROLE_USER', ROLE_COMPANY: 'ROLE_COMPANY', ROLE_ADMIN: 'ROLE_ADMIN' },
    storage: {
        user: '@@/NtMY/U/A',
        token: '@@/NtMy/U/T',
        companyId: '@@/NtMY/U/CI',
        originAuthority: '@@/NtMY/O/AR'
    },
    errorTypes: {
        INFO: 'info',
        ERROR: 'error',
        SUCCESS: 'success'
    },
    containerQueries: {
        isSmall: {
            minWidth: 320,
            maxWidth: 768
        },
        isLarge: {
            minWidth: 1600
        }
    }
};
