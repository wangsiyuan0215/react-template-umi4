// import { StatusCodes } from 'http-status-codes';
import { requestCreator, G } from '@siyuan0215/easier-axios-dsl';

const TIMEOUT = {
    DEFAULT: 60000,
    UPLOADING: 5 * 60000
};
export const request = requestCreator({
    baseURL: '/api',
    timeout: TIMEOUT.DEFAULT,
    withCredentials: true,
    requestInterceptors: [(config) => config, (error: any) => Promise.reject(error)],
    responseInterceptors: [
        (response) => response,
        (error: string) => {
            return Promise.reject(error);
        }
    ]
});

export const generatorAPIS = <T extends Record<string, string>>(apiConfig: T) => G<T>(request, apiConfig);
