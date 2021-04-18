import {ASTNodePosition} from '../../../../lib/core/ast/ast-node-position';

describe('ASTNodePosition', () => {
    describe('getEnd', () => {
        it('Gets the end position of a given one-line text', () => {
            // -- Arrange
            const start = new ASTNodePosition(1, 2, 3);
            const text = 'Lorem ipsum dolor sit amet.';

            // -- Act
            const end = ASTNodePosition.getEnd(start, text);

            // -- Assert
            expect(end.line).toEqual(1);
            expect(end.column).toEqual(29);
            expect(end.offset).toEqual(30);
        });

        it('Gets the end position of a given two-line LF text', () => {
            // -- Arrange
            const start = new ASTNodePosition(1, 2, 3);
            const text = 'Lorem ipsum dolor\nsit amet.';

            // -- Act
            const end = ASTNodePosition.getEnd(start, text);

            // -- Assert
            expect(end.line).toEqual(2);
            expect(end.column).toEqual(10);
            expect(end.offset).toEqual(30);
        });

        it('Gets the end position of a given two-line CRLF text', () => {
            // -- Arrange
            const start = new ASTNodePosition(1, 2, 3);
            const text = 'Lorem ipsum dolor\r\nsit amet.';

            // -- Act
            const end = ASTNodePosition.getEnd(start, text);

            // -- Assert
            expect(end.line).toEqual(2);
            expect(end.column).toEqual(10);
            expect(end.offset).toEqual(31);
        });

        it('Gets the end position of a given multiline LF text', () => {
            // -- Arrange
            const start = new ASTNodePosition(1, 2, 3);
            const text = 'Lorem\nipsum\ndolor\nsit\namet.';

            // -- Act
            const end = ASTNodePosition.getEnd(start, text);

            // -- Assert
            expect(end.line).toEqual(5);
            expect(end.column).toEqual(6);
            expect(end.offset).toEqual(30);
        });

        it('Gets the end position of a given multiline LF text ending with a newline', () => {
            // -- Arrange
            const start = new ASTNodePosition(1, 2, 3);
            const text = 'Lorem\nipsum\ndolor\nsit\namet.\n';

            // -- Act
            const end = ASTNodePosition.getEnd(start, text);

            // -- Assert
            expect(end.line).toEqual(6);
            expect(end.column).toEqual(1);
            expect(end.offset).toEqual(31);
        });

        it('Gets the end position of a given empty text', () => {
            // -- Arrange
            const start = new ASTNodePosition(1, 2, 3);
            const text = '';

            // -- Act
            const end = ASTNodePosition.getEnd(start, text);

            // -- Assert
            expect(end.line).toEqual(1);
            expect(end.column).toEqual(2);
            expect(end.offset).toEqual(3);
        });

        it('Gets the end position of a given text containing only a newline', () => {
            // -- Arrange
            const start = new ASTNodePosition(1, 2, 3);
            const text = '\n';

            // -- Act
            const end = ASTNodePosition.getEnd(start, text);

            // -- Assert
            expect(end.line).toEqual(2);
            expect(end.column).toEqual(1);
            expect(end.offset).toEqual(4);
        });
    });

    describe('copy constructor', () => {
        it('Creates a copy of a source ASTNodePosition object', () => {
            // -- Arrange
            const source = new ASTNodePosition(1, 2, 3);

            // -- Act
            const copy = new ASTNodePosition(source);
            copy.line += 10;
            copy.column += 10;
            copy.offset += 10;

            // -- Assert
            expect(source.line).toEqual(1);
            expect(source.column).toEqual(2);
            expect(source.offset).toEqual(3);
            expect(copy.line).toEqual(11);
            expect(copy.column).toEqual(12);
            expect(copy.offset).toEqual(13);
        });

        it('Creates a copy of a source ASTNodePosition-compatible object', () => {
            // -- Arrange
            const source = {line: 1, column: 2, offset: 3};

            // -- Act
            const copy = new ASTNodePosition(source);
            copy.line += 10;
            copy.column += 10;
            copy.offset += 10;

            // -- Assert
            expect(source.line).toEqual(1);
            expect(source.column).toEqual(2);
            expect(source.offset).toEqual(3);
            expect(copy.line).toEqual(11);
            expect(copy.column).toEqual(12);
            expect(copy.offset).toEqual(13);
        });
    });
});
