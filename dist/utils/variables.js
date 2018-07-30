'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDescription = getDescription;
exports.getComment = getComment;
var EMPTY = exports.EMPTY = '';

var UNDEFINED = exports.UNDEFINED = 'undefined';

var IGNORE_DEFAULT = exports.IGNORE_DEFAULT = ['params', 'param', 'returns'];

function getDescription(docPart) {
  if (docPart) return docPart['description'] || EMPTY;
  return EMPTY;
}

function getComment(docPart) {
  if (docPart) return docPart['comment'] || EMPTY;
  return EMPTY;
}