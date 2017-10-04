import { ContainersAPI } from './api'
import { CommonsAPI, CommonsBuilder } from '../commons'
import { Node, NodesIterator } from './AuxiliaryTypes'
import Queue = ContainersAPI.Queue
import collectionFromArray = CommonsBuilder.collectionFromArray
import Collection = CommonsAPI.Collection

/**
 * This implementation uses a singly-linked list with a static nested class for linked-list nodes. The <tt>enqueue</tt>,
 * <tt>dequeue</tt>, <tt>peek</tt>, <tt>size</tt>, and <tt>is-empty</tt> operations all take constant time in the worst
 * case.
 * <p>
 * For additional documentation, see <a href="http://algs4.cs.princeton.edu/13stacks">Section 1.3</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 */
export class LinkedQueue<E> implements Queue<E>, Collection<E> {
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

    toString(): string {
        return this.reduce((acc, e) => acc === '' ? String(e) : acc + ' ' + e, '')
    }

    asCollection(): CommonsAPI.Collection<E> {
        return this
    }

    map<T>(f: (e: E) => T): Collection<T> {
        const result: T[] = []
        this.forEach(e => result.push(f(e)))
        return collectionFromArray(result, false)
    }

    filter(p: (e: E) => boolean): Collection<E> {
        const result: E[] = []
        this.forEach(e => {
            if (p(e)) {
                result.push(e)
            }
        })
        return collectionFromArray(result, false)
    }

    forEach(f: (e: E) => void): void {
        const iter = new NodesIterator(this.first)
        while (iter.hasNext()) {
            const element = iter.next()
            f(element)
        }
    }

    reduce<A>(r: (accumulator: A, currentElement: E) => A, initialValue: A): A {
        let result = initialValue
        this.forEach(e => result = r(result, e))
        return result
    }
}
