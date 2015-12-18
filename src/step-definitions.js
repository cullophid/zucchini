import fs from 'fs'
import path from 'path'
import R from 'ramda'

const log =(key) => (value) => {
  console.log(key, value);
  return value
}
const joinPath = R.curry((a, b) => path.join(a, b))

const getFileNames = (dir) => {
  console.log('dir', dir);
  const dirPath = joinPath(process.cwd(), dir)
  const fileNames = fs.readdirSync(dirPath)
  const prependDir = R.map(joinPath(dirPath))
  return prependDir(fileNames);
}

const filterJsFiles = R.filter(R.test(/\.js$/))
const load = R.compose(R.map(require), log('files'), filterJsFiles, getFileNames)
console.log(load('./step_definitions'));
