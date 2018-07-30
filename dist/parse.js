'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseSource = exports.parse = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var _stateDoc = require('./utils/stateDoc');

var _stateDoc2 = _interopRequireDefault(_stateDoc);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parse = exports.parse = function parse(file) {
  var source = _fs2.default.readFileSync(file, {
    encoding: 'utf-8'
  });
  if (source === '') {
    throw new Error('The document is empty');
  }

  //parse jsx begin
  console.log('file', file);
  var regexp = /\<script[^\>]*\>([\s\S]+?)\<\/script\>/;
  var babel = require('babel-standalone');
  var transformJSX = require('babel-plugin-transform-vue-jsx');
  var env = require('babel-preset-env');
  var stage1 = require('babel-preset-stage-1');

  var parse2 = function parse2(raw) {
    return babel.transform(raw, {
      presets: [env, stage1],
      plugins: [transformJSX]
    }).code;
  };

  source = source.replace(regexp, function (str, match) {
    var y = '';
    try {
      y = parse2(match);
    } catch (err) {
      console.error(err);
    }

    return '<script>\n      ' + y + '\n      </script>';
  });

  //parse jsx end

  _stateDoc2.default.file = file;
  _stateDoc2.default.saveComponent(source, file);
  var component = utils.getSandbox(_stateDoc2.default, file).default;
  var vueDoc = utils.getVueDoc(_stateDoc2.default, component);
  _stateDoc2.default.reset();
  return vueDoc;
};

var parseSource = exports.parseSource = function parseSource(source, path) {
  if (source === '') {
    throw new Error('The document is empty');
  }

  _stateDoc2.default.file = path;
  _stateDoc2.default.saveComponent(source, path);
  var component = utils.getSandbox(_stateDoc2.default, path).default;
  var vueDoc = utils.getVueDoc(_stateDoc2.default, component);
  _stateDoc2.default.reset();
  return vueDoc;
};