function containsAny(arr1, arr2) {
    return arr1.some((r) => arr2.includes(r));
}

export default (state) => {
    const { authorities } = state || {};
    return {
        ...state,
        $$access: {
            canAccessSystem: containsAny(authorities, ['ROLE_USER'])
        }
    };
};
