import {CommonGraphAPI} from '../common/CommonGraphAPI'
import {CommonGraphBuilders} from '../common/CommonGraphBuilders'
import {DigraphAPI} from './DigraphAPI'
import {AdjacencyListDigraph} from './AdjacencyListDigraph'
import {QueueDirectedCycle} from './QueueDirectedCycle'
import {BreadthFirstDirectedPaths} from './BreadthFirstDirectedPaths'
import {DepthFirstDirectedPaths} from './DepthFirstDirectedPaths'
import {DigraphBFS} from './DigraphBFS'
import {DigraphDFS} from './DigraphDFS'
import {DepthFirstOrderDFS} from './DepthFirstOrderDFS'
import {TopologicalOrderDFS} from './TopologicalOrderDFS'
import {DirectedEulerianPathDFS} from './DirectedEulerianPathDFS'
import {DirectedEulerianCycleDFS} from './DirectedEulerianCycleDFS'
import {GabowSCC} from './GabowSCC'
import {KosarajuSharirSCC} from './KosarajuSharirSCC'
import {TarjanSCC} from './TarjanSCC'
import {CommonsAPI} from '../../'
import {DirectedDFS} from './DirectedDFS'
import {TransitiveClosureDFS} from './TransitiveClosureDFS'

/**
 * Factory functions for creating instances of graphs' ADTs.
 */
export namespace DigraphBuilders {
    import Digraph = DigraphAPI.Digraph
    import Vertex = CommonGraphAPI.Vertex
    import DirectedCycle = DigraphAPI.DirectedCycle
    import VerticesPair = CommonGraphAPI.VerticesPair
    import DirectedPaths = DigraphAPI.DirectedPaths
    import DepthFirstOrder = DigraphAPI.DepthFirstOrder
    import TopologicalOrder = DigraphAPI.TopologicalOrder
    import DirectedEulerianPath = DigraphAPI.DirectedEulerianPath
    import DirectedEulerianCycle = DigraphAPI.DirectedEulerianCycle
    import StronglyConnectedComponents = DigraphAPI.StronglyConnectedComponents
    import DigraphSearch = DigraphAPI.DigraphSearch
    import Collection = CommonsAPI.Collection
    import Directed = DigraphAPI.Directed
    import TransitiveClosure = DigraphAPI.TransitiveClosure
    import vertex = CommonGraphBuilders.vertex

    /**
     * Creates new instance of <tt>Digraph</tt>.
     * @return {DigraphAPI.Digraph<V>} new instance of <tt>Digraph</tt>.
     */
    export function digraph<V>(): Digraph<V> {
        return new AdjacencyListDigraph([])
    }

    /**
     * Creates new instance of <tt>Digraph</tt> from given keys of its edges. It means that for every pair like
     * ['key1', 'key2'] it creates pair of vertices [V1('key1', 'key1'), V2('key2', 'key2'] and adds this pair of
     * vertices as the edge (V1->V2).
     * @param {[string , string][]} edges pairs of keys of vertices that describe edges.
     * @return {DigraphAPI.Digraph<string>} new digraph with given edges.
     */
    export function digraphFromEdgesKeys(edges: [string, string][]): Digraph<string> {
        return edges.reduce((acc: Digraph<string>, e) => acc.addEdge(vertex(e[0], e[0]), vertex(e[1], e[1])),
            new AdjacencyListDigraph<string>())
    }

    /**
     * Creates new <tt>Digraph</tt> with given egdes.
     * @param {CommonGraphAPI.VerticesPair<V>[]} edges edges to add into new digrapth.
     * @return {DigraphAPI.Digraph<V>} new <tt>Digraph</tt> with given egdes.
     */
    export function digraphFromEdges<V>(edges: VerticesPair<V>[]): Digraph<V> {
        return new AdjacencyListDigraph(edges)
    }

    /**
     * Creates new <tt>DirectedCycle</tt> that analyzes given digraph.
     * @param {DigraphAPI.Digraph<V>} dg digraph to analyse.
     * @return {DigraphAPI.DirectedCycle<V>} new <tt>DirectedCycle</tt> that analyzes given digraph.
     */
    export function directedCycle<V>(dg: Digraph<V>): DirectedCycle<V> {
        return new QueueDirectedCycle(dg)
    }

    /**
     * Creates BFS-based implementation of <tt>DirectedPaths</tt> for given digraph and sources.
     * @param {DigraphAPI.Digraph<V>} dg digraph to find paths.
     * @param {CommonGraphAPI.Vertex<V>} source source to find path from.
     * @return {GraphsAPI.DirectedPaths} BFS-based implementation of <tt>DirectedPaths</tt>.
     */
    export function directedPathsBFS<V>(dg: Digraph<V>, source: Vertex<V>): DirectedPaths<V> {
        return new BreadthFirstDirectedPaths(dg, source)
    }

    /**
     * Creates DFS-based implementation of <tt>DirectedPaths</tt> for given digraph and sources.
     * @param {DigraphAPI.Digraph<V>} dg digraph to find paths.
     * @param {CommonGraphAPI.Vertex<V>} source source to find path from.
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

    /**
     * Creates an instance of <code>DepthFirstOrder</code> for given digraph.
     * @param {DigraphAPI.Digraph<V>} dg digraph to build the order.
     * @return {GraphsAPI.DepthFirstOrder<V>} implementation of <tt>DepthFirstOrder</tt>.
     */
    export function depthFirstOrder<V>(dg: Digraph<V>): DepthFirstOrder<V> {
        return new DepthFirstOrderDFS(dg)
    }

    /**
     * Creates an instance of <code>DirectedEulerianCycle</code> for give digraph.
     * @param {DigraphAPI.Digraph<V>} dg digraph to build the order.
     * @return {GraphsAPI.DirectedEulerianCycle<V>} implementation of <tt>DirectedEulerianCycle</tt>.
     */
    export function directedEulerianCycle<V>(dg: Digraph<V>): DirectedEulerianCycle<V> {
        return new DirectedEulerianCycleDFS(dg)
    }

    /**
     * Creates an instance of <code>TopologicalOrder</code> for give digraph.
     * @param {DigraphAPI.Digraph<V>} dg digraph to build the order.
     * @return {GraphsAPI.TopologicalOrder<V>} implementation of <tt>TopologicalOrder</tt>.
     */
    export function topologicalOrder<V>(dg: Digraph<V>): TopologicalOrder<V> {
        return new TopologicalOrderDFS(dg)
    }

    /**
     * Creates an instance of <code>DirectedEulerianPath</code> for give digraph.
     * @param {DigraphAPI.Digraph<V>} dg digraph to build the order.
     * @return {GraphsAPI.DirectedEulerianPath<V>} implementation of <tt>DirectedEulerianPath</tt>.
     */
    export function directedEulerianPath<V>(dg: Digraph<V>): DirectedEulerianPath<V> {
        return new DirectedEulerianPathDFS(dg)
    }

    /**
     * Creates an instance of <code>StronglyConnectedComponents</code> implementation that uses Gabow algorithm.
     * @param {DigraphAPI.Digraph<V>} dg digraph to build the order.
     * @return {GraphsAPI.StronglyConnectedComponents<V>} implementation of <tt>StronglyConnectedComponents</tt>.
     */
    export function sccGabow<V>(dg: Digraph<V>): StronglyConnectedComponents<V> {
        return new GabowSCC(dg)
    }

    /**
     * Creates an instance of <code>StronglyConnectedComponents</code> implementation that uses Kosaraju-Sharir
     * algorithm.
     * @param {DigraphAPI.Digraph<V>} dg digraph to build the order.
     * @return {GraphsAPI.StronglyConnectedComponents<V>} implementation of <tt>StronglyConnectedComponents</tt>.
     */
    export function sccKosarajuSharir<V>(dg: Digraph<V>): StronglyConnectedComponents<V> {
        return new KosarajuSharirSCC(dg)
    }

    /**
     * Creates an instance of <code>StronglyConnectedComponents</code> implementation that uses Tarjan algorithm.
     * @param {DigraphAPI.Digraph<V>} dg digraph to build the order.
     * @return {GraphsAPI.StronglyConnectedComponents<V>} implementation of <tt>StronglyConnectedComponents</tt>.
     */
    export function sccTarjan<V>(dg: Digraph<V>): StronglyConnectedComponents<V> {
        return new TarjanSCC(dg)
    }

    /**
     * Creates an instance of <code>Directed</code> for give digraph.
     * @param {DigraphAPI.Digraph<V>} dg digraph to build the Directed instance.
     * @param {CommonsAPI.Collection<CommonGraphAPI.Vertex<V>>} sources source vertices.
     * @return {GraphsAPI.Directed<V>} implementation of <tt>Directed</tt>.
     */
    export function directed<V>(dg: Digraph<V>, sources: Collection<Vertex<V>>): Directed<V> {
        return new DirectedDFS(dg, sources)
    }

    /**
     * Creates an instance of <code>TransitiveClosure</code> for give digraph.
     * @param {DigraphAPI.Digraph<V>} dg digraph to build the closure.
     * @return {GraphsAPI.DirectedEulerianPath<V>} implementation of <tt>TransitiveClosure</tt>.
     */
    export function transitiveClosure<V>(dg: Digraph<V>): TransitiveClosure<V> {
        return new TransitiveClosureDFS(dg)
    }
}
