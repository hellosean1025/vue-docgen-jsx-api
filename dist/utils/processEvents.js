'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processMethods;

var _variables = require('./variables');

function processMethods(docFile) {
  docFile = docFile.slice().reverse();
  var listDocMethods = {};
  var docParts = docFile.filter(function (comment) {
    return comment.kind === 'event';
  });
  docParts.forEach(function (docPart) {
    if (docPart.name) {
      listDocMethods[docPart.name] = {
        description: (0, _variables.getDescription)(docPart),
        type: docPart.type,
        properties: docPart.properties,
        comment: (0, _variables.getComment)(docPart)
      };
    }
  });
  return listDocMethods;
}