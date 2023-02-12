/**
 * Define permission control information
 */
// import welcome from '@/components/Welcome';

export interface AccessType {
    canAccessSystem: boolean;
}

const defaultAccess: AccessType = {
    canAccessSystem: true
};

/* eslint no-underscore-dangle: 0 */

// extracted access's transfer out of this function, because Provider of @umi/plugin-access always calls this
// function after initialState as dependency has been changed. And the moment initialState changed is always when
// user logs in successfully, so put effort of transferring behind this, successful message is showing.
export default function (initialState): AccessType {
    if (initialState) {
        const [authorities, allBasicStateUpdate] = initialState;
        const { $$access: access } = authorities;

        if (!allBasicStateUpdate) return access;

        // welcome.unmount();
        return access;
    }
    return defaultAccess;
}
