import {PairMatcher} from '../../../../../lib/core/parser/matchers/pair-matcher';

describe('PairMatcher', () => {
    describe('findFirstMatch', () => {
        it('Finds the match of a simple regex pair in a simple string (#1)', () => {
            // -- Arrange
            const matcher = new PairMatcher(/abc/, /ghi/);
            const source = 'abc def ghi';

            // -- Act
            const match = matcher.findFirstMatch(source);

            // -- Assert
            expect(match).toBeDefined();
            expect(match?.matched).toEqual(source);
            expect(match?.before).toEqual('');
            expect(match?.after).toEqual('');
            expect(match?.index).toEqual(0);
            expect(match?.length).toEqual(source.length);
            expect(match?.groups).toHaveSize(1);
            expect(match?.groups).toEqual([' def ']);
        });

        it('Finds the match of a simple regex pair in a simple string (#2)', () => {
            // -- Arrange
            const matcher = new PairMatcher(/bc/, /gh/);
            const source = 'abc def ghi';
            const expectedMatched = 'bc def gh';

            // -- Act
            const match = matcher.findFirstMatch(source);

            // -- Assert
            expect(match).toBeDefined();
            expect(match?.matched).toEqual(expectedMatched);
            expect(match?.before).toEqual('a');
            expect(match?.after).toEqual('i');
            expect(match?.index).toEqual(1);
            expect(match?.length).toEqual(expectedMatched.length);
            expect(match?.groups).toHaveSize(1);
            expect(match?.groups).toEqual([' def ']);
        });

        it('Finds the match of a simple regex pair with capture groups in a simple string', () => {
            // -- Arrange
            const matcher = new PairMatcher(/(b)(c d)/, /(f g)(h)/);
            const source = 'abc def ghi';
            const expectedMatched = 'bc def gh';

            // -- Act
            const match = matcher.findFirstMatch(source);

            // -- Assert
            expect(match).toBeDefined();
            expect(match?.matched).toEqual(expectedMatched);
            expect(match?.before).toEqual('a');
            expect(match?.after).toEqual('i');
            expect(match?.index).toEqual(1);
            expect(match?.length).toEqual(expectedMatched.length);
            expect(match?.groups).toHaveSize(5);
            expect(match?.groups).toEqual(['b', 'c d', 'e', 'f g', 'h']);
        });

        it('Finds the match of a simple regex pair with capture groups in a string with multiple pairs', () => {
            // -- Arrange
            const matcher = new PairMatcher(/</, />/);
            const source = '<abc><def><ghi>';
            const expectedMatched = '<abc>';

            // -- Act
            const match = matcher.findFirstMatch(source);

            // -- Assert
            expect(match).toBeDefined();
            expect(match?.matched).toEqual(expectedMatched);
            expect(match?.before).toEqual('');
            expect(match?.after).toEqual('<def><ghi>');
            expect(match?.index).toEqual(0);
            expect(match?.length).toEqual(expectedMatched.length);
            expect(match?.groups).toHaveSize(1);
            expect(match?.groups).toEqual(['abc']);
        });

        it('Finds the match of a simple regex pair with capture groups in a string with nested pairs', () => {
            // -- Arrange
            const matcher = new PairMatcher(/</, />/);
            const source = 'a<bc<>d<ef>gh<i<j>>k>lm';
            const expectedMatched = '<bc<>d<ef>gh<i<j>>k>';

            // -- Act
            const match = matcher.findFirstMatch(source);

            // -- Assert
            expect(match).toBeDefined();
            expect(match?.matched).toEqual(expectedMatched);
            expect(match?.before).toEqual('a');
            expect(match?.after).toEqual('lm');
            expect(match?.index).toEqual(1);
            expect(match?.length).toEqual(expectedMatched.length);
            expect(match?.groups).toHaveSize(1);
            expect(match?.groups).toEqual(['bc<>d<ef>gh<i<j>>k']);
        });

        it('Finds the match of a simple regex pair with capture groups in a complex string', () => {
            // -- Arrange
            const matcher = new PairMatcher(/</, />/);
            const source = 'a<<bc><><d>e>fg<h>i';
            const expectedMatched = '<<bc><><d>e>';

            // -- Act
            const match = matcher.findFirstMatch(source);

            // -- Assert
            expect(match).toBeDefined();
            expect(match?.matched).toEqual(expectedMatched);
            expect(match?.before).toEqual('a');
            expect(match?.after).toEqual('fg<h>i');
            expect(match?.index).toEqual(1);
            expect(match?.length).toEqual(expectedMatched.length);
            expect(match?.groups).toHaveSize(1);
            expect(match?.groups).toEqual(['<bc><><d>e']);
        });

        it('Returns undefined when it does NOT find any match', () => {
            // -- Arrange
            const matcher = new PairMatcher(/abc/, /def/);
            const source = 'be';

            // -- Act
            const match = matcher.findFirstMatch(source);

            // -- Assert
            expect(match).toBeUndefined();
        });

        it('Returns undefined when it does NOT find an opening match', () => {
            // -- Arrange
            const matcher = new PairMatcher(/abc/, /def/);
            const source = 'def';

            // -- Act
            const match = matcher.findFirstMatch(source);

            // -- Assert
            expect(match).toBeUndefined();
        });

        it('Returns undefined when it does NOT find a closing match', () => {
            // -- Arrange
            const matcher = new PairMatcher(/abc/, /def/);
            const source = 'abc';

            // -- Act
            const match = matcher.findFirstMatch(source);

            // -- Assert
            expect(match).toBeUndefined();
        });
    });
});
