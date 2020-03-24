module.exports = {
  input: "test = (a) ->\n  return a",
  output: "(function() {\n  var test;\n\n  test = function(a) {\n    return a;\n  };\n\n}).call(this);\n"
};
