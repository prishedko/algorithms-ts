import { ContainersAPI } from './api'
import { LinkedStack } from './LinkedStack'
import { LinkedQueue } from './LinkedQueue'

/**
 * Contains factory functions that create instances of containers' ADTs.
 */
export namespace ContainersBuilders {
    import Queue = ContainersAPI.Queue
    import Stack = ContainersAPI.Stack

    /**
     * Creates new instance of <tt>Stack</tt>.
     * @return {ContainersAPI.Stack<E>} new instance of <tt>Stack</tt>.
     */
    export function newStack<E>(): Stack<E> {
        return new LinkedStack<E>()
    }

    /**
     * Creates new instance of <tt>Queue</tt>.
     * @return {ContainersAPI.Queue<E>} new instance of <tt>Queue</tt>.
     */
    export function newQueue<E>(): Queue<E> {
        return new LinkedQueue<E>()
    }
}
