module.exports = {
  input: "var odds = evens.map(v => v + 1);",
  output: "\"use strict\";\n\nvar odds = evens.map(function (v) {\n  return v + 1;\n});"
};
