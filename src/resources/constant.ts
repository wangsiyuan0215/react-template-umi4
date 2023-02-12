export const KEY_STORAGE = {
    ROLE: `@@/${APP_NAME}/SYS_R`,
    ORGS: `@@/${APP_NAME}/SYS_ORGS`,
    DOWNLOAD: `@@/${APP_NAME}/D`
};

export enum ERROR_TYPES {
    INFO = 'info',
    ERROR = 'error',
    SUCCESS = 'success'
}

export enum ERROR_FROM_TYPES {
    NORMAL = 'NORMAL',
    REQUEST = 'REQUEST'
}

export enum EVENT_NAMES {
    EXPORT_PDF = 'EXPORT_PDF',
    EXPORT_PNG = 'EXPORT_PNG',
    EXPORT_PPT = 'EXPORT_PPT',
    EXPORT_EXCEL = 'EXPORT_EXCEL'
}

export const ENTER_SEPARATOR = '\n';
