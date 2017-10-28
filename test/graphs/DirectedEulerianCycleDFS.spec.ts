import { GraphsBuilders } from '../../src'
import { eulerianCycle } from '../data/eulerianCycleDGs'
import { eulerianPath } from '../data/eulerianPathDGs'
import { tinyDAG } from '../data/tinyDAG'
import { tinyDG } from '../data/tinyDG'
import { DirectedEulerianCycleDFS } from '../../src/graphs/DirectedEulerianCycleDFS'

import digraphFromEdgesKeys = GraphsBuilders.digraphFromEdgesKeys
import digraph = GraphsBuilders.digraph
import verkey = GraphsBuilders.verkey

describe('DirectedEulerianCycleDFS', () => {
    it('should find eulerian cycle in eulerianCycle.first', () => {
        const graph = digraphFromEdgesKeys(eulerianCycle.first)
        const duc = new DirectedEulerianCycleDFS(graph)

        expect(duc.hasEulerianCycle()).toBe(true)
        const actual = duc.cycle().reduce((acc, item) => acc === '' ? item.key : acc + ' -> ' + item.key, '')
        expect(actual).toBe('0 -> 2 -> 1 -> 0 -> 3 -> 4 -> 0')
    })

    it('should find eulerian cycle in eulerianCycle.second', () => {
        const graph = digraphFromEdgesKeys(eulerianCycle.second)
        const duc = new DirectedEulerianCycleDFS(graph)

        expect(duc.hasEulerianCycle()).toBe(true)
        const actual = duc.cycle().reduce((acc, item) => acc === '' ? item.key : acc + ' -> ' + item.key, '')
        expect(actual).toBe('0 -> 6 -> 2 -> 1 -> 6 -> 4 -> 3 -> 5 -> 0')
    })

    it('should not find eulerian cycle in eulerianPath.first', () => {
        const graph = digraphFromEdgesKeys(eulerianPath.first)
        const duc = new DirectedEulerianCycleDFS(graph)

        expect(duc.hasEulerianCycle()).toBe(false)
        expect(duc.cycle().size()).toBe(0)
    })

    it('should not find eulerian cycles in tinyDAG and tinyDG', () => {
        const dag = digraphFromEdgesKeys(tinyDAG)
        const ducDAG = new DirectedEulerianCycleDFS(dag)
        expect(ducDAG.hasEulerianCycle()).toBe(false)
        expect(ducDAG.cycle().size()).toBe(0)

        const dg = digraphFromEdgesKeys(tinyDG)
        const ducDG = new DirectedEulerianCycleDFS(dg)
        expect(ducDG.hasEulerianCycle()).toBe(false)
        expect(ducDG.cycle().size()).toBe(0)
    })

    it('should not find eulerian cycles in a graph without edges', () => {
        const graph = digraph<string>()
            .addVertex(verkey('0'))
            .addVertex(verkey('1'))
            .addVertex(verkey('3'))
        const duc = new DirectedEulerianCycleDFS(graph)
        expect(duc.hasEulerianCycle()).toBe(false)
        expect(duc.cycle().size()).toBe(0)
    })
})
