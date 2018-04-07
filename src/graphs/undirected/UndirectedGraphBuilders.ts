import {CommonGraphAPI} from '../common/CommonGraphAPI'
import {CommonGraphBuilders} from '../common/CommonGraphBuilders'
import {UndirectedGraphAPI} from './UndirectedGraphAPI'
import {AdjacencyListGraph} from './AdjacencyListGraph'
import {BipartiteBFS} from './BipartiteBFS'

/**
 * Factory functions for creating instances of undirected graphs' ADTs.
 */
export namespace UndirectedGraphBuilders {
    import Graph = UndirectedGraphAPI.Graph
    import Bipartite = UndirectedGraphAPI.Bipartite
    import VerticesPair = CommonGraphAPI.VerticesPair
    import vertex = CommonGraphBuilders.vertex

    /**
     * Creates new instance of {@link UndirectedGraphAPI.Graph}.
     * @return {UndirectedGraphAPI.Graph<V>} new instance of <tt>Graph</tt>.
     */
    export function graph<V>(): Graph<V> {
        return new AdjacencyListGraph([])
    }

    /**
     * Creates new instance of <tt>Graph</tt> from given keys of its edges. It means that for every pair like
     * ['key1', 'key2'] it creates pair of vertices [V1('key1', 'key1'), V2('key2', 'key2'] and adds this pair of
     * vertices as the edge (V1-V2).
     * @param {[string , string][]} edges pairs of keys of vertices that describe edges.
     * @return {UndirectedGraphAPI.Graph<string>} new graph with given edges.
     */
    export function graphFromEdgesKeys(edges: [string, string][]): Graph<string> {
        return edges.reduce((acc: Graph<string>, e) => acc.addEdge(vertex(e[0], e[0]), vertex(e[1], e[1])),
            new AdjacencyListGraph<string>())
    }

    /**
     * Creates new <tt>Graph</tt> with given edges.
     * @param {CommonGraphAPI.VerticesPair<V>[]} edges edges to add into new graph.
     * @return {UndirectedGraphAPI.Graph<V>} new <tt>Graph</tt> with given edges.
     */
    export function graphFromEdges<V>(edges: VerticesPair<V>[]): Graph<V> {
        return new AdjacencyListGraph(edges)
    }

    /**
     * Creates an instance of <code>Bipartite</code> for given graph.
     * @param {UndirectedGraphAPI.Graph<V>} g graph to apply the algorithm.
     * @return {UndirectedGraphAPI.Bipartite<V>} implementation of <tt>Bipartite</tt>.
     */
    export function bipartite<V>(g: Graph<V>): Bipartite<V> {
        return new BipartiteBFS(g)
    }
}
