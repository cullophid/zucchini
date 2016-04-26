import fs from 'fs'
import chalk from 'chalk'
import {browser} from '../'
import {tail, curry, find, test, filter} from 'ramda'
import {serial, matchesTags} from '../helpers'
import loadStepDefs from './step-definitions'

const runScenario = curry(async (stepDefs, scenario) => {
  console.log('\n')
  console.log(chalk.green('  Scenario: ', scenario.name))
  await browser.init({browserName: 'chrome'})
  await serial(runStep(stepDefs), scenario.steps)
  return browser.end()
})

const applyStepdef = ([regex, handler], {text}) =>
  handler(...tail(regex.exec(text)))

const runStep = curry(async (stepDefs, step) => {
  const stepDef = find(([regex]) => test(regex, step.text), stepDefs)
  if (!stepDef) {
    return console.log(chalk.yellow('No step definition for ', step.keyword, step.text))
  }
  await applyStepdef(stepDef, step)
  await browser.chain(() => null)
  console.log(chalk.green('    ', step.keyword + step.text))
})

export default curry(async (config, [featurePath, {feature}]) => {
  const stepDefs = loadStepDefs(featurePath)
  const scenarios = filter(matchesTags(config.tags), feature.children)
  return serial(runScenario(stepDefs), scenarios)
})
