import { GraphsAPI as api } from './api'
import { AdjacencyListDigraph } from './AdjacencyListDigraph'
import { DFSDirectedCycle } from './DFSDirectedCycle'

/**
 * Factory functions for creating instances of graphs' ADTs.
 */
export namespace GraphsBuilders {
    import Digraph = api.Digraph
    import Vertex = api.Vertex
    import DirectedCycle = api.DirectedCycle
    import VerticesPair = api.VerticesPair

    /**
     * Creates new instance of <tt>Digraph</tt>.
     * @return {GraphsBuilders.Digraph<V>} new instance of <tt>Digraph</tt>.
     */
    export function digraph<V>(): Digraph<V> {
        return new AdjacencyListDigraph([])
    }

    /**
     * Creates new instance of <tt>Digraph</tt> from given keys of its edges. It means that for every pair like
     * ['key1', 'key2'] it creates pair of vertices [V1('key1', 'key1'), V2('key2', 'key2'] and adds this pair of
     * vertices as the edge (V1->V2).
     * @param {[string , string][]} edges pairs of keys of vertices that describe edges.
     * @return {GraphsBuilders.Digraph<string>} new digraph with given edges.
     */
    export function digraphFromEdgesKeys(edges: [string, string][]): Digraph<string> {
        return edges.reduce((acc: Digraph<string>, e) => acc.addEdge(vertex(e[0], e[0]), vertex(e[1], e[1])),
            new AdjacencyListDigraph<string>())
    }

    /**
     * Creates new <tt>Digraph</tt> with given egdes.
     * @param {GraphsBuilders.VerticesPair<V>[]} edges edges to add into new digrapth.
     * @return {GraphsBuilders.Digraph<V>} new <tt>Digraph</tt> with given egdes.
     */
    export function digraphFromEdges<V>(edges: VerticesPair<V>[]): Digraph<V> {
        return new AdjacencyListDigraph(edges)
    }

    /**
     * Creates new vertex with given key and payload.
     * @param {string} key key.
     * @param {V} value payload.
     * @return {GraphsBuilders.Vertex<V>} new vertex.
     */
    export function vertex<V>(key: string, value: V): Vertex<V> {
        return {
            key: key,
            value: value
        }
    }

    /**
     * Creates new <tt>DirectedCycle</tt> that analyzes given digraph.
     * @param {GraphsBuilders.Digraph<V>} dg digraph to analyse.
     * @return {GraphsBuilders.DirectedCycle<V>} new <tt>DirectedCycle</tt> that analyzes given digraph.
     */
    export function directedCycle<V>(dg: Digraph<V>): DirectedCycle<V> {
        return new DFSDirectedCycle(dg)
    }
}
