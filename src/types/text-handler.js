'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var omit = require('lodash.omit');

function TextHandler(props) {
    // Use assigned mark handlers
    return (props.node.marks || []).reduceRight(function reduceMark(child, mark) {
        var normalized = normalize(mark);
        var markHandler = props.markMap[normalized.type];

        if (!markHandler) {
            if (props.skipUnknownMarks) {
                return child;
            }

            throw new Error('No handler for mark type `' + normalized.type + '` registered');
        }

        return React.createElement(markHandler, omit(mark, 'type'), child);
    }, props.node.text);
}

TextHandler.propTypes = {
    node: PropTypes.object,
    markMap: PropTypes.object,
    skipUnknownMarks: PropTypes.bool
};

function normalize(mark) {
    if (typeof mark === 'string') {
        return { type: mark };
    } else if (typeof mark._ === 'string') {
        var newObj = omit(mark, '_');
        newObj.type = mark._;
        return newObj;
    }

    return mark;
}

module.exports = TextHandler;
