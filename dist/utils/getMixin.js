'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _stateDoc = require('./stateDoc');

var _stateDoc2 = _interopRequireDefault(_stateDoc);

var _parseModule = require('./parseModule');

var _parseModule2 = _interopRequireDefault(_parseModule);

var _evalComponentCode = require('./evalComponentCode');

var _evalComponentCode2 = _interopRequireDefault(_evalComponentCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function getMixin(listRequire) {
  var output = [];
  listRequire.forEach(function (filePath) {
    var pathRequire = filePath;
    try {
      if (_fs2.default.lstatSync(pathRequire).isDirectory()) {
        pathRequire = _path2.default.join(pathRequire, 'index.js');
      }
    } catch (e) {}
    var hasJSExt = _path2.default.extname(pathRequire) === '.js';
    if (!hasJSExt) {
      pathRequire = filePath + '.js';
    }
    if (_fs2.default.existsSync(pathRequire)) {
      var source = _fs2.default.readFileSync(pathRequire, {
        encoding: 'utf-8'
      });
      var doc = _stateDoc2.default.getDocFile(source, pathRequire);
      _stateDoc2.default.saveMixin(doc, pathRequire);
      if (_stateDoc2.default.isMixin()) {
        var parsedSource = (0, _parseModule2.default)(source, filePath, _stateDoc2.default.jscodeLang);
        var mixin = (0, _evalComponentCode2.default)(parsedSource);
        if ((0, _keys2.default)(mixin.exports).length === 0) {
          mixin.exports.default = mixin.module.exports;
        }
        if (mixin.exports.default) {
          output.push(mixin.exports.default);
        }
      }
    }
  });
  return output;
};