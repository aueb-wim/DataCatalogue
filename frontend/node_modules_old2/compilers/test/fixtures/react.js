module.exports = {
  input: "var profile = <div>\n  <img src=\"avatar.png\" className=\"profile\" />\n  <h3>{[user.firstName, user.lastName].join(' ')}</h3>\n</div>;",
  output: "var profile = React.createElement(\n  \"div\",\n  null,\n  React.createElement(\"img\", { src: \"avatar.png\", className: \"profile\" }),\n  React.createElement(\n    \"h3\",\n    null,\n    [user.firstName, user.lastName].join(' ')\n  )\n);"
};
