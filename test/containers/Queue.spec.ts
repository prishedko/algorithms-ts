import { ContainersBuilders, ContainersAPI } from '../../src/'
import Queue = ContainersAPI.Queue
import newQueue = ContainersBuilders.newQueue

describe('Queue', () => {
    let empty: Queue<number>
    let tiny: Queue<number>

    beforeEach(() => {
        empty = newQueue()
        tiny = newQueue<number>().enqueue(1).enqueue(2).enqueue(3)
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
        describe('map', () => {
            it('should return empty container for empty queue', () => {
                expect(empty.asCollection().map(_ => { throw new Error() }).size()).toBe(0)
            })
            it('should transform every item', () => {
                const mapped = tiny.asCollection().map(v => v * 2)
                expect(mapped.size()).toBe(3)
                expect(mapped.reduce((acc, item) => acc + item, 0)).toBe(12)
            })
        })
        describe('filter', () => {
            it('should return empty container for empty queue', () => {
                expect(empty.asCollection().filter(_ => { throw new Error() }).size()).toBe(0)
            })
            it('should return empty container if all elements are filtered', () => {
                expect(tiny.asCollection().filter(v => v > 5).size()).toBe(0)
            })
            it('should return container without filtered elements', () => {
                const actual = tiny
                    .asCollection().filter(v => v > 1 && v < 3)
                    .reduce((acc, v) => acc + v, 0)
                expect(actual).toBe(2)
            })
        })
        describe('forEach', () => {
            it('should not invoke HOF for empty queue', () => {
                empty.asCollection().forEach(_ => { throw new Error() })
            })
            it('should invoke HOF for all elements', () => {
                let result = 0
                tiny.asCollection().forEach(v => result += v)
                expect(result).toBe(6)
            })
        })
        describe('reduce', () => {
            it('should not invoke HOF for empty queue', () => {
                expect(empty.asCollection().reduce(() => { throw new Error() }, 'empty')).toBe('empty')
            })
            it('should invoke HOF for all elements', () => {
                expect(tiny.asCollection().reduce((acc, v) => acc + v, 0)).toBe(6)
            })
        })
        describe('size', () => {
            it('should return zero empty queue', () => {
                expect(empty.size()).toBe(0)
            })
            it('should return amount of elements', () => {
                expect(tiny.size()).toBe(3)
            })
        })

    })
})
