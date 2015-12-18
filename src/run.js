import R from 'ramda'
import chalk from 'chalk'

const log = (key) => (value) => {
  console.log(key)
  return value
}

const logError = (key) => (value) => {
  console.error(key, value)
  return Promise.reject(value)
}

const serial = (f, list) =>
  list.reduce((promise, e) => promise.then(() => f(e)), Promise.resolve())

export default async (browser, steplist, features) => {

  const runFeature = async (feature) => {
    console.log('Feature: ', feature.name)
    await serial(runScenario, feature.scenarioDefinitions)
  }

  const runScenario = async (scenario) => {
    console.log('  Scenario: ', scenario.name)
    await browser.init({browserName: 'firefox'})
    await serial(runStep, scenario.steps)
    await browser.end()
    console.log('')

  }

  const runStep = (step) => {
    const handler = R.find(([regex]) => R.test(regex, step.text), steplist)
    if (!handler) {
      console.log(chalk.yellow('No handler for ', step.keyword, step.text))
      return;
    }
    await handler[1]()
    await browser.chain(() => null)
    console.log(chalk.green('    ', step.keyword + step.text))

  }

  return await serial(runFeature, features)
}
