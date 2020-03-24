module.exports = {
  input: "macro swap { rule { ($x, $y) } => { var tmp = $y; $y = $x; $x = tmp; } }\nvar foo = 100; var bar = 200; swap (foo, bar)",
  output: "var foo = 100;\nvar bar = 200;\nvar tmp = bar;\nbar = foo;\nfoo = tmp;"
}
