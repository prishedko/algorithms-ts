import { CommonsAPI } from './api'
import { ArrayIterator } from './ArrayIterator'

import Collection = CommonsAPI.Collection
import CollectionIterator = CommonsAPI.CollectionIterator

/**
 * Implementation of <tt>Collection</tt> that uses an array to store elements. Can either copy given array or reuse it -
 * this behavior is defined by <tt>copyArray</tt> parameter of the constructor.
 */
export class ArrayCollection<E> implements Collection<E> {
    private array: E[]

    constructor(from: E[] = [], copyArray: boolean = true) {
        if (copyArray) {
            this.array = [...from]
        } else {
            this.array = from
        }
    }

    map<T>(f: (e: E) => T): Collection<T> {
        return new ArrayCollection(this.array.map(f), false)
    }

    filter(p: (e: E) => boolean): Collection<E> {
        return new ArrayCollection(this.array.filter(p), false)
    }

    forEach(f: (e: E) => void): void {
        this.array.forEach(f)
    }

    reduce<A>(r: (accumulator: A, currentElement: E) => A, initialValue: A): A {
        return this.array.reduce(r, initialValue)
    }

    size(): number {
        return this.array.length
    }

    find(p: (e: E) => boolean): E | undefined {
        return this.array.find(p)
    }

    every(p: (e: E) => boolean): boolean {
        return this.array.every(p)
    }

    some(p: (e: E) => boolean): boolean {
        return this.array.some(p)
    }

    iterator(): CollectionIterator<E> {
        return new ArrayIterator(this.array)
    }
}
