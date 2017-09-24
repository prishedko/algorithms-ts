import { ContainersBuilders, ContainersAPI } from '../../src/'
import Stack = ContainersAPI.Stack
import newStack = ContainersBuilders.newStack

describe('Stack', () => {
    let empty: Stack<number>
    let tiny: Stack<number>

    beforeEach(() => {
        empty = newStack()
        tiny = newStack<number>().push(1).push(2).push(3)
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
        describe('map', () => {
            it('should return empty container for empty stack', () => {
                expect(empty.asCollection().map(_ => { throw new Error() }).size()).toBe(0)
            })
            it('should transform every item', () => {
                const mapped = tiny.asCollection().map(v => v * 2)
                expect(mapped.size()).toBe(3)
                expect(mapped.reduce((acc, item) => acc + item, 0)).toBe(12)
            })
        })
        describe('filter', () => {
            it('should return empty container for empty stack', () => {
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
            it('should not invoke HOF for empty stack', () => {
                empty.asCollection().forEach(_ => { throw new Error() })
            })
            it('should invoke HOF for all elements', () => {
                let result = 0
                tiny.asCollection().forEach(v => result += v)
                expect(result).toBe(6)
            })
        })
        describe('reduce', () => {
            it('should not invoke HOF for empty stack', () => {
                expect(empty.asCollection().reduce(() => { throw new Error() }, 'empty')).toBe('empty')
            })
            it('should invoke HOF for all elements', () => {
                expect(tiny.asCollection().reduce((acc, v) => acc + v, 0)).toBe(6)
            })
        })
        describe('size', () => {
            it('should return zero empty stack', () => {
                expect(empty.size()).toBe(0)
            })
            it('should return amount of elements', () => {
                expect(tiny.size()).toBe(3)
            })
        })

    })
})
