import { ContainersAPI } from './api'
import { CommonsAPI } from '../commons/api'
import { Node, NodesIterator } from './AuxiliaryTypes'
import { AbstractCollection } from '../commons/AbstractCollection'

import Queue = ContainersAPI.Queue
import CollectionIterator = CommonsAPI.CollectionIterator
import Collection = CommonsAPI.Collection

/**
 * This implementation uses a singly-linked list with a static nested class for linked-list nodes. The <tt>enqueue</tt>,
 * <tt>dequeue</tt>, <tt>peek</tt>, <tt>size</tt>, and <tt>is-empty</tt> operations all take constant time in the worst
 * case.
 * <p>
 * For additional documentation, see <a href="http://algs4.cs.princeton.edu/13stacks">Section 1.3</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 */
export class LinkedQueue<E> extends AbstractCollection<E> implements Queue<E> {
    private first: Node<E> = undefined  // beginning of queue
    private last: Node<E> = undefined   // end of queue
    private n: number = 0               // number of elements on queue

    isEmpty(): boolean {
        return this.first === undefined
    }

    size(): number {
        return this.n
    }

    peek(): E {
        if (this.first) {
            return this.first.element
        } else {
            throw new Error('Queue underflow')
        }
    }

    enqueue(e: E): Queue<E> {
        const oldlast = this.last
        this.last = {
            element: e,
            next: undefined
        }
        if (this.first) {
            oldlast!.next = this.last
        } else {
            this.first = this.last
        }
        this.n++
        return this
    }

    dequeue(): E {
        if (this.first) {
            const element = this.first.element
            this.first = this.first.next
            this.n--
            if (this.isEmpty()) {
                this.last = undefined
            }
            return element
        } else {
            throw new Error('Queue underflow')
        }
    }

    asCollection(): Collection<E> {
        return this
    }

    toString(): string {
        return this.reduce((acc, e) => acc === '' ? String(e) : acc + ' ' + e, '')
    }

    iterator(): CollectionIterator<E> {
        return new NodesIterator(this.first)
    }
}
