/* eslint-disable camelcase, @typescript-eslint/camelcase */
import request from '@/utils/request';

import type { IUser } from '@/types/user';

// eslint-disable-next-line import/prefer-default-export
export function authGetUserInfo<T extends IUser>(): Promise<T> {
    return request<T>(`/user-info`, {
        method: 'GET'
    });
}
