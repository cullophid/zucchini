import chalk from 'chalk'
import {serial} from './helpers'
import runFeature from './feature'
import loadFeatures from './load-features'

const filePattern = process.argv[2]

const success = () =>
  console.log(chalk.green('\n\nAll Tests Passed'))

const failure = async (err) => {
  console.log(chalk.red('Test failed with error: ',err))
  await browser.kill()
  console.log('killed browser');
  process.exit(1)
}

export default () => {
  const features = loadFeatures(filePattern)
  return serial(runFeature, features)
    .then(success, failure)
}
