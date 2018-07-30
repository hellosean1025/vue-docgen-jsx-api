'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDocFile;
var jsdoc = require('jsdoc-api');
var path = require('path');
var parseModule = require('./parseModule');

function getDocFile(source, file, lang) {
  try {
    var parsedSource = parseModule(source, file, lang, '2017');
    var docReturn = jsdoc.explainSync({
      source: parsedSource,
      configure: path.join(path.dirname(__dirname), '..', 'config.json')
    }).filter(function (obj) {
      return obj.undocumented !== true;
    }).map(function (obj) {
      if (obj.meta) {
        obj.meta.filename = file;
        obj.meta.path = file;
      } else {
        obj.files[0] = file;
      }
      return obj;
    });
    return docReturn;
  } catch (err) {
    var errorMessage = err.toString();
    console.log('\n' + errorMessage + '\n');
    throw new Error(err);
  }
}