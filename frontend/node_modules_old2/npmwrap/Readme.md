# npmwrap

  API interface for common npm commands. Can be executed synchronously, asynchronously,
  or via promises.


## Installation

```
$ npm install npmwrap
```

## Examples

  Install packages in one of three ways.

```js
var npm = require("npmwrap");

// Sync
npm.installSync("handlebars", { saveDev : true });

// Async
npm.install("handlebars", { saveDev : true }, function(err, results) {
  console.log("Output from npm:", results);
});

// Promise
var promise = npm.install("handlebars");
```


## API

### Commands
* install, installSync
* link, linkSync
* uninstall, uninstallSync
* unlink, unlinkSync
* update, updateSync

### Flags
* save
* saveDev
* global
* cwd (current working directory)

## License
MIT
