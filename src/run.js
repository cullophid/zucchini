import assert from 'assert'
import chalk from 'chalk'
import {serial, featureMatchesTags} from './helpers'
import runFeature from './feature'
import loadFeatures from './load-features'
import path from 'path'
import defaults from './default-config'
import {filter, curry, any} from 'ramda'

import {config} from './'


const success = () =>
  console.log(chalk.green('\n\nAll Tests Passed'))

const failure = async (err) => {
  console.log(chalk.red('Test failed with error: ',err))
  await browser.kill()
  console.log('killed browser');
  process.exit(1)
}

export default () => {
  const _features = loadFeatures(config.featureFiles)
  assert(_features.length > 0, `Could not fund any feature files: ${config.featureFiles}`)
  const features = filter(featureMatchesTags(config.tags), _features)
  return serial(runFeature(config), features)
    .then(success, failure)
}
