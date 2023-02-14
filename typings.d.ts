declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.jpg';
declare module '*.json';
declare module '*.html';
declare module '*.svg' {
    export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
    const url: string;
    export default url;
}

declare module 'history' {
    export interface Location<S> {
        query: Record<string, unknown>;
    }
}

declare module 'classnames' {
    type Value = string | number | boolean | undefined | null;
    type Mapping = Record<string, unknown>;
    type ArgumentArray = Array<Argument>;
    type Argument = Value | Mapping | ArgumentArray;

    function classNames(...args: ArgumentArray): string;

    export default classNames;
}

interface IBasicItem {
    id: number | string;
    [key: string]: any;
}

interface IByIdsItem<T> {
    [key: string]: T;
}

declare interface IBasicIds<T extends IBasicItem> {
    byId?: IByIdsItem<T>;
    allIds?: (number | string)[];
}

declare interface IBasicResponse<T> {
    data: T;
    version: string;
    reference: null | string;
    timestamp: number;
}

declare namespace NodeJS {
    interface Global {
        dvaApp: unknown;
        window: Window;
        document: Document;
        navigator: Navigator;
    }
}

declare interface Window {
    dvaApp: unknown;
}

declare const IS_QA: boolean;
declare const IS_DEV: boolean;
declare const UMI_ENV: string;
declare const IS_PROD: boolean;
declare const APP_NAME: string;
