# reorg

Type checking and polymorphism via fallbacks.


## Installation

```
$ npm install reorg
```


## Examples

```js
var fn = reorg(function(str, obj, cb) {
    cb(str, JSON.stringify(obj));
}, "string", "object");

var next = function(a, b) {
  console.log("A:", a, "B:", b);
}

fn(next);
// => A:  B: {}

fn("Hello", next);
// => "A: Hello B: {}"

fn({ key : "val"}, next);
// => A: B: {"key":"val"}

fn("Hello", {"key": "val" }, next);
// => A: Hello B: {"key":"val"}

var anotherFn = reorg(function(requiredString, optionalCallback) {
  optionalCallback(requiredString);
}, "string!", ["function", function() {}]);

anotherFn();
// => Error: Expected argument undefined to be of type string

anotherFn("Hello");
// => executes, disappearing into space
```


## API

[reorg](#reorg) ⇒ <code>function</code>  
[.args(argv, constraints, [truncate])](#reorg.args) => <code>Array</code>  
[.checkArg(arg, constraint)](#reorg.checkArg) ⇒ <code>Object</code>  
[.isType(arg, type)](#reorg.isType) ⇒ <code>Boolean</code>  
[.defaultForType(type)](#reorg.defaultForType) ⇒ <code>\*</code>  

<a name="reorg"></a>
### reorg ⇒ <code>function</code>
Adds type checking and polymorphism to a function.

**Returns**: <code>function</code> - Returns wrapped function.  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The function to wrap. |
| ...constraint | <code>Contraint</code> | Splat of constraints |

**Example**  
```js
var newFn = reorg(function(requiredString, optionalCallback) {
    optionalCallback(requiredString);
  }, "string!", ["function", function(next) { next(); }]);
```

<a name="reorg.args"></a>
### reorg.args(argv, constraints, [truncate])
Checks an array of arguments against an array of constraints, and optionally
  truncates the results.

**Returns**: <code>Array</code> - Array of reorganized arguments.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| argv | <code>Array</code> |  | The arguments array to check. |
| constraints | <code>Array</code> |  | An of corresponding constraints. |
| [truncate] | <code>Boolean</code> | <code>false</code> | If true, truncates results at longer of argv/constraints. |

<a name="reorg.checkArg"></a>
### reorg.checkArg(arg, constraint) ⇒ <code>Object</code>
Checks single argument against a constraint. Returns object containing
  fallback value if pass fails.

**Returns**: <code>Object</code> - Returns {pass, fallback}.

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>\*</code> | The argument to check. |
| constraint | <code>Constraint</code> | The constraint to check against. |

**Example**  
```js
reorg.checkArg(123, "string");
  // => { pass : false, fallback : "" }
```
<a name="reorg.isType"></a>
### reorg.isType(arg, type) ⇒ <code>Boolean</code>
Checks if an argument is of a type. `type` can include primitive types,
  "array", or a function

**Returns**: <code>Boolean</code> - Whether the check passes/fails.  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>\*</code> | The value to check. |
| type | <code>String</code> &#124; <code>function</code> | A type or predicate to check against. |

<a name="reorg.defaultForType"></a>
### reorg.defaultForType(type) ⇒ <code>\*</code>
Fallback values for types. Throws error if not string, object or array.

**Kind**: static method of <code>[reorg](#reorg)</code>  
**Returns**: <code>\*</code> - A default value.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | Indicates which type for which we want fallback. |

## License
MIT
