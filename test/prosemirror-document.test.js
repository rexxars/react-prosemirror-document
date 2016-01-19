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
    it('throws on unknown marks', function() {
        expect(function() {
            render(React.createElement(ProseMirrorDocument, {
                document: fixtures.codeBlock
            }));
        }).to.throw(Error, /codemirror/);
    });

    it('throws on unknown types', function() {
        expect(function() {
            render(React.createElement(ProseMirrorDocument, {
                document: fixtures.customImage
            }));
        }).to.throw(Error, /custom-image/);
    });

    it('renders simple paragraph/text nodes with marks', function() {
        var html = ReactDOM.renderToStaticMarkup(
            React.createElement(ProseMirrorDocument, {
                document: fixtures.superSimple
            })
        );

        expect(html).to.equal([
            '<div><p>Lets add some <strong><em>marks</em></strong> here, ',
            'because <code>var fun = marks.something;</code>.</p></div>'
        ].join(''));
    });

    it('renders code blocks', function() {
        var wrapper = render(React.createElement(ProseMirrorDocument, {
            document: fixtures.codeBlock,
            skipUnknownMarks: true
        }));

        expect(wrapper.html()).to.equal([
            '<div><pre><code>var f = &apos;lol&apos;;\n',
            'var y = &apos;zool&apos;;</code></pre><p>',
            'That code block should probably be handled differently. ',
            'Custom type or whatnot.</p></div>'
        ].join(''));
    });

    it('renders links', function() {
        var wrapper = render(React.createElement(ProseMirrorDocument, {
            document: fixtures.simple
        }));

        var links = wrapper.find('a');
        expect(links).to.have.length(7);
        expect(links.first().attr('href')).to.equal('http://polarworks.no');
        expect(links.last().attr('title')).to.equal('Python project');
    });
});
