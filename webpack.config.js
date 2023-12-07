/**
 * 不是真实的 webpack 配置，仅为兼容 webstorm 和 intellij idea 代码跳转
 * ref: https://github.com/umijs/umi/issues/1109#issuecomment-423380125
 */
/* eslint global-require: ["off"] */
module.exports = {
    resolve: {
        alias: {
            '@': require('path').resolve(__dirname, 'src'),
            root: require('path').resolve(__dirname, ''),
            utils: require('path').resolve(__dirname, 'src/utils'),
            pages: require('path').resolve(__dirname, 'src/pages'),
            assets: require('path').resolve(__dirname, 'src/assets'),
            models: require('path').resolve(__dirname, 'src/models'),
            layouts: require('path').resolve(__dirname, 'src/layouts'),
            locales: require('path').resolve(__dirname, 'src/locales'),
            services: require('path').resolve(__dirname, 'src/services'),
            resources: require('path').resolve(__dirname, 'src/resources'),
            components: require('path').resolve(__dirname, 'src/components'),
        },
        extensions: ['less', 'js', 'jsx', 'ts', 'tsx']
    },
    modules: [
        'node_modules',
        require('path').resolve(__dirname, 'src'),
        require('path').resolve(__dirname, 'src/assets'),
        require('path').resolve(__dirname, 'src/resources'),
    ]
};
