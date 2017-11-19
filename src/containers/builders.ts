import { ContainersAPI } from './api'
import { LinkedStack } from './LinkedStack'
import { LinkedQueue } from './LinkedQueue'
import {PriorityQueue} from './PriorityQueue'
import {CommonsAPI} from '../commons/api'

/**
 * Contains factory functions that create instances of containers' ADTs.
 */
export namespace ContainersBuilders {
    import Queue = ContainersAPI.Queue
    import Stack = ContainersAPI.Stack
    import Comparator = CommonsAPI.Comparator

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

    /**
     * Creates new instance of MaxPriorityQueue based on binary heap
     * (see <a href="https://algs4.cs.princeton.edu/24pq/">Priority Queues</a> for details).
     * @param {CommonsAPI.Comparator<E>} comparator comparator for the queue elements.
     * @param {E[]} elements elements to put in this queue. Default value is empty array.
     * @return {ContainersAPI.Queue<E>} MaxPriorityQueue.
     */
    export function newMaxPQ<E>(comparator: Comparator<E>, elements: E[] = []): Queue<E> {
        return new PriorityQueue(comparator, true, elements)
    }

    /**
     * Creates new instance of MinPriorityQueue based on binary heap
     * (see <a href="https://algs4.cs.princeton.edu/24pq/">Priority Queues</a> for details).
     * @param {CommonsAPI.Comparator<E>} comparator comparator for the queue elements.
     * @param {E[]} elements elements to put in this queue. Default value is empty array.
     * @return {ContainersAPI.Queue<E>} MinPriorityQueue.
     */
    export function newMinPQ<E>(comparator: Comparator<E>, elements: E[] = []): Queue<E> {
        return new PriorityQueue(comparator, false, elements)
    }
}
