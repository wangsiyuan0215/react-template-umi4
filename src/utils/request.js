/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */

import umiRouter from 'umi/router';
import { extend } from 'umi-request';

import { SuccessCode, ErrorFromTypes } from '@/resources/constant';

const codeMessage = {
    400: 'There was an error with the request that the server did not make new or modified data.',
    401: '很抱歉，当前用户无权访问本系统，请重新登录',
    403: '很抱歉，你所具备的权限无法访问当前接口',
    404: '很抱歉，你所访问的资源未找到',
    406: 'The format of the request is not available.',
    410: '很抱歉，你所访问的资源未找到',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '很抱歉，服务器出错了，请稍后再试',
    502: 'Gateway error.',
    503: '很抱歉，当前服务器目前正在维护，请稍后再试',
    504: '很抱歉，请求超时.'
};

/**
 * 当 response 的 status 非 20* 状态码时的异常处理
 */
let limited = 0;
/* eslint consistent-return: ["off"] */
const errorHandler = error => {
    const { response = {}, message } = error;

    if (limited + 3000 > Date.now()) return;

    limited = Date.now();

    if ([403, 404, 410].includes(Number(response.status)))
        setTimeout(() => {
            umiRouter.replace(`/exception/${response.status}`);
        }, 1000);

    // eslint-disable-next-line no-throw-literal
    throw {
        from: ErrorFromTypes.REQUEST,
        message: codeMessage[response.status] || message || response.statusText
    };
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
    // 默认错误处理
    errorHandler,

    // 默认请求是否带上cookie
    credentials: 'include'
});

/**
 * 当 response 的 status 是 200 或 201 状态码时，对业务逻辑的异常处理
 */
request.interceptors.response.use(async response => {
    const clone = response.clone();

    const { status } = clone;

    if ([200, 201, 202, 204, 555, 599].includes(Number(status))) {
        const result = await clone.json();
        if (result.code && result.code !== SuccessCode)
        // eslint-disable-next-line no-throw-literal
            throw {
                from: ErrorFromTypes.REQUEST,
                message: result.msg || result.message || result.title || '~!#￥￥%……&&%%##%%##!@'
            };
    }

    return response;
});

export default request;
