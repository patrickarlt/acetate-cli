#!/usr/bin/env node

var resolve = require('resolve');
var path = require('path');

resolve('acetate', {basedir: process.cwd()}, function(error, pathToAcetate) {
  if (!pathToAcetate || error) {
    console.error('Cannot find Acetate!\nInstall Acetate with `npm install acetate --save-dev`.');
    process.exit(1);
    return;
  }

  var acetateRoot = pathToAcetate.replace(/(\/|\\)index\.js/, '');
  var acetateCli = require(path.join(acetateRoot, 'lib', 'cli'));

  acetateCli.run();
});