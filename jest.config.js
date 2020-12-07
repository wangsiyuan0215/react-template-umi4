/*
 * @Date: 2020/12/7 5:07 PM
 * @Description: jest.config
 */
module.exports = {
    preset: 'jest-puppeteer',
    testURL: 'http://localhost:8000',
    moduleNameMapper: {
        '@/(.*)$': '<rootDir>/src/$1'
    }
};
