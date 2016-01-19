# react-prosemirror-document

Render a ProseMirror document in JSON-format using React

## Installation

```
npm install --save react-prosemirror-document
```

## Usage

```js
var ProseMirrorDocument = require('react-prosemirror-document');
var pmDocument = {
  type: 'doc',
  content: [{
    type: 'paragraph',
    content: [{
      type: 'text',
      text: 'Lets add a link to '
    }, {
      type: 'text',
      text: 'my website',
      marks: [{
        type: 'link',
        href: 'https://espen.codes/',
        title: 'Espen.Codes (personal website)'
      }]
    }, {
      type: 'text',
      text: ' for fun an profit.'
    }]
  }]
};

ReactDOM.render(<ProseMirrorDocument document={pmDocument} />, document.body)
```

## Props

- `document` - (**required**) *object* The JSON prosemirror document to render
- `typeMap` - *object* An object where the keys represent the types in a prosemirror document and the values refer to the component that should be used for rendering it. The default type map is overriden when using this, so if you just want to extend the defaults, be sure to use something like `Object.assign` or similar to merge your own types with the ones from `ProseMirrorDocument.typeMap`
- `markMap` - *object* An object where the keys represent the marks in a prosemirror document and the values refer to the component that should be used for rendering it. The default mark map is overriden when using this, so if you just want to extend the defaults, be sure to use something like `Object.assign` or similar to merge your own types with the ones from `ProseMirrorDocument.markMap`
- `skipUnknownMarks` - *boolean* Set to true to simply skip any unknown marks. Default is `false`, which will throw an error when encountering unknown marks.
- `skipUnknownTypes` - *boolean* Set to true to simply skip any unknown types. Default is `false`, which will throw an error when encountering unknown types.

## License

MIT-licensed, see LICENSE.
