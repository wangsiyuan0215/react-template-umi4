import path from 'path';
import { defineConfig } from '@umijs/max';

import pack from '../package.json';
import routes from '../src/routes';

const { UMI_ENV } = process.env;

const isQa = UMI_ENV === 'qa';
const isDev = UMI_ENV === 'develop';
const isProd = UMI_ENV === 'prod';

export default defineConfig({
    dva: {
        immer: {},
        skipModelValidate: true
    },
    antd: {
        style: 'less',
        import: true,
        compact: true
    },
    hash: true,
    mfsu: {
        cacheDirectory: require('path').resolve(__dirname, '../.mfsu')
    },
    mock: {},
    alias: {
        /* eslint global-require:0 */
        '@': require('path').resolve(__dirname, '../src'),
        '@root': require('path').resolve(__dirname, '../')
    },
    model: {},
    access: {},
    define: {
        IS_QA: isQa,
        IS_DEV: isDev,
        UMI_ENV: UMI_ENV || 'develop',
        IS_PROD: isProd,
        APP_NAME: pack.name
    },
    locale: {
        default: 'en-US',
        baseNavigator: false
    },
    layout: false,
    routes,
    history: { type: 'hash' },
    lessLoader: {
        javascriptEnabled: true
    },
    publicPath: '/',
    fastRefresh: true,
    initialState: {},
    extraBabelPlugins: ['@babel/plugin-proposal-optional-chaining'],
    ignoreMomentLocale: true,
    // eslint-disable-next-line import/no-extraneous-dependencies
    extraPostCSSPlugins: [require('tailwindcss'), require('autoprefixer')],
    chainWebpack: (config) => {
        config.resolve.modules.add(path.resolve(__dirname, '../src/resources'));
        config.resolve.extensions.add('less');
    }
});
