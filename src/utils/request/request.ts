import axios, { AxiosRequestConfig, AxiosResponse, Method, InternalAxiosRequestConfig } from 'axios';

import { KEY_STORAGE } from '@/resources/constant';

type onFulfilled<T> = (value: T) => T | Promise<T>;
type onRejected = (error: any) => any;

type Interceptor<T> = [onFulfilled<T>, onRejected];

interface RequestCreateOptions extends AxiosRequestConfig {
    withAuthorization?: boolean;
    requestInterceptors?: Interceptor<InternalAxiosRequestConfig>[];
    responseInterceptors?: Interceptor<AxiosResponse>[];
}

const CONTENT_TYPES = {
    JSON: 'application/json',
    FORM_DATA: 'multipart/form-data'
};

const METHODS: Record<string, Method> = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
};

const requestCreator = (options: RequestCreateOptions = {}) => {
    const { withAuthorization, requestInterceptors = [], responseInterceptors = [] } = options;

    const request = axios.create({
        timeout: 600000,
        withCredentials: true,
        ...options
    });

    requestInterceptors.map((fn) => request.interceptors.request.use(...fn));
    responseInterceptors.map((fn) => request.interceptors.response.use(...fn));

    return async <T>(
        { method, url, params, responseType }: AxiosRequestConfig,
        withFormData = false
    ): Promise<IBasicResponse<T>> => {
        let authorization: string;
        try {
            authorization = localStorage.getItem(KEY_STORAGE.TOKEN) ?? '';
        } catch (error) {
            authorization = '';
        }
        try {
            const { data } = await request({
                url,
                method,
                data:
                    method === METHODS.POST || method === METHODS.PUT
                        ? withFormData
                            ? Object.keys(params).reduce((acc: FormData, key) => {
                                  // eslint-disable-next-line no-sequences
                                  return acc.append(key, params[key]), acc;
                              }, new FormData())
                            : params
                        : undefined,
                params: method === METHODS.GET || method === METHODS.DELETE ? params : null,
                headers: {
                    ...(withAuthorization ? { authorization } : {}),
                    'Content-Type': withFormData ? CONTENT_TYPES.FORM_DATA : CONTENT_TYPES.JSON
                },
                ...(responseType ? { responseType } : {})
            });
            return data;
        } catch (error) {
            throw error;
        }
    };
};

export { requestCreator };
