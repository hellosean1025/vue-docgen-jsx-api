'use strict';

var _evalComponentCode = require('./evalComponentCode');

var _evalComponentCode2 = _interopRequireDefault(_evalComponentCode);

var _getSourceInRequire = require('./getSourceInRequire');

var _getSourceInRequire2 = _interopRequireDefault(_getSourceInRequire);

var _getMixin = require('./getMixin');

var _getMixin2 = _interopRequireDefault(_getMixin);

var _getExtends = require('./getExtends');

var _getExtends2 = _interopRequireDefault(_getExtends);

var _parseModule = require('./parseModule');

var _parseModule2 = _interopRequireDefault(_parseModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function getSandbox(stateDoc, file) {
  var parsedSource = (0, _parseModule2.default)(stateDoc.jscodeReqest, file, stateDoc.jscodeLang);
  var sandbox = (0, _evalComponentCode2.default)(parsedSource).exports;
  var component = sandbox.default;
  var listRequire = (0, _getSourceInRequire2.default)(parsedSource, file);
  var mixins = (0, _getMixin2.default)(listRequire).reverse();
  component.mixins = mixins;
  if (component.extends) {
    component.mixins = (0, _getExtends2.default)(listRequire).reverse();
  }
  return sandbox;
};