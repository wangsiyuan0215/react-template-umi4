const gulp = require('gulp');
const paths = require('./config/gulp/paths');
const { exec, execSync } = require('child_process');

const { series, watch, parallel } = gulp;

const { APP_ENV = 'dev' } = process.env || {};

const clean = (cb) => cb();

const tailwind_watch = (cb) => {
    const watcher = watch([paths.$filesInTailwind], {
        ignored: [paths.$ignoredFileInTailwind],
    });
    watcher.on('add', (path, stats) => tailwind_build());
    watcher.on('change', (path, stats) => tailwind_build());
    watcher.on('unlink', (path, stats) => tailwind_build());
};

const tailwind_watch_async = (cb) => {
    exec('node ./node_modules/.bin/gulp watch:tailwind');
    cb();
};

const tailwind_build = (cb = () => {}) => {
    execSync(
        `node ./node_modules/.bin/tailwind build ${paths.$indexInTailwind} -o ${paths.$ignoredFileInTailwind}`
    );
    cb();
};

const umi_exec = (isDev = true) =>
    function umi_run(cb) {
        console.log();
        execSync(`cross-env APP_ENV=${APP_ENV} umi ${isDev ? 'dev' : 'build'}`, {
            stdio: ['inherit', 'inherit', 'inherit'],
        });
        cb();
    };

exports['watch:tailwind'] = tailwind_watch;
exports['dev'] = series(clean, tailwind_build, tailwind_watch_async, umi_exec());
exports['build'] = series(clean, tailwind_build, umi_exec(false));

exports.default = exports['dev'];
