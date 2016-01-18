'use strict';

var React = require('react');
var TextHandler = require('./text-handler');

var typeMap = {
    doc: 'div',
    paragraph: 'p',
    text: TextHandler
};

function mapTree(leaf) {
    var typeHandler = typeMap[leaf.type];

    // Default text nodes without any marks are just strings in React
    if (leaf.type === 'text' && (!leaf.marks || leaf.marks.length === 0)) {
        return leaf.text;
    }

    var params = typeof typeHandler === 'string' ? null : leaf;
    var args = [typeHandler, params];

    if (leaf.content && leaf.content.length > 0) {
        args = args.concat(leaf.content.map(mapTree));
    }

    return React.createElement.apply(React, args);
}

module.exports = mapTree;
