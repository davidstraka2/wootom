import {
    yamlMetablock,
    documentPart,
} from '../../../../../lib/core/parser/regex-patterns/woo';

describe('yamlMetablock', () => {
    it('Matches a single metablock item exactly', () => {
        // -- Arrange
        const regex = new RegExp(yamlMetablock);
        const input = '  label: chap-1';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(1);
        expect(match[0]).toBe(input);
    });

    it('Matches a single LF terminated metablock item exactly', () => {
        // -- Arrange
        const regex = new RegExp(yamlMetablock);
        const input = '  label: chap-1\n';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(1);
        expect(match[0]).toBe(input);
    });

    it('Matches a single CRLF terminated metablock item exactly', () => {
        // -- Arrange
        const regex = new RegExp(yamlMetablock);
        const input = '  label: chap-1\r\n';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(1);
        expect(match[0]).toBe(input);
    });

    it('Matches a multiline/multitem metablock with closing newline using exactly', () => {
        // -- Arrange
        const regex = new RegExp(yamlMetablock);
        const input = '  label: chap-1\n  1:\n    index: id\n';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(1);
        expect(match[0]).toBe(input);
    });

    it('Matches a multiline/multitem metablock without closing newline using exactly', () => {
        // -- Arrange
        const regex = new RegExp(yamlMetablock);
        const input = '  label: chap-1\n  1:\n    index: id';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(1);
        expect(match[0]).toBe(input);
    });

    it('Does NOT match a simple metablock without any leading whitespace', () => {
        // -- Arrange
        const regex = new RegExp(yamlMetablock);
        const input = 'label: chap-1';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });
});

describe('documentPart', () => {
    it('Matches a simple document part', () => {
        // -- Arrange
        const regex = new RegExp(documentPart);
        const input = '.Chapter 1st chapter';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(5);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('.Chapter ');
        expect(match[2]).toBe('Chapter');
        expect(match[3]).toBe('1st chapter');
        expect(match[4]).toBeUndefined();
    });

    it('Matches a simple LF terminated document part', () => {
        // -- Arrange
        const regex = new RegExp(documentPart);
        const input = '.Chapter 1st chapter\n';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(5);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('.Chapter ');
        expect(match[2]).toBe('Chapter');
        expect(match[3]).toBe('1st chapter');
        expect(match[4]).toBeUndefined();
    });

    it('Matches a simple CRLF terminated document part', () => {
        // -- Arrange
        const regex = new RegExp(documentPart);
        const input = '.Chapter 1st chapter\r\n';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(5);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('.Chapter ');
        expect(match[2]).toBe('Chapter');
        expect(match[3]).toBe('1st chapter');
        expect(match[4]).toBeUndefined();
    });

    it('Matches a simple document part with a simple metablock with closing newline', () => {
        // -- Arrange
        const regex = new RegExp(documentPart);
        const input = '.Chapter 1st chapter\n  label: chap-1\n';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(5);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('.Chapter ');
        expect(match[2]).toBe('Chapter');
        expect(match[3]).toBe('1st chapter');
        expect(match[4]).toBe('  label: chap-1\n');
    });

    it('Matches a simple document part with a simple metablock without closing newline', () => {
        // -- Arrange
        const regex = new RegExp(documentPart);
        const input = '.Chapter 1st chapter\n  label: chap-1';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(5);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('.Chapter ');
        expect(match[2]).toBe('Chapter');
        expect(match[3]).toBe('1st chapter');
        expect(match[4]).toBe('  label: chap-1');
    });

    it('Does NOT match an indented document part', () => {
        // -- Arrange
        const regex = new RegExp(documentPart);
        const input = '  .Chapter 1st chapter';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });

    it('Does NOT match a document part with lowercase variant', () => {
        // -- Arrange
        const regex = new RegExp(documentPart);
        const input = '.chapter 1st chapter';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });

    it('Does NOT match a document part without the leading dot', () => {
        // -- Arrange
        const regex = new RegExp(documentPart);
        const input = 'Chapter 1st chapter';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });
});
