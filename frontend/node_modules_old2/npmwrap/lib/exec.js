/**

  exec.js: wraps child_process.execFile (sync, async, promise) and stringifies output.

  Statics
  • sync
  • async

**/

"use strict";


//
//  Dependencies
//

var child_process = require("child_process"),
    Promise       = require("promise"),
    execFileSync  = require("exec-file-sync");



/**

  Wraps child_process.execFileSync.

  @param {String} file The filename of the program to run.
  @param {Array} [args] List of string arguments.
  @param {Object} [options] See node.js documentation.
  @returns {String} The stdout from the command.

**/

exports.sync = function runSync() {

  var args = Array.prototype.slice.call(arguments);

  return execFileSync.apply(null, args).toString();

};



/**

  Wraps child_process.execFile.

  @param {String} file The filename of the program to run.
  @param {Array} [args] List of string arguments.
  @param {Object} [options] See node.js documentation.
  @param {Function} [callback] fn(err, stdout, stderr).
  @returns {Promise} Promise when callback missing, ChildProcess object otherwise.

**/

exports.async = function runAsync() {

  // Standardize the arguments
  var args = Array.prototype.slice.call(arguments),
      next;

  // If last function isn't callback, run as promise
  if ("function" !== typeof args[args.length-1]) {

    // If function is blank, remove it.
    if ("undefined" === typeof args[args.length-1]) args.pop();

    // Return promise
    return new Promise(function(resolve, reject) {
      args.push(function(err, stdout, stderr) {
        if (err) return reject(err);
        resolve(stdout.toString());
      });
      child_process.execFile.apply(null, args);
    });

  } else {

    // Wrap the output
    next = args.pop();
    args.push(function(err, stdout, stderr) {
      stdout = stdout.toString();
      next(err, stdout);
    });

    return child_process.execFile.apply(null, args);

  }

};
