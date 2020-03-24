module.exports = {
  input: "%html\n  %head\n  %body\n    .greeting Hello World",
  output: "\n<html>\n<head></head>\n<body>\n<div class=\"greeting\">Hello World</div></body></html>"
};
