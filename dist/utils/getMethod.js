'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMethod;

var _variables = require('./variables');

var _processTags = require('./processTags');

var _processTags2 = _interopRequireDefault(_processTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getParams(tags) {
  if (tags['params']) {
    return tags['params'].map(function (param) {
      var obj = {
        name: param.name,
        description: param.description
      };
      if (param['type']) {
        obj['type'] = {
          name: param['type']['name']
        };
      }
      return obj;
    });
  }
  return [];
}

function getReturns(tags) {
  if (tags['returns']) {
    var re = tags['returns'][0];
    var obj = {
      description: re.description
    };
    if (re['type']) {
      obj['type'] = {
        name: re['type']['name']
      };
    }
    return obj;
  }
  return {};
}

function getMethod(methodName, docPart) {
  var tags = (0, _processTags2.default)(docPart);
  return {
    name: methodName,
    comment: (0, _variables.getComment)(docPart),
    modifiers: [],
    params: getParams(tags),
    returns: getReturns(tags),
    description: (0, _variables.getDescription)(docPart),
    tags: tags
  };
}