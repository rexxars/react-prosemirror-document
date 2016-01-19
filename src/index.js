'use strict';

var React = require('react');
var mapTree = require('./map-tree');
var defaultTypeMap = require('./type-map');
var defaultMarkMap = require('./mark-map');

function ProseMirrorDocument(props) {
    return mapTree(props.document, props);
}

ProseMirrorDocument.propTypes = {
    document: React.PropTypes.object,
    components: React.PropTypes.object,
    skipUnknownMarks: React.PropTypes.bool,
    skipUnknownTypes: React.PropTypes.bool,
    typeMap: React.PropTypes.object,
    markMap: React.PropTypes.object
};

ProseMirrorDocument.defaultProps = {
    skipUnknownMarks: false,
    skipUnknownTypes: false,
    typeMap: defaultTypeMap,
    markMap: defaultMarkMap
};

ProseMirrorDocument.typeMap = defaultTypeMap;
ProseMirrorDocument.markMap = defaultMarkMap;

module.exports = ProseMirrorDocument;
