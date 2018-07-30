'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parser;

var _hashSum = require('hash-sum');

var _hashSum2 = _interopRequireDefault(_hashSum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compiler = require('vue-template-compiler');
var cache = require('lru-cache')(100);

function parser(source, filename) {
  var cacheKey = (0, _hashSum2.default)(filename + source);
  // source-map cache busting for hot-reloadded modules
  var output = cache.get(cacheKey);
  if (output) {
    return output;
  }
  output = compiler.parseComponent(source, { pad: true });
  cache.set(cacheKey, output);
  return output;
}