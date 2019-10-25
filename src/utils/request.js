/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import umiRouter from 'umi/router';
import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: 'There was an error with the request that the server did not make new or modified data.',
    401: 'Incorrect username or password.',
    403: 'User is authorized, but access is forbidden.',
    404: 'The resources being accessed are not found.',
    406: 'The format of the request is not available.',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: 'An error occurred on the server. Please check the server.',
    502: 'Gateway error.',
    503: 'Service is unavailable, server is temporarily overloaded or maintained',
    504: 'Timeout.'
};

/**
 * 异常处理程序
 */
/* eslint consistent-return: ["off"] */
const errorHandler = async error => {
    let status = 404;
    let errorText = codeMessage[status];
    try {
        const { response = {} } = error;
        const { url, status: responseStatus } = response;
        const { title = null, message = null } =
            typeof response.json === 'function' ? await response.json() : {};

        status = responseStatus;
        errorText = title || message || codeMessage[status] || response.statusText;

        /* eslint prefer-destructuring: ["off"] */
        if (url.includes('api/authenticate') && [400, 401].includes(Number(status)))
            errorText = codeMessage[401];
        else if (Number(status) === 401) {
            setTimeout(() => {
                umiRouter.replace(`/login`);
            }, 1000);
        }

        if ([403, 404].includes(Number(status)))
            setTimeout(() => {
                umiRouter.replace(`/exception/${status}`);
            }, 1000);
    } finally {
        notification.error({
            message: `Request Error[${status}]`,
            description: errorText
        });
    }
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
    errorHandler, // 默认错误处理
    credentials: 'include' // 默认请求是否带上cookie，
});

export default request;
