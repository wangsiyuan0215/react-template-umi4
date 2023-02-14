import { defineConfig } from '@umijs/max';

export default defineConfig({
    proxy: {
        '/mock': {
            target: 'https://www.baidu.com/mock',
            changeOrigin: true,
            pathRewrite: { '^/mock': '' }
        }
    }
});
