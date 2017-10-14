import { CommonsAPI } from '../commons/api'
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
         * @param {E} element the element to add
         * @return {ContainersAPI.Stack<E>} this stack
         */
        push(element: E): Stack<E>
        /**
         * Removes and returns the item most recently added to this stack.
         * @return {E} the element most recently added.
         * @throws Error('Stack underflow') if this stack is empty
         */
        pop(): E
        /**
         * Returns (but does not remove) the item most recently added to this stack.
         * @return {E} the element most recently added to this stack.
         * @throws Error('Stack underflow') if this stack is empty
         */
        peek(): E
        /**
         * Returns a string representation of this stack.
         * @return {string} the sequence of elements in the stack in LIFO order, separated by spaces
         */
        toString(): string
        /**
         * Returns true if this stack is empty.
         * @return {boolean} <code>true</code> if this stack is empty; <code>false</code> otherwise
         */
        isEmpty(): boolean

        /**
         * Returns the number of elements in the stack.
         * @return {number} the number of elements in the stack
         */
        size(): number
        /**
         * Returns collection backed by this stack. Iterations will be in LIFO order. Time complexity is O(1).
         * @return {CommonsAPI.Collection<E>} collection of elements from this stack.
         */
        asCollection(): Collection<E>
    }

    /**
     * The <code>Queue</code> class represents a first-in-first-out (FIFO) queue of generic elements. It supports the
     * usual <tt>enqueue</tt> and <tt>dequeue</tt> operations, along with methods for peeking at the first item,
     * testing if the queue is empty, and iterating through the items in FIFO order.
     */
    export interface Queue<E> {
        /**
         * Returns <code>true</code> if this queue is empty.
         * @return {boolean} <code>true</code> if this queue is empty; <code>false</code> otherwise
         */
        isEmpty(): boolean
        /**
         * Returns the number of elements in this queue.
         * @return {number} the number of elements in this queue.
         */
        size(): number
        /**
         * Returns the element least recently added to this queue.
         * @return {E} the element least recently added to this queue.
         * @throws Error('Queue underflow') if this queue is empty.
         */
        peek(): E
        /**
         * Adds the element to this queue.
         * @param {E} e element the item to add.
         * @return {ContainersAPI.Queue<E>} queue with the added element.
         */
        enqueue(e: E): Queue<E>
        /**
         * Removes and returns the element on this queue that was least recently added.
         * @return {E} the element on this queue that was least recently added.
         * @throws Error('Queue underflow') if this queue is empty.
         */
        dequeue(): E
        /**
         * Returns a string representation of this queue.
         * @return {string} the sequence of elements in FIFO order, separated by spaces.
         */
        toString(): string
        /**
         * Returns collection backed by this queue. Iterations will be in FIFO order. Time complexity is O(1).
         * @return {CommonsAPI.Collection<E>} collection of elements from this queue.
         */
        asCollection(): Collection<E>
    }
}
