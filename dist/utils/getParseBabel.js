'use strict';

var babel = require('babel-core');
var path = require('path');
var process = require('process');

module.exports = function getParseBabel(code, filename) {
  var comments = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  // Provide filename and cwd to babel for:
  //  a) Proper loading of .babelrc
  //  b) Error messages saying where any SyntaxErrors are
  var cwd = process.cwd();
  var filenameRelative = path.relative(cwd, filename);

  var options = {
    ast: false,
    comments: comments,
    filename: filename,
    filenameRelative: filenameRelative,
    presets: [['env', {
      targets: {
        chrome: 52
      }
    }]],
    plugins: ['transform-object-rest-spread'],
    sourceRoot: cwd
  };

  return babel.transform(code, options);
};