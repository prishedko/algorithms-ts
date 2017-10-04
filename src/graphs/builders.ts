import { GraphsAPI, GraphsAPI as api } from './api'
import { AdjacencyListDigraph } from './AdjacencyListDigraph'
import { QueueDirectedCycle } from './QueueDirectedCycle'
import { BreadthFirstDirectedPaths } from './BreadthFirstDirectedPaths'
import { DepthFirstDirectedPaths } from './DepthFirstDirectedPaths'
import DigraphSearch = GraphsAPI.DigraphSearch
import { DigraphBFS } from './DigraphBFS'
import { DigraphDFS } from './DigraphDFS'

/**
 * Factory functions for creating instances of graphs' ADTs.
 */
export namespace GraphsBuilders {
    import Digraph = api.Digraph
    import Vertex = api.Vertex
    import DirectedCycle = api.DirectedCycle
    import VerticesPair = api.VerticesPair
    import DirectedPaths = GraphsAPI.DirectedPaths

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
     * Creates new vertex with given key and with value === key.
     * @param {string} key key of the creating vertex.
     * @return {GraphsBuilders.Vertex<string>} vertex with value === key.
     */
    export function verkey(key: string): Vertex<string> {
        return vertex(key, key)
    }

    /**
     * Creates new <tt>DirectedCycle</tt> that analyzes given digraph.
     * @param {GraphsBuilders.Digraph<V>} dg digraph to analyse.
     * @return {GraphsBuilders.DirectedCycle<V>} new <tt>DirectedCycle</tt> that analyzes given digraph.
     */
    export function directedCycle<V>(dg: Digraph<V>): DirectedCycle<V> {
        return new QueueDirectedCycle(dg)
    }

    /**
     * Creates BFS-based implementation of <tt>DirectedPaths</tt> for given digraph and sources.
     * @param {GraphsBuilders.Digraph<V>} dg digraph to find paths.
     * @param {GraphsBuilders.Vertex<V>} source source to find path from.
     * @return {GraphsAPI.DirectedPaths} BFS-based implementation of <tt>DirectedPaths</tt>.
     */
    export function directedPathsBFS<V>(dg: Digraph<V>, source: Vertex<V>): DirectedPaths<V> {
        return new BreadthFirstDirectedPaths(dg, source)
    }

    /**
     * Creates DFS-based implementation of <tt>DirectedPaths</tt> for given digraph and sources.
     * @param {GraphsBuilders.Digraph<V>} dg digraph to find paths.
     * @param {GraphsBuilders.Vertex<V>} source source to find path from.
     * @return {GraphsAPI.DirectedPaths} DFS-based implementation of <tt>DirectedPaths</tt>.
     */
    export function directedPathsDFS<V>(dg: Digraph<V>, source: Vertex<V>): DirectedPaths<V> {
        return new DepthFirstDirectedPaths(dg, source)
    }

    /**
     * Creates an instance of <code>DigraphSearch</code> that makes Breadth First Search.
     * @return {GraphsAPI.DigraphSearch<V>} BFS instance.
     */
    export function digraphBFS<V>(): DigraphSearch<V> {
        return new DigraphBFS()
    }

    /**
     * Creates an instance of <code>DigraphSearch</code> that makes Depth First Search.
     * @return {GraphsAPI.DigraphSearch<V>} DFS instance.
     */
    export function digraphDFS<V>(): DigraphSearch<V> {
        return new DigraphDFS()
    }
}
