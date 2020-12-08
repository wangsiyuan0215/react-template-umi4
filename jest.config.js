/*
 * @Date: 2020/12/7 5:07 PM
 * @Description: jest.config
 */
module.exports = {
    // preset: 'jest-puppeteer',
    preset: 'ts-jest',
    testURL: 'http://localhost:8000',
    testMatch: ['<rootDir>/__tests__/**/?(*.)test.js?(x)'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.(js|jsx|mjs)$': 'babel-jest',
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
    },
    moduleNameMapper: {
        '@/(.*)$': '<rootDir>/src/$1',
        'root/(.*)$': '<rootDir>/$1'
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/']
};
