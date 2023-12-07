#!/usr/bin/env zx

$.verbose = false

const { version, 'test-version': testVersion } = require('../package.json')

const TEST_VERSION = (await $`TZ=UTC-8 date +%Y%m%d-%H%M`).stdout.slice(0, -1);

const system = await $`uname -a`
const isDarwin = system.stdout.indexOf('Darwin') !== -1
const q = $.quote
$.quote = v => v

const args = [
  'sed',
  '-i',
  ...(isDarwin ? ['\'\''] : []),
  '\'4s/' + testVersion + '/' + TEST_VERSION + '/g\'',
  'package.json',
]

const pieces = new Array(args.length + 1).fill(' ')

await $(pieces, ...args)

$.quote = q

echo``
echo`${chalk.blue('info')} Deploying test version: ${version}-${TEST_VERSION}`
echo``
