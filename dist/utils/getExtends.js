'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _getComponentModuleJSCode = require('./getComponentModuleJSCode');

var _getComponentModuleJSCode2 = _interopRequireDefault(_getComponentModuleJSCode);

var _stateDoc = require('./stateDoc');

var _stateDoc2 = _interopRequireDefault(_stateDoc);

var _parseModule = require('./parseModule');

var _parseModule2 = _interopRequireDefault(_parseModule);

var _evalComponentCode = require('./evalComponentCode');

var _evalComponentCode2 = _interopRequireDefault(_evalComponentCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function getExtends(listRequire) {
  var output = [];
  listRequire.forEach(function (filePath) {
    var isComponent = _path2.default.extname(filePath) === '.vue';
    if (isComponent && _fs2.default.existsSync(filePath)) {
      var source = _fs2.default.readFileSync(filePath, {
        encoding: 'utf-8'
      });
      var parts = (0, _parser2.default)(source, 'name');
      var jscodeLang = parts.script.lang;
      var jscode = (0, _getComponentModuleJSCode2.default)(parts, source, filePath);
      var doc = _stateDoc2.default.getDocFile(jscode, filePath, jscodeLang);
      _stateDoc2.default.saveMixin(doc, filePath);
      if (_stateDoc2.default.isMixin()) {
        var parsedSource = (0, _parseModule2.default)(jscode, filePath, _stateDoc2.default.jscodeLang);
        var mixin = (0, _evalComponentCode2.default)(parsedSource);
        if ((0, _keys2.default)(mixin.exports).length === 0) {
          mixin.exports.default = mixin.module.exports;
        }
        if (mixin.exports.default) {
          var component = mixin.exports.default;
          delete component.title;
          output.push(component);
        }
      }
    }
  });
  return output;
};