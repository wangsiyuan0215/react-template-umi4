export default (number: number) => {
    return (number ?? 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
};
