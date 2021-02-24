/*
 * @Editor: SiYuan Wang
 * @Date: 2019-08-26 14:01:38
 * @Description: config
 */
// https://umijs.org/config/
import path from 'path';
import pageRoutes from './routes.config';
import svgoConfig from './svgo-config';

const { APP_ENV } = process.env;

const iconPath = path.join(__dirname, '../src/assets/icons');
const themeFromPath = path.join(__dirname, '../src/resources/themes');
const themeToPath = path.join(__dirname, '../dist/themes');
const publicPath = './';

export default {
    hash: true,
    // 路由配置
    routes: pageRoutes,
    history: 'hash',
    publicPath,
    treeShaking: true,
    alias: {
        /* eslint global-require:0 */
        '@': require('path').resolve(__dirname, '../src'),
        root: require('path').resolve(__dirname, '../'),
        utils: require('path').resolve(__dirname, '../src/utils'),
        pages: require('path').resolve(__dirname, '../src/pages'),
        assets: require('path').resolve(__dirname, '../src/assets'),
        models: require('path').resolve(__dirname, '../src/models'),
        layouts: require('path').resolve(__dirname, '../src/layouts'),
        locales: require('path').resolve(__dirname, '../src/locales'),
        resources: require('path').resolve(__dirname, '../src/resources'),
        components: require('path').resolve(__dirname, '../src/components')
    },
    copy: [
        {
            from: `${themeFromPath}/*.css`,
            to: `${themeToPath}/[name].[ext]`,
            globOptions: {
                ignore: ['default.css'],
            },
        }
    ],
    theme: {
        'primary-color': '#538fff'
    },
    define: {
        IS_DEV: APP_ENV === 'development',
        APP_ENV: APP_ENV || '',
        IS_TEST: APP_ENV === 'test',
        IS_PROD: APP_ENV === 'production',
        ICONFONT_JS_URL: '//at.alicdn.com/t/font_1362182_ufmmrnxmvh.js',
        APP: 'APP_TEST_STRING',
        PUBLIC_PATH: publicPath
    },
    plugins: [
        [
            'umi-plugin-react',
            {
                dll: {
                    include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es']
                },
                dva: {
                    hmr: true,
                    immer: true
                },
                antd: true,
                locale: {
                    enable: true, // default false
                    default: 'zh-CN', // default zh-CN
                    baseNavigator: false // default true, when it is true, will use `navigator.language` overwrite default
                },
                dynamicImport: {
                    level: 2,
                    webpackChunkName: true,
                    loadingComponent: './components/Common/Loading/index'
                }
            }
        ]
    ],
    targets: {
        ios: 10,
        edge: 13,
        chrome: 49,
        safari: 10,
        firefox: 45
    },
    manifest: {
        basePath: '/'
    },
    chainWebpack: config => {
        config.resolve.modules.add(path.resolve(__dirname, '../src/resources'));
        config.resolve.extensions.add('less');
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
    },
    extraBabelPlugins: ['@babel/plugin-proposal-optional-chaining'],
    urlLoaderExcludes: [iconPath],
    lessLoaderOptions: {
        javascriptEnabled: true
    },
    ignoreMomentLocale: true,
    disableRedirectHoist: true
};
