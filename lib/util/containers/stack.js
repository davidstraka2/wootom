"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
/** A stack with some helpful methods */
class Stack {
    constructor() {
        /** The items on the stack */
        this.content = [];
    }
    /** The number of items on the stack */
    get length() {
        return this.content.length;
    }
    /** The top item on the stack, or `undefined` if the stack is empty */
    get top() {
        if (this.length > 0)
            return this.content[this.length - 1];
        return;
    }
    /**
     * Remove the top item from the stack (or do nothing when stack is empty)
     *
     * @returns The item removed from the top of the stack, or `undefined` when
     * the stack was empty
     */
    pop() {
        return this.content.pop();
    }
    /**
     * Remove items from the top of the stack while a given predicate is true (
     * and while the stack is not empty)
     *
     * @param predicate The predicate to call on each item from the top of the
     * stack to determine, whether to continue removing
     * @returns All the removed items in the order they were removed (that is
     * reverse of the order they were added in)
     */
    popWhile(predicate) {
        const popped = [];
        while (this.length > 0 &&
            predicate(this.top, this.length - 1, this)) {
            popped.push(this.pop());
        }
        return popped;
    }
    /**
     * Add new items to the top of the stack
     *
     * @param items The items to add to the stack
     * @returns The new length of the stack
     */
    push(...items) {
        return this.content.push(...items);
    }
}
exports.Stack = Stack;
