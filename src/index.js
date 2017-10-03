'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var mapTree = require('./map-tree');
var defaultTypeMap = require('./type-map');
var defaultMarkMap = require('./mark-map');

function ProseMirrorDocument(props) {
    return mapTree(props.document, props);
}

ProseMirrorDocument.propTypes = {
    document: PropTypes.object.isRequired,
    className: PropTypes.string,
    skipUnknownMarks: PropTypes.bool,
    skipUnknownTypes: PropTypes.bool,
    typeMap: PropTypes.object,
    markMap: PropTypes.object
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
