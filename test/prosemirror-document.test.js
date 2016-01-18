'use strict';

var chai = require('chai');
var mocha = require('mocha');
var React = require('react');
var ReactDOM = require('react-dom/server');
var enzyme = require('enzyme');
var fixtures = require('./fixtures');
var ProseMirrorDocument = require('../');

var it = mocha.it;
var expect = chai.expect;
var render = enzyme.render;

mocha.describe('<ProseMirrorDocument />', function() {
    it('renders simple documents with no custom types', function() {
        var el = React.createElement(ProseMirrorDocument, {
            document: fixtures.superSimple
        });
        var wrapper = render(el);
        console.log(ReactDOM.renderToStaticMarkup(el));
        expect(wrapper.find('.foo-bar')).to.have.length(3);
    });

    it.skip('rendered the title', function() {

    });
});
