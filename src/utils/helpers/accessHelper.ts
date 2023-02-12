function containsAny(arr1, arr2) {
    return arr1.some((r) => arr2.includes(r));
}

export default (state) => {
    const { grantedAuthorities } = state || {};
    const authorities = grantedAuthorities.map((item) => item.authority);
    return {
        ...state,
        $$access: {
            canAccessSystem: containsAny(authorities, ['ROLE_USER'])
        }
    };
};
