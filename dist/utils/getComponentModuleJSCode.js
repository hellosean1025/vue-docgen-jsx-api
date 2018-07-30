'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getComponentModuleJSCode;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readSeparateScriptFile = function readSeparateScriptFile(fileName) {
  return _fs2.default.readFileSync(fileName, { encoding: 'utf-8' });
};

function getComponentModuleJSCode(parts, source, file) {
  if (!parts.script) {
    return source;
    // No script code;
  } else if (parts.script.src) {
    var jsFilePath = _path2.default.join(_path2.default.dirname(file), parts.script.src);
    return readSeparateScriptFile(jsFilePath);
  } else {
    return parts.script.content;
  }
}