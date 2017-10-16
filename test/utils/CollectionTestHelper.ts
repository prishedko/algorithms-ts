import { CommonsAPI } from '../../src/commons/api'

import Collection = CommonsAPI.Collection

function assert<E>(collection: Collection<E>, expected: E[]): void {
    const actual: E[] = []
    collection.forEach(e => actual.push(e))
    expect(actual).toEqual(expected)
}

export function testMap<E, T>(collection: Collection<E>, m: (e: E) => T, expected: T[]): void {
    assert(collection.map(m), expected)
}

export function testFilter<E>(collection: Collection<E>, p: (e: E) => boolean, expected: E[]): void {
    assert(collection.filter(p), expected)
}

export function testForEach<E>(collection: Collection<E>, expected: E[]): void {
    assert(collection, expected)
}

export function testSize<E>(collection: Collection<E>, expected: number): void {
    expect(collection.size()).toBe(expected)
}

export function testFind<E>(collecton: Collection<E>, forExisting: (e: E) => boolean, toBeFound: E): void {
    expect(collecton.find(forExisting)).toEqual(toBeFound)
    expect(collecton.find(_ => false)).toBeUndefined()
}

export function testEvery<E>(collection: Collection<E>,
                             trueForAll: (e: E) => boolean,
                             falseForOne: (e: E) => boolean): void {
    if (collection.size() === 0) {
        expect(collection.every(trueForAll)).toBe(true)
        expect(collection.every(falseForOne)).toBe(true)
    } else {
        expect(collection.every(trueForAll)).toBe(true)
        expect(collection.every(falseForOne)).toBe(false)
    }
}

export function testSome<E>(collection: Collection<E>,
                            falseForAll: (e: E) => boolean,
                            trueForOne: (e: E) => boolean): void {
    if (collection.size() === 0) {
        expect(collection.some(falseForAll)).toBe(false)
        expect(collection.some(trueForOne)).toBe(false)
    } else {
        expect(collection.some(falseForAll)).toBe(false)
        expect(collection.some(trueForOne)).toBe(true)
    }
}

export function testIterator<E>(collection: Collection<E>, expected: E[]): void {
    const firstIter = collection.iterator()
    const secondIter = collection.iterator()
    expect(firstIter === secondIter).toBe(false)

    const firstActual: E[] = []
    while (firstIter.hasNext()) {
        firstActual.push(firstIter.next())
    }
    expect(firstActual).toEqual(expected)

    const secondActual: E[] = []
    while (secondIter.hasNext()) {
        secondActual.push(secondIter.next())
    }
    expect(secondActual).toEqual(expected)
}
