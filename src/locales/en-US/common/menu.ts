const menuLocale = {
    index: 'Index',
    welcome: 'Welcome'
};

export default Object.keys(menuLocale).reduce(
    (acc, item) => ({
        ...acc,
        [`menu.${item}`]: menuLocale[item]
    }),
    {}
);
