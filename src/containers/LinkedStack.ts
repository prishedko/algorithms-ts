import { ContainersAPI } from './api'
import { CommonsAPI } from '../commons/api'
import { Node, NodesIterator } from './AuxiliaryTypes'
import { AbstractCollection } from '../commons/AbstractCollection'

import Stack = ContainersAPI.Stack
import CollectionIterator = CommonsAPI.CollectionIterator
import Collection = CommonsAPI.Collection

/**
 * This implementation uses a singly-linked list with a non-static nested class for linked-list nodes.
 * <p>
 * For additional documentation, see <a href="/algs4/13stacks">Section 1.3</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 */
export class LinkedStack<E> extends AbstractCollection<E> implements Stack<E> {
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

    asCollection(): Collection<E> {
        return this
    }

    size(): number {
        return this.stackSize
    }

    iterator(): CollectionIterator<E> {
        return new NodesIterator(this.topOfStack)
    }
}
