/** @type {import('tailwindcss').Config} */

module.exports = {
    theme: {
        extend: {}
    },
    content: ['./src/**/*.html', './src/**/*.ts', './src/**/*.tsx'],
    plugins: [],
    corePlugins: {
        container: false,
        Preflight: false
    }
};
