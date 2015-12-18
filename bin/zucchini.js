#!/usr/bin/env node
require('babel-register')({
  ignore: false,
  // presets: ['es2015', 'stage-3']
});
require('../src')
