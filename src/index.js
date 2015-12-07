import chalk from 'chalk'
import R from 'ramda'
import driver from 'web-test'
import parser from './parser'
import stepFactory from './step'
import requireIndex from 'requireIndex'
import run from './run'

const features = parser('./features')
const browser = driver({timeout: 10000});

const {step, steplist} = stepFactory()

global.Given = step
global.When = step
global.Then = step
global.And = step

global.fill = browser.fill
global.click = browser.click
global.getText = browser.getText
global.visit = browser.visit
global.assertText = browser.assertText
global.sleep = browser.sleep

requireIndex(__dirname + '/step_definitions')


const success = () => console.log(chalk.green('All Tests Passed'))
const failure = async (err) => {
  console.log(chalk.red('Test failed with error: ',err))
  await browser.kill()
  console.log('killed browser');
  process.exit(1)
}
run(browser, steplist, features)
  .then(success, failure)
