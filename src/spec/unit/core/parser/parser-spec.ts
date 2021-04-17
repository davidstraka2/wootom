import {ASTNode} from '../../../../lib/core/ast/ast-node';
import {DocumentPart} from '../../../../lib/core/ast/document-part';
import {DocumentRoot} from '../../../../lib/core/ast/document-root';
import {TextBlock} from '../../../../lib/core/ast/text-block';
import {TextNode} from '../../../../lib/core/ast/text-node';
import {Parser} from '../../../../lib/core/parser/parser';

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

    it('parses a simple WooWoo document with document parts, blocks, and metablocks', () => {
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
});
