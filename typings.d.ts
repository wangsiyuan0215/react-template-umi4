declare module '*.css';
declare module '*.scss';
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

declare interface BasicModel<T extends object, N = string> {
    namespace: N;
    state: T;
    subscriptions?: { setup: import('umi').Subscription } & Record<string, import('umi').Subscription>;
    effects?: {
        [key: string]: import('umi').Effect;
    };
    reducers?: {
        receive?: import('umi').Reducer<T>;
        [key: string]: import('umi').Reducer<T>;
    };
}
