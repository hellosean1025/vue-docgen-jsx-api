'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _getRequires = require('./getRequires');

var _getRequires2 = _interopRequireDefault(_getRequires);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function getSourceInRequire(code, file) {
  try {
    var requiresFromComponent = (0, _getRequires2.default)(code);
    var output = [];
    (0, _keys2.default)(requiresFromComponent).forEach(function (reqFromComponent) {
      var tempRequire = reqFromComponent.split('/');
      if (tempRequire[0] === '.' || tempRequire[0] === '..') {
        var folderFile = _path2.default.dirname(file);
        output.push(_path2.default.join(_path2.default.normalize(folderFile), reqFromComponent));
      }
    });
    return output;
  } catch (err) {
    throw err;
  }
};