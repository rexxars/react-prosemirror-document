'use strict';

var React = require('react');
var textHandler = require('./text-handler');
var assign = require('lodash.assign');

function CodeBlock(props) {
    var content = props.content.map(function(node) {
        return textHandler(assign({}, props, node));
    });
    var code = React.createElement('code', null, content);
    return React.createElement('pre', null, code);
}

CodeBlock.propTypes = {
    content: React.PropTypes.array
};

module.exports = CodeBlock;
