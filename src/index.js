'use strict';

var React = require('react');
var mapTree = require('./map-tree');

function ProseMirrorDocument(props) {
    return mapTree(props.document);
}

ProseMirrorDocument.propTypes = {
    document: React.PropTypes.object,
    components: React.PropTypes.object
};

module.exports = ProseMirrorDocument;
