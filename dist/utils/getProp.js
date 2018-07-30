'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = getProp;

var _variables = require('./variables');

var _processTags = require('./processTags');

var _processTags2 = _interopRequireDefault(_processTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fnNameMatchRegex = /^\s*function\s+([^\(\s]*)\s*/;

function getTypeName(prop) {
  if (!prop) return _variables.UNDEFINED;
  if (Array.isArray(prop)) {
    return prop.map(getTypeNameToFunction).join('|');
  } else {
    return getTypeNameToFunction(prop);
  }
}

function getTypeNameToFunction(object) {
  if (object.name.toLowerCase() === 'function') return 'func';
  return object.name.toLowerCase();
}

function getProp(prop, docPart) {
  if (prop) {
    var obj = {};
    if (Array.isArray(prop)) {
      obj['type'] = {
        name: getTypeName(prop)
      };
    } else if (typeof prop === 'function') {
      obj['type'] = {
        name: getTypeName(prop)
      };
    } else {
      obj['type'] = {
        name: getTypeName(prop.type)
      };
      obj['required'] = prop.required || _variables.EMPTY;
      if ((0, _typeof3.default)(prop.default) !== _variables.UNDEFINED) {
        var value = void 0;
        var propDefaultIsFunc = false;
        if (typeof prop.default === 'function') {
          propDefaultIsFunc = true;
          if (!prop.type) {
            obj['type'] = { name: 'func' };
          }
          var func = prop.default.toString().replace(fnNameMatchRegex, 'function');
          value = JSON.parse((0, _stringify2.default)(func.replace(/\s\s+/g, ' ')));
        } else {
          if (!prop.type) {
            obj['type'] = { name: (0, _typeof3.default)(prop.default) };
          }
          value = (0, _stringify2.default)(prop.default);
        }
        obj['defaultValue'] = {
          value: value,
          func: propDefaultIsFunc
        };
      }
    }
    obj['tags'] = (0, _processTags2.default)(docPart, _variables.IGNORE_DEFAULT);
    obj['comment'] = (0, _variables.getComment)(docPart);
    obj['description'] = (0, _variables.getDescription)(docPart);
    return obj;
  } else {
    return {
      type: {
        name: _variables.UNDEFINED
      },
      required: false,
      description: _variables.EMPTY,
      tags: {}
    };
  }
}