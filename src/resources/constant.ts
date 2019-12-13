/*
 * @Author: SiYuan Wang
 * @Date: 2019-12-13 11:25:13
 * @Description: constant
 */

export enum Roles {
    ROLE_USER = 'ROLE_USER',
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_COMPANY = 'ROLE_COMPANY'
}

export enum Keys4storage {
    user = '@@/YSB_A/U/A',
    token = '@@/YSB_A/U/T',
    companyId = '@@/YSB_A/U/CI',
    originAuthority = `@@/YSB_A/O/AR`
}

export enum ErrorTypes {
    INFO = 'info',
    ERROR = 'error',
    SUCCESS = 'success'
}

export enum IsSmall {
    minWidth = 320,
    maxWidth = 768
}

export enum IsLarge {
    minWidth = 1600
}

export enum Scopes {
    default = 'co999999'
}

export enum Channels {
    PAD = 'PAD',
    WEB = 'WEB',
    MOBILE = 'MOBILE'
}

export const SuccessCode = 200;
