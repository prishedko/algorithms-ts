import { CommonsAPI } from '../commons'
import Collection = CommonsAPI.Collection

/**
 * Defines container-like ADTs (stacks, queues, etc.)
 */
export namespace ContainersAPI {
    /**
     * The <tt>Stack</tt> class represents a last-in-first-out (LIFO) stack of generic items. It supports the usual
     * <tt>push</tt> and <tt>pop</tt> operations, along with methods for peeking at the top item. Also it extends
     * <tt>Collection</tt> API for iteration and testing whether the <tt>Stack</tt> is empty.
     */
    export interface Stack<E> {
        /**
         * Adds the item to this stack.
         * @param item the item to add
         */
        push(element: E): Stack<E>
        /**
         * Removes and returns the item most recently added to this stack.
         * @return the item most recently added
         * @throws Error if this stack is empty
         */
        pop(): E
        /**
         * Returns (but does not remove) the item most recently added to this stack.
         * @return the item most recently added to this stack
         * @throws Error if this stack is empty
         */
        peek(): E
        /**
         * Returns a string representation of this stack.
         * @return the sequence of items in the stack in LIFO order, separated by spaces
         */
        toString(): string
        /**
         * Returns the number of items in the stack.
         * @return the number of items in the stack
         */
        size(): number
        /**
         * Returns collection backed by this stack. Iterations will be from top to bottom. Time complexity is O(1).
         * @return {CommonsAPI.Collection<E>} collection of elements from this stack.
         */
        asCollection(): Collection<E>
    }
}
