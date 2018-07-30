'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _vm = require('vm');

var _vm2 = _interopRequireDefault(_vm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clone(obj) {
  if (null == obj || 'object' != (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj))) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

module.exports = function evalComponentCode(code) {
  try {
    var script = new _vm2.default.Script(code, {});
    var requireSanbox = function requireSanbox(element) {
      if (element === 'vuex') {
        var outputVuex = {
          mapState: function mapState() {},
          mapMutations: function mapMutations() {},
          mapGetters: function mapGetters() {},
          mapActions: function mapActions() {},
          createNamespacedHelpers: function createNamespacedHelpers() {}
        };
        return (0, _extends3.default)({}, outputVuex, {
          default: outputVuex
        });
      }
      if (element === 'vue') {
        var outputVue = {
          __esModule: true,
          use: function use() {},
          directive: function use() {},
          component: function component() {},
          extended: function extended() {},
          extend: function extend(obj) {
            return obj;
          }
        };
        return (0, _extends3.default)({}, outputVue, {
          default: outputVue
        });
      }
      return function () {};
    };
    requireSanbox.context = function () {
      return function () {};
    };
    var sandbox = {
      exports: {},
      module: {
        exports: {}
      },
      require: requireSanbox,
      document: {},
      window: {
        location: {}
      },
      alert: function alert() {},
      confirm: function confirm() {},

      console: {
        log: function log() {},
        debug: function debug() {}
      },
      sessionStorage: {
        getItem: function getItem() {},
        setItem: function setItem() {},
        removeItem: function removeItem() {}
      },
      localStorage: {
        getItem: function getItem() {},
        setItem: function setItem() {},
        removeItem: function removeItem() {}
      }
    };
    var context = new _vm2.default.createContext(sandbox);
    script.runInContext(context);
    var output = sandbox;
    return clone(output);
  } catch (err) {
    throw err;
  }
};