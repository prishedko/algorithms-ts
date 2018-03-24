import {CommonGraphBuilders, DigraphBuilders} from '../../../src'
import {tinyDG} from '../../data/tinyDG'
import {tinyDAG} from '../../data/tinyDAG'
import {QueueDirectedCycle} from '../../../src/graphs/directed/QueueDirectedCycle'
import {CommonGraphAPI, CommonsAPI} from '../../../src'

import digraphFromEdgesKeys = DigraphBuilders.digraphFromEdgesKeys
import vertex = CommonGraphBuilders.vertex
import digraph = DigraphBuilders.digraph
import Vertex = CommonGraphAPI.Vertex
import Collection = CommonsAPI.Collection

function cycleToString<V>(cycle: Collection<Vertex<V>>): string {
    return cycle.reduce((acc, e) => acc === '' ? e.key : acc + '->' + e.key, '')
}

describe('QueueDirectedCycle', () => {
    describe('testing data', () => {
        it('should find cycle in tinyDG', () => {
            const dg = digraphFromEdgesKeys(tinyDG)
            const dc = new QueueDirectedCycle(dg)
            expect(dc.hasCycle()).toBe(true)
            expect(cycleToString(dc.cycle())).toBe('12->9->11->12')
        })
        it('should not find cycle in tinyDAG', () => {
            const dag = digraphFromEdgesKeys(tinyDAG)
            const dc = new QueueDirectedCycle(dag)
            expect(dc.hasCycle()).toBe(false)
        })
    })
    describe('DirectedCycle API', () => {
        const a = vertex('a', 'a')
        const b = vertex('b', 'b')
        const c = vertex('c', 'c')
        const d = vertex('d', 'd')
        const e = vertex('e', 'e')
        const dg = digraph<string>()

        it('should not detect any cycle in empty DG', () => {
            const dc = new QueueDirectedCycle(dg)
            expect(dc.hasCycle()).toBe(false)
            expect(dc.cycle().size()).toBe(0)
        })

        it('should not detect any cycle in acyclic DG', () => {
            dg.addEdge(a, b)
                .addEdge(a, c)
                .addEdge(a, d)
                .addEdge(a, e)
                .addEdge(b, c)
                .addEdge(b, d)
                .addEdge(b, e)
                .addEdge(c, d)
                .addEdge(c, e)
                .addEdge(d, e)
            const dc = new QueueDirectedCycle(dg)
            expect(dc.hasCycle()).toBe(false)
            expect(dc.cycle().size()).toBe(0)
        })

        it('should detect reflective cicle', () => {
            dg.addEdge(a, a)
            const dc = new QueueDirectedCycle(dg)
            expect(dc.hasCycle()).toBe(true)
            expect(cycleToString(dc.cycle())).toBe('a->a')
        })

        it('should detect non-reflective cycle', () => {
            dg.addEdge(a, b)
                .addEdge(b, c)
                .addEdge(d, e)
                .addEdge(c, a)
            const dc = new QueueDirectedCycle(dg)
            expect(dc.hasCycle()).toBe(true)
            expect(cycleToString(dc.cycle())).toBe('c->a->b->c')
        })

        it('should detect a cycle in DG with several cycles', () => {
            dg.addEdge(a, b)
                .addEdge(b, c)
                .addEdge(c, d)
                .addEdge(d, a)
                .addEdge(c, e)
                .addEdge(e, b)
            const cycles = new Set<string>()
                .add('e->b->c->d->e')
                .add('d->a->b->c->d')
            const dc = new QueueDirectedCycle(dg)
            expect(dc.hasCycle()).toBe(true)
            expect(cycles.has(cycleToString(dc.cycle()))).toBe(true)
        })
    })
})
