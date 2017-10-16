import { CommonsAPI } from '../../src/commons/api'

import CollectionIterator = CommonsAPI.CollectionIterator

export function testNextAndHasNext<E>(empty: CollectionIterator<E>,
                                   notEmpty: CollectionIterator<E>,
                                   expected: E[]): void {
    expect(empty.hasNext()).toBe(false)
    expect(() => empty.next()).toThrowError('No such element')

    expect(notEmpty.hasNext()).toBe(true)
    const actual: E[] = []
    while (notEmpty.hasNext()) {
        actual.push(notEmpty.next())
    }
    expect(actual).toEqual(expected)
    expect(notEmpty.hasNext()).toBe(false)
    expect(() => notEmpty.next()).toThrowError('No such element')
    expect(actual).toEqual(expected)
}

export function testForEachRemaining<E>(empty: CollectionIterator<E>,
                                     notEmpty: CollectionIterator<E>,
                                     withoutFirstTwoElements: E[]): void {
    empty.forEachRemaining(_ => { throw new Error('Should not be invoked') })
    notEmpty.next()
    notEmpty.next()
    const actual: E[] = []
    notEmpty.forEachRemaining(e => actual.push(e))
    expect(actual).toEqual(withoutFirstTwoElements)
}
