import qs from 'qs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { extend } from 'umi-request';
import { history } from 'umi';

import { paths } from '@root/config/routes.config';
import { ERROR_FROM_TYPES } from '@/resources/constant';

const REFERENCES = {
    LOCKED: 'LOCKED',
    INVALID: 'INVALID',
    EXISTED: 'EXISTED'
};

const codeMessage = {
    400: 'There was an error with the request that the server did not make new or modified data.',
    401: 'Sorry, access not allowed, please login.',
    403: 'Sorry, access not allowed.',
    404: 'Sorry, resource not found',
    406: 'The format of the request is not available.',
    410: 'Sorry, the request requested is not found',
    500: 'Sorry, internal server error. Please try again later.',
    502: 'Gateway error.',
    503: 'Sorry, server under maintenance. Please try again later.',
    504: 'Sorry, request timeout',
    // custom error type for response reference
    [REFERENCES.LOCKED]: 'Sorry, current account is locked.',
    [REFERENCES.INVALID]: 'Sorry, username or password is invalid. Please try again.',
    [REFERENCES.EXISTED]: (data) => `Sorry, the user ${data}.`
};

let limited = 0;

const LIMITED_DURATION = 3000;

/* eslint consistent-return: 0, no-underscore-dangle: 0, no-unused-expressions: 0, no-throw-literal: 0 */
export const errorHandler = (error) => {
    const { response = {}, message, data } = error;
    const code = Number(response.status);
    const { reference = null } = data || {};
    const {
        location: { pathname, query }
    } = history;

    if (limited + LIMITED_DURATION > Date.now()) return;

    limited = Date.now();

    if (code === 401) {
        if (response.url.includes('auth/success')) {
            // eslint-disable-next-line compat/compat
            if (Object.values(paths.auth).includes(pathname)) {
                throw {
                    data, //! special property for auth
                    from: ERROR_FROM_TYPES.REQUEST,
                    status: response.status,
                    message: data?.message || data
                };
            }
        }

        // Just for visiting system first, if auth/success returns 401 code, redirect to login page.
        if (pathname !== paths.auth.login) {
            const { user: { isLoggingOut = false } = {} } = window.dvaApp._store.getState() || {};
            if (isLoggingOut) return false;

            window.dvaApp._store.dispatch({ type: 'user/clear' });
            setTimeout(() => {
                const queries = qs.stringify(query);
                history.replace(
                    `${paths.auth.login}?redirect=${encodeURIComponent(`${pathname}${queries ? `?${queries}` : ''}`)}`
                );
            }, 0);
        } else if (!response.url.includes('auth/failure')) {
            // Make error message disappear.
            return;
        }
    }
    if ([409, 410].includes(code)) {
        if (data) {
            // eslint-disable-next-line no-throw-literal
            throw {
                from: ERROR_FROM_TYPES.REQUEST,
                status: response.status,
                message: data.data
            };
        }
        return;
    }

    if (code === 403) {
        throw {
            data,
            from: ERROR_FROM_TYPES.REQUEST,
            status: code,
            message: data?.message || data
        };
    }

    throw {
        from: ERROR_FROM_TYPES.REQUEST,
        status: response.status,
        message:
            reference === REFERENCES.EXISTED
                ? codeMessage[reference](data.data)
                : codeMessage[reference ?? response.status] || message || response.statusText
    };
};

const request = extend({
    prefix: '',
    credentials: 'include',
    errorHandler
});

export default request;
