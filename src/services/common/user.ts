import { generatorAPIS } from '@/utils/request';

const userApis = {
    getUserInfo: 'GET /user-info'
};

export default generatorAPIS<keyof typeof userApis>(userApis);
