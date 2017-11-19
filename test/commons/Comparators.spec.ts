import {CommonsBuilder} from '../../src/commons/builders'

import numberComparator = CommonsBuilder.numberComparator
import {CommonsAPI} from '../../src/commons/api'
import Ordering = CommonsAPI.Ordering
import stringComparator = CommonsBuilder.stringComparator

describe('Comparators', () => {
    describe('numberComparator', () => {
        it('should correctly compare two numbers', () => {
            expect(numberComparator(-1, 1)).toBe(Ordering.LT)
            expect(numberComparator(1, -1)).toBe(Ordering.GT)
            expect(numberComparator(-1, -1)).toBe(Ordering.EQ)
            expect(numberComparator(1, 1)).toBe(Ordering.EQ)
        })
    })
    describe('stringComparator', () => {
        const a = 'aabcd'
        const b = 'abcd'
        const c = 'abcd'
        expect(stringComparator(a, b)).toBe(Ordering.LT)
        expect(stringComparator(b, a)).toBe(Ordering.GT)
        expect(stringComparator(b, c)).toBe(Ordering.EQ)
        expect(stringComparator(a, a)).toBe(Ordering.EQ)
    })
})
