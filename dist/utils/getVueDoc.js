'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getVueDoc;

var _variables = require('./variables');

var _processTags = require('./processTags');

var _processTags2 = _interopRequireDefault(_processTags);

var _processProps = require('./processProps');

var _processProps2 = _interopRequireDefault(_processProps);

var _processMethods = require('./processMethods');

var _processMethods2 = _interopRequireDefault(_processMethods);

var _processEvents = require('./processEvents');

var _processEvents2 = _interopRequireDefault(_processEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getVueDoc(stateDoc, component) {
  var docJsFile = stateDoc.getDocJs();
  var displayName = void 0;
  var docComponent = void 0;
  if (!component.name || component.name === '') {
    throw new Error("The component has no name, add 'name' property on the Vue component");
  }
  displayName = component.name;
  if (docJsFile) {
    docJsFile = docJsFile.filter(function (comment) {
      return comment.kind !== 'package';
    });
    docComponent = docJsFile.filter(function (comment) {
      return comment.longname === 'module.exports' || comment.longname === 'default';
    })[0];
  } else {
    docJsFile = [];
    docComponent = false;
  }
  var description = _variables.EMPTY;
  var comment = _variables.EMPTY;
  var tags = {};
  if (docComponent) {
    description = (0, _variables.getDescription)(docComponent);
    comment = (0, _variables.getComment)(docComponent);
    tags = (0, _processTags2.default)(docComponent, _variables.IGNORE_DEFAULT);
  }
  var props = (0, _processProps2.default)(docJsFile, component);
  var methods = (0, _processMethods2.default)(docJsFile, component);
  var events = (0, _processEvents2.default)(docJsFile, component);

  return {
    description: description,
    methods: methods,
    displayName: displayName,
    props: props,
    comment: comment,
    tags: tags,
    events: events,
    slots: stateDoc.slots
  };
}