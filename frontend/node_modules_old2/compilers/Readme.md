# compilers

<a href="https://circleci.com/gh/brandoncarl/compilers/tree/master"><img src="https://img.shields.io/circleci/project/brandoncarl/compilers/master.svg" alt="Build Status"></a>
[![codecov.io](https://codecov.io/github/brandoncarl/compilers/coverage.svg?branch=master)](https://codecov.io/github/brandoncarl/compilers?branch=master)

Given a request for a preprocessor/transpiler/templating engine/postprocessor,
spits back a function of the form `function(err, compiled)`.

The [specifications](#specifications) are highly extensible. Initial specs
support wide range of functions (from Typescript to ES2015 to minification
and cleaning). Pull requests and tests welcome! See instructions on writing
a specification below.

## Installation

```
$ npm install compilers
```

## Examples

```js
var compileHandlebars = compilers("handlebars");

compileHandlebars("<div>Hello, {{ name }}!</div>", { name : "Mickey" }, function(err, compiled) {
  console.log(compiled);
  // <div>Hello, Mickey!</div>
});

// Don't "npm install" missing modules (defaults to installing)
var compileHandlebars = compilers("handlebars", { fetch : false });
// => Throws error if handlebars is missing

// "npm install" to different directory
var compileHandlebars = compilers("handlebars", { dir : process.cwd() });
```


## API

[compilers](#compilers) ⇒ <code>function</code>  
[.defaultCompilerForExtension(ext)](#compilers.defaultCompilerForExtension) ⇒ <code>String</code>  

<a name="compilers"></a>
### compilers ⇒ <code>function</code>
Loads a processor (templating, transpiler, minification), and standardizes
callback to be fn(err, compiled). Defaults to `npm install` packages if they
are missing. To disable, set `context.fetch` to `false`;

Most packages are referenced by their npm name, common exceptions include:
javascript, html, css, es2015, and react.

Note that the callback is node style (err, compiled).

**Returns**: <code>function</code> - Processor of format `fn(str, context, next)`  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name of module (npm install name). |
| context | <code>Object</code> | Options include {fetch} and {dir} (install directory). |

**Example**  
```js
compilers("typescript")
  // => fn(str, context, next) for typescript
```

<a name="compilers.defaultCompilerForExtension"></a>
### compilers.defaultCompilerForExtension(ext) ⇒ <code>String</code>
Returns the default compiler for an extension. Leading "." is removed.

**Returns**: <code>String</code> - Name of the default compiler.  

| Param | Type | Description |
| --- | --- | --- |
| ext | <code>String</code> | The file extension. |

**Example**  
```js
compilers.defaultCompilerForExtension("ts");
  // => "typescript"
```


## Specifications

Specifications make use of JavaScript's `eval`. While using `eval` is typically
considered to be bad form, when calling another function the performance does
not appear suffer in V8. See http://jsperf.com/eval-function-call.

A specification consists of the following:  

| Param | Type | Description |
| --- | --- | --- |
| name | String | Name of compiler (by convention we use npm package name) |
| ext | String | Typical file extension (e.g. handlebars uses hbs) |
| type | String | Type of output file (html, css, js) |
| modules | Array | Array of required modules |
| syntax | String | The function to be evaluated |
| options | Object | Optional options to be accessed via `options` |
| suffix  | String | Optional suffix to call on results (sync or async) |

### Example specification
```js
{
  "name"    : "handlebars",
  "ext"     : "hbs",
  "type"    : "html",
  "modules" : ["consolidate", "handlebars"],
  "syntax"  : "handlebars.render(str, context, next)"
}
```

### Looking up a specification by extension
Specifications is processed as an array. The first specification with `ext` is
assumed to be the default for extension `ext`. This is why `css`, `html` and `js`
are located at the top of the specification.

### Writing a specification
The syntax processor does the following:
1. Prepends `$0` to the string if string doesn't contain `$0`.  
2. Replaces all `$x` with `modules[x]`. This allows incorporate of modules array.  
3. Creates function that evaluates command. Note that `str`, `context` and `next`
   have special meanings.  

Using Handlebars as an example:
```js
// Input
"handlebars.render(str, context, next)"

// Interim
modules[0].handlebars.render(str, context, next)

// Equivalent function
function(str, context, next) { consolidate.handlebars.render(str, context, next); }
```

## License
MIT
