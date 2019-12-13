/*
 * @Author: SiYuan Wang
 * @Date: 2019-12-13 11:16:43
 * @Description: user
 */

import request from '@/utils/request';
import { Scopes, Channels } from '@/resources/constant';

import { RequestMethod } from 'umi-request';

interface IParams {
    username: string;
    password: string;
}

export async function postAuth(params: IParams): Promise<RequestMethod> {
    return request(`/passport-rbac/pub/${Scopes.default}/auth/${Channels.WEB}/${params.username}`, {
        method: 'POST',
        data: {
            method: 'PASSWORD',
            params: {
                password: params.password
            }
        }
    });
}
