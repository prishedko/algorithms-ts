import { CommonsAPI } from './api'
import Collection = CommonsAPI.Collection
import { CommonsBuilder } from './builders'
import collectionFromArray = CommonsBuilder.collectionFromArray

export abstract class AbstractCollection<E> implements Collection<E> {
    map<T>(f: (e: E) => T): CommonsAPI.Collection<T> {
        const result: T[] = []
        this.forEach(e => result.push(f(e)))
        return collectionFromArray(result)
    }

    filter(p: (e: E) => boolean): CommonsAPI.Collection<E> {
        const result: E[] = []
        this.forEach(e => {
            if (p(e)) {
                result.push(e)
            }
        })
        return collectionFromArray(result, false)
    }

    forEach(f: (e: E) => void): void {
        this.iterator().forEachRemaining(e => f(e))
    }

    reduce<A>(r: (accumulator: A, currentElement: E) => A, initialValue: A): A {
        let result = initialValue
        this.forEach(e => result = r(result, e))
        return result
    }

    abstract size(): number

    private iterateUntil<T>(p: (e: E) => boolean, m: (e: E) => T, orElse: T): T {
        const iter = this.iterator()
        while (iter.hasNext()) {
            const element = iter.next()
            if (p(element)) {
                return m(element)
            }
        }
        return orElse
    }

    find(p: (e: E) => boolean): E | undefined {
        return this.iterateUntil(p, e => e, undefined)
    }

    every(p: (e: E) => boolean): boolean {
        return this.iterateUntil(e => !p(e), _ => false, true)
    }

    some(p: (e: E) => boolean): boolean {
        return this.iterateUntil(e => p(e), _ => true, false)
    }

    abstract iterator(): CommonsAPI.CollectionIterator<E>
}
