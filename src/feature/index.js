import fs from 'fs'
import chalk from 'chalk'
import {browser} from '../'
import {tail, curry, find, compose, test} from 'ramda'
import {serial} from '../helpers'
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
    return console.log(chalk.yellow('No handler for ', step.keyword, step.text))
  }
  await applyStepdef(stepDef, step)
  await browser.chain(() => null)
  console.log(chalk.green('    ', step.keyword + step.text))
})

export default async ([featurePath, {feature}]) => {
  const stepDefs = loadStepDefs(featurePath)
  return serial(runScenario(stepDefs), feature.children)
}
