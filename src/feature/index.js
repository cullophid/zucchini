import fs from 'fs'
import chalk from 'chalk'
import {browser} from '../'
import {curry, find, compose, test} from 'ramda'
import {serial} from '../helpers'
import loadStepDefs from './step-definitions'

const runScenario = curry(async (stepDefs, scenario) => {
  console.log('\n')
  console.log(chalk.green('  Scenario: ', scenario.name))
  await browser.init({browserName: 'chrome'})
  await serial(runStep(stepDefs), scenario.steps)
  return browser.end()
})

const runStep = curry(async (stepDefs, step) => {
  const stepDef = find(([regex]) => test(regex, step.text), stepDefs)
  if (!stepDef) {
    console.log(chalk.yellow('No handler for ', step.keyword, step.text))
    return;
  }
  const [x, handler] = stepDef
  await handler()
  await browser.chain(() => null)
  console.log(chalk.green('    ', step.keyword + step.text))
})

export default async ([featurePath, {feature}]) => {
  const stepDefs = loadStepDefs(featurePath)
  return serial(runScenario(stepDefs), feature.children)
}
