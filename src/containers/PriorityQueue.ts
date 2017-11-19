import {ContainersAPI} from './api'
import {CommonsAPI} from '../commons/api'
import {AbstractCollection} from '../commons/AbstractCollection'
import {HeapIterator} from './HeapIterator'

import Queue = ContainersAPI.Queue
import Comparator = CommonsAPI.Comparator
import Ordering = CommonsAPI.Ordering
import CollectionIterator = CommonsAPI.CollectionIterator

/**
 * This implementation uses a binary heap. The <tt>enqueue</tt> and <tt>dequeue</tt> operations take logarithmic
 * amortized time. The <tt>peek</tt>, <tt>size</tt>, and <tt>is-empty</tt> operations take constant time. Construction
 * takes time proportional to the specified capacity or the number of items used to initialize the data structure.
 * <tt>iterator</tt> operation takes time proportional to the current size or the queue.
 * <p>
 * For additional documentation, see <a href="http://algs4.cs.princeton.edu/24pq">Section 2.4</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 * @param <E> the generic type of key on this priority queue
 */
export class PriorityQueue<E> extends AbstractCollection<E> implements Queue<E> {
    private pq: E[] = [undefined as any] // store items at indices 1 to n
    private n = 0                   // number of items on priority queue
    private inOrder: (i: number, j: number) => boolean

    /**
     * Construct priority queue.
     * @param {CommonsAPI.Comparator<E>} comparator comparator for the queue elements.
     * @param {boolean} maxPQ <tt>true</tt> if this queue should be MaxPriorityQueue, and <tt>false</tt> if this queue
     * should be MinPriorityQueue. Default value is <tt>true</tt>.
     * @param {E[]} keys elements to put in this queue. Default value is empty array.
     */
    constructor(private comparator: Comparator<E>, private maxPQ: boolean = true, keys: E[] = []) {
        super()
        this.inOrder = maxPQ ? this.lessInOrder : this.greaterInOrder
        this.n = keys.length
        keys.forEach(v => this.pq.push(v))
        for (let k = Math.floor(this.n / 2); k >= 1; k--) {
            this.sink(k)
        }
    }

    private lessInOrder: (i: number, j: number) => boolean = (i, j) => {
        return this.comparator(this.pq[i], this.pq[j]) === Ordering.LT
    }

    private greaterInOrder: (i: number, j: number) => boolean = (i, j) => {
        return this.comparator(this.pq[i], this.pq[j]) === Ordering.GT
    }

    isEmpty(): boolean {
        return this.n == 0
    }

    size(): number {
        return this.n
    }

    peek(): E {
        if (this.isEmpty()) {
            throw new Error('Queue underflow')
        }
        return this.pq[1]
    }

    enqueue(e: E): ContainersAPI.Queue<E> {
        // add x, and percolate it up to maintain heap invariant
        this.pq[++this.n] = e
        this.swim(this.n)
        return this
    }

    dequeue(): E {
        if (this.isEmpty()) {
            throw new Error('Queue underflow')
        }
        const max = this.pq[1]
        this.exch(1, this.n--)
        this.sink(1)
        this.pq.pop()     // to avoid loiterig and help with garbage collection
        return max
    }

    asCollection(): CommonsAPI.Collection<E> {
        return this
    }

    private swim(k: number): void {
        while (k > 1 && this.inOrder(Math.floor(k / 2), k)) {
            this.exch(k, Math.floor(k / 2))
            k = Math.floor(k / 2)
        }
    }

    private sink(k: number): void {
        while (2 * k <= this.n) {
            let j = 2 * k
            if (j < this.n && this.inOrder(j, j+1)) {
                j++
            }
            if (!this.inOrder(k, j)) {
                break
            }
            this.exch(k, j)
            k = j
        }
    }

    private exch(i: number, j: number): void {
        const swap = this.pq[i]
        this.pq[i] = this.pq[j]
        this.pq[j] = swap
    }

    toString(): string {
        return this.reduce((acc, e) => acc === '' ? String(e) : acc + ' ' + e, '')
    }

    iterator(): CollectionIterator<E> {
        return new HeapIterator(this.pq, this.n, new PriorityQueue(this.comparator, this.maxPQ))
    }
}
