import R from 'ramda'
const step = R.curry((steplist, regex, handler) => steplist.push([regex, handler]))

export default () => {
  const steplist = []
  return {
    step: step(steplist),
    steplist
  }
}
