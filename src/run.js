import R from 'ramda'
import chalk from 'chalk'


// const log = (key) => (value) => {
//   console.log(key)
//   return value
// }
const logError = (key) => (value) => {
  console.error(key, value)
  return Promise.reject(value)
}

export default (browser, steplist, features) => {
  const chain = (f) => browser.chain(f)
  const chainAll = (list) => chain(() => Promise.all(list))

  const runFeature = (feature) => {
    chain(() => console.log('Feature: ', feature.name))
    R.forEach(runScenario, feature.scenarioDefinitions)
    chain(() => console.log('\n\n'))
  }

  const runScenario = (scenario) => {
    chain(() => console.log('  Scenario: ', scenario.name))
    browser.init({browserName: 'firefox'})
    R.forEach(runStep, scenario.steps)
    chain(null, logError('SCENARIO ERROR'))
    browser.end()
    chain(() => console.log('\n'))

  }

  const runStep = (step) => {

    const handler = R.find(([regex]) => R.test(regex, step.text), steplist)
    if (!handler) {
      console.log(chalk.yellow('No handler for ', step.keyword, step.text))
      return;
    }
    chain(null, logError('ERR'))
    chainAll([Promise.resolve(handler[1]()), browser.chain()])
    chain(null, (err) => {
      console.log(chalk.red(err))
      return Promise.reject(err)
    })
    chain(() => console.log(chalk.green('    ', step.keyword + step.text)))

  }
  R.forEach(runFeature, features)
}
