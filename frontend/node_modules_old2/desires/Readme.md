# desires

  `desires` functions exactly like `require`, with a twist: it synchronously grabs
  missing modules from npm. Saves to package.json by default.


## Installation

```
$ npm install desires
```


## Examples

```js
// The plain vanilla
var handlebars = desires("handlebars");

// The save-dev version
var handlebars = desires("handlebars", { saveDev : true });

// Using another directory
var handlebars = desires("handlebars", { dir : process.cwd() });
```


## API

### desires(name, options)
The one and only function call.

#### options
* save (defaults to true)
* saveDev
* global
* dir


## License
MIT
