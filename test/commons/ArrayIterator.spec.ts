import { ArrayIterator } from '../../src/commons/ArrayIterator'
import { testNextAndHasNext, testForEachRemaining } from '../utils/IteratorTestHelper'

describe('ArrayIterator', () => {
    const array = [1, 2, 3, 4, 5]

    it('should correctly implement next() and hasNext()', () => {
        testNextAndHasNext(new ArrayIterator([]), new ArrayIterator(array), array)
    })

    it('should correctly implement forEachRemaining()', () => {
        testForEachRemaining(new ArrayIterator([]), new ArrayIterator(array), [3, 4, 5])
    })
})
