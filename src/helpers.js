export const log = (key) => (value) => {
  console.log(key, value)
  return value
}

export const serial = (f, list = []) =>
  list.reduce((promise, e) => promise.then(() => f(e)), Promise.resolve())
