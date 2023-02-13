// UmiJs 3.x
import path from 'path';
import { defineConfig } from 'umi';

// eslint-disable-next-line import/no-unresolved
import pack from '../package.json';
import routes from './routes.config';
import svgoConfig from './svgo-config.json';

const { UMI_ENV } = process.env;

const isQa = UMI_ENV === 'qa';
const isDev = UMI_ENV === 'develop';
const isProd = UMI_ENV === 'prod';

const iconPath = path.join(__dirname, '../', 'src/assets/icons');
const jqueryScriptUrl = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';

export default defineConfig({
    dva: {
        hmr: true,
        immer: true,
        skipModelValidate: true
    },
    hash: true,
    mfsu: {
        development: {
            output: '.mfsu'
        }
    },
    alias: {
        /* eslint global-require:0 */
        '@': require('path').resolve(__dirname, '../src'),
        '@root': require('path').resolve(__dirname, '../')
    },
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
    layout: {
        name: pack.name,
        locale: true,
        layout: 'side'
    },
    routes,
    history: { type: 'hash' },
    scripts: [jqueryScriptUrl],
    lessLoader: {
        javascriptEnabled: true
    },
    publicPath: '/',
    fastRefresh: {},
    extraBabelPlugins: ['@babel/plugin-proposal-optional-chaining'],
    ignoreMomentLocale: true,
    // eslint-disable-next-line import/no-extraneous-dependencies
    extraPostCSSPlugins: [require('tailwindcss'), require('autoprefixer')],
    nodeModulesTransform: {
        type: 'none'
    },
    extraBabelIncludes: ['parse5'],
    chainWebpack: (config) => {
        config.resolve.modules.add(path.resolve(__dirname, '../src/resources'));
        config.resolve.extensions.add('less');
        config.module.rule('svg').exclude.add(iconPath).end();
        config.module
            .rule('svg-sprite-loader')
            .test(/\.svg(\?v=\d+\.\d+\.\d+)?$/)
            .include.add(iconPath)
            .end()
            .use('svg')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            });

        config.module
            .rule('svgo')
            .test(/\.svg(\?v=\d+\.\d+\.\d+)?$/)
            .include.add(iconPath)
            .end()
            .use('svgo')
            .loader('file-loader')
            .loader('svgo-loader')
            .options(svgoConfig);
    }
});