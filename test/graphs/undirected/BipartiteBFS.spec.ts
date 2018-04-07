import {CommonGraphAPI, CommonGraphBuilders, CommonsAPI, UndirectedGraphBuilders} from '../../../src'
import {bipartite} from '../../data/bipartite'
import {nonBipartite} from '../../data/nonBipartite'
import {BipartiteBFS} from '../../../src/graphs/undirected/BipartiteBFS'

import verkey = CommonGraphBuilders.verkey
import graphFromEdgesKeys = UndirectedGraphBuilders.graphFromEdgesKeys
import Collection = CommonsAPI.Collection
import Vertex = CommonGraphAPI.Vertex

function cycleToString<V>(cycle: Collection<Vertex<V>>): string {
    return cycle.reduce((acc, e) => acc === '' ? e.key : acc + '-' + e.key, '')
}

describe('BipartiteBFS', () => {
    describe('for bipartite graph', () => {
        const result = new BipartiteBFS<string>(graphFromEdgesKeys(bipartite))

        it('should indicate that the graph is a bipartite graph', () => {
            expect(result.isBipartite()).toBe(true)
        })

        it('should correctly idicates colors', () => {
            expect(result.color(verkey('0')) === result.color(verkey('1'))).toBe(true)
            expect(result.color(verkey('1')) === result.color(verkey('2'))).toBe(true)

            expect(result.color(verkey('3')) === result.color(verkey('4'))).toBe(true)
            expect(result.color(verkey('4')) === result.color(verkey('5'))).toBe(true)

            expect(result.color(verkey('0')) === result.color(verkey('3'))).toBe(false)
        })

        it('should return empty odd-cycle', () => {
            expect(result.oddCycle().size()).toBe(0)
        })
    })
    describe('for non-bipartite graph', () => {
        const result = new BipartiteBFS<string>(graphFromEdgesKeys(nonBipartite))

        it('should indicate that the graph is a bipartite graph', () => {
            expect(result.isBipartite()).toBe(false)
        })

        it('should throw error for checking colors', () => {
            expect(() => result.color(verkey('0'))).toThrowError('Graph is not bipartite')
        })

        it('should return not-empty odd-cycle', () => {
            expect(result.oddCycle().size()).toBe(40)
            expect(cycleToString(result.oddCycle()))
                .toBe('6-0-5-6-5-0-6-5-7-0-6-7-6-0-7-6-4-7-0-3-1-4-4-7-0-3-2-4-1-3-0-7-4-1-2-3-0-7-4-2')
        })
    })
})
