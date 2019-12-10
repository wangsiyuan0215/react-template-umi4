/*
 * @Author: SiYuan Wang
 * @Date: 2019-11-19 17:35:51
 * @Description: common.d
 */

export interface IBasicModel<T> {
    state: T;
    effects: any;
    reducers: any;
    namespace: string;
    subscriptions?: any;
}

export interface Pagination {
    totalCount: number;
    currentPage: number;
}

export interface Params4page {
    pageNum: number;
    pageSize: number;
}
