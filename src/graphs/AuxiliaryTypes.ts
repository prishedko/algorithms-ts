import { GraphsAPI } from './api'
import Vertex = GraphsAPI.Vertex

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
}

export function isMarked<V>(v: Vertex<V>, marked: StringMap<boolean>): boolean {
    return marked.has(v.key) && marked.get(v.key) === true
}
