import fs from 'fs'
import path from 'path'
import R from 'ramda'

const log =(key) => (value) => {
  console.log(key, value);
  return value
}
const joinPath = R.curry((a, b) => path.join(a, b))

const getFileNames = (dir) => {
  const fileNames = fs.readdirSync(dir)
  const prependDir = R.map(joinPath(dir))
  return prependDir(fileNames);
}

const filterJsFiles = R.filter(R.test(/\.step\.js$/))
export default R.compose(R.map(require), log('files'), filterJsFiles, getFileNames)
