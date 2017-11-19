import { ContainersAPI } from '../../src/'
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
import { justThrowError } from '../utils/Utils'
import {ContainersBuilders} from '../../src/containers/builders'
import {CommonsBuilder} from '../../src/commons/builders'

import Queue = ContainersAPI.Queue
import numberComparator = CommonsBuilder.numberComparator
import newMinPQ = ContainersBuilders.newMinPQ

describe('MinPriorityLinkedQueue', () => {
    let empty: Queue<number>
    let tiny: Queue<number>

    beforeEach(() => {
        empty = newMinPQ<number>(numberComparator)
        tiny = newMinPQ<number>(numberComparator).enqueue(2).enqueue(1).enqueue(3)
    })

    describe('Queue API', () => {
        describe('enqueue/dequeue', () => {
            it('should enqueue to the tail and dequeue from the head', () => {
                expect(tiny.dequeue()).toBe(1)
                expect(tiny.dequeue()).toBe(2)
                expect(tiny.dequeue()).toBe(3)
            })
            it('should throw error when dequeue empty queue', () => {
                expect(() => empty.dequeue()).toThrowError('Queue underflow')
            })
        })
        describe('peek', () => {
            it('should return element from the top without removing it', () => {
                expect(tiny.peek()).toBe(1)
                expect(tiny.peek()).toBe(1)
            })
            it('should throw error when peek empty queue', () => {
                expect(() => empty.peek()).toThrowError('Queue underflow')
            })
        })
        describe('toString', () => {
            it('should print elements from head to tail', () => {
                expect(tiny.toString()).toBe('1 2 3')
            })
        })
    })

    describe('Queue as a Container', () => {
        it('should work for empty queue', () => {
            const collection = empty.asCollection()
            testMap(collection, justThrowError, [])
            testFilter(collection, justThrowError, [])
            testForEach(collection, [])
            testSize(collection, 0)
            testFind(collection, justThrowError, undefined as any)
            testEvery(collection, justThrowError, justThrowError)
            testSome(collection, justThrowError, justThrowError)
            testIterator(collection, [])
        })
        it('should work for not-empty queue', () => {
            const array = [1, 2, 3, 4, 5]
            const collection = newMinPQ<number>(numberComparator)
                .enqueue(2)
                .enqueue(1)
                .enqueue(3)
                .enqueue(5)
                .enqueue(4)
                .asCollection()
            testMap(collection, e => e * 2, array.map(e => e * 2))
            testFilter(collection, e => e > 2 && e < 5, [3, 4])
            testForEach(collection, array)
            testSize(collection, array.length)
            testFind(collection, e => e === 3, 3)
            testEvery(collection, e => e < 6, e => e < 3 || e > 3)
            testSome(collection, e => e > 6, e => e === 3)
            testIterator(collection, array)
        })
    })
})
