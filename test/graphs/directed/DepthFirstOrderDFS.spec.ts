import {CommonGraphBuilders, DigraphBuilders} from '../../../src'
import {tinyDAG} from '../../data/tinyDAG'
import {DepthFirstOrderDFS} from '../../../src/graphs/directed/DepthFirstOrderDFS'

import verkey = CommonGraphBuilders.verkey
import digraphFromEdgesKeys = DigraphBuilders.digraphFromEdgesKeys

describe('DepthFirstOrderDFS', () => {
    const tiny = digraphFromEdgesKeys(tinyDAG)
    const dfo = new DepthFirstOrderDFS(tiny)

    describe('preorderNumber', () => {
        it('should set correct preorder number', () => {
            expect(dfo.preorderNumber(verkey('0'))).toBe(0)
            expect(dfo.preorderNumber(verkey('1'))).toBe(7)
            expect(dfo.preorderNumber(verkey('2'))).toBe(9)
            expect(dfo.preorderNumber(verkey('3'))).toBe(10)
            expect(dfo.preorderNumber(verkey('4'))).toBe(2)
            expect(dfo.preorderNumber(verkey('5'))).toBe(8)
            expect(dfo.preorderNumber(verkey('6'))).toBe(1)
            expect(dfo.preorderNumber(verkey('7'))).toBe(11)
            expect(dfo.preorderNumber(verkey('8'))).toBe(12)
            expect(dfo.preorderNumber(verkey('9'))).toBe(3)
            expect(dfo.preorderNumber(verkey('10'))).toBe(5)
            expect(dfo.preorderNumber(verkey('11'))).toBe(6)
            expect(dfo.preorderNumber(verkey('12'))).toBe(4)
        })
    })
    describe('postorderNumber', () => {
        it('should set correct postorder number', () => {
            expect(dfo.postorderNumber(verkey('0'))).toBe(8)
            expect(dfo.postorderNumber(verkey('1'))).toBe(6)
            expect(dfo.postorderNumber(verkey('2'))).toBe(10)
            expect(dfo.postorderNumber(verkey('3'))).toBe(9)
            expect(dfo.postorderNumber(verkey('4'))).toBe(0)
            expect(dfo.postorderNumber(verkey('5'))).toBe(7)
            expect(dfo.postorderNumber(verkey('6'))).toBe(5)
            expect(dfo.postorderNumber(verkey('7'))).toBe(11)
            expect(dfo.postorderNumber(verkey('8'))).toBe(12)
            expect(dfo.postorderNumber(verkey('9'))).toBe(4)
            expect(dfo.postorderNumber(verkey('10'))).toBe(2)
            expect(dfo.postorderNumber(verkey('11'))).toBe(3)
            expect(dfo.postorderNumber(verkey('12'))).toBe(1)
        })
    })
    describe('pre', () => {
        it('should iterate vertices in preorder', () => {
            const actual = dfo.pre().reduce((acc, v) => acc === '' ? v.key : acc + ' ' + v.key, '')
            expect(actual).toBe('0 6 4 9 12 10 11 1 5 2 3 7 8')
        })
    })
    describe('post', () => {
        it('should iterate vertices in postorder', () => {
            const actual = dfo.post().reduce((acc, v) => acc === '' ? v.key : acc + ' ' + v.key, '')
            expect(actual).toBe('4 12 10 11 9 6 1 5 0 3 2 7 8')
        })
    })
    describe('reversePost', () => {
        it('should iterate vertices in reverse postorder', () => {
            const actual = dfo.reversePost().reduce((acc, v) => acc === '' ? v.key : acc + ' ' + v.key, '')
            expect(actual).toBe('8 7 2 3 0 5 1 6 9 11 10 12 4')
        })
    })
})
