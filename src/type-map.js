'use strict';

var TextHandler = require('./text-handler');
var CodeBlock = require('./code-block');

var typeMap = {
    doc: 'div',
    paragraph: 'p',
    code_block: CodeBlock, // eslint-disable-line camelcase
    text: TextHandler
};

module.exports = typeMap;
