import {
  test, toPairs, compose,
  filter, tap, map
} from 'ramda'
import Gherkin from 'gherkin'
import path from 'path'
import fs from 'fs';
import readDir from 'read-dir'

const parser = new Gherkin.Parser();
// dir:String -> [fileName:String, fileContent:String]
const _loadFiles = compose(toPairs, readDir)

// [fileName:String, fileContent:String] -> [fileName:String, fileContent:String]
const _filterFeatureFiles = filter(([fileName]) => test(/\.feature$/, fileName))

// dir:String -> [fileName:String, fileContent:String]
const _loadFeatureFiles = compose(_filterFeatureFiles, _loadFiles)

// [fileName:String, fileContent:String] -> Scenario
const _parseFeatureFile = ([fileName, fileContent]) => parser.parse(fileContent)

// dir:String -> [scenarios:Scenario]
export default compose(map(_parseFeatureFile), _loadFeatureFiles)
