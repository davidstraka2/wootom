import {SimpleMatcher} from '../../../../../lib/core/parser/matchers/simple-matcher';

describe('SimpleMatcher', () => {
    describe('findFirstMatch', () => {
        it('Finds the match of a simple regex in a simple string', () => {
            // -- Arrange
            const matcher = new SimpleMatcher(/def/);
            const source = 'abc def ghi';

            // -- Act
            const match = matcher.findFirstMatch(source);

            // -- Assert
            expect(match).toBeDefined();
            expect(match?.matched).toEqual('def');
            expect(match?.before).toEqual('abc ');
            expect(match?.after).toEqual(' ghi');
            expect(match?.index).toEqual(4);
            expect(match?.length).toEqual(3);
            expect(match?.groups).toHaveSize(0);
        });

        it('Finds the match of a multiline regex in a multiline string', () => {
            // -- Arrange
            const matcher = new SimpleMatcher(/34\n56/);
            const source = '12\n34\n56\n78';

            // -- Act
            const match = matcher.findFirstMatch(source);

            // -- Assert
            expect(match).toBeDefined();
            expect(match?.matched).toEqual('34\n56');
            expect(match?.before).toEqual('12\n');
            expect(match?.after).toEqual('\n78');
            expect(match?.index).toEqual(3);
            expect(match?.length).toEqual(5);
            expect(match?.groups).toHaveSize(0);
        });

        it('Finds the match of a regex with groups in a simple string', () => {
            // -- Arrange
            const matcher = new SimpleMatcher(/(d)(ef)/);
            const source = 'abc def ghi';

            // -- Act
            const match = matcher.findFirstMatch(source);

            // -- Assert
            expect(match).toBeDefined();
            expect(match?.matched).toEqual('def');
            expect(match?.before).toEqual('abc ');
            expect(match?.after).toEqual(' ghi');
            expect(match?.index).toEqual(4);
            expect(match?.length).toEqual(3);
            expect(match?.groups).toHaveSize(2);
            expect(match?.groups[0]).toEqual('d');
            expect(match?.groups[1]).toEqual('ef');
        });

        it('Finds the match of a regex with nested groups in a simple string', () => {
            // -- Arrange
            const matcher = new SimpleMatcher(/(d(e)f)/);
            const source = 'abc def ghi';

            // -- Act
            const match = matcher.findFirstMatch(source);

            // -- Assert
            expect(match).toBeDefined();
            expect(match?.matched).toEqual('def');
            expect(match?.before).toEqual('abc ');
            expect(match?.after).toEqual(' ghi');
            expect(match?.index).toEqual(4);
            expect(match?.length).toEqual(3);
            expect(match?.groups).toHaveSize(2);
            expect(match?.groups[0]).toEqual('def');
            expect(match?.groups[1]).toEqual('e');
        });

        it('Returns undefined when it does NOT find a match', () => {
            // -- Arrange
            const matcher = new SimpleMatcher(/x/);
            const source = 'y';

            // -- Act
            const match = matcher.findFirstMatch(source);

            // -- Assert
            expect(match).toBeUndefined();
        });

        it('Finds actually the first match', () => {
            // -- Arrange
            const matcher = new SimpleMatcher(/xy/);
            const source = 'ab xy xy ab xy';

            // -- Act
            const match = matcher.findFirstMatch(source);

            // -- Assert
            expect(match).toBeDefined();
            expect(match?.matched).toEqual('xy');
            expect(match?.before).toEqual('ab ');
            expect(match?.after).toEqual(' xy ab xy');
            expect(match?.index).toEqual(3);
            expect(match?.length).toEqual(2);
            expect(match?.groups).toHaveSize(0);
        });
    });
});
