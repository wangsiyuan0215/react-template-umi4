// eslint-disable-next-line no-useless-escape
const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
    return reg.test(path);
}

export const isArray = (param) => {
    try {
        return Array.isArray(param);
    } catch {
        return Object.prototype.toString.call(param) === '[object Array]';
    }
};

export const isObject = (param) => {
    return Object.prototype.toString.call(param) === '[object Object]';
};

export const isHex = (string) => {
    if (!string || typeof string !== 'string') return false;

    const finalString = string.slice(0, 1) === '#' ? string.slice(1) : string;
    return /^([a-zA-Z0-9]{3})+$/.test(finalString);
};

export const delay = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds));

export const base642Blob = (urlData) => {
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

export const toUpperCaseWithCaptain = (string) => string.replace(/(^|\s)\w(?=\S*)/g, (a) => a.toLocaleUpperCase());

export const isFalsyValue = (value) => value === undefined || value === null || value === false || value === '';

/* eslint no-sequences: ["off"] */
/* eslint no-return-assign: ["off"] */
/* eslint no-param-reassign: ["off"] */
export const generatorQueries = (queries) =>
    Object.keys(queries)
        .filter((item) => queries[item])
        .reduce((acc, item) => ((acc = `${acc}&${item}=${queries[item]}`), acc), '');

export const formatter4number = (number) => {
    try {
        return number.toString().replace(/\B(?=(\d{3})*$)/g, ',');
    } catch (e) {
        return number;
    }
};

// with require.context in webpack
export const requireAllFile = (context) => context.keys().map(context);

export const getPrimaryType = (params) => Object.prototype.toString.call(params).slice(8, -1);

export const transfer2ids = (array, PrimaryKey = 'id') => {
    if (getPrimaryType(array) !== 'Array') return array;

    return array.reduce(
        (acc, item) => {
            return {
                byId: {
                    ...acc.byId,
                    [item[PrimaryKey]]: item
                },
                allIds: [...new Set([...acc.allIds, item[PrimaryKey]])]
            };
        },
        { byId: {}, allIds: [] }
    );
};

export const downloadFileWithUrl = (url, name) => {
    const $a = document.createElement('a');

    $a.rel = 'noreferrer noopener';
    $a.href = url;
    $a.target = '_blank';
    $a.download = name;

    document.body.appendChild($a);
    $a.click();
    document.body.removeChild($a);
};

export function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export function getBase64Image(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width; // 设置对应的宽高
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    return canvas.toDataURL('image/jpg');
}

export const getUserAgent = () => {
    const { userAgent } = window.navigator;
    const isOpera = userAgent.indexOf('Opera') > -1;
    if (isOpera) return 'Opera';
    if (userAgent.indexOf('Firefox') > -1) return 'FF';
    if (userAgent.indexOf('Chrome') > -1) return 'Chrome';
    if (userAgent.indexOf('Safari') > -1) return 'Safari';
    if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) return 'IE';
};
