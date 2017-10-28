import { GraphsBuilders } from '../../src'
import { eulerianCycle } from '../data/eulerianCycleDGs'
import { eulerianPath } from '../data/eulerianPathDGs'
import { tinyDAG } from '../data/tinyDAG'
import { tinyDG } from '../data/tinyDG'
import { DirectedEulerianPathDFS } from '../../src/graphs/DirectedEulerianPathDFS'

import digraphFromEdgesKeys = GraphsBuilders.digraphFromEdgesKeys
import digraph = GraphsBuilders.digraph
import verkey = GraphsBuilders.verkey

describe('DirectedEulerianPathDFS', () => {
    it('should find eulerian path in eulerianCycle.first', () => {
        const graph = digraphFromEdgesKeys(eulerianCycle.first)
        const duc = new DirectedEulerianPathDFS(graph)

        expect(duc.hasEulerianPath()).toBe(true)
        const actual = duc.path().reduce((acc, item) => acc === '' ? item.key : acc + ' -> ' + item.key, '')
        expect(actual).toBe('0 -> 2 -> 1 -> 0 -> 3 -> 4 -> 0')
    })

    it('should find eulerian path in eulerianCycle.second', () => {
        const graph = digraphFromEdgesKeys(eulerianCycle.second)
        const duc = new DirectedEulerianPathDFS(graph)

        expect(duc.hasEulerianPath()).toBe(true)
        const actual = duc.path().reduce((acc, item) => acc === '' ? item.key : acc + ' -> ' + item.key, '')
        expect(actual).toBe('0 -> 6 -> 2 -> 1 -> 6 -> 4 -> 3 -> 5 -> 0')
    })

    it('should find eulerian path in eulerianPath.first', () => {
        const graph = digraphFromEdgesKeys(eulerianPath.first)
        const duc = new DirectedEulerianPathDFS(graph)

        expect(duc.hasEulerianPath()).toBe(true)
        const actual = duc.path().reduce((acc, item) => acc === '' ? item.key : acc + ' -> ' + item.key, '')
        expect(actual).toBe('2 -> 3 -> 1 -> 2 -> 0 -> 1')
    })

    it('should not find eulerian path in tinyDAG and tinyDG', () => {
        const dag = digraphFromEdgesKeys(tinyDAG)
        const ducDAG = new DirectedEulerianPathDFS(dag)
        expect(ducDAG.hasEulerianPath()).toBe(false)
        expect(ducDAG.path().size()).toBe(0)

        const dg = digraphFromEdgesKeys(tinyDG)
        const ducDG = new DirectedEulerianPathDFS(dg)
        expect(ducDG.hasEulerianPath()).toBe(false)
        expect(ducDG.path().size()).toBe(0)
    })

    it('should not find eulerian cycles in a graph without edges', () => {
        const graph = digraph<string>()
            .addVertex(verkey('0'))
            .addVertex(verkey('1'))
            .addVertex(verkey('3'))
        const duc = new DirectedEulerianPathDFS(graph)
        expect(duc.hasEulerianPath()).toBe(false)
        expect(duc.path().size()).toBe(0)
    })
})
