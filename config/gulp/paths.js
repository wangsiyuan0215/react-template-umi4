/*
 **	User name
 **	Created	2021/1/28
 **	/Users/siyuan.wang/Works/react-template/config/gulp/paths.js
 */
const path = require('path');

const $src = path.resolve(__dirname, '../../src');
const $assets = path.resolve(__dirname, $src, 'assets');
const $tailwind = path.resolve(__dirname, $assets, 'tailwind');
const $filesInTailwind = path.resolve(__dirname, $tailwind, '*.css');
const $indexInTailwind = path.resolve(__dirname, $tailwind, 'index.css');
const $ignoredFileInTailwind = path.resolve(__dirname, $tailwind, 'tailwind.css');

console.log($indexInTailwind);

module.exports = {
    $src,
    $assets,
    $tailwind,
    $filesInTailwind,
    $indexInTailwind,
    $ignoredFileInTailwind,
};
