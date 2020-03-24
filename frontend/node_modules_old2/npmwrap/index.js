/**

  npmwrap
  Copyright 2016 Brandon Carl
  MIT Licensed

  Statics
  • install, installSync
  • link, linkSync
  • uninstall, uninstallSync
  • unlink, unlinkSync
  • update, updateSync

**/

"use strict";


//
//  Dependencies
//

var exec         = require("./lib/exec"),
    reorg        = require("reorg"),
    readPkg      = require("read-pkg"),
    writePkg     = require("write-pkg"),
    mkdirp       = require("mkdirp");




//
//  Exports
//

var root = module.exports = {};




//
//  Globals and constants
//

var flagLookup = {
  "global"  : "--global",
  "save"    : "--save",
  "saveDev" : "--save-dev",
};


/**

  Ensures package.json exists and contains dependencies and dev dependencies.

  @param {Function} [next] If callback is present, runs async

**/

function ensurePackageExists(next) {
  var defaults = { dependencies : {}, devDependencies : {} },
      done = function(){ next(); };

  if (next) {
    readPkg().then(done).catch(function(err) {
      writePkg(defaults).then(done).catch(next);
    });
  } else {
    try {
      readPkg.sync();
    } catch (err) {
      return writePkg.sync(defaults);
    }
  }

};



/**

  Maps JavaScript-style options into command-line flags.

  @param {Object} options Contains npm command flags.
  @returns {Array} Returns array of command-line flags.

**/

function mapFlags(options) {

  var flags = [];

  for (var key in options)
    if (flagLookup[key] && options[key])
      flags.push(flagLookup[key]);

  return flags;

}



/**

  Core command runner.

  @param {String} command npm command (e.g. "install")
  @param {Array|String} [packages] List of packages for which to apply command.
  @param {Object} [flags] Can contain current working directory (cwd), or command flags.
  @param {Function} [next] Optional callback. When present, will run async.
  @returns {String} Output from npm command. If async, via node-style callback.

**/

var runCommand = reorg(function(method, command, packages, flags, next) {

  var args = [command],
      needsPkg = (/^((un)?install|update)$/i.test(command) && (flags.save || flags.saveDev)),
      options = {};

  // Add packages
  if ("string" === typeof packages) packages = packages.split(/\s+/);
  if (packages) args = args.concat(packages);

  // Add flags
  args = args.concat(mapFlags(flags));

  // Set cwd, and create if necessary
  if (flags.cwd) {
    options.cwd = flags.cwd;
    mkdirp.sync(options.cwd);
  }

  if ("sync" === method) {
    if (needsPkg) ensurePackageExists();
    return exec.sync("npm", args, options);
  } else {
    if (needsPkg)
      return ensurePackageExists(function(err) {
        if (err) return next(err);
        return exec.async("npm", args, options, next);
      });
    else
      return exec.async("npm", args, options, next);
  }

}, "string!", "string!", [["string", "array"], null], "object");



/**

  Iterator that creates and attaches functions to exports object.

**/

["install", "link", "uninstall", "unlink", "update"].forEach(function(command) {

  root[command] = function(packages, flags, next) {
    return runCommand("async", command, packages, flags, next);
  };

  root[command + "Sync"] = function(packages, flags) {
    return runCommand("sync", command, packages, flags);
  };

});
