import pack from '@root/package.json';

const { version, 'test-version': test } = pack;

/* eslint no-console: 0 */
console.log('%c' + APP_NAME, 'color: #fff; font-size: 60px; font-weight: 700; background-color: #1a37ab;');
console.log(
    // eslint-disable-next-line no-undef
    `%cenv: %c ${UMI_ENV.toUpperCase()} \n%cver: %c ${version}${!IS_PROD ? `-${test}` : ''} `,
    'color: #4d5661; font-size: 12px;',
    'color: #fff; font-weight: 700; font-size: 12px; line-height: 1.6; background-color: #14c670;',
    'color: #4d5661; font-size: 12px;',
    'color: #fff; font-weight: 700; font-size: 12px; line-height: 1.6; background-color: #fc800e;'
);
