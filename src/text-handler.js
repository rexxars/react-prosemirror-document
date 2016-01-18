'use strict';

var React = require('react');
var omit = require('lodash.omit');

var marksMap = {
    em: 'em',
    strong: 'strong',
    code: 'code'
};

function TextHandler(node) {
    // Normalize marks into the same shape
    var marks = node.marks.map(normalize);

    // Use assigned mark handlers
    return marks.reduceRight(function reduceMark(child, mark) {
        var markHandler = marksMap[mark.type];
        if (!markHandler) {
            throw new Error('Handler for mark type `' + mark.type + '` not registered');
        }

        var markProps = typeof markHandler === 'string' ? null : mark;
        return React.createElement(markHandler, markProps, child);
    }, node.text);
}

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
