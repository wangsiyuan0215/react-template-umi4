module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:compat/recommended', 'airbnb', 'prettier'],
    plugins: ['@typescript-eslint', 'react', 'babel', 'compat', 'import', 'jsx-a11y', 'markdown', 'react-hooks'],
    env: {
        es6: true,
        jest: true,
        node: true,
        mocha: true,
        browser: true,
        jasmine: true
    },
    globals: {
        $: true,
        IS_QA: true,
        TOKEN: true,
        APP_ENV: true,
        APP_URL: true,
        IS_DEV: true,
        IS_TEST: true,
        IS_PROD: true,
        UMI_ENV: true,
        APP_NAME: true,
    },
    rules: {
        'react/react-in-jsx-scope': 0,
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'react/jsx-wrap-multilines': 0,
        'react/prop-types': 0,
        'react/forbid-prop-types': 0,
        'react/jsx-one-expression-per-line': 0,
        'no-param-reassign': 0,
        'import/no-unresolved': [
            2,
            {
                ignore: [
                    '^@/',
                    '^umi/',
                    '^root/',
                    '^utils/',
                    '^./utils',
                    '^pages/',
                    '^assets/',
                    '^models/',
                    '^layouts/',
                    '^locales/',
                    '^resources/',
                    '^components/',
                    'components/'
                ]
            }
        ],
        'import/no-extraneous-dependencies': [
            2,
            {
                optionalDependencies: true,
                devDependencies: ['**/tests/**.js', '/mock/**/**.js', '**/**.test.js']
            }
        ],

        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/label-has-associated-control': 0,
        'jsx-a11y/label-has-for': 0,
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        'jsx-a11y/no-static-element-interactions': 0,

        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/class-name-casing': 2,
        '@typescript-eslint/interface-name-prefix': 0,
        '@typescript-eslint/explicit-function-return-type': 0,

        'comma-style': [2, 'last'],
        'comma-dangle': [2, 'never'],
        'linebreak-style': 0,
        'consistent-return': 0
    },
    settings: {
        polyfills: ['fetch', 'promises', 'url', 'object-assign'],
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: 'tsconfig.json'
            }
        }
    }
};
