'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTag;

var _variables = require('./variables');

function isExistInTagList(docPart, tagName) {
  return docPart['tags'].some(function (tagObj) {
    return tagObj['title'] === tagName;
  });
}

function generateTag(title, description, type) {
  var obj = { title: title, description: description };
  if (typeof type !== 'undefined') {
    obj['type'] = type;
  }
  return obj;
}

function getReturns(tagDoc) {
  return tagDoc.map(function (param) {
    var ret = {
      title: 'returns',
      description: param.description || _variables.EMPTY
    };
    if (param.type && param.type.names) {
      ret['type'] = {
        type: 'NameExpression',
        name: param.type.names.join('|')
      };
    }
    return ret;
  });
}

function getParams(tagDoc) {
  return tagDoc.map(function (param) {
    var ret = {
      title: 'param',
      description: param.description || _variables.EMPTY,
      name: param.name || _variables.EMPTY
    };
    if (param.type && param.type.names) {
      ret['type'] = {
        type: 'NameExpression',
        name: param.type.names.join('|')
      };
    }
    return ret;
  });
}

function getTag(tagName, docPart) {
  var tagDoc = docPart[tagName];
  if (tagDoc) {
    if (typeof tagDoc === 'string' || typeof tagDoc === 'boolean') {
      return [generateTag(tagName, tagDoc)];
    } else if (Array.isArray(tagDoc)) {
      if (tagName === 'params') {
        return getParams(tagDoc);
      } else if (tagName === 'returns') {
        return getReturns(tagDoc);
      } else {
        return tagDoc.map(function (description) {
          return generateTag(tagName, description);
        });
      }
    }
    return false;
  } else if (docPart['tags'] && isExistInTagList(docPart, tagName)) {
    return docPart['tags'].filter(function (tagObj) {
      return tagObj['title'] === tagName;
    }).map(function (tagObj) {
      return generateTag(tagName, tagObj['text']);
    });
  }
  return false;
}