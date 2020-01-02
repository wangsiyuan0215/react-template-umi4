/*
 * @Author: SiYuan Wang
 * @Date: 2019-11-19 17:35:51
 * @Description: common.d
 */

export declare interface BasicModel<T> {
    state: T;
    effects: any;
    reducers: any;
    namespace: string;
    subscriptions?: any;
}

export declare interface Pagination {
    totalCount: number;
    currentPage: number;
}

export declare interface Params4page {
    pageNum: number;
    pageSize: number;
}
