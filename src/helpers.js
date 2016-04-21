import path from 'path'
import {all, filter, curry, contains, any, isEmpty, test, difference, tail, map} from 'ramda'

export const log = (key) => (value) => {
  console.log(key, value)
  return value
}

export const matchesTags = curry((selectedTags, {tags}) => {
  if (isEmpty(selectedTags)) return true
  const blacklist = filter(test(/^~/), selectedTags)
  const whitelist = difference(selectedTags, blacklist)

  return all(({name}) => !contains(name, map(tail, blacklist)), tags)
    && (isEmpty(whitelist) || any(({name}) => contains(name, whitelist) , tags))
})

export const featureMatchesTags = curry((tags, [x, {feature}]) => {
  return matchesTags(tags, feature) || any(matchesTags(tags), feature.children)
})

export const serial = (f, list = []) =>
  list.reduce((promise, e) => promise.then(() => f(e)), Promise.resolve())

// String -> String
export const joinPath = curry((a, b) => path.join(a, b))
