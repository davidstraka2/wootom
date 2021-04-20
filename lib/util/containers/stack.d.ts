/** A stack with some helpful methods */
export declare class Stack<T> {
    /** The items on the stack */
    private content;
    /** The number of items on the stack */
    get length(): number;
    /** The top item on the stack, or `undefined` if the stack is empty */
    get top(): T | undefined;
    /**
     * Remove the top item from the stack (or do nothing when stack is empty)
     *
     * @returns The item removed from the top of the stack, or `undefined` when
     * the stack was empty
     */
    pop(): T | undefined;
    /**
     * Remove items from the top of the stack while a given predicate is true (
     * and while the stack is not empty)
     *
     * @param predicate The predicate to call on each item from the top of the
     * stack to determine, whether to continue removing
     * @returns All the removed items in the order they were removed (that is
     * reverse of the order they were added in)
     */
    popWhile(predicate: (value: T, index: number, stack: Stack<T>) => unknown): T[];
    /**
     * Add new items to the top of the stack
     *
     * @param items The items to add to the stack
     * @returns The new length of the stack
     */
    push(...items: T[]): number;
}
