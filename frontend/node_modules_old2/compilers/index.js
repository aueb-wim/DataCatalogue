/**

  compilers.js
  Copyright 2016 Brandon Carl
  MIT Licensed

*/


//
//  Dependencies
//

var desires = require("desires"),
    specs   = require("./specifications"),
    byName  = {},
    byExt   = {},
    cache   = {},
    root;


/**

  Loads a processor (templating, transpiler, minification), and standardizes
  callback to be fn(err, compiled). Defaults to `npm install` packages if they
  are missing. To disable, set `options.fetch` to `false`;

  Most packages are referenced by their npm name, common exceptions include:
  javascript, html, css, es2015, and react.

  Note that the callback is node style (err, compiled).

  @param {String} name Name of module (npm install name).
  @param {Object} options Options include {fetch} and {dir} (install directory).
  @returns {Function} Processor of format `fn(str, options, next)`

  @example
  compilers("typescript")
  // => fn(str, options, next) for typescript

**/

root = module.exports = function(name, options) {

  // Return cache if available
  if (cache[name]) return cache[name];

  var pipeline = byName[name],
      syntax = pipeline.syntax,
      modules;

  // Set default options
  options = options || {};

  // Optionally fetch modules using `npm install`
  if (options.fetch || "undefined" === typeof options.fetch)
    modules = pipeline.modules.map(function(x) { return desires(x, { dir : options.dir }); });
  else
    modules = pipeline.modules.map(function(x) { return require(x); });

  // If blank, return
  if ("" === syntax) {
    cache[name] = function(str, options, next) { return next(null, str); };
    return cache[name];
  }

  // Add core module to beginning (with dot property unless brackets)
  if (-1 === syntax.indexOf("$0"))
    syntax = "$0" + (("(" === syntax[0] || "[" === syntax[0]) ? "" : ".") + syntax;

  // Reinsert modules
  modules.forEach(function(mod, i) {
    syntax = syntax.replace(new RegExp("\\$" + i, "g"), "modules[" + i + "]");
  });

  // While using "eval" is typically considered to be bad form, when calling another function the
  // performance does not appear suffer in V8. See http://jsperf.com/eval-function-call.
  // We find that "eval" is slightly faster
  if (-1 === syntax.indexOf("next)"))
    if (pipeline.suffix)
      syntax = "try { next(null," + syntax + pipeline.suffix + "); } catch (err) { next(err); }"
    else
      syntax = "try { next(null," + syntax + "); } catch (err) { next(err); }"
  else
    if (pipeline.suffix)
      syntax = syntax.replace("next", "function(err, compiled) { next(err, compiled" + pipeline.suffix + "); }")

  cache[name] = createFunction(modules, syntax, pipeline.options);

  return cache[name];

};



/**

  Returns the default pipeline for an extension. Leading "." is removed.

  @param {String} ext The file extension.
  @returns {String} Name of the default pipeline.

  @example
  compilers.defaultCompilerForExtension("ts");
  // => "typescript"

**/

root.defaultCompilerForExtension = function(ext) {
  return byExt[ext.replace(/^\./, "")];
};




//
//  Helpers
//

// Wraps function to ensure proper polymorphism. We could use a library
// like "reorg", but we code manually given simplicity and desire for performance.
// `context` refers to local variables while `options` referes to compiler options
function createFunction(modules, syntax, options) {
  var fn = new Function("modules", "str", "context", "options", "next", syntax);
  options = options || {};
  return function(str, context, next) {
    if ("function" === typeof context) {
      next = context;
      context = {};
    }
    fn(modules, str, context, options, next);
  };
}


// Ensure our configurations are properly formatted
specs.forEach(parseSpecification);

// Creates byName and byExt dictionaries, and ensures that specification is
// in the correct format.
function parseSpecification(spec) {

  // Create dictionary by name
  byName[spec.name] = spec;

  // Insert modules if missing
  spec.modules = spec.modules || [];

  // Expand extensions
  if (!Array.isArray(spec.ext)) spec.ext = [spec.ext];

  // Create dictionary by extension
  spec.ext.forEach(function(ext) {
    if (!byExt[ext]) byExt[ext] = spec.name;
  });

}
