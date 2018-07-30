'use strict';

var _getParseTypescript = require('./getParseTypescript');

var _getParseTypescript2 = _interopRequireDefault(_getParseTypescript);

var _getParseBabel = require('./getParseBabel');

var _getParseBabel2 = _interopRequireDefault(_getParseBabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function parseModule(source, filename, type, preset) {
  var comment = !!preset;
  switch (type) {
    case 'ts':
      var tsOutput = (0, _getParseTypescript2.default)(source);
      return (0, _getParseBabel2.default)(tsOutput.outputText, filename, comment).code;
      break;
    default:
      return (0, _getParseBabel2.default)(source, filename, comment).code;
  }
};