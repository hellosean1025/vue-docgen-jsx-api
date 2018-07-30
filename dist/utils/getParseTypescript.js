'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (source) {
  try {
    var typescript = require('typescript');
    return typescript.transpileModule(source, {
      compilerOptions: {
        target: 'es2017'
      }
    });
  } catch (err) {
    throw err;
  }
};