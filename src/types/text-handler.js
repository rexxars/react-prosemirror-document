'use strict';

var React = require('react');
var omit = require('lodash.omit');

function TextHandler(props) {
    // Use assigned mark handlers
    return (props.marks || []).reduceRight(function reduceMark(child, mark) {
        var normalized = normalize(mark);
        var markHandler = props.markMap[normalized.type];

        if (!markHandler) {
            if (props.skipUnknownMarks) {
                return child;
            }

            throw new Error('No handler for mark type `' + normalized.type + '` registered');
        }

        return React.createElement(markHandler, omit(mark, ['type', '_']), child);
    }, props.text);
}

TextHandler.propTypes = {
    text: React.PropTypes.string,
    marks: React.PropTypes.array,
    markMap: React.PropTypes.object,
    skipUnknownMarks: React.PropTypes.bool
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
