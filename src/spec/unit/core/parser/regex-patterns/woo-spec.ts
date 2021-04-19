import {
    yamlMetablock,
    documentPart,
    documentObject,
    outerEnv,
    fragileOuterEnv,
    shortInnerEnv,
    verboseInnerEnvEnd,
    verboseIndexInnerEnvEnd,
    inlineMath,
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

describe('documentObject', () => {
    it('Matches a simple document object', () => {
        // -- Arrange
        const regex = new RegExp(documentObject);
        const input = '.Theorem:';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(3);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('Theorem');
        expect(match[2]).toBeUndefined();
    });

    it('Matches a simple LF terminated document object', () => {
        // -- Arrange
        const regex = new RegExp(documentObject);
        const input = '.Theorem:\n';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(3);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('Theorem');
        expect(match[2]).toBeUndefined();
    });

    it('Matches a simple CRLF terminated document object', () => {
        // -- Arrange
        const regex = new RegExp(documentObject);
        const input = '.Theorem:\r\n';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(3);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('Theorem');
        expect(match[2]).toBeUndefined();
    });

    it('Matches a simple document object with a simple metablock with closing newline', () => {
        // -- Arrange
        const regex = new RegExp(documentObject);
        const input = '.Theorem:\n  label: thm-1\n';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(3);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('Theorem');
        expect(match[2]).toBe('  label: thm-1\n');
    });

    it('Matches a simple document object with a simple metablock without closing newline', () => {
        // -- Arrange
        const regex = new RegExp(documentObject);
        const input = '.Theorem:\n  label: thm-1';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(3);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('Theorem');
        expect(match[2]).toBe('  label: thm-1');
    });

    it('Matches a simple indented document object', () => {
        // -- Arrange
        const regex = new RegExp(documentObject);
        const input = '  .Theorem:';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(3);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('Theorem');
        expect(match[2]).toBeUndefined();
    });

    it('Does NOT match a document object with lowercase variant', () => {
        // -- Arrange
        const regex = new RegExp(documentObject);
        const input = '.theorem:';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });

    it('Does NOT match a document object without the leading dot', () => {
        // -- Arrange
        const regex = new RegExp(documentObject);
        const input = 'Theorem:';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });

    it('Does NOT match a document object with an excl. mark in place of the leading dot', () => {
        // -- Arrange
        const regex = new RegExp(documentObject);
        const input = '!Theorem:';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });
});

describe('outerEnv', () => {
    it('Matches a simple outer environment', () => {
        // -- Arrange
        const regex = new RegExp(outerEnv);
        const input = '.align:';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(3);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('align');
        expect(match[2]).toBeUndefined();
    });

    it('Matches a simple LF terminated outer environment', () => {
        // -- Arrange
        const regex = new RegExp(outerEnv);
        const input = '.align:\n';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(3);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('align');
        expect(match[2]).toBeUndefined();
    });

    it('Matches a simple CRLF terminated outer environment', () => {
        // -- Arrange
        const regex = new RegExp(outerEnv);
        const input = '.align:\r\n';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(3);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('align');
        expect(match[2]).toBeUndefined();
    });

    it('Matches a simple outer environment with a simple metablock with closing newline', () => {
        // -- Arrange
        const regex = new RegExp(outerEnv);
        const input = '.align:\n  label: aln-1\n';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(3);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('align');
        expect(match[2]).toBe('  label: aln-1\n');
    });

    it('Matches a simple outer environment with a simple metablock without closing newline', () => {
        // -- Arrange
        const regex = new RegExp(outerEnv);
        const input = '.align:\n  label: aln-1';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(3);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('align');
        expect(match[2]).toBe('  label: aln-1');
    });

    it('Matches a simple indented outer environment', () => {
        // -- Arrange
        const regex = new RegExp(outerEnv);
        const input = '  .align:';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(3);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('align');
        expect(match[2]).toBeUndefined();
    });

    it('Does NOT match an outer environment with uppercase variant', () => {
        // -- Arrange
        const regex = new RegExp(outerEnv);
        const input = '.Align:';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });

    it('Does NOT match an outer environment without the leading dot', () => {
        // -- Arrange
        const regex = new RegExp(outerEnv);
        const input = 'align:';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });

    it('Does NOT match an outer environment with an excl. mark in place of the leading dot', () => {
        // -- Arrange
        const regex = new RegExp(outerEnv);
        const input = '!align:';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });
});

describe('fragileOuterEnv', () => {
    it('Matches a simple fragile outer environment', () => {
        // -- Arrange
        const regex = new RegExp(fragileOuterEnv);
        const input = '!tikz:';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(3);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('tikz');
        expect(match[2]).toBeUndefined();
    });

    it('Matches a simple LF terminated fragile outer environment', () => {
        // -- Arrange
        const regex = new RegExp(fragileOuterEnv);
        const input = '!tikz:\n';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(3);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('tikz');
        expect(match[2]).toBeUndefined();
    });

    it('Matches a simple CRLF terminated fragile outer environment', () => {
        // -- Arrange
        const regex = new RegExp(fragileOuterEnv);
        const input = '!tikz:\r\n';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(3);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('tikz');
        expect(match[2]).toBeUndefined();
    });

    it('Matches a simple fragile outer environment with a simple metablock with closing newline', () => {
        // -- Arrange
        const regex = new RegExp(fragileOuterEnv);
        const input = '!tikz:\n  label: tkz-1\n';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(3);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('tikz');
        expect(match[2]).toBe('  label: tkz-1\n');
    });

    it('Matches a simple fragile outer environment with a simple metablock without closing newline', () => {
        // -- Arrange
        const regex = new RegExp(fragileOuterEnv);
        const input = '!tikz:\n  label: tkz-1';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(3);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('tikz');
        expect(match[2]).toBe('  label: tkz-1');
    });

    it('Matches a simple indented fragile outer environment', () => {
        // -- Arrange
        const regex = new RegExp(fragileOuterEnv);
        const input = '  !tikz:';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(3);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('tikz');
        expect(match[2]).toBeUndefined();
    });

    it('Does NOT match a fragile outer environment with uppercase variant', () => {
        // -- Arrange
        const regex = new RegExp(fragileOuterEnv);
        const input = '!Tikz:';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });

    it('Does NOT match a fragile outer environment without the leading dot', () => {
        // -- Arrange
        const regex = new RegExp(fragileOuterEnv);
        const input = 'tikz:';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });

    it('Does NOT match a fragile outer environment with a dot in place of the leading excl. mark', () => {
        // -- Arrange
        const regex = new RegExp(fragileOuterEnv);
        const input = '.tikz:';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });
});

describe('shortInnerEnv', () => {
    it('Matches a simple short inner environment (#1)', () => {
        // -- Arrange
        const regex = new RegExp(shortInnerEnv);
        const input = '.quoted:abc';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(4);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('.quoted:');
        expect(match[2]).toBe('quoted');
        expect(match[3]).toBe('abc');
    });

    it('Matches a simple short inner environment (#2)', () => {
        // -- Arrange
        const regex = new RegExp(shortInnerEnv);
        const input = '.quoted:abc-def-1';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(4);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('.quoted:');
        expect(match[2]).toBe('quoted');
        expect(match[3]).toBe('abc-def-1');
    });

    it('Does NOT match a short inner environment with uppercase variant', () => {
        // -- Arrange
        const regex = new RegExp(shortInnerEnv);
        const input = '.Quoted:abc';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });

    it('Does NOT match a short inner environment without the leading dot', () => {
        // -- Arrange
        const regex = new RegExp(shortInnerEnv);
        const input = 'quoted:abc';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });

    it('Does NOT match a short inner environment without a correct separator', () => {
        // -- Arrange
        const regex = new RegExp(shortInnerEnv);
        const input = '.quoted;abc';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });
});

describe('verboseInnerEnvEnd', () => {
    it('Matches a simple basic type verbose inner environment ending', () => {
        // -- Arrange
        const regex = new RegExp(verboseInnerEnvEnd);
        const input = '".quoted';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(4);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('.');
        expect(match[2]).toBe('quoted');
        expect(match[3]).toBeUndefined();
    });

    it('Matches a simple reference type verbose inner environment ending (#1)', () => {
        // -- Arrange
        const regex = new RegExp(verboseInnerEnvEnd);
        const input = '"#fig';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(4);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('#');
        expect(match[2]).toBe('fig');
        expect(match[3]).toBeUndefined();
    });

    it('Matches a simple reference type verbose inner environment ending (#2)', () => {
        // -- Arrange
        const regex = new RegExp(verboseInnerEnvEnd);
        const input = '"#fig-a-1';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(4);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('#');
        expect(match[2]).toBe('fig-a-1');
        expect(match[3]).toBeUndefined();
    });

    it('Matches a simple basic type verbose inner environment ending with an index', () => {
        // -- Arrange
        const regex = new RegExp(verboseInnerEnvEnd);
        const input = '".quoted.1';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(4);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('.');
        expect(match[2]).toBe('quoted');
        expect(match[3]).toBe('1');
    });

    it('Matches a simple reference type verbose inner environment ending with an index', () => {
        // -- Arrange
        const regex = new RegExp(verboseInnerEnvEnd);
        const input = '"#fig-1.23';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(4);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('#');
        expect(match[2]).toBe('fig-1');
        expect(match[3]).toBe('23');
    });

    it('Does NOT match a simple basic type verbose inner environment ending with uppercase variant', () => {
        // -- Arrange
        const regex = new RegExp(verboseInnerEnvEnd);
        const input = '".Quoted';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });

    it('Does NOT match a simple basic type verbose inner environment ending without the leading quotation mark', () => {
        // -- Arrange
        const regex = new RegExp(verboseInnerEnvEnd);
        const input = '.Quoted';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });

    it('Does NOT match a simple basic type verbose inner environment ending with uppercase variant', () => {
        // -- Arrange
        const regex = new RegExp(verboseInnerEnvEnd);
        const input = '".Quoted';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });

    it('Does NOT match a simple basic type verbose inner environment ending without a correct separator', () => {
        // -- Arrange
        const regex = new RegExp(verboseInnerEnvEnd);
        const input = '!;quoted';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });
});

describe('verboseIndexInnerEnvEnd', () => {
    it('Matches a simple index type verbose inner environment ending (#1)', () => {
        // -- Arrange
        const regex = new RegExp(verboseIndexInnerEnvEnd);
        const input = '"@1';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(2);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('1');
    });

    it('Matches a simple index type verbose inner environment ending (#2)', () => {
        // -- Arrange
        const regex = new RegExp(verboseIndexInnerEnvEnd);
        const input = '"@23';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(2);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('23');
    });

    it('Matches a simple index type verbose inner environment ending (#3)', () => {
        // -- Arrange
        const regex = new RegExp(verboseIndexInnerEnvEnd);
        const input = '".12';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(2);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('12');
    });

    it('Does NOT match an index type verbose inner environment ending with non-digit index', () => {
        // -- Arrange
        const regex = new RegExp(verboseIndexInnerEnvEnd);
        const input = '"@a';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });

    it('Does NOT match an index type verbose inner environment ending without the leading quotation mark', () => {
        // -- Arrange
        const regex = new RegExp(verboseIndexInnerEnvEnd);
        const input = '@1';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });

    it('Does NOT match an index type verbose inner environment ending without a correct separator', () => {
        // -- Arrange
        const regex = new RegExp(verboseIndexInnerEnvEnd);
        const input = '"!1';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });
});

describe('inlineMath', () => {
    it('Matches a simple inlineMath element', () => {
        // -- Arrange
        const regex = new RegExp(inlineMath);
        const input = '$abc def 123 .*-$';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(2);
        expect(match[0]).toBe(input);
        expect(match[1]).toBe('abc def 123 .*-');
    });

    it('Matches an inline math element closing properly where there are multiple dollar signs', () => {
        // -- Arrange
        const regex = new RegExp(inlineMath);
        const input = '$abc $ def$';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(2);
        expect(match[0]).toBe('$abc $');
        expect(match[1]).toBe('abc ');
    });

    it('Does NOT match an inlineMath element without the opening dollar sign', () => {
        // -- Arrange
        const regex = new RegExp(inlineMath);
        const input = 'abc$';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });

    it('Does NOT match an inlineMath element without the closing dollar sign', () => {
        // -- Arrange
        const regex = new RegExp(inlineMath);
        const input = '$abc';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).toBeNull();
    });
});
