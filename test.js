import {map} from 'ramda'
import path from 'path'
import _glob from 'glob'
import promisify from 'simple-promisify'
const glob = promisify(null, _glob)
glob("./example/**/*.feature", {})
  .then(map((f) => path.join(process.cwd(), f)))
  .then((files) => console.log(files))
