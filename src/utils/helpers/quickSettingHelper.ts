export default (state) => {
    const { data } = state || {};
    return {
        ...data
    };
};
