#!/usr/bin/env node

var resolve = require('resolve');
var path = require('path');

resolve('acetate', {basedir: process.cwd()}, function (error, pathToAcetate) {
  if (!pathToAcetate || error) {
    console.error('Cannot find Acetate!\nInstall Acetate with `npm install acetate --save-dev`.');
    process.exit(1);
    return;
  }

  var acetateCli = require(path.join(__dirname(acetateRoot), 'cli'));

  acetateCli.run();
});
