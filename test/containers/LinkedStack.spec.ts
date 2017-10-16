import { ContainersAPI } from '../../src/'
import { LinkedStack } from '../../src/containers/LinkedStack'
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

import Stack = ContainersAPI.Stack

describe('LinkedStack', () => {
    let empty: Stack<number>
    let tiny: Stack<number>

    beforeEach(() => {
        empty = new LinkedStack<number>()
        tiny = new LinkedStack<number>().push(1).push(2).push(3)
    })

    describe('Stack API', () => {
        describe('push/pop', () => {
            it('should push to top anf pop from top', () => {
                expect(tiny.pop()).toBe(3)
                expect(tiny.pop()).toBe(2)
                expect(tiny.pop()).toBe(1)
            })
            it('should throw error when pop empty stack', () => {
                expect(() => empty.pop()).toThrowError('Stack underflow')
            })
        })
        describe('peek', () => {
            it('should return element from the top without removing it', () => {
                expect(tiny.peek()).toBe(3)
                expect(tiny.peek()).toBe(3)
            })
            it('should throw error when peek empty stack', () => {
                expect(() => empty.peek()).toThrowError('Stack underflow')
            })
        })
        describe('toString', () => {
            it('should print elements from top to bottom', () => {
                expect(tiny.toString()).toBe('3 2 1')
            })
        })
    })

    describe('Stack as a Container', () => {
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
            const array = [4, 5, 3, 1, 2]
            const collection = new LinkedStack<number>()
                .push(2)
                .push(1)
                .push(3)
                .push(5)
                .push(4)
                .asCollection()
            testMap(collection, e => e * 2, array.map(e => e * 2))
            testFilter(collection, e => e > 2 && e < 5, [4, 3])
            testForEach(collection, array)
            testSize(collection, array.length)
            testFind(collection, e => e === 3, 3)
            testEvery(collection, e => e < 6, e => e < 3 || e > 3)
            testSome(collection, e => e > 6, e => e === 3)
            testIterator(collection, array)
        })
    })
})
