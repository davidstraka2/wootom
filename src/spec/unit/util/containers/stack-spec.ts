import {Stack} from '../../../../lib/util/containers/stack';

describe('Stack', () => {
    it('Can push and pop values, get its length and top value', () => {
        // -- Arrange
        const stack = new Stack<number>();

        // -- Act
        const snapshot0 = [stack.length, stack.top];
        const length1 = stack.push(1);
        const snapshot1 = [stack.length, stack.top];
        const value1 = stack.pop();
        const snapshot2 = [stack.length, stack.top];
        const length2 = stack.push(2, 3, 4);
        const value2 = stack.pop();
        const value3 = stack.pop();
        const snapshot3 = [stack.length, stack.top];
        const length3 = stack.push(5);
        const snapshot4 = [stack.length, stack.top];

        // -- Assert
        expect(snapshot0).toEqual([0, undefined]);
        expect(length1).toEqual(1);
        expect(snapshot1).toEqual([1, 1]);
        expect(value1).toEqual(1);
        expect(snapshot2).toEqual([0, undefined]);
        expect(length2).toEqual(3);
        expect(value2).toEqual(4);
        expect(value3).toEqual(3);
        expect(snapshot3).toEqual([1, 2]);
        expect(length3).toEqual(2);
        expect(snapshot4).toEqual([2, 5]);
    });

    describe('popWhile', () => {
        it('Does nothing on an empty stack', () => {
            // -- Arrange
            const stack = new Stack<number>();

            // -- Act
            const popped = stack.popWhile(() => true);

            // -- Assert
            expect(popped).toHaveSize(0);
        });

        it('Clears the stack when true is returned for each value', () => {
            // -- Arrange
            const stack = new Stack<number>();
            stack.push(1, 2, 3, 4, 5);

            // -- Act
            const popped = stack.popWhile(() => true);

            // -- Assert
            expect(popped).toEqual([5, 4, 3, 2, 1]);
            expect(stack.length).toEqual(0);
        });

        it('Can pop the stack until it finds a matching value', () => {
            // -- Arrange
            const stack = new Stack<number>();
            stack.push(1, 2, 3, 4, 5);

            // -- Act
            const popped = stack.popWhile(value => value !== 2);

            // -- Assert
            expect(popped).toEqual([5, 4, 3]);
            expect(stack.top).toEqual(2);
        });

        it('Can pop the stack until it reaches a certain index', () => {
            // -- Arrange
            const stack = new Stack<number>();
            stack.push(1, 2, 3, 4, 5);

            // -- Act
            const popped = stack.popWhile((_, index) => index >= 1);

            // -- Assert
            expect(popped).toEqual([5, 4, 3, 2]);
            expect(stack.length).toEqual(1);
        });
    });
});
