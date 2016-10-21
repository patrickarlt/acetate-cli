#!/usr/bin/env node

var resolve = require('resolve');
var path = require('path');

resolve('acetate', {basedir: process.cwd()}, function (error, pathToAcetate) {
  if (!pathToAcetate || error) {
    console.error('Cannot find Acetate!\nInstall Acetate with `npm install acetate --save-dev`.');
    process.exit(1);
    return;
  }
  console.log(path.join(path.dirname(pathToAcetate), 'cli'));
  var acetateCli = require(path.join(path.dirname(pathToAcetate), 'cli.js'));

  acetateCli.run();
});
