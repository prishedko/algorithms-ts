import {
    testMap,
    testFilter,
    testForEach,
    testSize,
    testFind,
    testEvery,
    testSome,
    testIterator
} from '../utils/CollectionTestHelper'
import { ArrayCollection } from '../../src/commons/ArrayCollection'
import { justThrowError } from '../utils/Utils'

describe('ArrayCollection', () => {
    it('should work for empty array', () => {
        const empty = new ArrayCollection<number>()

        testMap(empty, justThrowError, [])
        testFilter(empty, justThrowError, [])
        testForEach(empty, [])
        testSize(empty, 0)
        testFind(empty, justThrowError, undefined as any)
        testEvery(empty, justThrowError, justThrowError)
        testSome(empty, justThrowError, justThrowError)
        testIterator(empty, [])
    })
    it('should work for not-empty array', () => {
        const array = [2, 1, 3, 5, 4]
        const notEmpty = new ArrayCollection(array)
        testMap(notEmpty, e => e * 2, array.map(e => e * 2))
        testFilter(notEmpty, e => e > 2 && e < 5, [3, 4])
        testForEach(notEmpty, array)
        testSize(notEmpty, array.length)
        testFind(notEmpty, e => e === 3, 3)
        testEvery(notEmpty, e => e < 6, e => e < 3 || e > 3)
        testSome(notEmpty, e => e > 6, e => e === 3)
        testIterator(notEmpty, array)
    })
})
