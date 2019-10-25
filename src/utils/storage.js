/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 21:39:55
 * @Description: storage utils
 */
import config from '@/resources/constance';

export const getStorageForSomething = (key, where = config.storageWhere.rememberMe) => {
    const finalValue = window[where].getItem(key);
    try {
        return JSON.parse(finalValue);
    } catch {
        return finalValue;
    }
};

export const setStorageForSomething = (key, value, where = config.storageWhere.rememberMe) => {
    const finalValue = typeof value !== 'string' ? JSON.stringify(value || '') : value;
    window[where].setItem(key, finalValue);
};

export const removeStorageForSomething = (key, where = config.storageWhere.rememberMe) => {
    window[where].removeItem(key);
};

export function getAuthority(str) {
    const authorityString =
        typeof str === 'undefined' ? localStorage.getItem(config.storage.originAuthority) : str;
    // authorityString could be admin, "admin", ["admin"]
    let authority;
    try {
        authority = JSON.parse(authorityString);
    } catch (e) {
        authority = authorityString;
    }
    if (typeof authority === 'string') {
        return [authority];
    }
    return authority || [];
}

export function setAuthority(authority) {
    const proAuthority = typeof authority === 'string' ? [authority] : authority;
    return localStorage.setItem(config.storage.originAuthority, JSON.stringify(proAuthority));
}
