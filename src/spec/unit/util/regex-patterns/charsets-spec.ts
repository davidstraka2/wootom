import {
    horizontalWhitespace,
    lowercaseLetter,
    uppercaseLetter,
} from '../../../../lib/util/regex-patterns/charsets';

describe('horizontalWhitespace', () => {
    it('Matches a normal space character exactly', () => {
        // -- Arrange
        const regex = new RegExp(horizontalWhitespace);
        const input = ' ';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(1);
        expect(match[0]).toBe(input);
    });

    it('Matches the "\\t" character exactly', () => {
        // -- Arrange
        const regex = new RegExp(horizontalWhitespace);
        const input = '\t';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(1);
        expect(match[0]).toBe(input);
    });

    it('Does NOT match an empty string', () => {
        // -- Arrange
        const regex = new RegExp(horizontalWhitespace);
        const input = '';

        // -- Act
        const res = regex.test(input);

        // -- Assert
        expect(res).toBeFalse();
    });

    it('Does NOT match the "\\n" character', () => {
        // -- Arrange
        const regex = new RegExp(horizontalWhitespace);
        const input = '\n';

        // -- Act
        const res = regex.test(input);

        // -- Assert
        expect(res).toBeFalse();
    });

    it('Does NOT match the "\\r" character', () => {
        // -- Arrange
        const regex = new RegExp(horizontalWhitespace);
        const input = '\r';

        // -- Act
        const res = regex.test(input);

        // -- Assert
        expect(res).toBeFalse();
    });
});

describe('lowercaseLetter', () => {
    it('Matches the letter "a" exactly', () => {
        // -- Arrange
        const regex = new RegExp(lowercaseLetter);
        const input = 'a';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(1);
        expect(match[0]).toBe(input);
    });

    it('Matches the letter "y" exactly', () => {
        // -- Arrange
        const regex = new RegExp(lowercaseLetter);
        const input = 'y';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(1);
        expect(match[0]).toBe(input);
    });

    it('Does NOT match the letter "A"', () => {
        // -- Arrange
        const regex = new RegExp(lowercaseLetter);
        const input = 'A';

        // -- Act
        const res = regex.test(input);

        // -- Assert
        expect(res).toBeFalse();
    });

    it('Does NOT match the number "1"', () => {
        // -- Arrange
        const regex = new RegExp(lowercaseLetter);
        const input = '1';

        // -- Act
        const res = regex.test(input);

        // -- Assert
        expect(res).toBeFalse();
    });

    it('Does NOT match the symbol "-"', () => {
        // -- Arrange
        const regex = new RegExp(lowercaseLetter);
        const input = '-';

        // -- Act
        const res = regex.test(input);

        // -- Assert
        expect(res).toBeFalse();
    });
});

describe('uppercaseLetter', () => {
    it('Matches the letter "A" exactly', () => {
        // -- Arrange
        const regex = new RegExp(uppercaseLetter);
        const input = 'A';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(1);
        expect(match[0]).toBe(input);
    });

    it('Matches the letter "Y" exactly', () => {
        // -- Arrange
        const regex = new RegExp(uppercaseLetter);
        const input = 'Y';

        // -- Act
        const res = regex.exec(input);

        // -- Assert
        expect(res).not.toBeNull();
        const match = res as RegExpExecArray;
        expect(match).toHaveSize(1);
        expect(match[0]).toBe(input);
    });

    it('Does NOT match the letter "a"', () => {
        // -- Arrange
        const regex = new RegExp(uppercaseLetter);
        const input = 'a';

        // -- Act
        const res = regex.test(input);

        // -- Assert
        expect(res).toBeFalse();
    });

    it('Does NOT match the number "1"', () => {
        // -- Arrange
        const regex = new RegExp(uppercaseLetter);
        const input = '1';

        // -- Act
        const res = regex.test(input);

        // -- Assert
        expect(res).toBeFalse();
    });

    it('Does NOT match the symbol "-"', () => {
        // -- Arrange
        const regex = new RegExp(uppercaseLetter);
        const input = '-';

        // -- Act
        const res = regex.test(input);

        // -- Assert
        expect(res).toBeFalse();
    });
});
