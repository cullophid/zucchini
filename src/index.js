import chalk from 'chalk'
import path from 'path'
import R from 'ramda'
import driver from 'zucchini-webdriver'
import parser from './parser'
import stepFactory from './step'
import loadStepDefinitions from './step-definitions'
import run from './run'
const rootDir = path.join(process.cwd(), process.argv[2])



const features = parser(rootDir)
console.log('features', features)
const browser = driver({timeout: 10000});

const {step, steplist} = stepFactory()

global.step = step

global.browser = browser

loadStepDefinitions(rootDir)

const success = () =>
  console.log(chalk.green('All Tests Passed'))

const failure = async (err) => {
  console.log(chalk.red('Test failed with error: ',err))
  await browser.kill()
  console.log('killed browser');
  process.exit(1)
}
run(browser, steplist, features)
  .then(success, failure)
