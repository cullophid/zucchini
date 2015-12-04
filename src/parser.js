import R from 'ramda'
import Gherkin from 'gherkin'
import path from 'path'
import fs from 'fs';
import readDir from 'read-dir'

const parser = new Gherkin.Parser();

// dir:String -> [fileName:String, fileContent:String]
const _loadFiles = R.compose(R.toPairs, readDir, (dir) => path.join(process.cwd(), dir))

// [fileName:String, fileContent:String] -> [fileName:String, fileContent:String]
const _filterFeatureFiles = R.filter(([fileName]) => R.match(/\.feature$/, fileName))

// dir:String -> [fileName:String, fileContent:String]
const _loadFeatureFiles = R.compose(_filterFeatureFiles, _loadFiles)

// [fileName:String, fileContent:String] -> Scenario
const _parseFeatureFile = ([fileName, fileContent]) => parser.parse(fileContent)

// dir:String -> [scenarios:Scenario]
export default R.compose(R.map(_parseFeatureFile), _loadFeatureFiles)
