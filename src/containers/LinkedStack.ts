import { ContainersAPI } from './api'
import { CommonsAPI, CommonsBuilder } from '../commons'
import { Node, NodesIterator } from './AuxiliaryTypes'
import Stack = ContainersAPI.Stack
import collectionFromArray = CommonsBuilder.collectionFromArray
import Collection = CommonsAPI.Collection

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

    isEmpty(): boolean {
        return this.stackSize === 0
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
        const iter = new NodesIterator(this.topOfStack)
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

    size(): number {
        return this.stackSize
    }
}
