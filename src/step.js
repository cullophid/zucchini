const step = R.curry((steplist, regex, handler) => [...steps,  [regex, handler]]

export default () => {
  const steplist = []
  return {
    step: step(steplist)
    steplist
  }
}
