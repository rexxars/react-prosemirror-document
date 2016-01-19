'use strict';

var React = require('react');
var omit = require('lodash.omit');

var marksMap = {
    em: 'em',
    strong: 'strong',
    code: 'code'
};

function TextHandler(props) {
    // Normalize marks into the same shape
    var marks = props.node.marks.map(normalize);

    // Use assigned mark handlers
    return marks.reduceRight(function reduceMark(child, mark) {
        var markHandler = marksMap[mark.type];

        if (!markHandler) {
            if (props.skipUnknownMarks) {
                return child;
            }

            throw new Error('No handler for mark type `' + mark.type + '` registered');
        }

        var markProps = typeof markHandler === 'string' ? null : mark;
        return React.createElement(markHandler, markProps, child);
    }, props.node.text);
}

TextHandler.propTypes = {
    node: React.PropTypes.object,
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
