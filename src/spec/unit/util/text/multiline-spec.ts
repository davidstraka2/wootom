import {
    countLines,
    getLastLine,
    getEndingNewlineLength,
    getEndingNewline,
    trimEndingNewline,
    trimIndentation,
} from '../../../../lib/util/text/multiline';

describe('countLines', () => {
    it('Counts the lines of a one-line string', () => {
        // -- Arrange
        const input = 'Lorem ipsum dolor sit amet.';

        // -- Act
        const linecount = countLines(input);

        // -- Assert
        expect(linecount).toEqual(1);
    });

    it('Counts the lines of a two-line LF string', () => {
        // -- Arrange
        const input = 'Lorem ipsum dolor\nsit amet.';

        // -- Act
        const linecount = countLines(input);

        // -- Assert
        expect(linecount).toEqual(2);
    });

    it('Counts the lines of a two-line CRLF string', () => {
        // -- Arrange
        const input = 'Lorem ipsum dolor\r\nsit amet.';

        // -- Act
        const linecount = countLines(input);

        // -- Assert
        expect(linecount).toEqual(2);
    });

    it('Counts the lines of a multiline LF string', () => {
        // -- Arrange
        const input = 'Lorem\nipsum\ndolor\nsit\namet.';

        // -- Act
        const linecount = countLines(input);

        // -- Assert
        expect(linecount).toEqual(5);
    });

    it('Counts the lines of a multiline LF string ending with a newline', () => {
        // -- Arrange
        const input = 'Lorem\nipsum\ndolor\nsit\namet.\n';

        // -- Act
        const linecount = countLines(input);

        // -- Assert
        expect(linecount).toEqual(6);
    });

    it('Counts the lines of an empty string', () => {
        // -- Arrange
        const input = '';

        // -- Act
        const linecount = countLines(input);

        // -- Assert
        expect(linecount).toEqual(1);
    });

    it('Counts the lines of a string containing only a newline', () => {
        // -- Arrange
        const input = '\n';

        // -- Act
        const linecount = countLines(input);

        // -- Assert
        expect(linecount).toEqual(2);
    });
});

describe('getLastLine', () => {
    it('Gets the last line of a one-line string', () => {
        // -- Arrange
        const input = 'Lorem ipsum dolor sit amet.';

        // -- Act
        const lastLine = getLastLine(input);

        // -- Assert
        expect(lastLine).toEqual(input);
    });

    it('Gets the last line of a two-line LF string', () => {
        // -- Arrange
        const input = 'Lorem ipsum dolor\nsit amet.';

        // -- Act
        const lastLine = getLastLine(input);

        // -- Assert
        expect(lastLine).toEqual('sit amet.');
    });

    it('Gets the last line of a two-line CRLF string', () => {
        // -- Arrange
        const input = 'Lorem ipsum dolor\r\nsit amet.';

        // -- Act
        const lastLine = getLastLine(input);

        // -- Assert
        expect(lastLine).toEqual('sit amet.');
    });

    it('Gets the last line of a multiline LF string', () => {
        // -- Arrange
        const input = 'Lorem\nipsum\ndolor\nsit\namet.';

        // -- Act
        const lastLine = getLastLine(input);

        // -- Assert
        expect(lastLine).toEqual('amet.');
    });

    it('Gets the last line of a multiline LF string ending with a newline', () => {
        // -- Arrange
        const input = 'Lorem\nipsum\ndolor\nsit\namet.\n';

        // -- Act
        const lastLine = getLastLine(input);

        // -- Assert
        expect(lastLine).toEqual('');
    });

    it('Gets the last line of an empty string', () => {
        // -- Arrange
        const input = '';

        // -- Act
        const lastLine = getLastLine(input);

        // -- Assert
        expect(lastLine).toEqual('');
    });

    it('Gets the last line of a string containing only a newline', () => {
        // -- Arrange
        const input = '\n';

        // -- Act
        const lastLine = getLastLine(input);

        // -- Assert
        expect(lastLine).toEqual('');
    });
});

describe('getEndingNewlineLength', () => {
    it('Gets the length of the ending newline of a one-line string', () => {
        // -- Arrange
        const input = 'Lorem ipsum dolor sit amet.';

        // -- Act
        const newlineLength = getEndingNewlineLength(input);

        // -- Assert
        expect(newlineLength).toEqual(0);
    });

    it('Gets the length of the ending newline of a one-line LF terminated string', () => {
        // -- Arrange
        const input = 'Lorem ipsum dolor sit amet.\n';

        // -- Act
        const newlineLength = getEndingNewlineLength(input);

        // -- Assert
        expect(newlineLength).toEqual(1);
    });

    it('Gets the length of the ending newline of a one-line CRLF terminated string', () => {
        // -- Arrange
        const input = 'Lorem ipsum dolor sit amet.\r\n';

        // -- Act
        const newlineLength = getEndingNewlineLength(input);

        // -- Assert
        expect(newlineLength).toEqual(2);
    });

    it('Gets the length of the ending newline of a two-line LF terminated string', () => {
        // -- Arrange
        const input = 'Lorem ipsum dolor sit amet.\n\n';

        // -- Act
        const newlineLength = getEndingNewlineLength(input);

        // -- Assert
        expect(newlineLength).toEqual(1);
    });

    it('Gets the length of the ending newline of a multiline string', () => {
        // -- Arrange
        const input = 'Lorem\nipsum\ndolor\nsit\namet.';

        // -- Act
        const newlineLength = getEndingNewlineLength(input);

        // -- Assert
        expect(newlineLength).toEqual(0);
    });

    it('Gets the length of the ending newline of a multiline LF terminated string', () => {
        // -- Arrange
        const input = 'Lorem\nipsum\ndolor\nsit\namet.\n';

        // -- Act
        const newlineLength = getEndingNewlineLength(input);

        // -- Assert
        expect(newlineLength).toEqual(1);
    });
});

describe('getEndingNewline', () => {
    it('Gets the ending newline of a one-line string', () => {
        // -- Arrange
        const input = 'Lorem ipsum dolor sit amet.';

        // -- Act
        const newline = getEndingNewline(input);

        // -- Assert
        expect(newline).toEqual('');
    });

    it('Gets the ending newline of a one-line LF terminated string', () => {
        // -- Arrange
        const input = 'Lorem ipsum dolor sit amet.\n';

        // -- Act
        const newline = getEndingNewline(input);

        // -- Assert
        expect(newline).toEqual('\n');
    });

    it('Gets the ending newline of a one-line CRLF terminated string', () => {
        // -- Arrange
        const input = 'Lorem ipsum dolor sit amet.\r\n';

        // -- Act
        const newline = getEndingNewline(input);

        // -- Assert
        expect(newline).toEqual('\r\n');
    });

    it('Gets the ending newline of a two-line LF terminated string', () => {
        // -- Arrange
        const input = 'Lorem ipsum dolor sit amet.\n\n';

        // -- Act
        const newline = getEndingNewline(input);

        // -- Assert
        expect(newline).toEqual('\n');
    });

    it('Gets the ending newline of a multiline string', () => {
        // -- Arrange
        const input = 'Lorem\nipsum\ndolor\nsit\namet.';

        // -- Act
        const newline = getEndingNewline(input);

        // -- Assert
        expect(newline).toEqual('');
    });

    it('Gets the ending newline of a multiline LF terminated string', () => {
        // -- Arrange
        const input = 'Lorem\nipsum\ndolor\nsit\namet.\n';

        // -- Act
        const newline = getEndingNewline(input);

        // -- Assert
        expect(newline).toEqual('\n');
    });
});

describe('trimEndingNewline', () => {
    it('Trims the ending newline from a one-line string', () => {
        // -- Arrange
        const input = 'Lorem ipsum dolor sit amet.';

        // -- Act
        const trimmedInput = trimEndingNewline(input);

        // -- Assert
        expect(trimmedInput).toEqual(input);
    });

    it('Trims the ending newline from a one-line LF terminated string', () => {
        // -- Arrange
        const input = 'Lorem ipsum dolor sit amet.\n';

        // -- Act
        const trimmedInput = trimEndingNewline(input);

        // -- Assert
        expect(trimmedInput).toEqual('Lorem ipsum dolor sit amet.');
    });

    it('Trims the ending newline from a one-line CRLF terminated string', () => {
        // -- Arrange
        const input = 'Lorem ipsum dolor sit amet.\r\n';

        // -- Act
        const trimmedInput = trimEndingNewline(input);

        // -- Assert
        expect(trimmedInput).toEqual('Lorem ipsum dolor sit amet.');
    });

    it('Trims the ending newline from a two-line LF terminated string', () => {
        // -- Arrange
        const input = 'Lorem ipsum dolor sit amet.\n\n';

        // -- Act
        const trimmedInput = trimEndingNewline(input);

        // -- Assert
        expect(trimmedInput).toEqual('Lorem ipsum dolor sit amet.\n');
    });

    it('Trims the ending newline from a multiline string', () => {
        // -- Arrange
        const input = 'Lorem\nipsum\ndolor\nsit\namet.';

        // -- Act
        const trimmedInput = trimEndingNewline(input);

        // -- Assert
        expect(trimmedInput).toEqual(input);
    });

    it('Trims the ending newline from a multiline LF terminated string', () => {
        // -- Arrange
        const input = 'Lorem\nipsum\ndolor\nsit\namet.\n';

        // -- Act
        const trimmedInput = trimEndingNewline(input);

        // -- Assert
        expect(trimmedInput).toEqual('Lorem\nipsum\ndolor\nsit\namet.');
    });
});

describe('trimIndentation', () => {
    it('Trims indentation from a consistently indented multiline text (#1)', () => {
        // -- Arrange
        const input = '  Lorem\n  ipsum\n  dolor sit\n  amet.\n';

        // -- Act
        const trimmedInput = trimIndentation(input, 2);

        // -- Assert
        expect(trimmedInput).toEqual('Lorem\nipsum\ndolor sit\namet.\n');
    });

    it('Trims indentation from a consistently indented multiline text (#2)', () => {
        // -- Arrange
        const input = '  Lorem\n  ipsum\n  dolor sit\n  amet.\n';

        // -- Act
        const trimmedInput = trimIndentation(input, 1);

        // -- Assert
        expect(trimmedInput).toEqual(' Lorem\n ipsum\n dolor sit\n amet.\n');
    });

    it('Trims indentation from an inconsistently indented multiline text', () => {
        // -- Arrange
        const input = 'Lorem\n  ipsum\n    dolor sit\n  amet.\n';

        // -- Act
        const trimmedInput = trimIndentation(input, 2);

        // -- Assert
        expect(trimmedInput).toEqual('Lorem\nipsum\n  dolor sit\namet.\n');
    });
});
