'use strict';

var TextHandler = require('./types/text-handler');
var CodeBlock = require('./types/code-block');

var typeMap = {
    doc: 'div',
    paragraph: 'p',
    image: 'img',
    code_block: CodeBlock, // eslint-disable-line camelcase
    text: TextHandler
};

module.exports = typeMap;
