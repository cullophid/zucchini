import {compose, map} from 'ramda'
import fs from 'fs'
import glob from 'glob'
import gherkin from 'gherkin'

// String -> Feature
const parse = new gherkin.Parser().parse

// String -> Feature
const loadFile = compose(parse, e => e.toString(), fs.readFileSync)

// String -> [[String, Feature]]
export default compose(map(f => [f, loadFile(f)]), glob.sync)
