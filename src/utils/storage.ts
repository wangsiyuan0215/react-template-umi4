import { KEY_STORAGE } from '@/resources/constant';

export enum WHERE {
    LOCAL = 'localStorage',
    SESSION = 'sessionStorage'
}

export const getStorageForSomething = (key, where = 'sessionStorage') => {
    const finalValue = window[where].getItem(key);
    try {
        return JSON.parse(finalValue);
    } catch {
        return finalValue;
    }
};

export const setStorageForSomething = (key, value, where = 'sessionStorage') => {
    const finalValue = typeof value !== 'string' ? JSON.stringify(value || '') : value;
    window[where].setItem(key, finalValue);
};

export const removeStorageForSomething = (key, where = 'sessionStorage') => {
    window[where].removeItem(key);
};

export function getAuthority(str) {
    const authorityString = typeof str === 'undefined' ? localStorage.getItem(KEY_STORAGE.ROLE) : str;
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
    return localStorage.setItem(KEY_STORAGE.ROLE, JSON.stringify(proAuthority));
}
