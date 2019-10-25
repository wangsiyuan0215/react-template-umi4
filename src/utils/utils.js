/*
 * @Author: SiYuan Wang
 * @Date: 2019-04-14 12:41:51
 * @Description: utils
 */

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
    return reg.test(path);
}

export const isArray = param => {
    try {
        return Array.isArray(param);
    } catch {
        return Object.prototype.toString.call(param) === '[object Array]';
    }
};

export const isHex = string => {
    if (!string || typeof string !== 'string') return false;

    const finalString = string.slice(0, 1) === '#' ? string.slice(1) : string;
    return /^([a-zA-Z0-9]{3})+$/.test(finalString);
};

export const delay = seconds => new Promise(resolve => setTimeout(resolve, seconds));

export const base642Blob = urlData => {
    const bytes = window.atob(urlData.includes(',') ? urlData.split(',')[1] : urlData);

    // 处理异常，将 ascii 码小于 0 的转换为大于 0
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    /* eslint no-plusplus: ["off"] */
    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }

    return new Blob([ab], { type: 'image/png' });
};

export const toUpperCaseWithCaptain = string =>
    string.replace(/(^|\s)\w(?=\S*)/g, a => a.toLocaleUpperCase());

export const isFalsyValue = value =>
    value === undefined || value === null || value === false || value === '';

/* eslint no-sequences: ["off"] */
/* eslint no-return-assign: ["off"] */
/* eslint no-param-reassign: ["off"] */
export const generatorQueries = queries =>
    Object.keys(queries)
        .filter(item => queries[item])
        .reduce((acc, item) => ((acc = `${acc}&${item}=${queries[item]}`), acc), '');
