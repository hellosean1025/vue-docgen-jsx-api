'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.utils = exports.parseSource = exports.parse = undefined;

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var _parse = require('./parse');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.parse = _parse.parse;
exports.parseSource = _parse.parseSource;
exports.utils = utils;