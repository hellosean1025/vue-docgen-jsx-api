'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processTags;

var _blockTags = require('./blockTags');

var _blockTags2 = _interopRequireDefault(_blockTags);

var _getTag = require('./getTag');

var _getTag2 = _interopRequireDefault(_getTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function processTags(docPart) {
  var ignoreTags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var obj = {};
  if (docPart) {
    _blockTags2.default.filter(function (tagName) {
      return ignoreTags.indexOf(tagName) === -1;
    }).forEach(function (tagName) {
      var tag = (0, _getTag2.default)(tagName, docPart);
      if (tag) {
        obj[tagName] = tag;
      }
    });
  }
  return obj;
}