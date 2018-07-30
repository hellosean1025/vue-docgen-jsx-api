import fs from 'fs';
import * as utils from './utils';
import stateDoc from './utils/stateDoc';

export const parse = function (file) {
  let source = fs.readFileSync (file, {
    encoding: 'utf-8',
  });
  if (source === '') {
    throw new Error ('The document is empty');
  }

  //parse jsx begin
  console.log('file',file)
  let regexp = /\<script[^\>]*\>([\s\S]+?)\<\/script\>/;
  const babel = require ('babel-standalone');
  const transformJSX = require ('babel-plugin-transform-vue-jsx');
  const env = require ('babel-preset-env');
  const stage1 = require ('babel-preset-stage-1');

  const parse2 = raw =>
    babel.transform (raw, {
      presets: [env, stage1],
      plugins: [transformJSX],
    }).code;

  source = source.replace (regexp, function (str, match) {
    let y = '';
    try {
      y = parse2 (match);
    } catch (err) {
      console.error (err);
    }

    return `<script>
      ${y}
      </script>`;
  });

  //parse jsx end

  stateDoc.file = file;
  stateDoc.saveComponent (source, file);
  const component = utils.getSandbox (stateDoc, file).default;
  const vueDoc = utils.getVueDoc (stateDoc, component);
  stateDoc.reset ();
  return vueDoc;
};

export const parseSource = function (source, path) {
  if (source === '') {
    throw new Error ('The document is empty');
  }

  stateDoc.file = path;
  stateDoc.saveComponent (source, path);
  const component = utils.getSandbox (stateDoc, path).default;
  const vueDoc = utils.getVueDoc (stateDoc, component);
  stateDoc.reset ();
  return vueDoc;
};
