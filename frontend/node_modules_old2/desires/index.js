/**

  desires
  Copyright 2016 Brandon Carl
  MIT Licensed

**/

"use strict";


//
//  Dependencies
//

var npm          = require("npmwrap"),
    path         = require("path"),
    cache        = {};




/**

  Proxies native "require" command. Synchronously installs package if missing.
  If the directory option is provided (dir), desires appends node_modules
  in event that it is missing.

  @param {String} name Name of the module to require.
  @param {Object} options Options include: { save, saveDev, dir }
  @returns {Module}

**/

module.exports = function(name, options) {

  var library,
      location;

  // Default to saving
  options = options || {};
  if ("undefined" === typeof options.save) options.save = true;

  // Return cache if available
  if (cache[name]) return cache[name];

  // If saveDev, unset save
  if (options.saveDev) delete options.save;

  // Allow for alternative directories
  location = name;
  if (options.dir) {
    options.cwd = path.join(options.dir.replace("\/node_modules\/?$", ""), "node_modules");
    location = path.join(options.cwd, location);
    delete options.dir;
  }

  // Attempt to load, install if absent
  try {
    library = require(location);
  } catch (err) {
    npm.installSync(name, options);
    library = require(location);
  }

  // Cache
  cache[name] = library;
  return library;

};
