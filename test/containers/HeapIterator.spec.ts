import {testNextAndHasNext, testForEachRemaining} from '../utils/IteratorTestHelper'
import {HeapIterator} from '../../src/containers/HeapIterator'
import {ContainersBuilders} from '../../src/containers/builders'
import newMaxPQ = ContainersBuilders.newMaxPQ
import {CommonsBuilder} from '../../src/commons/builders'
import stringComparator = CommonsBuilder.stringComparator

describe('HeapIterator', () => {
    const heap: string[] = [undefined as any, 'T', 'S', 'R', 'P', 'N', 'O', 'A', 'E', 'I', 'H', 'G']
    const n = heap.length - 1
    const expected: string[] = ['T', 'S', 'R', 'P', 'O', 'N', 'I', 'H', 'G', 'E', 'A']

    it('should correctly implement next() and hasNext()', () => {
        testNextAndHasNext(new HeapIterator<string>([undefined as any], 0, newMaxPQ(stringComparator)),
            new HeapIterator(heap, n, newMaxPQ(stringComparator)), expected)
    })

    it('should correctly implement forEachRemaining()', () => {
        testForEachRemaining(new HeapIterator<string>([undefined as any], 0, newMaxPQ(stringComparator)),
            new HeapIterator(heap, n, newMaxPQ(stringComparator)), ['R', 'P', 'O', 'N', 'I', 'H', 'G', 'E', 'A'])
    })
})
