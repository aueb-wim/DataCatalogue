module.exports = {
  input: "table =\n  * id: 1\n    name: 'george'",
  output: "(function(){\n  var table;\n  table = {\n    id: 1,\n    name: 'george'\n  };\n}).call(this);\n"
}
