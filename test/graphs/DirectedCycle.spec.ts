import { GraphsBuilders } from '../../src'
import { tinyDG } from './tinyDG'
import { tinyDAG } from './tinyDAG'
import digraphFromEdgesKeys = GraphsBuilders.digraphFromEdgesKeys
import directedCycle = GraphsBuilders.directedCycle
import vertex = GraphsBuilders.vertex
import digraph = GraphsBuilders.digraph
import { GraphsAPI, CommonsAPI } from '../../src'
import Vertex = GraphsAPI.Vertex
import Collection = CommonsAPI.Collection

function cycleToString<V>(cycle: Collection<Vertex<V>>): string {
    return cycle.reduce((acc, e) => acc === '' ? e.key : acc + '->' + e.key, '')
}

describe('DirectedCycle', () => {
    describe('testing data', () => {
        it('should find cycle in tinyDG', () => {
            const dg = digraphFromEdgesKeys(tinyDG)
            const dc = directedCycle(dg)
            expect(dc.hasCycle()).toBe(true)
        })
        it('should not find cycle in tinyDAG', () => {
            const dag = digraphFromEdgesKeys(tinyDAG)
            const dc = directedCycle(dag)
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
            const dc = directedCycle(dg)
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
            const dc = directedCycle(dg)
            expect(dc.hasCycle()).toBe(false)
            expect(dc.cycle().size()).toBe(0)
        })

        it('should detect reflective cicle', () => {
            dg.addEdge(a, a)
            const dc = directedCycle(dg)
            expect(dc.hasCycle()).toBe(true)
            expect(cycleToString(dc.cycle())).toBe('a->a')
        })

        it('should detect non-reflective cycle', () => {
            dg.addEdge(a, b)
                .addEdge(b, c)
                .addEdge(d, e)
                .addEdge(c, a)
            const dc = directedCycle(dg)
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
            const dc = directedCycle(dg)
            expect(dc.hasCycle()).toBe(true)
            expect(cycles.has(cycleToString(dc.cycle()))).toBe(true)
        })
    })
})
