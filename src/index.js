'use strict';

var React = require('react');
var mapTree = require('./map-tree');

function ProseMirrorDocument(props) {
    return mapTree(props.document, props);
}

ProseMirrorDocument.propTypes = {
    document: React.PropTypes.object,
    components: React.PropTypes.object,
    skipUnknownMarks: React.PropTypes.bool,
    skipUnknownTypes: React.PropTypes.bool
};

ProseMirrorDocument.defaultProps = {
    skipUnknownMarks: false,
    skipUnknownTypes: false
};

module.exports = ProseMirrorDocument;
