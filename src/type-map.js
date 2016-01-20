'use strict';

var React = require('react');
var TextHandler = require('./text-handler');
var CodeBlock = require('./code-block');
var mapTree = require('./map-tree');

var Document = function(props) {
    var args = ['div', { className: props.className }];

    if (props.node.content && props.node.content.length > 0) {
        args = args.concat(props.node.content.map(function(node) {
            return mapTree(node, props);
        }));
    }

    return React.createElement.apply(React, args);
};

Document.propTypes = {
    className: React.PropTypes.string,
    node: React.PropTypes.object
};

var typeMap = {
    doc: Document,
    paragraph: 'p',
    code_block: CodeBlock, // eslint-disable-line camelcase
    text: TextHandler
};

module.exports = typeMap;
