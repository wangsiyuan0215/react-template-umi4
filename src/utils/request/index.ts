import { transfer } from '@/utils/request/transfer';
import { requestCreator } from '@/utils/request/request';

export type ApiResponseData<T> = Promise<IBasicResponse<T>>;

const apiTransfer = transfer(
    requestCreator({
        // request interceptors
        // response interceptors
        // TODO... and so on
    })
);

const generatorAPIS = <T extends string>(apis: Record<string, string>) =>
    Object.keys(apis).reduce((acc, key) => {
        return {
            ...acc,
            [key]: apiTransfer(apis[key])
        };
    }, {}) as Record<T, (...args: any[]) => ApiResponseData<any>>;

// eslint-disable-next-line import/prefer-default-export
export { generatorAPIS };
