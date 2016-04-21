import fs from 'fs'
import path from 'path'
import {init, split, join, append, compose} from 'ramda'
import {joinPath} from '../helpers'

// String -> String
const getStepDefPath = compose(joinPath(process.cwd()), join('.'), append('js'), init, split('.'))


const asArray = (e) => {
  if (e.default) {
    return e.default
  }
  if (Array.isArray(e)) {
    return e
  }
  throw new Error('Step Definitions must be exported as an array')
}

// String -> [[Regex, Function]]
export default compose(asArray, require, getStepDefPath)
