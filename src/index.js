import driver from 'zucchini-webdriver'
import defaults from './default-config'
import path from 'path'
import {pick} from 'ramda'

const loadConfig = (configPath) => {
  const config = require(path.join(process.cwd(), configPath))
  return config.default ? config.default : config
}

export const config = {...defaults, ...loadConfig(process.argv[2])}

export const browser = driver(pick(['timeout', 'browser'], config));
