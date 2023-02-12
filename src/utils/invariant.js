export default (condition, format, a, b, c, d, f) => {
    if (!condition) {
        let argIndex = 0;
        const argArray = [a, b, c, d, f];
        /* eslint no-plusplus: ["off"] */
        throw new Error(format.replace(/%s/g, () => argArray[argIndex++]));
    }
};
