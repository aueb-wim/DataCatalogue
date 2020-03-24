module.exports = {
  input: "class Greeter<T> {\n    greeting: T;\n    constructor(message: T) {\n        this.greeting = message;\n    }\n}",
  output: "\"use strict\";\nvar Greeter = (function () {\n    function Greeter(message) {\n        this.greeting = message;\n    }\n    return Greeter;\n}());\n"
};
