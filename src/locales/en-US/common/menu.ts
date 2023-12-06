const menuLocale = {
    Welcome: 'Welcome',
    User: 'User',
    UserHome: 'Home',
    UserDetail: 'Detail'
};

export default Object.keys(menuLocale).reduce(
    (acc, item) => ({
        ...acc,
        [`menu.${item}`]: menuLocale[item]
    }),
    {}
);
