#!/usr/bin/env zx

let { version, 'test-version': testVersion } = require('../package.json');

echo`${chalk.blue('info')} Current major version: ${version}`;
let MAJOR_VERSION = await question(
    'Please enter major version e.g., 1.0.2 (the major version is not changed, just enter): '
);

if (!MAJOR_VERSION) {
    MAJOR_VERSION = version;
}
echo`${chalk.blue('info')} Deploying major version: ${MAJOR_VERSION}`;
echo``;

const TEST_VERSION = (await $`date +%Y-%m-%d,%H:%M:%S`).stdout.slice(0, -1);

echo`${chalk.blue('info')} Current test version: ${testVersion}`;
echo`${chalk.blue('info')} Deploying test version: ${TEST_VERSION}`;

let confirm = await question(
    `${chalk.yellow('final version')} v${MAJOR_VERSION}-${TEST_VERSION}, are you sure? (y/n/Enter)`
);

if (!confirm) confirm = 'y';

if (confirm.toLocaleLowerCase() === 'y') {
    echo``;

    await $`npm version --no-git-tag-version --no-commit-hooks --allow-same-version --new-version ${MAJOR_VERSION}`;

    const system = await $`uname -a`;
    if (system.stdout.indexOf('Darwin') !== -1) {
        await $`sed -i '' ${'4 s/' + testVersion + '/' + TEST_VERSION + '/g'} package.json`;
    } else {
        await $`sed -i ${'3 4/' + testVersion + '/' + TEST_VERSION + '/g'} package.json`;
    }

    // $.verbose = true
    // build
    // await $`npm run build:stage`

    // echo`🎉 ${chalk.bold.blue('build success!')}`
    // echo``

    // commit, tag and push
    await $`git add package.json package-lock.json`;
    await $`git commit -m ${'EAI-000 (Build) QA v' + MAJOR_VERSION + '-' + TEST_VERSION}`;
    await $`git push`;
}
