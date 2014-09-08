#!/usr/bin/env node

var resolve = require('resolve');
var path = require('path');

var NODE_PATH = process.env.NODE_PATH;

function run(acetatePath){
  var acetateCli = require(path.join(acetatePath, 'lib', 'cli'));
  acetateCli.run();
}

resolve('acetate', {basedir: process.cwd()}, function(err, pathToAcetate) {
  if (!err) {
    return run(pathToAcetate.replace(/(\/|\\)lib(\/|\\)index\.js/, ''));
  }

  // We can't load a global one, since NODE_PATH is not defined.
  if (!NODE_PATH) {
    console.error('Cannot find local Acetate!\nInstall Acetate with `npm install acetate --save-dev`.\nIf you want to use a global instance, set a NODE_PATH env variable.\n');
    process.exit(1);
    return;
  }

  // Let's try global paths.
  var globalPaths = NODE_PATH.split(path.delimiter);
  var globalAcetate;

  while (globalPaths.length) {
    globalAcetate = path.normalize(path.join(globalPaths.shift(), 'acetate'));
    if (fs.existsSync(globalAcetate)) {
      return requireCliAndRun(globalAcetate);
    }
  }

  console.error('Cannot find local Acetate!\nPlease install Acetate with `npm install acetate --save-dev`.\n');
  process.exit(1);
});