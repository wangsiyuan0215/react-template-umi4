#!/usr/bin/env zx

let { version } = require('../package.json')

echo`${chalk.blue('info')} Current major version: ${version}`
let MAJOR_VERSION = await question(
  'Please enter major version e.g., 1.0.2 (the major version is not changed, just enter): '
)

if (!MAJOR_VERSION) {
  MAJOR_VERSION = version
}
echo`${chalk.blue('info')} Deploying major version: ${MAJOR_VERSION}`
echo``

let confirm = await question(`${chalk.yellow('final version')} v${MAJOR_VERSION}, are you sure? (y/n/Enter)`)

if (!confirm) confirm = 'y'

if (confirm.toLocaleLowerCase() === 'y') {
  echo``

  await $`npm version --no-git-tag-version --no-commit-hooks --allow-same-version --new-version ${MAJOR_VERSION}`

  // $.verbose = true
  // build
  // await $`npm run build:prod`
  //
  // echo`🎉 ${chalk.bold.blue('build success!')}`
  // echo``

  // commit, tag and push
  await $`git add package.json package-lock.json`
  await $`git commit -m ${'EAI-000 (Build) PROD v' + MAJOR_VERSION + '.'}`
  await $`git push`
}
