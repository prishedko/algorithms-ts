import { ContainersAPI } from './api'
import Stack = ContainersAPI.Stack
import { LinkedStack } from './LinkedStack'

/**
 * Contains factory functions that create instances of containers' ADTs.
 */
export namespace ContainersBuilders {

    /**
     * Creates new instance of <tt>Stack</tt>.
     * @return {ContainersAPI.Stack<E>} new instance of <tt>Stack</tt>.
     */
    export function newStack<E>(): Stack<E> {
        return new LinkedStack<E>()
    }
}
