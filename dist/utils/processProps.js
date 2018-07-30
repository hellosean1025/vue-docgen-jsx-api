'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = processProps;

var _getProp = require('./getProp');

var _getProp2 = _interopRequireDefault(_getProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function processProps(docFile, component) {
  docFile = docFile.slice();
  var props = component.props;
  var mixins = component.mixins;
  var propsMixins = {};
  if (mixins) {
    mixins.forEach(function (mixin) {
      var pMixin = mixin.props;
      if (pMixin) {
        if (Array.isArray(pMixin)) {
          var propsMerge = {};
          pMixin.forEach(function (key) {
            propsMerge[key] = {};
          });
          propsMixins = (0, _assign2.default)({}, propsMerge, propsMixins);
        } else {
          propsMixins = (0, _assign2.default)({}, pMixin, propsMixins);
        }
      }
    });
  }

  var hasPropsInMixin = propsMixins && (0, _keys2.default)(propsMixins).length;
  var hasPropsInComponent = props && (0, _keys2.default)(props).length;
  if (hasPropsInMixin || hasPropsInComponent) {
    var listDocProps = {};
    if (Array.isArray(props)) {
      var newProps = {};
      props.forEach(function (propName) {
        newProps[propName] = {};
      });
      props = newProps;
    }
    props = (0, _assign2.default)({}, propsMixins, props);
    var listDocParts = [];
    (0, _keys2.default)(props).forEach(function (key) {
      var propName = key;
      var docPart = docFile.filter(function (comment) {
        var propNameDoc = comment.longname.split('props.')[1];
        return propNameDoc === propName && listDocParts.indexOf(propNameDoc) === -1;
      })[0];
      if (docPart) {
        listDocParts.push(docPart.longname);
      }
      var prop = props[propName];
      var docProp = (0, _getProp2.default)(prop, docPart);
      if (docProp.tags.model) {
        propName = 'v-model';
      }
      listDocProps[propName] = docProp;
    });
    return listDocProps;
  }
  return;
}