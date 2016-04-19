#!/usr/bin/env node
require('babel-core/register')
require('babel-polyfill')
const run = require('../src/run')
run.default()
