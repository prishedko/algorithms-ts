import {CommonGraphAPI} from './CommonGraphAPI'
import {ContainersAPI} from '../../'
import {CommonsAPI} from '../../'
import {AbstractIterator} from '../../commons/AbstractIterator'
import {ArrayIterator} from '../../commons/ArrayIterator'

import Vertex = CommonGraphAPI.Vertex
import Stack = ContainersAPI.Stack
import CollectionIterator = CommonsAPI.CollectionIterator

export type Cycle<V> = Stack<Vertex<V>> | undefined

interface IndexedByString<T> {
    [index: string]: T
}

/**
 * Returns true if given value null or undefined
 * @param value to check
 * @return {boolean} true if given value null or undefined
 */
export function isInexact(value: any): boolean {
    return value === null || value === undefined
}

export type Entry<T> = {
    readonly key: string
    readonly value: T
}

class StringMapIterator<T> extends AbstractIterator<Entry<T>> {
    private keyIterator: CollectionIterator<string>

    constructor(private container: IndexedByString<T>) {
        super()
        this.keyIterator = new ArrayIterator(Object.keys(container))
    }

    hasNext(): boolean {
        return this.keyIterator.hasNext()
    }

    next(): Entry<T> {
        const key = this.keyIterator.next()
        return {
            key: key,
            value: this.container[key]
        }
    }
}

export class StringMap<T> {
    private container: IndexedByString<T> = {}

    private innerGet(key: string): T | undefined {
        const result = this.container[key]
        if (isInexact(result)) {
            return this.container[parseFloat(key)]
        }
        return result
    }

    set(key: string, value: T): StringMap<T> {
        this.container[key] = value
        return this
    }

    get(key: string): T | undefined {
        return this.innerGet(key)
    }

    endoSet(key: string, endomap: (v: T | undefined) => T): StringMap<T> {
        this.set(key, endomap(this.get(key)))
        return this
    }

    getOrDefault(key: string, defaultValue: T): T {
        const result = this.innerGet(key)
        if (isInexact(result)) {
            return defaultValue
        }
        return result!
    }

    has(key: string): boolean {
        const result = this.innerGet(key)
        return !isInexact(result)
    }

    forEach(f: (key: string, value: T) => void): void {
        Object.keys(this.container).forEach(key => f(key, this.get(key)!))
    }

    iterator(): CollectionIterator<Entry<T>> {
        return new StringMapIterator(this.container)
    }
}

export function isMarked<V>(v: Vertex<V>, marked: StringMap<boolean>): boolean {
    return marked.has(v.key) && marked.get(v.key) === true
}
