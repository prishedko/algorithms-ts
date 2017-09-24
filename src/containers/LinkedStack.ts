import { ContainersAPI } from './api'
import { CommonsAPI, CommonsBuilder } from '../commons'
import Stack = ContainersAPI.Stack
import collectionFromArray = CommonsBuilder.collectionFromArray
import Collection = CommonsAPI.Collection

type Node<E> = undefined | {
    readonly element: E
    readonly next: Node<E>
}

class ListIterator<E> {
    constructor(private current: Node<E>) {}

    hasNext(): boolean {
        return !!this.current
    }

    next(): E {
        if (!this.hasNext()) {
            throw new Error('No such element')
        }
        const element = this.current!.element
        this.current = this.current!.next
        return element
    }
}

/**
 * This implementation uses a singly-linked list with a non-static nested class for linked-list nodes.
 * <p>
 * For additional documentation, see <a href="/algs4/13stacks">Section 1.3</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 */
export class LinkedStack<E> implements Stack<E>, Collection<E> {
    private stackSize: number = 0
    private topOfStack: Node<E> = undefined

    push(element: E): Stack<E> {
        const oldTop = this.topOfStack
        this.topOfStack = {
            element: element,
            next: oldTop
        }
        this.stackSize++
        return this
    }

    pop(): E {
        if (this.size() === 0) {
            throw new Error('Stack underflow')
        }
        const element = this.topOfStack!.element
        this.topOfStack = this.topOfStack!.next
        this.stackSize--
        return element
    }

    peek(): E {
        if (this.size() === 0) {
            throw new Error('Stack underflow')
        }
        return this.topOfStack!.element
    }

    toString(): string {
        return this.reduce((acc, e) => acc === '' ? String(e) : acc + ' ' + e, '')
    }

    asCollection(): CommonsAPI.Collection<E> {
        return this
    }

    map<T>(f: (e: E) => T): Collection<T> {
        const result: T[] = []
        const iter = new ListIterator(this.topOfStack)
        while (iter.hasNext()) {
            const element = iter.next()
            result.push(f(element))
        }
        return collectionFromArray(result, false)
    }

    filter(p: (e: E) => boolean): Collection<E> {
        const result: E[] = []
        const iter = new ListIterator(this.topOfStack)
        while (iter.hasNext()) {
            const element = iter.next()
            if (p(element)) {
                result.push(element)
            }
        }
        return collectionFromArray(result, false)
    }

    forEach(f: (e: E) => void): void {
        const iter = new ListIterator(this.topOfStack)
        while (iter.hasNext()) {
            const element = iter.next()
            f(element)
        }
    }

    reduce<A>(r: (accumulator: A, currentElement: E) => A, initialValue: A): A {
        const iter = new ListIterator(this.topOfStack)
        let result = initialValue
        while (iter.hasNext()) {
            const element = iter.next()
            result = r(result, element)
        }
        return result
    }

    size(): number {
        return this.stackSize
    }
}
