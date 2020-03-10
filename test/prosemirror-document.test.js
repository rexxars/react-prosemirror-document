/* eslint-disable react/prop-types, react/no-multi-comp */
'use strict';

var chai = require('chai');
var mocha = require('mocha');
var React = require('react');
var ReactDOM = require('react-dom/server');
var enzyme = require('enzyme');
var assign = require('lodash.assign');
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

    it('contains parent node', function() {
        var element = enzyme.shallow(React.createElement(ProseMirrorDocument, {
            document: fixtures.parentNode,
            typeMap: assign({ span: 'span' }, ProseMirrorDocument.typeMap)
        }));

        var props = element.find('span').children().get(1).props;

        expect(props.parentNode).to.be.ok; // eslint-disable-line
        expect(props.parentNode.type).to.be.equal('span');
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

    it('renders images', function() {
        var wrapper = render(React.createElement(ProseMirrorDocument, {
            document: fixtures.image
        }));

        var imgs = wrapper.find('img');
        expect(imgs).to.have.length(1);
        expect(imgs.first().attr('src')).to.equal('/foo/bar.jpg');
        expect(imgs.first().attr('title')).to.equal('The title');
    });

    it('renders linebreaks (hard-breaks)', function() {
        var wrapper = render(React.createElement(ProseMirrorDocument, {
            document: fixtures.hardBreak
        }));

        expect(wrapper.find('br')).to.have.length(3);
    });

    it('allows custom components to be used for non-standard types', function() {
        var CustomImage = function(props) {
            return React.createElement(
                'span',
                { className: 'custom-img' },
                JSON.stringify(props.node)
            );
        };

        var wrapper = render(React.createElement(ProseMirrorDocument, {
            document: fixtures.customImage,
            typeMap: assign({'custom-image': CustomImage}, ProseMirrorDocument.typeMap)
        }));

        var img = wrapper.find('.custom-img');
        expect(img).to.have.length(1);
        expect(JSON.parse(img.text()).attrs.url).to.equal(
            'http://31.media.tumblr.com/b52741846e3d6901f505853e2c33a7fe/tumblr_inline_mvsiivyiNw1qz4m9d.jpg'
        );
    });

    it('allows custom components to be used for standard types', function() {
        var CustomParagraph = function(props) {
            return React.createElement(
                'div',
                { className: 'paragraph' },
                (props.node.content || []).map(function(node) {
                    return node.text;
                })
            );
        };

        var wrapper = render(React.createElement(ProseMirrorDocument, {
            document: fixtures.simple,
            typeMap: assign({}, ProseMirrorDocument.typeMap, {paragraph: CustomParagraph})
        }));

        var ps = wrapper.find('.paragraph');
        expect(ps).to.have.length(12);
        expect(ps.last().text()).to.equal('Let\'s add some marks here, just for fun.');
    });

    it('allows custom components to be used for non-standard marks', function() {
        var AbbrMark = function(props) {
            return React.createElement(
                'abbr',
                { title: props.title },
                props.children
            );
        };

        var wrapper = render(React.createElement(ProseMirrorDocument, {
            document: fixtures.customMark,
            markMap: assign({abbreviation: AbbrMark}, ProseMirrorDocument.markMap)
        }));

        var abbr = wrapper.find('abbr');
        expect(abbr).to.have.length(1);
        expect(abbr.attr('title')).to.equal('ProseMirror Marks');
        expect(abbr.text()).to.equal('PMMs');
        expect(abbr.parent()[0].name).to.equal('em');
    });

    it('allows custom components to be used for standard marks', function() {
        var CustomLink = function(props) {
            return React.createElement('a', { target: '_blank', href: props.href }, props.children);
        };

        var wrapper = render(React.createElement(ProseMirrorDocument, {
            document: fixtures.simple,
            markMap: assign({}, ProseMirrorDocument.markMap, { link: CustomLink })
        }));

        var link = wrapper.find('a');
        expect(link).to.have.length(7);
        expect(link.first().attr('target')).to.equal('_blank');
        expect(link.first().attr('href')).to.equal('http://polarworks.no');
    });

    it('uses passed className', function() {
        var wrapper = render(React.createElement(ProseMirrorDocument, {
            document: fixtures.superSimple,
            className: 'zing'
        }));

        var zing = wrapper.find('.zing');
        expect(zing).to.have.length(1);
    });

    it('allows custom components to easily utilize the text handler', function() {
        var Caption = function(props) {
            return React.createElement('div', { className: 'caption' }, props.children);
        };

        var wrapper = render(React.createElement(ProseMirrorDocument, {
            document: fixtures.caption,
            typeMap: assign({caption: Caption}, ProseMirrorDocument.typeMap)
        }));

        var caption = wrapper.find('.caption');
        expect(caption).to.have.length(1);
        expect(caption.parent().html()).to.equal([
            '<div class="caption">It&apos;s a long way to the top, if you want to ',
            '<strong>rock and roll</strong></div>'
        ].join(''));
    });
});
