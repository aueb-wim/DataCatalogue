/**

  exec-legacy

  Code from: https://gist.github.com/kaizhu256/a4568cb7dac2912fc5ed

**/

'use strict';

module.exports = function(command, options) {

  /**

    this function emulates child_process.execSync for legacy node <= 0.10.x
    derived from https://github.com/gvarsanyi/sync-exec/blob/master/js/sync-exec.js

  **/

  var child, error, fs, timeout, tmpdir;

  // init fs
  fs = require('fs');

  // init options
  options = options || {};

  // init timeout
  timeout = Date.now() + options.timeout;

  // init tmpdir
  tmpdir = '/tmp/processExecSync.' + Date.now() + Math.random();
  fs.mkdirSync(tmpdir);

  // init command
  command = '(' + command + ' > ' + tmpdir + '/stdout 2> ' + tmpdir + '/stderr); echo $? > ' + tmpdir + '/status';

  // init child
  child = require('child_process').exec(command, options, function () {
    return;
  });

  while (true) {
    try {
      fs.readFileSync(tmpdir + '/status');
      break;
    } catch (ignore) {}
    if (Date.now() > timeout) {
      error = child;
      break;
    }
  }

  ['stdout', 'stderr', 'status'].forEach(function (file) {
    child[file] = fs.readFileSync(tmpdir + '/' + file, options.encoding);
    fs.unlinkSync(tmpdir + '/' + file);
  });

  child.status = Number(child.status);

  if (child.status !== 0) {
    error = child;
  }

  try {
    fs.rmdirSync(tmpdir);
  } catch (ignore) {}

  if (error) {
    throw error;
  }

  return child.stdout;

};
