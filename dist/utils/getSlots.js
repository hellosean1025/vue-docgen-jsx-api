'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSlots;

var _htmlparser = require('htmlparser2');

var _htmlparser2 = _interopRequireDefault(_htmlparser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HtmlParser = _htmlparser2.default.Parser;

function getSlots(parts) {
  var output = {};
  if (parts.template && parts.template.content) {
    var template = parts.template.content;
    var lastComment = '';

    var parser = new HtmlParser({
      oncomment: function oncomment(data) {
        if (data.search(/\@slot/) !== -1) {
          lastComment = data.replace('@slot', '').trim();
        }
      },
      ontext: function ontext(text) {
        if (text.trim()) {
          lastComment = '';
        }
      },
      onopentag: function onopentag(name, attrs) {
        if (name === 'slot') {
          var nameSlot = attrs.name || 'default';
          output[nameSlot] = {
            description: lastComment
          };

          lastComment = '';
        }
      }
    });

    parser.write(template);
    parser.end();
    return output;
  }
  return {};
}