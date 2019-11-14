/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-11 13:23:55
 * @Description: config
 */

import path from "path";
import routes from './routes.config';

const apiPrefixedUrl = {
    dev: 'app-dev.url.com',
    test: 'app-test.url.com',
    prod: 'app-prod.url.com'
};

const apiProtocol = {
    dev: 'http',
    test: 'http',
    prod: 'https'
};

export default {
    hash: true,
    treeShaking: true,
    plugins: [
        [
            'umi-plugin-react',
            {
                antd: true,
                dva: {
                    hmr: true
                },
                targets: {
                    ie: 11
                },
                locale: {
                    enable: true, // default false
                    default: 'zh-CN', // default zh-CN
                    baseNavigator: false // default true, when it is true, will use `navigator.language` overwrite default
                },
                dynamicImport: {
                    level: 2,
                    webpackChunkName: true,
                    loadingComponent: './components/Common/Loading/index'
                },
                dll: {
                    include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es']
                }
            }
        ]
    ],
    targets: { ie: 11 },

    /**
     * 路由相关配置
     */
    routes: routes,
    disableRedirectHoist: true,
    // proxy: {
    //     '/api': {
    //         target: ((env) => {
    //             const targetUrl = getApiUrl(env);
    //             // eslint-disable-next-line no-console
    //             console.log(`current prefixed url of api: ${targetUrl}`);
    //
    //             return targetUrl;
    //         })(APP_ENV),
    //         changeOrigin: true
    //     }
    // },
    /**
     * webpack 相关配置
     */
    alias: {
        '@': require('path').resolve(__dirname, '../src'),
        root: require('path').resolve(__dirname, '..'),
        utils: require('path').resolve(__dirname, '../src/utils'),
        pages: require('path').resolve(__dirname, '../src/pages'),
        assets: require('path').resolve(__dirname, '../src/assets'),
        models: require('path').resolve(__dirname, '../src/models'),
        layouts: require('path').resolve(__dirname, '../src/layouts'),
        locales: require('path').resolve(__dirname, '../src/locales'),
        services: require('path').resolve(__dirname, '../src/services'),
        resources: require('path').resolve(__dirname, '../src/resources'),
        components: require('path').resolve(__dirname, '../src/components')
    },
    define: {
        requestPrefixedStr: `${apiProtocol[process.env.DEPLOYMENT_ENV]}://${
            apiPrefixedUrl[process.env.DEPLOYMENT_ENV]
        }`,
        assetsUrlPrefixedStr: process.env.DEPLOYMENT_ENV === 'development' ? '/files/' : '/files/'
    },
    // Theme for antd
    // https://ant.design/docs/react/customize-theme-cn
    theme: {
        'primary-color': '#2c2e3e'
    },
    externals: {},
    ignoreMomentLocale: true,
    lessLoaderOptions: {
        javascriptEnabled: true
    },
    chainWebpack: config => {
        config.resolve.modules.add(path.resolve(__dirname, '../src/resources'));
        config.resolve.extensions.add('less');
    }
};
