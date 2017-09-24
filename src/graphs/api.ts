import { CommonsAPI } from '../commons/api'
import Collection = CommonsAPI.Collection

/**
 * Defines ADTs that model different graphs and graphs' algorithms.
 */
export namespace GraphsAPI {
    /**
     * Represends graph vertex with unique key and with some payload.
     */
    export type Vertex<V> = {
        /**
         * Vertexes key. Vertices with the same key are concidered identical.
         */
        readonly key: string
        /**
         * Vertexes payload.
         */
        readonly value: V
    }

    /**
     * Pair of vertices.
     */
    export type VerticesPair<V> = [Vertex<V>, Vertex<V>]

    /**
     * The <tt>Digraph</tt> class represents a directed graph of vertices. It supports adding new vertices and edges,
     * iteration over all vertices and iteration over all of the vertices adjecent from a given vertex. Parallel
     * edges and self-loops are permitted.
     */
    export interface Digraph<V> {
        /**
         * Adds new vertext to the digraph. If digraph already has vertex with the same key, it doesn't add new one.
         * @param {GraphsAPI.Vertex<V>} v new vertex.
         * @return {GraphsAPI.Digraph<V>} digraph with the added vertex.
         */
        addVertex(v: Vertex<V>): Digraph<V>
        /**
         * Adds the directed edge 'from -> to' to the digraph. If any of the vertices in the edge is not in the digraph,
         * the method adds the vertex.
         * @param from the tail vertex.
         * @param to the head vertex.
         * @return {GraphsAPI.Digraph<V>} digraph with the added edge.
         */
        addEdge(from: Vertex<V>, to: Vertex<V>): Digraph<V>
        /**
         * Returns the number of vertices in the digraph.
         * @return the number of vertices in the digraph.
         */
        v(): number
        /**
         * Returns the number of edges in the digraph.
         * @return the number of edges in the digraph.
         */
        e(): number
        /**
         * Returns the vertices adjacent from given vertex in the digraph. If there is no such vertex in the digraph,
         * the method returns empty container.
         * @param v the vertex.
         * @return the vertices adjacent from given vertex in the digraph or empty container.
         */
        adjacent(v: Vertex<V>): Collection<Vertex<V>>
        /**
         * Returns the reverse of the digraph.
         * @return the reverse of the digraph
         */
        reverse(): Digraph<V>
        /**
         * Returns a string representation of the graph.
         * This method takes time proportional to <tt>E</tt> + <tt>V</tt>.
         * @return the number of vertices <tt>V</tt>, followed by the number of edges <tt>E</tt>, followed by the
         * <tt>V</tt> adjacency lists
         */
        toString(): string
        /**
         * Returns collection backed by vertices of this graph. Time complexity is O(1).
         * @return {CommonsAPI.Collection<GraphsAPI.Vertex<V>>} collection of vertices.
         */
        asVerticesCollection(): Collection<Vertex<V>>
        /**
         * Returns collection backed by edges of this graph. Time complexity is O(1).
         * @return {CommonsAPI.Collection<GraphsAPI.Vertex<V>>} collection of edges.
         */
        asEdgesCollection(): Collection<VerticesPair<V>>
    }

    /**
     * The <tt>DirectedCycle</tt> class represents a data type for determining whether the underlying digraph has a
     * directed cycle. The <tt>hasCycle</tt> operation determines whether the digraph has a directed cycle and, and of
     * so, the <tt>cycle</tt> operation returns one.
     * <p/>
     * Be aware that this algorithm just detects whethere there is at least one cycle. So if there are several cycles,
     * <tt>DirectedCycle</tt> returns only one of them without any guarantee which one.
     * <p/>
     * Underlying digraph is anylized during creating instance of <tt>DirectedCycle</tt>. It means
     * that if you have another digraph or even if you've changed underlying digraph after creating an instance of
     * DirectedCycle, you should create new instance of DirectedCycle for new/changed digraph.
     * <p/>
     * Graph analysis runs in O(E + V) time during the instance creating. Than running times of <tt>hasCycle</tt>
     * and <tt>cycle</tt> are O(1).
     */
    export interface DirectedCycle<V> {
        /**
         * Does the digraph have a directed cycle?
         * @return <tt>true</tt> if the digraph has a directed cycle, <tt>false</tt> otherwise.
         */
        hasCycle(): boolean

        /**
         * Returns a directed cycle if the digraph has a directed cycle, and [] otherwise.
         * @return a directed cycle if the digraph has a directed cycle, and [] otherwise.
         */
        cycle(): Collection<Vertex<V>>
    }
}
