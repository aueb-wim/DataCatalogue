
module.exports = [{
  "name"    : "javascript",
  "ext"     : "js",
  "type"    : "js",
  "syntax"  : ""
},
{
  "name"    : "css",
  "ext"     : "css",
  "type"    : "css",
  "syntax"  : ""
},
{
  "name"    : "html",
  "ext"     : "html",
  "type"    : "html",
  "syntax"  : ""
},
{
  "name"    : "html-minifier",
  "ext"     : "html",
  "type"    : "html",
  "modules" : ["html-minifier"],
  "syntax"  : "minify(str, options)",
  "options"  : {
    "removeComments": true,
    "removeCommentsFromCDATA": true,
    "removeCDATASectionsFromCDATA": true,
    "collapseWhitespace": true,
    "collapseBooleanAttributes": true,
    "removeAttributeQuotes": true,
    "removeRedundantAttributes": true,
    "useShortDoctype": true,
    "removeEmptyAttributes": true,
    "minifyJS": true,
    "minifyCSS": true
  }
},
{
  "name"    : "es2015",
  "ext"     : "js",
  "type"    : "js",
  "modules" : ["babel-core", "babel-preset-es2015"],
  "syntax"  : "transform(str, options)",
  "options" : { "presets" : ["es2015"] },
  "suffix"  : ".code"
},
{
  "name"    : "react",
  "ext"     : "jsx",
  "type"    : "js",
  "modules" : ["babel-core", "babel-preset-react"],
  "syntax"  : "transform(str, options)",
  "options"  : { "presets" : ["react"] },
  "suffix"  : ".code"
},
{
  "name"    : "typescript",
  "ext"     : "ts",
  "type"    : "js",
  "modules" : ["typescript"],
  "syntax"  : "transpile(str)"
},
{
  "name"    : "coffee-script",
  "ext"     : "coffee",
  "type"    : "js",
  "modules" : ["coffee-script"],
  "syntax"  : "compile(str)"
},
{
  "name"    : "stylus",
  "ext"     : "styl",
  "type"    : "css",
  "modules" : ["stylus"],
  "syntax"  : "render(str, context, next)"
},
{
  "name"    : "ejs",
  "ext"     : "ejs",
  "type"    : "html",
  "modules" : ["ejs"],
  "syntax"  : "compile(str, options)(context)",
  "options" : {}
},
{
  "name"    : "livescript",
  "ext"     : "ls",
  "type"    : "js",
  "modules" : ["livescript"],
  "syntax"  : "compile(str)"
},
{
  "name"    : "sweet.js",
  "ext"     : "js",
  "type"    : "js",
  "modules" : ["sweet.js"],
  "syntax"  : "compile(str, options)",
  "options"  : {
    readableNames : true
  },
  "suffix"  : ".code"
},
{
  "name"    : "handlebars",
  "ext"     : "hbs",
  "type"    : "html",
  "modules" : ["handlebars"],
  "syntax"  : "compile(str)(context)"
},
{
  "name"    : "swig",
  "ext"     : "html",
  "type"    : "html",
  "modules" : ["swig"],
  "syntax"  : "render(str, { locals : context })",
},
{
  "name"    : "mustache",
  "ext"     : "mustache",
  "type"    : "html",
  "modules" : ["mustache"],
  "syntax"  : "render(str, context)"
},
{
  "name"    : "dust",
  "ext"     : "dust",
  "type"    : "html",
  "modules" : ["dustjs-linkedin", "dustjs-helpers"],
  "syntax"  : "renderSource(str, context, next)"
},
{
  "name"    : "haml",
  "ext"     : "haml",
  "type"    : "html",
  "modules" : ["hamljs"],
  "syntax"  : "render(str, context)"
},
{
  "name"    : "nunjucks",
  "ext"     : "html",
  "type"    : "html",
  "modules" : ["nunjucks"],
  "syntax"  : "renderString(str, context)"
},
{
  "name"    : "hogan",
  "ext"     : "html",
  "type"    : "html",
  "modules" : ["hogan.js"],
  "syntax"  : "compile(str).render(context)"
},
{
  "name"    : "jade",
  "ext"     : "jade",
  "type"    : "html",
  "modules" : ["pug"],
  "syntax"  : "render(str, context)",
  "options" : {}
},
{
  "name"    : "pug",
  "ext"     : "pug",
  "type"    : "html",
  "modules" : ["pug"],
  "syntax"  : "render(str, context)",
  "options" : {}
},
{
  "name"    : "sass",
  "ext"     : ["sass", "scss"],
  "type"    : "css",
  "modules" : ["node-sass"],
  "syntax"  : "render({ \"data\" : str }, next)",
  "suffix"  : ".css.toString()"
},
{
  "name"    : "less",
  "ext"     : "less",
  "type"    : "css",
  "modules" : ["less"],
  "syntax"  : "render(str, options, next)",
  "suffix"  : ".css"
},
{
  "name"    : "autoprefixer",
  "ext"     : "css",
  "type"    : "css",
  "modules" : ["postcss", "autoprefixer"],
  "syntax"  : "([$1]).process(str).css"
},
{
  "name"    : "lodash",
  "ext"     : "html",
  "type"    : "html",
  "modules" : ["lodash"],
  "syntax"  : "template(str)(context)"
},
{
  "name"    : "underscore",
  "ext"     : "html",
  "type"    : "html",
  "modules" : ["underscore"],
  "syntax"  : "template(str)(context)"
},
{
  "name"    : "uglify-js",
  "ext"     : "js",
  "type"    : "js",
  "modules" : ["uglify-js"],
  "syntax"  : "minify(str, { \"fromString\" : true })",
  "suffix"  : ".code"
},
{
  "name"    : "clean-css",
  "ext"     : "css",
  "type"    : "css",
  "modules" : ["clean-css"],
  "syntax"  : "new $0().minify(str).styles"
}];
