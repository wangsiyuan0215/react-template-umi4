import { User } from '@/typings';

function containsAny(arr1: string[], arr2: string[]) {
    return arr1.some((r) => arr2.includes(r));
}

export default (state: User) => {
    const { authorities } = state || {};
    return {
        ...state,
        $$access: {
            canAccessSystem: containsAny(authorities, ['ROLE_USER'])
        }
    };
};
