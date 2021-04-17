import {
    eol,
    endOfLineOrString,
} from '../../../../lib/util/regex-patterns/sequences';

describe('eol', () => {
    it('Matches LF exactly', () => {
        // -- Arrange
        const regex = new RegExp(eol);
        const input = '\n';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(1);
        expect(match[0]).toBe(input);
    });

    it('Matches CRLF exactly', () => {
        // -- Arrange
        const regex = new RegExp(eol);
        const input = '\r\n';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(1);
        expect(match[0]).toBe(input);
    });

    it('Does NOT an match empty string', () => {
        // -- Arrange
        const regex = new RegExp(eol);
        const input = '';

        // -- Act
        const res = regex.test(input);

        // -- Assert
        expect(res).toBeFalse();
    });
});

describe('endOfLineOrString', () => {
    it('Matches LF exactly', () => {
        // -- Arrange
        const regex = new RegExp(endOfLineOrString);
        const input = '\n';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(1);
        expect(match[0]).toBe(input);
    });

    it('Matches CRLF exactly', () => {
        // -- Arrange
        const regex = new RegExp(endOfLineOrString);
        const input = '\r\n';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(1);
        expect(match[0]).toBe(input);
    });

    it('Matches an empty string', () => {
        // -- Arrange
        const regex = new RegExp(endOfLineOrString);
        const input = '';

        // -- Act
        const res = regex.test(input);

        // -- Assert
        expect(res).toBeTrue();
    });
});
