import {ASTNode} from '../../../../lib/core/ast/ast-node';
import {DocumentPart} from '../../../../lib/core/ast/document-part';
import {DocumentObject} from '../../../../lib/core/ast/document-object';
import {DocumentRoot} from '../../../../lib/core/ast/document-root';
import {OuterEnv} from '../../../../lib/core/ast/outer-env';
import {TextBlock} from '../../../../lib/core/ast/text-block';
import {TextNode} from '../../../../lib/core/ast/text-node';
import {Parser} from '../../../../lib/core/parser/parser';
import {IndentedBlock} from '../../../../lib/core/ast/indented-block';
import {InnerEnv} from '../../../../lib/core/ast/inner-env';
import {InlineMath} from '../../../../lib/core/ast/inline-math';

function allChildrenHaveCorrectParents(node: ASTNode): boolean {
    return node.children.every(
        child => child.parent === node && allChildrenHaveCorrectParents(child),
    );
}

describe('Parser', () => {
    let parser: Required<Parser>;

    beforeAll(() => {
        parser = new Parser();
    });

    it('Parses an empty WooWoo document', () => {
        // -- Arrange
        const woowooSource = '';

        // -- Act
        const root = parser.parse(woowooSource);

        // -- Assert
        const expectedRoot = new DocumentRoot({line: 1, column: 1, offset: 0});
        expect(expectedRoot.equals(root)).toBeTrue();
        expect(root.parent).toBeUndefined();
    });

    it('Parses a WooWoo document containing only a newline', () => {
        // -- Arrange
        const woowooSource = '\n';

        // -- Act
        const root = parser.parse(woowooSource);

        // -- Assert
        const expectedRoot = new DocumentRoot({line: 2, column: 1, offset: 1});
        expect(expectedRoot.equals(root)).toBeTrue();
        expect(root.parent).toBeUndefined();
    });

    it('Parses a WooWoo document containing only some whitespace', () => {
        // -- Arrange
        const woowooSource = '\n    \n \n\n ';

        // -- Act
        const root = parser.parse(woowooSource);

        // -- Assert
        const expectedRoot = new DocumentRoot({line: 5, column: 2, offset: 10});
        expect(expectedRoot.equals(root)).toBeTrue();
        expect(root.parent).toBeUndefined();
    });

    it('Parses a simple WooWoo document with document parts, and text blocks', () => {
        // -- Arrange
        const woowooSource = `
.Chapter The First Chapter

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at
imperdiet felis. Donec cursus, ex sed tristique varius, purus felis maximus
lectus, a sagittis nulla nibh eget ex.


.Section The First Section of the First Chapter

Duis viverra massa vel mauris venenatis, et dapibus nisi maximus. Integer sed mi
turpis. Praesent at congue eros. Sed eu erat magna. Nunc ante nulla, tincidunt
ut quam ac, placerat aliquet risus.


Duis leo tellus, elementum iaculis diam eu, vestibulum ultrices lectus.`;
        const expectedRoot = new DocumentRoot({
            line: 16,
            column: 72,
            offset: 536,
        });
        const chapterPart = new DocumentPart(
            'Chapter',
            {line: 2, column: 1, offset: 1},
            {line: 2, column: 27, offset: 27},
            expectedRoot,
        );
        chapterPart.addChildren(
            new TextNode(
                'The First Chapter',
                false,
                {line: 2, column: 10, offset: 10},
                chapterPart,
            ),
        );
        expectedRoot.addChildren(chapterPart);
        const textBlock1 = new TextBlock(
            false,
            {line: 4, column: 1, offset: 29},
            {line: 6, column: 39, offset: 215},
            expectedRoot,
        );
        textBlock1.addChildren(
            new TextNode(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                    ' Suspendisse at\nimperdiet felis. Donec cursus, ex sed' +
                    ' tristique varius, purus felis maximus\nlectus, a' +
                    ' sagittis nulla nibh eget ex.',
                false,
                {line: 4, column: 1, offset: 29},
                textBlock1,
            ),
        );
        expectedRoot.addChildren(textBlock1);
        const sectionPart = new DocumentPart(
            'Section',
            {line: 9, column: 1, offset: 218},
            {line: 9, column: 48, offset: 265},
            expectedRoot,
        );
        sectionPart.addChildren(
            new TextNode(
                'The First Section of the First Chapter',
                false,
                {line: 9, column: 10, offset: 227},
                sectionPart,
            ),
        );
        expectedRoot.addChildren(sectionPart);
        const textBlock2 = new TextBlock(
            false,
            {line: 11, column: 1, offset: 267},
            {line: 13, column: 36, offset: 462},
            expectedRoot,
        );
        textBlock2.addChildren(
            new TextNode(
                'Duis viverra massa vel mauris venenatis, et dapibus nisi' +
                    ' maximus. Integer sed mi\nturpis. Praesent at congue' +
                    ' eros. Sed eu erat magna. Nunc ante nulla, tincidunt\nut' +
                    ' quam ac, placerat aliquet risus.',
                false,
                {line: 11, column: 1, offset: 267},
                textBlock2,
            ),
        );
        expectedRoot.addChildren(textBlock2);
        const textBlock3 = new TextBlock(
            false,
            {line: 16, column: 1, offset: 465},
            {line: 16, column: 72, offset: 536},
            expectedRoot,
        );
        textBlock3.addChildren(
            new TextNode(
                'Duis leo tellus, elementum iaculis diam eu, vestibulum' +
                    ' ultrices lectus.',
                false,
                {line: 16, column: 1, offset: 465},
                textBlock3,
            ),
        );
        expectedRoot.addChildren(textBlock3);

        // -- Act
        const root = parser.parse(woowooSource);

        // -- Assert
        expect(expectedRoot.equals(root)).toBeTrue();
        expect(root.parent).toBeUndefined();
        expect(allChildrenHaveCorrectParents(root)).toBeTrue();
    });

    it('Parses a simple WooWoo document with document parts with metablocks, and text blocks', () => {
        // -- Arrange
        const woowooSource = `
.Chapter The First Chapter
  label: chap-1

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at
imperdiet felis. Donec cursus, ex sed tristique varius, purus felis maximus
lectus, a sagittis nulla nibh eget ex.


.Section The First Section of the First Chapter
  label: sec-1-1

Duis viverra massa vel mauris venenatis, et dapibus nisi maximus. Integer sed mi
turpis. Praesent at congue eros. Sed eu erat magna. Nunc ante nulla, tincidunt
ut quam ac, placerat aliquet risus.


Duis leo tellus, elementum iaculis diam eu, vestibulum ultrices lectus.`;
        const expectedRoot = new DocumentRoot({
            line: 18,
            column: 72,
            offset: 569,
        });
        const chapterPart = new DocumentPart(
            'Chapter',
            {line: 2, column: 1, offset: 1},
            {line: 3, column: 16, offset: 43},
            expectedRoot,
        );
        chapterPart.addChildren(
            new TextNode(
                'The First Chapter',
                false,
                {line: 2, column: 10, offset: 10},
                chapterPart,
            ),
        );
        chapterPart.setMetadata('label', 'chap-1');
        expectedRoot.addChildren(chapterPart);
        const textBlock1 = new TextBlock(
            false,
            {line: 5, column: 1, offset: 45},
            {line: 7, column: 39, offset: 231},
            expectedRoot,
        );
        textBlock1.addChildren(
            new TextNode(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                    ' Suspendisse at\nimperdiet felis. Donec cursus, ex sed' +
                    ' tristique varius, purus felis maximus\nlectus, a' +
                    ' sagittis nulla nibh eget ex.',
                false,
                {line: 5, column: 1, offset: 45},
                textBlock1,
            ),
        );
        expectedRoot.addChildren(textBlock1);
        const sectionPart = new DocumentPart(
            'Section',
            {line: 10, column: 1, offset: 234},
            {line: 11, column: 17, offset: 298},
            expectedRoot,
        );
        sectionPart.addChildren(
            new TextNode(
                'The First Section of the First Chapter',
                false,
                {line: 10, column: 10, offset: 243},
                sectionPart,
            ),
        );
        sectionPart.setMetadata('label', 'sec-1-1');
        expectedRoot.addChildren(sectionPart);
        const textBlock2 = new TextBlock(
            false,
            {line: 13, column: 1, offset: 300},
            {line: 15, column: 36, offset: 495},
            expectedRoot,
        );
        textBlock2.addChildren(
            new TextNode(
                'Duis viverra massa vel mauris venenatis, et dapibus nisi' +
                    ' maximus. Integer sed mi\nturpis. Praesent at congue' +
                    ' eros. Sed eu erat magna. Nunc ante nulla, tincidunt\nut' +
                    ' quam ac, placerat aliquet risus.',
                false,
                {line: 13, column: 1, offset: 300},
                textBlock2,
            ),
        );
        expectedRoot.addChildren(textBlock2);
        const textBlock3 = new TextBlock(
            false,
            {line: 18, column: 1, offset: 498},
            {line: 18, column: 72, offset: 569},
            expectedRoot,
        );
        textBlock3.addChildren(
            new TextNode(
                'Duis leo tellus, elementum iaculis diam eu, vestibulum' +
                    ' ultrices lectus.',
                false,
                {line: 18, column: 1, offset: 498},
                textBlock3,
            ),
        );
        expectedRoot.addChildren(textBlock3);

        // -- Act
        const root = parser.parse(woowooSource);

        // -- Assert
        expect(expectedRoot.equals(root)).toBeTrue();
        expect(root.parent).toBeUndefined();
        expect(allChildrenHaveCorrectParents(root)).toBeTrue();
    });

    it('Parses a simple WooWoo document with document parts, and text blocks with metablocks', () => {
        // -- Arrange
        const woowooSource = `
.Chapter The First Chapter

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at
imperdiet felis. Donec cursus, ex sed tristique varius, purus felis maximus
lectus, a sagittis nulla nibh eget ex.


.Section The First Section of the First Chapter

Duis viverra massa vel mauris venenatis, et dapibus nisi maximus. Integer sed mi
turpis. Praesent at congue eros. Sed eu erat magna. Nunc ante nulla, tincidunt
ut quam ac, placerat aliquet risus.
  1:
    link: http://example.com/1
  2:
    link: http://example.com/2


Duis leo tellus, elementum iaculis diam eu, vestibulum ultrices lectus.
  only: html`;
        const expectedRoot = new DocumentRoot({
            line: 21,
            column: 13,
            offset: 621,
        });
        const chapterPart = new DocumentPart(
            'Chapter',
            {line: 2, column: 1, offset: 1},
            {line: 2, column: 27, offset: 27},
            expectedRoot,
        );
        chapterPart.addChildren(
            new TextNode(
                'The First Chapter',
                false,
                {line: 2, column: 10, offset: 10},
                chapterPart,
            ),
        );
        expectedRoot.addChildren(chapterPart);
        const textBlock1 = new TextBlock(
            false,
            {line: 4, column: 1, offset: 29},
            {line: 6, column: 39, offset: 215},
            expectedRoot,
        );
        textBlock1.addChildren(
            new TextNode(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                    ' Suspendisse at\nimperdiet felis. Donec cursus, ex sed' +
                    ' tristique varius, purus felis maximus\nlectus, a' +
                    ' sagittis nulla nibh eget ex.',
                false,
                {line: 4, column: 1, offset: 29},
                textBlock1,
            ),
        );
        expectedRoot.addChildren(textBlock1);
        const sectionPart = new DocumentPart(
            'Section',
            {line: 9, column: 1, offset: 218},
            {line: 9, column: 48, offset: 265},
            expectedRoot,
        );
        sectionPart.addChildren(
            new TextNode(
                'The First Section of the First Chapter',
                false,
                {line: 9, column: 10, offset: 227},
                sectionPart,
            ),
        );
        expectedRoot.addChildren(sectionPart);
        const textBlock2 = new TextBlock(
            false,
            {line: 11, column: 1, offset: 267},
            {line: 17, column: 31, offset: 534},
            expectedRoot,
        );
        textBlock2.addChildren(
            new TextNode(
                'Duis viverra massa vel mauris venenatis, et dapibus nisi' +
                    ' maximus. Integer sed mi\nturpis. Praesent at congue' +
                    ' eros. Sed eu erat magna. Nunc ante nulla, tincidunt\nut' +
                    ' quam ac, placerat aliquet risus.',
                false,
                {line: 11, column: 1, offset: 267},
                textBlock2,
            ),
        );
        textBlock2.setMetadata('1', {link: 'http://example.com/1'});
        textBlock2.setMetadata('2', {link: 'http://example.com/2'});
        expectedRoot.addChildren(textBlock2);
        const textBlock3 = new TextBlock(
            false,
            {line: 20, column: 1, offset: 537},
            {line: 21, column: 13, offset: 621},
            expectedRoot,
        );
        textBlock3.addChildren(
            new TextNode(
                'Duis leo tellus, elementum iaculis diam eu, vestibulum' +
                    ' ultrices lectus.',
                false,
                {line: 20, column: 1, offset: 537},
                textBlock3,
            ),
        );
        textBlock3.setMetadata('only', 'html');
        expectedRoot.addChildren(textBlock3);

        // -- Act
        const root = parser.parse(woowooSource);

        // -- Assert
        expect(expectedRoot.equals(root)).toBeTrue();
        expect(root.parent).toBeUndefined();
        expect(allChildrenHaveCorrectParents(root)).toBeTrue();
    });

    it('Parses a WooWoo document with a document part, text blocks, and document objects, with each having metablocks', () => {
        // -- Arrange
        const woowooSource = `
.Chapter The First Chapter
  label: chap-1

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at
imperdiet felis. Donec cursus, ex sed tristique varius, purus felis maximus
lectus, a sagittis nulla nibh eget ex.

.Proof:
  author: 'Author Name'
  link: 'www.example.com'

  Duis viverra massa vel mauris venenatis, et dapibus nisi maximus. Integer sed
  mi turpis. Praesent at congue eros. Sed eu erat magna.
    only: pdf


  Nunc ante nulla, tincidunt ut quam ac, placerat aliquet risus.


Duis leo tellus, elementum iaculis diam eu, vestibulum ultrices lectus.
  only: html`;
        const expectedRoot = new DocumentRoot({
            line: 22,
            column: 13,
            offset: 596,
        });
        const chapterPart = new DocumentPart(
            'Chapter',
            {line: 2, column: 1, offset: 1},
            {line: 3, column: 16, offset: 43},
            expectedRoot,
        );
        chapterPart.addChildren(
            new TextNode(
                'The First Chapter',
                false,
                {line: 2, column: 10, offset: 10},
                chapterPart,
            ),
        );
        chapterPart.setMetadata('label', 'chap-1');
        expectedRoot.addChildren(chapterPart);
        const textBlock1 = new TextBlock(
            false,
            {line: 5, column: 1, offset: 45},
            {line: 7, column: 39, offset: 231},
            expectedRoot,
        );
        textBlock1.addChildren(
            new TextNode(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                    ' Suspendisse at\nimperdiet felis. Donec cursus, ex sed' +
                    ' tristique varius, purus felis maximus\nlectus, a' +
                    ' sagittis nulla nibh eget ex.',
                false,
                {line: 5, column: 1, offset: 45},
                textBlock1,
            ),
        );
        expectedRoot.addChildren(textBlock1);
        const documentObject = new DocumentObject(
            'Proof',
            false,
            {line: 9, column: 1, offset: 233},
            {line: 11, column: 26, offset: 290},
            expectedRoot,
        );
        documentObject.setMetadata('author', 'Author Name');
        documentObject.setMetadata('link', 'www.example.com');
        expectedRoot.addChildren(documentObject);
        const textBlock2 = new TextBlock(
            false,
            {line: 13, column: 3, offset: 294},
            {line: 15, column: 14, offset: 442},
            documentObject,
        );
        textBlock2.addChildren(
            new TextNode(
                'Duis viverra massa vel mauris venenatis, et dapibus nisi' +
                    ' maximus. Integer sed\nmi turpis. Praesent at congue' +
                    ' eros. Sed eu erat magna.',
                false,
                {line: 13, column: 3, offset: 294},
                textBlock2,
            ),
        );
        textBlock2.setMetadata('only', 'pdf');
        documentObject.addChildren(textBlock2);
        const textBlock3 = new TextBlock(
            false,
            {line: 18, column: 3, offset: 447},
            {line: 18, column: 65, offset: 509},
            documentObject,
        );
        textBlock3.addChildren(
            new TextNode(
                'Nunc ante nulla, tincidunt ut quam ac, placerat aliquet' +
                    ' risus.',
                false,
                {line: 18, column: 3, offset: 447},
                textBlock3,
            ),
        );
        documentObject.addChildren(textBlock3);
        const textBlock4 = new TextBlock(
            false,
            {line: 21, column: 1, offset: 512},
            {line: 22, column: 13, offset: 596},
            expectedRoot,
        );
        textBlock4.addChildren(
            new TextNode(
                'Duis leo tellus, elementum iaculis diam eu, vestibulum' +
                    ' ultrices lectus.',
                false,
                {line: 21, column: 1, offset: 512},
                textBlock4,
            ),
        );
        textBlock4.setMetadata('only', 'html');
        expectedRoot.addChildren(textBlock4);

        // -- Act
        const root = parser.parse(woowooSource);

        // -- Assert
        expect(expectedRoot.equals(root)).toBeTrue();
        expect(root.parent).toBeUndefined();
        expect(allChildrenHaveCorrectParents(root)).toBeTrue();
    });

    it('Parses a WooWoo document with a document part, text blocks, and nested document objects', () => {
        // -- Arrange
        const woowooSource = `
.Chapter The First Chapter
  label: chap-1

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at
imperdiet felis. Donec cursus, ex sed tristique varius, purus felis maximus
lectus, a sagittis nulla nibh eget ex.

.Proof:
  author: 'Author Name'
  link: 'www.example.com'

  Duis viverra massa vel mauris venenatis, et dapibus nisi maximus. Integer sed
  mi turpis. Praesent at congue eros. Sed eu erat magna.


  .Table:

    Praesent at leo eu purus rutrum congue. Praesent maximus luctus laoreet.


  Nunc ante nulla, tincidunt ut quam ac, placerat aliquet risus.


  .Proof:

    Donec eget gravida felis.


Duis leo tellus, elementum iaculis diam eu, vestibulum ultrices lectus.`;
        const expectedRoot = new DocumentRoot({
            line: 30,
            column: 72,
            offset: 702,
        });
        const chapterPart = new DocumentPart(
            'Chapter',
            {line: 2, column: 1, offset: 1},
            {line: 3, column: 16, offset: 43},
            expectedRoot,
        );
        chapterPart.addChildren(
            new TextNode(
                'The First Chapter',
                false,
                {line: 2, column: 10, offset: 10},
                chapterPart,
            ),
        );
        chapterPart.setMetadata('label', 'chap-1');
        expectedRoot.addChildren(chapterPart);
        const textBlock1 = new TextBlock(
            false,
            {line: 5, column: 1, offset: 45},
            {line: 7, column: 39, offset: 231},
            expectedRoot,
        );
        textBlock1.addChildren(
            new TextNode(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                    ' Suspendisse at\nimperdiet felis. Donec cursus, ex sed' +
                    ' tristique varius, purus felis maximus\nlectus, a' +
                    ' sagittis nulla nibh eget ex.',
                false,
                {line: 5, column: 1, offset: 45},
                textBlock1,
            ),
        );
        expectedRoot.addChildren(textBlock1);
        const documentObject1 = new DocumentObject(
            'Proof',
            false,
            {line: 9, column: 1, offset: 233},
            {line: 11, column: 26, offset: 290},
            expectedRoot,
        );
        documentObject1.setMetadata('author', 'Author Name');
        documentObject1.setMetadata('link', 'www.example.com');
        expectedRoot.addChildren(documentObject1);
        const textBlock2 = new TextBlock(
            false,
            {line: 13, column: 3, offset: 294},
            {line: 14, column: 57, offset: 428},
            documentObject1,
        );
        textBlock2.addChildren(
            new TextNode(
                'Duis viverra massa vel mauris venenatis, et dapibus nisi' +
                    ' maximus. Integer sed\nmi turpis. Praesent at congue' +
                    ' eros. Sed eu erat magna.',
                false,
                {line: 13, column: 3, offset: 294},
                textBlock2,
            ),
        );
        documentObject1.addChildren(textBlock2);
        const documentObject2 = new DocumentObject(
            'Table',
            false,
            {line: 17, column: 3, offset: 433},
            {line: 17, column: 10, offset: 440},
            documentObject1,
        );
        const textBlock3 = new TextBlock(
            false,
            {line: 19, column: 5, offset: 446},
            {line: 19, column: 77, offset: 518},
            documentObject2,
        );
        textBlock3.addChildren(
            new TextNode(
                'Praesent at leo eu purus rutrum congue. Praesent maximus' +
                    ' luctus laoreet.',
                false,
                {line: 19, column: 5, offset: 446},
                textBlock3,
            ),
        );
        documentObject2.addChildren(textBlock3);
        documentObject1.addChildren(documentObject2);
        const textBlock4 = new TextBlock(
            false,
            {line: 22, column: 3, offset: 523},
            {line: 22, column: 65, offset: 585},
            documentObject1,
        );
        textBlock4.addChildren(
            new TextNode(
                'Nunc ante nulla, tincidunt ut quam ac, placerat aliquet' +
                    ' risus.',
                false,
                {line: 22, column: 3, offset: 523},
                textBlock4,
            ),
        );
        documentObject1.addChildren(textBlock4);
        const documentObject3 = new DocumentObject(
            'Proof',
            false,
            {line: 25, column: 3, offset: 590},
            {line: 25, column: 10, offset: 597},
            documentObject1,
        );
        const textBlock5 = new TextBlock(
            false,
            {line: 27, column: 5, offset: 603},
            {line: 27, column: 30, offset: 628},
            documentObject3,
        );
        textBlock5.addChildren(
            new TextNode(
                'Donec eget gravida felis.',
                false,
                {line: 27, column: 5, offset: 603},
                textBlock5,
            ),
        );
        documentObject3.addChildren(textBlock5);
        documentObject1.addChildren(documentObject3);
        const textBlock6 = new TextBlock(
            false,
            {line: 30, column: 1, offset: 631},
            {line: 30, column: 72, offset: 702},
            expectedRoot,
        );
        textBlock6.addChildren(
            new TextNode(
                'Duis leo tellus, elementum iaculis diam eu, vestibulum' +
                    ' ultrices lectus.',
                false,
                {line: 30, column: 1, offset: 631},
                textBlock6,
            ),
        );
        expectedRoot.addChildren(textBlock6);

        // -- Act
        const root = parser.parse(woowooSource);

        // -- Assert
        expect(expectedRoot.equals(root)).toBeTrue();
        expect(root.parent).toBeUndefined();
        expect(allChildrenHaveCorrectParents(root)).toBeTrue();
    });

    it('Parses a WooWoo document with a document part, text blocks, and outer environments, with each having metablocks', () => {
        // -- Arrange
        const woowooSource = `
.Chapter The First Chapter
  label: chap-1

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at
imperdiet felis. Donec cursus, ex sed tristique varius, purus felis maximus
lectus, a sagittis nulla nibh eget ex.

.quote:
  author: 'Author Name'
  link: 'www.example.com'

  Duis viverra massa vel mauris venenatis, et dapibus nisi maximus. Integer sed
  mi turpis. Praesent at congue eros. Sed eu erat magna.
    only: pdf


  Nunc ante nulla, tincidunt ut quam ac, placerat aliquet risus.


Duis leo tellus, elementum iaculis diam eu, vestibulum ultrices lectus.
  only: html`;
        const expectedRoot = new DocumentRoot({
            line: 22,
            column: 13,
            offset: 596,
        });
        const chapterPart = new DocumentPart(
            'Chapter',
            {line: 2, column: 1, offset: 1},
            {line: 3, column: 16, offset: 43},
            expectedRoot,
        );
        chapterPart.addChildren(
            new TextNode(
                'The First Chapter',
                false,
                {line: 2, column: 10, offset: 10},
                chapterPart,
            ),
        );
        chapterPart.setMetadata('label', 'chap-1');
        expectedRoot.addChildren(chapterPart);
        const textBlock1 = new TextBlock(
            false,
            {line: 5, column: 1, offset: 45},
            {line: 7, column: 39, offset: 231},
            expectedRoot,
        );
        textBlock1.addChildren(
            new TextNode(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                    ' Suspendisse at\nimperdiet felis. Donec cursus, ex sed' +
                    ' tristique varius, purus felis maximus\nlectus, a' +
                    ' sagittis nulla nibh eget ex.',
                false,
                {line: 5, column: 1, offset: 45},
                textBlock1,
            ),
        );
        expectedRoot.addChildren(textBlock1);
        const outerEnv = new OuterEnv(
            'quote',
            false,
            {line: 9, column: 1, offset: 233},
            {line: 11, column: 26, offset: 290},
            expectedRoot,
        );
        outerEnv.setMetadata('author', 'Author Name');
        outerEnv.setMetadata('link', 'www.example.com');
        expectedRoot.addChildren(outerEnv);
        const textBlock2 = new TextBlock(
            false,
            {line: 13, column: 3, offset: 294},
            {line: 15, column: 14, offset: 442},
            outerEnv,
        );
        textBlock2.addChildren(
            new TextNode(
                'Duis viverra massa vel mauris venenatis, et dapibus nisi' +
                    ' maximus. Integer sed\nmi turpis. Praesent at congue' +
                    ' eros. Sed eu erat magna.',
                false,
                {line: 13, column: 3, offset: 294},
                textBlock2,
            ),
        );
        textBlock2.setMetadata('only', 'pdf');
        outerEnv.addChildren(textBlock2);
        const textBlock3 = new TextBlock(
            false,
            {line: 18, column: 3, offset: 447},
            {line: 18, column: 65, offset: 509},
            outerEnv,
        );
        textBlock3.addChildren(
            new TextNode(
                'Nunc ante nulla, tincidunt ut quam ac, placerat aliquet' +
                    ' risus.',
                false,
                {line: 18, column: 3, offset: 447},
                textBlock3,
            ),
        );
        outerEnv.addChildren(textBlock3);
        const textBlock4 = new TextBlock(
            false,
            {line: 21, column: 1, offset: 512},
            {line: 22, column: 13, offset: 596},
            expectedRoot,
        );
        textBlock4.addChildren(
            new TextNode(
                'Duis leo tellus, elementum iaculis diam eu, vestibulum' +
                    ' ultrices lectus.',
                false,
                {line: 21, column: 1, offset: 512},
                textBlock4,
            ),
        );
        textBlock4.setMetadata('only', 'html');
        expectedRoot.addChildren(textBlock4);

        // -- Act
        const root = parser.parse(woowooSource);

        // -- Assert
        expect(expectedRoot.equals(root)).toBeTrue();
        expect(root.parent).toBeUndefined();
        expect(allChildrenHaveCorrectParents(root)).toBeTrue();
    });

    it('Parses a WooWoo document with a document part, text blocks, and nested outer environments', () => {
        // -- Arrange
        const woowooSource = `
.Chapter The First Chapter
  label: chap-1

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at
imperdiet felis. Donec cursus, ex sed tristique varius, purus felis maximus
lectus, a sagittis nulla nibh eget ex.

.quote:
  author: 'Author Name'
  link: 'www.example.com'

  Duis viverra massa vel mauris venenatis, et dapibus nisi maximus. Integer sed
  mi turpis. Praesent at congue eros. Sed eu erat magna.


  .align:

    Praesent at leo eu purus rutrum congue. Praesent maximus luctus laoreet.


  Nunc ante nulla, tincidunt ut quam ac, placerat aliquet risus.


  .quote:

    Donec eget gravida felis.


Duis leo tellus, elementum iaculis diam eu, vestibulum ultrices lectus.`;
        const expectedRoot = new DocumentRoot({
            line: 30,
            column: 72,
            offset: 702,
        });
        const chapterPart = new DocumentPart(
            'Chapter',
            {line: 2, column: 1, offset: 1},
            {line: 3, column: 16, offset: 43},
            expectedRoot,
        );
        chapterPart.addChildren(
            new TextNode(
                'The First Chapter',
                false,
                {line: 2, column: 10, offset: 10},
                chapterPart,
            ),
        );
        chapterPart.setMetadata('label', 'chap-1');
        expectedRoot.addChildren(chapterPart);
        const textBlock1 = new TextBlock(
            false,
            {line: 5, column: 1, offset: 45},
            {line: 7, column: 39, offset: 231},
            expectedRoot,
        );
        textBlock1.addChildren(
            new TextNode(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                    ' Suspendisse at\nimperdiet felis. Donec cursus, ex sed' +
                    ' tristique varius, purus felis maximus\nlectus, a' +
                    ' sagittis nulla nibh eget ex.',
                false,
                {line: 5, column: 1, offset: 45},
                textBlock1,
            ),
        );
        expectedRoot.addChildren(textBlock1);
        const outerEnv1 = new OuterEnv(
            'quote',
            false,
            {line: 9, column: 1, offset: 233},
            {line: 11, column: 26, offset: 290},
            expectedRoot,
        );
        outerEnv1.setMetadata('author', 'Author Name');
        outerEnv1.setMetadata('link', 'www.example.com');
        expectedRoot.addChildren(outerEnv1);
        const textBlock2 = new TextBlock(
            false,
            {line: 13, column: 3, offset: 294},
            {line: 14, column: 57, offset: 428},
            outerEnv1,
        );
        textBlock2.addChildren(
            new TextNode(
                'Duis viverra massa vel mauris venenatis, et dapibus nisi' +
                    ' maximus. Integer sed\nmi turpis. Praesent at congue' +
                    ' eros. Sed eu erat magna.',
                false,
                {line: 13, column: 3, offset: 294},
                textBlock2,
            ),
        );
        outerEnv1.addChildren(textBlock2);
        const outerEnv2 = new OuterEnv(
            'align',
            false,
            {line: 17, column: 3, offset: 433},
            {line: 17, column: 10, offset: 440},
            outerEnv1,
        );
        const textBlock3 = new TextBlock(
            false,
            {line: 19, column: 5, offset: 446},
            {line: 19, column: 77, offset: 518},
            outerEnv2,
        );
        textBlock3.addChildren(
            new TextNode(
                'Praesent at leo eu purus rutrum congue. Praesent maximus' +
                    ' luctus laoreet.',
                false,
                {line: 19, column: 5, offset: 446},
                textBlock3,
            ),
        );
        outerEnv2.addChildren(textBlock3);
        outerEnv1.addChildren(outerEnv2);
        const textBlock4 = new TextBlock(
            false,
            {line: 22, column: 3, offset: 523},
            {line: 22, column: 65, offset: 585},
            outerEnv1,
        );
        textBlock4.addChildren(
            new TextNode(
                'Nunc ante nulla, tincidunt ut quam ac, placerat aliquet' +
                    ' risus.',
                false,
                {line: 22, column: 3, offset: 523},
                textBlock4,
            ),
        );
        outerEnv1.addChildren(textBlock4);
        const outerEnv3 = new OuterEnv(
            'quote',
            false,
            {line: 25, column: 3, offset: 590},
            {line: 25, column: 10, offset: 597},
            outerEnv1,
        );
        const textBlock5 = new TextBlock(
            false,
            {line: 27, column: 5, offset: 603},
            {line: 27, column: 30, offset: 628},
            outerEnv3,
        );
        textBlock5.addChildren(
            new TextNode(
                'Donec eget gravida felis.',
                false,
                {line: 27, column: 5, offset: 603},
                textBlock5,
            ),
        );
        outerEnv3.addChildren(textBlock5);
        outerEnv1.addChildren(outerEnv3);
        const textBlock6 = new TextBlock(
            false,
            {line: 30, column: 1, offset: 631},
            {line: 30, column: 72, offset: 702},
            expectedRoot,
        );
        textBlock6.addChildren(
            new TextNode(
                'Duis leo tellus, elementum iaculis diam eu, vestibulum' +
                    ' ultrices lectus.',
                false,
                {line: 30, column: 1, offset: 631},
                textBlock6,
            ),
        );
        expectedRoot.addChildren(textBlock6);

        // -- Act
        const root = parser.parse(woowooSource);

        // -- Assert
        expect(expectedRoot.equals(root)).toBeTrue();
        expect(root.parent).toBeUndefined();
        expect(allChildrenHaveCorrectParents(root)).toBeTrue();
    });

    it('Parses a WooWoo document with a document part, text blocks, and fragile outer environments', () => {
        // -- Arrange
        const woowooSource = `
.Chapter The First Chapter
  label: chap-1

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at
imperdiet felis. Donec cursus, ex sed tristique varius, purus felis maximus
lectus, a sagittis nulla nibh eget ex.

!tikz:
  filename: fig-1
  options: 'o1'

  Duis viverra massa vel mauris venenatis, et dapibus nisi maximus. Integer sed
  mi turpis. Praesent at congue eros. Sed eu erat magna.


Praesent at leo eu purus rutrum congue. Praesent maximus luctus laoreet.


!tikz:

  Nunc ante nulla, tincidunt ut quam ac, placerat aliquet risus.


Duis leo tellus, elementum iaculis diam eu, vestibulum ultrices lectus.`;
        const expectedRoot = new DocumentRoot({
            line: 25,
            column: 72,
            offset: 635,
        });
        const chapterPart = new DocumentPart(
            'Chapter',
            {line: 2, column: 1, offset: 1},
            {line: 3, column: 16, offset: 43},
            expectedRoot,
        );
        chapterPart.addChildren(
            new TextNode(
                'The First Chapter',
                false,
                {line: 2, column: 10, offset: 10},
                chapterPart,
            ),
        );
        chapterPart.setMetadata('label', 'chap-1');
        expectedRoot.addChildren(chapterPart);
        const textBlock1 = new TextBlock(
            false,
            {line: 5, column: 1, offset: 45},
            {line: 7, column: 39, offset: 231},
            expectedRoot,
        );
        textBlock1.addChildren(
            new TextNode(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                    ' Suspendisse at\nimperdiet felis. Donec cursus, ex sed' +
                    ' tristique varius, purus felis maximus\nlectus, a' +
                    ' sagittis nulla nibh eget ex.',
                false,
                {line: 5, column: 1, offset: 45},
                textBlock1,
            ),
        );
        expectedRoot.addChildren(textBlock1);
        const outerEnv1 = new OuterEnv(
            'tikz',
            true,
            {line: 9, column: 1, offset: 233},
            {line: 11, column: 16, offset: 273},
            expectedRoot,
        );
        outerEnv1.setMetadata('filename', 'fig-1');
        outerEnv1.setMetadata('options', 'o1');
        const textBlock2 = new TextBlock(
            true,
            {line: 13, column: 3, offset: 277},
            {line: 14, column: 57, offset: 411},
            outerEnv1,
        );
        textBlock2.addChildren(
            new TextNode(
                'Duis viverra massa vel mauris venenatis, et dapibus nisi' +
                    ' maximus. Integer sed\nmi turpis. Praesent at congue' +
                    ' eros. Sed eu erat magna.',
                true,
                {line: 13, column: 3, offset: 277},
                textBlock2,
            ),
        );
        outerEnv1.addChildren(textBlock2);
        expectedRoot.addChildren(outerEnv1);
        const textBlock3 = new TextBlock(
            false,
            {line: 17, column: 1, offset: 414},
            {line: 17, column: 73, offset: 486},
            expectedRoot,
        );
        textBlock3.addChildren(
            new TextNode(
                'Praesent at leo eu purus rutrum congue. Praesent maximus' +
                    ' luctus laoreet.',
                false,
                {line: 17, column: 1, offset: 414},
                textBlock3,
            ),
        );
        expectedRoot.addChildren(textBlock3);
        const outerEnv2 = new OuterEnv(
            'tikz',
            true,
            {line: 20, column: 1, offset: 489},
            {line: 20, column: 7, offset: 495},
            expectedRoot,
        );
        const textBlock4 = new TextBlock(
            true,
            {line: 22, column: 3, offset: 499},
            {line: 22, column: 65, offset: 561},
            outerEnv2,
        );
        textBlock4.addChildren(
            new TextNode(
                'Nunc ante nulla, tincidunt ut quam ac, placerat aliquet' +
                    ' risus.',
                true,
                {line: 22, column: 3, offset: 499},
                textBlock4,
            ),
        );
        outerEnv2.addChildren(textBlock4);
        expectedRoot.addChildren(outerEnv2);
        const textBlock5 = new TextBlock(
            false,
            {line: 25, column: 1, offset: 564},
            {line: 25, column: 72, offset: 635},
            expectedRoot,
        );
        textBlock5.addChildren(
            new TextNode(
                'Duis leo tellus, elementum iaculis diam eu, vestibulum' +
                    ' ultrices lectus.',
                false,
                {line: 25, column: 1, offset: 564},
                textBlock5,
            ),
        );
        expectedRoot.addChildren(textBlock5);

        // -- Act
        const root = parser.parse(woowooSource);

        // -- Assert
        expect(expectedRoot.equals(root)).toBeTrue();
        expect(root.parent).toBeUndefined();
        expect(allChildrenHaveCorrectParents(root)).toBeTrue();
    });

    it('Parses a WooWoo document with a document part, text blocks, and indented blocks', () => {
        // -- Arrange
        const woowooSource = `
.Chapter The First Chapter
  label: chap-1

Lorem ipsum dolor sit amet, consectetur adipiscing elit.


  Suspendisse at imperdiet felis. Donec cursus, ex sed tristique varius, purus
  felis maximus lectus, a sagittis nulla nibh eget ex.
    only: html


  Duis viverra massa vel mauris venenatis, et dapibus nisi maximus.


Integer sed mi turpis. Praesent at congue eros. Sed eu erat magna.`;
        const expectedRoot = new DocumentRoot({
            line: 16,
            column: 67,
            offset: 391,
        });
        const chapterPart = new DocumentPart(
            'Chapter',
            {line: 2, column: 1, offset: 1},
            {line: 3, column: 16, offset: 43},
            expectedRoot,
        );
        chapterPart.addChildren(
            new TextNode(
                'The First Chapter',
                false,
                {line: 2, column: 10, offset: 10},
                chapterPart,
            ),
        );
        chapterPart.setMetadata('label', 'chap-1');
        expectedRoot.addChildren(chapterPart);
        const textBlock1 = new TextBlock(
            false,
            {line: 5, column: 1, offset: 45},
            {line: 5, column: 57, offset: 101},
            expectedRoot,
        );
        textBlock1.addChildren(
            new TextNode(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                false,
                {line: 5, column: 1, offset: 45},
                textBlock1,
            ),
        );
        expectedRoot.addChildren(textBlock1);
        const indentedBlock1 = new IndentedBlock(
            false,
            {line: 8, column: 3, offset: 106},
            {line: 10, column: 15, offset: 252},
            expectedRoot,
        );
        indentedBlock1.addChildren(
            new TextNode(
                'Suspendisse at imperdiet felis. Donec cursus, ex sed' +
                    ' tristique varius, purus\nfelis maximus lectus, a' +
                    ' sagittis nulla nibh eget ex.',
                false,
                {line: 8, column: 3, offset: 106},
                indentedBlock1,
            ),
        );
        indentedBlock1.setMetadata('only', 'html');
        expectedRoot.addChildren(indentedBlock1);
        const indentedBlock2 = new IndentedBlock(
            false,
            {line: 13, column: 3, offset: 257},
            {line: 13, column: 68, offset: 322},
            expectedRoot,
        );
        indentedBlock2.addChildren(
            new TextNode(
                'Duis viverra massa vel mauris venenatis, et dapibus nisi' +
                    ' maximus.',
                false,
                {line: 13, column: 3, offset: 257},
                indentedBlock2,
            ),
        );
        expectedRoot.addChildren(indentedBlock2);
        const textBlock2 = new TextBlock(
            false,
            {line: 16, column: 1, offset: 325},
            {line: 16, column: 67, offset: 391},
            expectedRoot,
        );
        textBlock2.addChildren(
            new TextNode(
                'Integer sed mi turpis. Praesent at congue eros. Sed eu erat' +
                    ' magna.',
                false,
                {line: 16, column: 1, offset: 325},
                textBlock2,
            ),
        );
        expectedRoot.addChildren(textBlock2);

        // -- Act
        const root = parser.parse(woowooSource);

        // -- Assert
        expect(expectedRoot.equals(root)).toBeTrue();
        expect(root.parent).toBeUndefined();
        expect(allChildrenHaveCorrectParents(root)).toBeTrue();
    });

    it('Parses a complex WooWoo document with all types of block elements', () => {
        // -- Arrange
        const woowooSource = `
.Chapter The First Chapter
  label: chap-1

Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  only: html


  Mauris nibh odio,
  porta in nulla ac,
  vehicula porttitor erat.


.Figure:
  label: fig-1

  !tikz:
    filename: file-1
    options: 'o1, o2'

    Nam volutpat lobortis ex quis lacinia.
    Aliquam vitae aliquet diam, eget consectetur leo.

  .caption:

    Proin tincidunt maximus placerat.


.Section The First Section
  label: sec-1

.quote:

  .quote:

    Nam et consectetur quam.
      only: pdf


    Cras varius ipsum non quam pretium,
    ac fringilla diam tincidunt.`;
        const expectedRoot = new DocumentRoot({
            line: 41,
            column: 33,
            offset: 598,
        });
        const chapterPart = new DocumentPart(
            'Chapter',
            {line: 2, column: 1, offset: 1},
            {line: 3, column: 16, offset: 43},
            expectedRoot,
        );
        chapterPart.addChildren(
            new TextNode(
                'The First Chapter',
                false,
                {line: 2, column: 10, offset: 10},
                chapterPart,
            ),
        );
        chapterPart.setMetadata('label', 'chap-1');
        expectedRoot.addChildren(chapterPart);
        const textBlock1 = new TextBlock(
            false,
            {line: 5, column: 1, offset: 45},
            {line: 6, column: 13, offset: 114},
            expectedRoot,
        );
        textBlock1.addChildren(
            new TextNode(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                false,
                {line: 5, column: 1, offset: 45},
                textBlock1,
            ),
        );
        textBlock1.setMetadata('only', 'html');
        expectedRoot.addChildren(textBlock1);
        const indentedBlock = new IndentedBlock(
            false,
            {line: 9, column: 3, offset: 119},
            {line: 11, column: 27, offset: 184},
            expectedRoot,
        );
        indentedBlock.addChildren(
            new TextNode(
                'Mauris nibh odio,\nporta in nulla ac,\nvehicula porttitor' +
                    ' erat.',
                false,
                {line: 9, column: 3, offset: 119},
                indentedBlock,
            ),
        );
        expectedRoot.addChildren(indentedBlock);
        const documentObject = new DocumentObject(
            'Figure',
            false,
            {line: 14, column: 1, offset: 187},
            {line: 15, column: 15, offset: 210},
            expectedRoot,
        );
        documentObject.setMetadata('label', 'fig-1');
        const outerEnv1 = new OuterEnv(
            'tikz',
            true,
            {line: 17, column: 3, offset: 214},
            {line: 19, column: 22, offset: 263},
            documentObject,
        );
        outerEnv1.setMetadata('filename', 'file-1');
        outerEnv1.setMetadata('options', 'o1, o2');
        const textBlock2 = new TextBlock(
            true,
            {line: 21, column: 5, offset: 269},
            {line: 22, column: 54, offset: 361},
            outerEnv1,
        );
        textBlock2.addChildren(
            new TextNode(
                'Nam volutpat lobortis ex quis lacinia.\nAliquam vitae' +
                    ' aliquet diam, eget consectetur leo.',
                true,
                {line: 21, column: 5, offset: 269},
                textBlock2,
            ),
        );
        outerEnv1.addChildren(textBlock2);
        documentObject.addChildren(outerEnv1);
        const outerEnv2 = new OuterEnv(
            'caption',
            false,
            {line: 24, column: 3, offset: 365},
            {line: 24, column: 12, offset: 374},
            documentObject,
        );
        const textBlock3 = new TextBlock(
            false,
            {line: 26, column: 5, offset: 380},
            {line: 26, column: 38, offset: 413},
            outerEnv2,
        );
        textBlock3.addChildren(
            new TextNode(
                'Proin tincidunt maximus placerat.',
                false,
                {line: 26, column: 5, offset: 380},
                textBlock3,
            ),
        );
        outerEnv2.addChildren(textBlock3);
        documentObject.addChildren(outerEnv2);
        expectedRoot.addChildren(documentObject);
        const sectionPart = new DocumentPart(
            'Section',
            {line: 29, column: 1, offset: 416},
            {line: 30, column: 15, offset: 457},
            expectedRoot,
        );
        sectionPart.setMetadata('label', 'sec-1');
        sectionPart.addChildren(
            new TextNode(
                'The First Section',
                false,
                {line: 29, column: 10, offset: 425},
                chapterPart,
            ),
        );
        expectedRoot.addChildren(sectionPart);
        const outerEnv3 = new OuterEnv(
            'quote',
            false,
            {line: 32, column: 1, offset: 459},
            {line: 32, column: 8, offset: 466},
            documentObject,
        );
        const outerEnv4 = new OuterEnv(
            'quote',
            false,
            {line: 34, column: 3, offset: 470},
            {line: 34, column: 10, offset: 477},
            outerEnv3,
        );
        const textBlock4 = new TextBlock(
            false,
            {line: 36, column: 5, offset: 483},
            {line: 37, column: 16, offset: 523},
            outerEnv4,
        );
        textBlock4.setMetadata('only', 'pdf');
        textBlock4.addChildren(
            new TextNode(
                'Nam et consectetur quam.',
                false,
                {line: 36, column: 5, offset: 483},
                textBlock4,
            ),
        );
        outerEnv4.addChildren(textBlock4);
        const textBlock5 = new TextBlock(
            false,
            {line: 40, column: 5, offset: 530},
            {line: 41, column: 33, offset: 598},
            outerEnv4,
        );
        textBlock5.addChildren(
            new TextNode(
                'Cras varius ipsum non quam pretium,\nac fringilla diam' +
                    ' tincidunt.',
                false,
                {line: 40, column: 5, offset: 530},
                textBlock5,
            ),
        );
        outerEnv4.addChildren(textBlock5);
        outerEnv3.addChildren(outerEnv4);
        expectedRoot.addChildren(outerEnv3);

        // -- Act
        const root = parser.parse(woowooSource);

        // -- Assert
        expect(expectedRoot.equals(root)).toBeTrue();
        expect(root.parent).toBeUndefined();
        expect(allChildrenHaveCorrectParents(root)).toBeTrue();
    });

    it('Parses a complex WooWoo document with all types of elements', () => {
        // -- Arrange
        const woowooSource = `
%% A comment
  % Also a comment

.Chapter The First Chapter % Not a comment
  label: chap-1

Lorem ipsum dolor sit amet, consectetur adipiscing elit. % Also not a comment
  only: html


  Mauris nibh odio,
  porta in nulla ac,
  vehicula porttitor erat.


.Figure:
  label: fig-1

  !tikz:
    filename: file-1
    options: 'o1, o2'

    % Not a comment
    Nam volutpat lobortis ex quis .quoted:lacinia.
    Aliquam vitae "aliquet".quoted diam, eget consectetur leo.

  % A comment

  .caption:

    Proin tincidunt .quoted:maximus placerat.


.Section The First Section
  label: sec-1

.quote:

  .quote:

    Nam "et consectetur".emphasize quam.
      only: pdf


    Cras "varius"#sec-1 "ipsum".1 "non".notion.2 "quam"@3 pretium,
    ac $fringilla diam$ tincidunt.`;
        const expectedRoot = new DocumentRoot({
            line: 47,
            column: 35,
            offset: 769,
        });
        const chapterPart = new DocumentPart(
            'Chapter',
            {line: 5, column: 1, offset: 34},
            {line: 6, column: 16, offset: 92},
            expectedRoot,
        );
        chapterPart.addChildren(
            new TextNode(
                'The First Chapter % Not a comment',
                false,
                {line: 5, column: 10, offset: 43},
                chapterPart,
            ),
        );
        chapterPart.setMetadata('label', 'chap-1');
        expectedRoot.addChildren(chapterPart);
        const textBlock1 = new TextBlock(
            false,
            {line: 8, column: 1, offset: 94},
            {line: 9, column: 13, offset: 184},
            expectedRoot,
        );
        textBlock1.addChildren(
            new TextNode(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                    ' % Also not a comment',
                false,
                {line: 8, column: 1, offset: 94},
                textBlock1,
            ),
        );
        textBlock1.setMetadata('only', 'html');
        expectedRoot.addChildren(textBlock1);
        const indentedBlock = new IndentedBlock(
            false,
            {line: 12, column: 3, offset: 189},
            {line: 14, column: 27, offset: 254},
            expectedRoot,
        );
        indentedBlock.addChildren(
            new TextNode(
                'Mauris nibh odio,\nporta in nulla ac,\nvehicula porttitor' +
                    ' erat.',
                false,
                {line: 12, column: 3, offset: 189},
                indentedBlock,
            ),
        );
        expectedRoot.addChildren(indentedBlock);
        const documentObject = new DocumentObject(
            'Figure',
            false,
            {line: 17, column: 1, offset: 257},
            {line: 18, column: 15, offset: 280},
            expectedRoot,
        );
        documentObject.setMetadata('label', 'fig-1');
        const outerEnv1 = new OuterEnv(
            'tikz',
            true,
            {line: 20, column: 3, offset: 284},
            {line: 22, column: 22, offset: 333},
            documentObject,
        );
        outerEnv1.setMetadata('filename', 'file-1');
        outerEnv1.setMetadata('options', 'o1, o2');
        const textBlock2 = new TextBlock(
            true,
            {line: 24, column: 5, offset: 339},
            {line: 26, column: 63, offset: 468},
            outerEnv1,
        );
        textBlock2.addChildren(
            new TextNode(
                '% Not a comment\nNam volutpat lobortis ex quis' +
                    ' .quoted:lacinia.\nAliquam vitae "aliquet".quoted diam,' +
                    ' eget consectetur leo.',
                true,
                {line: 24, column: 5, offset: 339},
                textBlock2,
            ),
        );
        outerEnv1.addChildren(textBlock2);
        documentObject.addChildren(outerEnv1);
        const outerEnv2 = new OuterEnv(
            'caption',
            false,
            {line: 30, column: 3, offset: 487},
            {line: 30, column: 12, offset: 496},
            documentObject,
        );
        const textBlock3 = new TextBlock(
            false,
            {line: 32, column: 5, offset: 502},
            {line: 32, column: 46, offset: 543},
            outerEnv2,
        );
        const innerEnv1 = new InnerEnv(
            'quoted',
            false,
            {line: 32, column: 21, offset: 518},
            {line: 32, column: 36, offset: 533},
            textBlock3,
        );
        innerEnv1.addChildren(
            new TextNode(
                'maximus',
                false,
                {line: 32, column: 29, offset: 526},
                innerEnv1,
            ),
        );
        textBlock3.addChildren(
            new TextNode(
                'Proin tincidunt ',
                false,
                {line: 32, column: 5, offset: 502},
                textBlock3,
            ),
            innerEnv1,
            new TextNode(
                ' placerat.',
                false,
                {line: 32, column: 36, offset: 533},
                textBlock3,
            ),
        );
        outerEnv2.addChildren(textBlock3);
        documentObject.addChildren(outerEnv2);
        expectedRoot.addChildren(documentObject);
        const sectionPart = new DocumentPart(
            'Section',
            {line: 35, column: 1, offset: 546},
            {line: 36, column: 15, offset: 587},
            expectedRoot,
        );
        sectionPart.setMetadata('label', 'sec-1');
        sectionPart.addChildren(
            new TextNode(
                'The First Section',
                false,
                {line: 35, column: 10, offset: 555},
                chapterPart,
            ),
        );
        expectedRoot.addChildren(sectionPart);
        const outerEnv3 = new OuterEnv(
            'quote',
            false,
            {line: 38, column: 1, offset: 589},
            {line: 38, column: 8, offset: 596},
            documentObject,
        );
        const outerEnv4 = new OuterEnv(
            'quote',
            false,
            {line: 40, column: 3, offset: 600},
            {line: 40, column: 10, offset: 607},
            outerEnv3,
        );
        const textBlock4 = new TextBlock(
            false,
            {line: 42, column: 5, offset: 613},
            {line: 43, column: 16, offset: 665},
            outerEnv4,
        );
        textBlock4.setMetadata('only', 'pdf');
        const innerEnv2 = new InnerEnv(
            'emphasize',
            false,
            {line: 42, column: 9, offset: 617},
            {line: 42, column: 35, offset: 643},
            textBlock4,
        );
        innerEnv2.addChildren(
            new TextNode(
                'et consectetur',
                false,
                {line: 42, column: 10, offset: 618},
                textBlock4,
            ),
        );
        textBlock4.addChildren(
            new TextNode(
                'Nam ',
                false,
                {line: 42, column: 5, offset: 613},
                textBlock4,
            ),
            innerEnv2,
            new TextNode(
                ' quam.',
                false,
                {line: 42, column: 35, offset: 643},
                textBlock4,
            ),
        );
        outerEnv4.addChildren(textBlock4);
        const textBlock5 = new TextBlock(
            false,
            {line: 46, column: 5, offset: 672},
            {line: 47, column: 35, offset: 769},
            outerEnv4,
        );
        const innerEnv3 = new InnerEnv(
            '_reference',
            false,
            {line: 46, column: 10, offset: 677},
            {line: 46, column: 24, offset: 691},
            textBlock5,
        );
        innerEnv3.setMetadata('_reference', 'sec-1');
        innerEnv3.addChildren(
            new TextNode(
                'varius',
                false,
                {line: 46, column: 11, offset: 678},
                textBlock5,
            ),
        );
        const innerEnv4 = new InnerEnv(
            '_index',
            false,
            {line: 46, column: 25, offset: 692},
            {line: 46, column: 34, offset: 701},
            textBlock5,
        );
        innerEnv4.setMetadata('_index', '1');
        innerEnv4.addChildren(
            new TextNode(
                'ipsum',
                false,
                {line: 46, column: 26, offset: 693},
                textBlock5,
            ),
        );
        const innerEnv5 = new InnerEnv(
            'notion',
            false,
            {line: 46, column: 35, offset: 702},
            {line: 46, column: 49, offset: 716},
            textBlock5,
        );
        innerEnv5.setMetadata('_index', '2');
        innerEnv5.addChildren(
            new TextNode(
                'non',
                false,
                {line: 46, column: 36, offset: 703},
                textBlock5,
            ),
        );
        const innerEnv6 = new InnerEnv(
            '_index',
            false,
            {line: 46, column: 50, offset: 717},
            {line: 46, column: 58, offset: 725},
            textBlock5,
        );
        innerEnv6.setMetadata('_index', '3');
        innerEnv6.addChildren(
            new TextNode(
                'quam',
                false,
                {line: 46, column: 51, offset: 718},
                textBlock5,
            ),
        );
        const inlineMath = new InlineMath(
            true,
            {line: 47, column: 8, offset: 742},
            {line: 47, column: 24, offset: 758},
            textBlock5,
        );
        inlineMath.addChildren(
            new TextNode(
                'fringilla diam',
                true,
                {line: 47, column: 9, offset: 743},
                textBlock5,
            ),
        );
        textBlock5.addChildren(
            new TextNode(
                'Cras ',
                false,
                {line: 46, column: 5, offset: 672},
                textBlock5,
            ),
            innerEnv3,
            new TextNode(
                ' ',
                false,
                {line: 46, column: 24, offset: 691},
                textBlock5,
            ),
            innerEnv4,
            new TextNode(
                ' ',
                false,
                {line: 46, column: 34, offset: 701},
                textBlock5,
            ),
            innerEnv5,
            new TextNode(
                ' ',
                false,
                {line: 46, column: 49, offset: 716},
                textBlock5,
            ),
            innerEnv6,
            new TextNode(
                ' pretium,\nac ',
                false,
                {line: 46, column: 58, offset: 725},
                textBlock5,
            ),
            inlineMath,
            new TextNode(
                ' tincidunt.',
                false,
                {line: 47, column: 24, offset: 758},
                textBlock5,
            ),
        );
        outerEnv4.addChildren(textBlock5);
        outerEnv3.addChildren(outerEnv4);
        expectedRoot.addChildren(outerEnv3);

        // -- Act
        const root = parser.parse(woowooSource);

        // -- Assert
        expect(expectedRoot.equals(root)).toBeTrue();
        expect(root.parent).toBeUndefined();
        expect(allChildrenHaveCorrectParents(root)).toBeTrue();
    });
});
