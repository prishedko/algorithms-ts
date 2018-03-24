import {CommonGraphBuilders, DigraphBuilders} from '../../../src'
import {tinyDG} from '../../data/tinyDG'
import {tinyDAG} from '../../data/tinyDAG'
import {CommonGraphAPI, CommonsAPI} from '../../../src'
import {TopologicalOrderDFS} from '../../../src/graphs/directed/TopologicalOrderDFS'

import digraphFromEdgesKeys = DigraphBuilders.digraphFromEdgesKeys
import Vertex = CommonGraphAPI.Vertex
import Collection = CommonsAPI.Collection
import verkey = CommonGraphBuilders.verkey

function orderToString<V>(order: Collection<Vertex<V>>): string {
    return order.reduce((acc, e) => acc === '' ? e.key : acc + '->' + e.key, '')
}

describe('TopologicalOrderDFS', () => {
    describe('testing data', () => {
        it('should find order in tinyDAG', () => {
            const dg = digraphFromEdgesKeys(tinyDAG)
            const to = new TopologicalOrderDFS(dg)
            expect(to.hasOrder()).toBe(true)
            expect(orderToString(to.order())).toBe('2->8->3->0->7->1->5->6->4->9->10->11->12')
            expect(to.rank(verkey('0'))).toBe(3)
            expect(to.rank(verkey('1'))).toBe(5)
            expect(to.rank(verkey('2'))).toBe(0)
            expect(to.rank(verkey('3'))).toBe(2)
            expect(to.rank(verkey('4'))).toBe(8)
            expect(to.rank(verkey('5'))).toBe(6)
            expect(to.rank(verkey('6'))).toBe(7)
            expect(to.rank(verkey('7'))).toBe(4)
            expect(to.rank(verkey('8'))).toBe(1)
            expect(to.rank(verkey('9'))).toBe(9)
            expect(to.rank(verkey('10'))).toBe(10)
            expect(to.rank(verkey('11'))).toBe(11)
            expect(to.rank(verkey('12'))).toBe(12)
        })
        it('should not find order in tinyDG', () => {
            const dag = digraphFromEdgesKeys(tinyDG)
            const to = new TopologicalOrderDFS(dag)
            expect(to.hasOrder()).toBe(false)
            expect(to.order().size()).toBe(0)
            expect(to.rank(verkey('0'))).toBe(-1)
            expect(to.rank(verkey('1'))).toBe(-1)
            expect(to.rank(verkey('2'))).toBe(-1)
            expect(to.rank(verkey('3'))).toBe(-1)
            expect(to.rank(verkey('4'))).toBe(-1)
            expect(to.rank(verkey('5'))).toBe(-1)
            expect(to.rank(verkey('6'))).toBe(-1)
            expect(to.rank(verkey('7'))).toBe(-1)
            expect(to.rank(verkey('8'))).toBe(-1)
            expect(to.rank(verkey('9'))).toBe(-1)
            expect(to.rank(verkey('10'))).toBe(-1)
            expect(to.rank(verkey('11'))).toBe(-1)
            expect(to.rank(verkey('12'))).toBe(-1)
            expect(to.rank(verkey('77'))).toBe(-1)
        })
    })
})
