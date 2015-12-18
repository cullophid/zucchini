import chalk from 'chalk'
import path from 'path'
import R from 'ramda'
import driver from 'zucchini-webdriver'
import parser from './parser'
import stepFactory from './step'
import loadStepDefinitions from './step-definitions'
import run from './run'

const features = parser('./features')
const browser = driver({timeout: 10000});

const {step, steplist} = stepFactory()

global.Given = step
global.When = step
global.Then = step
global.And = step

global.browser = browser

loadStepDefinitions(path.join(process.cwd(), '/step_definitions'))

const success = () => console.log(chalk.green('All Tests Passed'))
const failure = async (err) => {
  console.log(chalk.red('Test failed with error: ',err))
  await browser.kill()
  console.log('killed browser');
  process.exit(1)
}
run(browser, steplist, features)
  .then(success, failure)
