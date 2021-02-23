/*
 * @Editor: SiYuan Wang
 * @Date: 2019-08-26 14:01:38
 * @Description: config
 */

export default {
    proxy: {
        '/passport-rbac/pub': {
            target: 'http://10.9.43.232:8888',
            changeOrigin: true
        },
        '/api/v1/monitor': {
            // target: 'http://10.9.43.38:8877',
            // target: 'http://172.20.27.233:14032',
            target: 'http://192.168.172.25:13410',
            changeOrigin: true
        },
        '/api/v1/mgr/medical/monitor': {
            // target: 'http://10.9.43.29:1256',
            target: 'http://192.168.172.25:13410',
            // target: 'http://172.20.136.9:14103',
            changeOrigin: true
        },
        '/api/user/': {
            target: 'http://192.168.172.25:13410',
            changeOrigin: true
        },
        '/api/siantifraud/v1/': {
            target: 'http://192.168.172.25:13410',
            changeOrigin: true
        }
    },
    define: {
        TOKEN: '868f8592-a49a-4195-b174-13971f2e32dc'
    }
};
