import {Match} from '../../../../../lib/core/parser/matchers/match';

describe('Match', () => {
    it('Accurately represents a match', () => {
        // -- Arrange & Act
        const match = new Match(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'sit amet',
            18,
            ['sit', undefined, 'amet'],
        );

        // -- Assert
        expect(match.matched).toEqual('sit amet');
        expect(match.before).toEqual('Lorem ipsum dolor ');
        expect(match.after).toEqual(', consectetur adipiscing elit.');
        expect(match.index).toEqual(18);
        expect(match.length).toEqual('sit amet'.length);
        expect(match.groups).toHaveSize(3);
        expect(match.groups[0]).toEqual('sit');
        expect(match.groups[1]).toBeUndefined();
        expect(match.groups[2]).toEqual('amet');
    });
});
