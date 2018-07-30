'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = processMethods;

var _getMethod = require('./getMethod');

var _getMethod2 = _interopRequireDefault(_getMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function processMethods(docFile, component) {
  docFile = docFile.slice();
  var methods = component.methods;
  var listDocMethods = [];
  var mixins = component.mixins;
  if (mixins) {
    mixins.forEach(function (mixin) {
      var mMixin = mixin.methods;
      if (mMixin) {
        methods = (0, _assign2.default)({}, mMixin, methods);
      }
    });
  }
  if (methods) {
    var listDocParts = [];
    (0, _keys2.default)(methods).forEach(function (methodName) {
      var docPart = docFile.reverse().filter(function (comment) {
        return comment.longname.indexOf('methods.' + methodName) > -1 && listDocParts.indexOf(comment.longname) === -1;
      })[0];
      if (docPart) {
        if (docPart['access'] && docPart['access'] === 'public') {
          listDocParts.push(docPart.longname);
          listDocMethods.push((0, _getMethod2.default)(methodName, docPart));
        }
      }
    });
  }
  return listDocMethods;
}