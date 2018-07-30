'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _getComponentModuleJSCode = require('./getComponentModuleJSCode');

var _getComponentModuleJSCode2 = _interopRequireDefault(_getComponentModuleJSCode);

var _getSlots = require('./getSlots');

var _getSlots2 = _interopRequireDefault(_getSlots);

var _getDocFile2 = require('./getDocFile');

var _getDocFile3 = _interopRequireDefault(_getDocFile2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stateDoc = function () {
  function stateDoc() {
    (0, _classCallCheck3.default)(this, stateDoc);

    this.file = '';
    this.docComponent = {};
    this.sourceComponent = '';
    this.docMixins = [];
    this.jscodeReqest = '';
    this.jscodeLang = undefined;
    this.docTemp = '';
    this.slots;
  }

  (0, _createClass3.default)(stateDoc, [{
    key: 'isMainComponent',
    value: function isMainComponent(file) {
      return file === this.file;
    }
  }, {
    key: 'saveComponent',
    value: function saveComponent(source, file) {
      if (this.isMainComponent(file) && this.sourceComponent !== source) {
        var parts = (0, _parser2.default)(source, 'name');
        this.slots = (0, _getSlots2.default)(parts);
        this.jscodeReqest = (0, _getComponentModuleJSCode2.default)(parts, source, file);
        this.jscodeLang = parts.script.lang;
        this.docComponent = this.getDocFile(this.jscodeReqest, file, this.jscodeLang);
      }
    }
  }, {
    key: 'getDocFile',
    value: function getDocFile(source, file, lang) {
      this.docTemp = (0, _getDocFile3.default)(source, file, lang);
      return this.docTemp;
    }
  }, {
    key: 'isMixin',
    value: function isMixin(doc) {
      doc = doc || this.docTemp;
      return doc.some(function (docPart) {
        return docPart.kind === 'mixin';
      });
    }
  }, {
    key: 'getDocJs',
    value: function getDocJs() {
      var docMixins = [].concat.apply([], this.docMixins).filter(function (docPart) {
        return docPart.kind !== 'package';
      });
      return this.docComponent.concat(docMixins);
    }
  }, {
    key: 'saveMixin',
    value: function saveMixin(doc, file) {
      if (this.isMixin(doc)) {
        doc = doc.map(function (docPart) {
          var longnameSplit = docPart.longname.split('.');
          if (longnameSplit[0] === 'default') {
            longnameSplit[0] = 'module.exports';
          }
          docPart.longname = longnameSplit.join('.');
          return docPart;
        }).filter(function (docPart) {
          return docPart.longname !== 'module.exports';
        });
        var index = void 0;
        this.docMixins.forEach(function (docMixin, id) {
          var packages = docMixin.filter(function (docPart) {
            return docPart.kind === 'package';
          })[0];
          if (packages && packages.files[0] === file) {
            index = id;
          }
        });
        if (!index) {
          this.docMixins.unshift(doc);
        }
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.file = '';
      this.docComponent = {};
      this.sourceComponent = '';
      this.docMixins = [];
      this.jscodeReqest = '';
      this.jscodeLang = undefined;
      this.docTemp = '';
    }
  }]);
  return stateDoc;
}();

exports.default = new stateDoc();